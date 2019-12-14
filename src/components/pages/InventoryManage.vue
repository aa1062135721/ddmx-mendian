<template>
    <div class="inventory-manage">
      <el-tabs v-model="type" @tab-click="handleClick">
        <el-tab-pane label="库存查询" name="0">
          <div>
            <div class="search">
              <el-select  clearable placeholder="选择一级分类" v-model="stockCheck.requestData.type_id" @change="stockCheckTwoCategory">
                <el-option
                  v-for="item in stockCheck.topCategory"
                  :label="item.cname"
                  :key="item.id"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select  clearable placeholder="选择二级分类" v-model="stockCheck.requestData.type">
                <el-option
                  v-for="item in stockCheck.twoCategory"
                  :label="item.cname"
                  :key="item.id"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-input placeholder="商品名/条形码" style="width: 180px;"  v-model="stockCheck.requestData.title"></el-input>
              <el-select  clearable placeholder="剩余库存筛选" v-model="stockCheck.requestData.stock">
                <el-option label="显示零库存" value="1"></el-option>
                <el-option label="隐藏零库存" value="2"></el-option>
              </el-select>
              <el-button @click="getStockCheckList"  type="primary">搜索</el-button>
            </div>
            <div style="margin-top: 15px;">
              <el-table  :data="stockCheck.responseData.data" border style="width: 100%;" height="675">
                <el-table-column prop="title" label="商品名称"></el-table-column>
                <el-table-column prop="bar_code" label="条形码"></el-table-column>
                <el-table-column prop="type_ids" label="一级分类"></el-table-column>
                <el-table-column prop="types" label="二级分类"></el-table-column>
                <el-table-column prop="stock" label="剩余库存"></el-table-column>
              </el-table>
            </div>
            <div class="footer" style="text-align: right;margin-top: 15px;">
              <el-pagination
                background
                layout="total, sizes, prev, pager, next, jumper"
                :page-sizes="[10, 20, 30, 40]"
                @size-change="stockCheckPageSizeChange "
                @current-change="stockCheckPageCurrentChange"
                :page-size="stockCheck.requestData.limit"
                :current-page.sync="stockCheck.requestData.page"
                :total="stockCheck.responseData.count">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="调拨单" name="1">
          <div>
            <div class="search">
<!--              <el-select  clearable placeholder="选择调入仓库" v-model="transferSlipRequestData.in_shop">-->
<!--                <el-option v-for="item in shopList" :label="item.name" :key="item.id" :value="item.id"></el-option>-->
<!--              </el-select>-->
<!--              <el-select  clearable placeholder="选择调出仓库" v-model="transferSlipRequestData.out_shop">-->
<!--                <el-option v-for="item in shopList" :label="item.name" :key="item.id" :value="item.id"></el-option>-->
<!--              </el-select>-->
              <el-select  clearable placeholder="选择状态" v-model="transferSlipRequestData.status">
                <el-option v-for="item in transferSlipPageData.status" :label="item.name" :key="item.id" :value="item.id"></el-option>
              </el-select>
              <el-select  clearable placeholder="需要查询的时间" v-model="transferSlipRequestData.time">
                <el-option v-for="item in transferSlipPageData.time" :label="item.name" :key="item.id" :value="item.id"></el-option>
              </el-select>
              <el-date-picker
                type="daterange"
                v-model="transferSlipRequestData.start_end_time"
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <el-input style="width: 300px;" v-model="transferSlipRequestData.search" placeholder="请输入需查询的订单号/商品名" clearable>
              </el-input>
              <el-button type="primary">搜索</el-button>
            </div>
            <div class="search" style="margin-top: 15px;">
              <el-button type="primary" plain>导出</el-button>
              <el-button @click="transferSlipAddDialogShow"  type="primary">新增调拨</el-button>
            </div>
          </div>
          <div style="margin-top: 15px;">
            <el-table  :data="transferSlipPageData.list" border style="width: 100%;" height="620">
              <el-table-column  label="调拨信息">
                <template slot-scope="scope">
                  <div v-html="scope.row.message">
                  </div>
                </template>
              </el-table-column>
              <el-table-column  label="商品信息">
                <template slot-scope="scope">
                  <div v-html="scope.row.item">
                  </div>
                </template>
              </el-table-column>
              <el-table-column  label="调拨数量" width="80px">
                <template slot-scope="scope">
                  <div v-html="scope.row.number">
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="发货信息">
                <template slot-scope="scope">
                  <div v-html="scope.row.out_message">
                  </div>
                </template>
              </el-table-column>
              <el-table-column  label="入库信息">
                <template slot-scope="scope">
                  <div v-html="scope.row.in_message">
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="状态" width="70px">
                <template slot-scope="scope">
                 <span v-if="scope.row.status === 1">调拨中</span>
                 <span v-if="scope.row.status === 0">待发货</span>
                 <span v-if="scope.row.status === 2">已完成</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" v-if="scope.row.status === 0 && scope.row.out_shop === userInfo.shop_id" @click="clickTransferSlipSendGoods(scope.row.id)">发货</el-button>
                  <el-button type="text" size="mini" v-if="scope.row.status === 1 && scope.row.out_shop === userInfo.shop_id" @click="clickTransferSlipSendGoodsCancel(scope.row.id)">取消发货</el-button>
                  <el-button type="text" size="mini" @click="clickTransferSlipPrinting(scope.row.id)">打印</el-button>
                  <el-button type="text" size="mini" v-if="scope.row.status === 1  && scope.row.in_shop === userInfo.shop_id" @click="clickTransferSlipConfirmGoods(scope.row.id)">确认收货</el-button>
                  <el-button type="text" size="mini" v-if="scope.row.status === 0 && scope.row.out_shop === userInfo.shop_id" @click="clickTransferSlipDel(scope.row.id)">删除</el-button>
                  <el-button type="text" size="mini" @click="clickTransferSlipDetails(scope.row.id)">详情</el-button>
                </template>
              </el-table-column>

            </el-table>
          </div>
          <div class="footer" style="text-align: right;margin-top: 15px;">
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              :page-sizes="[10, 20, 30, 40]"
              @size-change="TransferSlipPageSizeChange "
              @current-change="TransferSlipOnePageCurrentChange"
              :page-size="transferSlipRequestData.limit"
              :current-page.sync="transferSlipRequestData.page"
              :total="transferSlipPageData.count">
            </el-pagination>
          </div>
          <!-- 调拨单--新增调拨-->
          <el-dialog  :visible.sync="transferSlipPageData.addDialog.isShow" title="调拨"  width="968px" :center="true">
            <div>
              <el-select  clearable placeholder="选择调入仓库" v-model="transferSlipPageData.addDialog.responseData.allot_in">
                <el-option v-for="item in shopList" :label="item.name" :key="item.id" :value="item.id"></el-option>
              </el-select>
              <el-button @click="transferSlipPageData.chooseGoodsDialog.isShow = true"  type="primary" plain>选择商品</el-button>
            </div>
            <div style="margin-top: 15px;">
              <el-table :data="transferSlipPageData.addDialog.list" max-height="450" border style="width: 100%;">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="title" label="商品名称"></el-table-column>
                <el-table-column prop="bar_code" label="条形码"></el-table-column>
                <el-table-column prop="p_type" label="一级分类"></el-table-column>
                <el-table-column prop="cname" label="二级分类"></el-table-column>
                <el-table-column prop="stock" label="当前库存"></el-table-column>
                <el-table-column prop="price" label="单价"></el-table-column>
                <el-table-column label="调拨数量">
                  <template slot-scope="scope">
                    <el-input placehoder="请输入调拨数量" v-model="scope.row.num"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="备注">
                  <template slot-scope="scope">
                    <el-input placehoder="请输入调拨数量" v-model="scope.row.remark"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" @click="removeTransferSlipGood(scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div style="margin-top: 15px;">
              <div class="clear-both" style="height: 50px;">
                <div class="float-left">
                  <el-form  label-width="110px">
                    <el-form-item label="合计调拨数量：">
                      {{transferSlipPageData.addDialog.list.length}}
                    </el-form-item>
                  </el-form>
                </div>
                <div class="float-right">
                  <el-form  label-width="80px">
                    <el-form-item label="备注：">
                      <el-input placeholder="请输入备注信息" v-model="transferSlipPageData.addDialog.responseData.remarks"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
            <div style="text-align: center;margin-top: 15px;">
              <el-button @click="transferSlipPageData.addDialog.isShow = false"  type="primary" plain>取消</el-button>
              <el-button  type="primary" @click="addtransferSlipGoodOk" :disabled="!transferSlipPageData.addDialog.list.length">确定</el-button>
            </div>
          </el-dialog>
          <!-- 调拨单--新增调拨 选择商品-->
          <el-dialog  :visible.sync="transferSlipPageData.chooseGoodsDialog.isShow" title="选择商品" width="968px" :center="true">
            <div style="margin-bottom: 15px;">
              <el-input placeholder="请输入商品名称" style="width: 180px;" v-model="transferSlipPageData.chooseGoodsDialog.code"></el-input>
              <el-input placeholder="请输入条形码" style="width: 180px;"  v-model="transferSlipPageData.chooseGoodsDialog.name"></el-input>
              <el-select  clearable placeholder="选择一级分类" v-model="transferSlipPageData.chooseGoodsDialog.topCategoryId" @change="clickTransferSlipAddTwoCategory">
                <el-option
                  v-for="item in transferSlipPageData.chooseGoodsDialog.topCategory"
                  :label="item.cname"
                  :key="item.id"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select  clearable placeholder="选择二级分类" v-model="transferSlipPageData.chooseGoodsDialog.twoCategoryId">
                <el-option
                  v-for="item in transferSlipPageData.chooseGoodsDialog.twoCategory"
                  :label="item.cname"
                  :key="item.id"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-button @click="transferSlipPageData.chooseGoodsDialog.page = 1; clickTransferSlipSearchGoods()"  type="primary">查询</el-button>
            </div>
            <div>
              <el-table
                :data="transferSlipPageData.chooseGoodsDialog.responseData.data"
                tooltip-effect="dark"
                @selection-change="clickTransferSlipAddGoodsChange"
                border style="width: 100%;">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="bar_code" label="条形码"></el-table-column>
                <el-table-column prop="title" label="商品名称"></el-table-column>
                <el-table-column prop="p_type" label="一级分类"></el-table-column>
                <el-table-column prop="cname" label="二级分类"></el-table-column>
                <el-table-column prop="stock" label="库存"></el-table-column>
              </el-table>
            </div>
            <div  style="text-align: right;margin-top: 20px;">
              <el-pagination
                background
                layout="total, sizes, prev, pager, next, jumper"
                :page-sizes="[5, 10, 20, 30]"
                @size-change="clickTransferSlipSearchGoodsPageSizeChange"
                @current-change="clickTransferSlipSearchGoodsPageCurrentChange"
                :page-size="transferSlipPageData.chooseGoodsDialog.limit"
                :current-page.sync="transferSlipPageData.chooseGoodsDialog.page"
                :total="transferSlipPageData.chooseGoodsDialog.responseData.count">
              </el-pagination>
            </div>
            <div style="text-align: center;margin-top: 20px;">
              <el-button @click="transferSlipPageData.chooseGoodsDialog.isShow = false"  type="primary" plain>取消</el-button>
              <el-button @click="clickTransferSlipChoosesGoods"  type="primary">确定</el-button>
            </div>
          </el-dialog>
          <!-- 调拨单--发货-->
          <el-dialog  :visible.sync="transferSlipPageData.sendGoodsDialog.isShow" title="发货"  width="968px" :center="true">
            <div class="flex-space-between" style="margin-bottom: 15px;">
              <span>调拨单号：{{transferSlipPageData.sendGoodsDialog.responseData.sn}}</span>
              <span>调拨仓库：{{transferSlipPageData.sendGoodsDialog.responseData.shop_name}}</span>
              <span>调拨人员：{{transferSlipPageData.sendGoodsDialog.responseData.creator}}</span>
              <span>调拨时间：{{transferSlipPageData.sendGoodsDialog.responseData.time}}</span>
            </div>
            <div style="margin-bottom: 5px;">
              <span>备注：{{transferSlipPageData.sendGoodsDialog.responseData.remark}}</span>
            </div>
            <div>
              <el-table :data="transferSlipPageData.sendGoodsDialog.responseGoodList" border style="width: 100%;">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="item" label="商品名称"></el-table-column>
                <el-table-column prop="bar_code" label="条形码"></el-table-column>
                <el-table-column prop="num" label="发货数量"></el-table-column>
              </el-table>
            </div>
            <div style="text-align: center;margin-top: 20px;">
              <el-button @click="transferSlipPageData.sendGoodsDialog.isShow = false"  type="primary">取消</el-button>
              <el-button @click="clickTransferSlipSendGoodsOk(transferSlipPageData.sendGoodsDialog.id)" type="primary">确定发货</el-button>
            </div>
          </el-dialog>
          <!-- 调拨单--打印-->
          <el-dialog  :visible.sync="transferSlipPageData.printingDialog.isShow" title="打印" width="968px" :center="true">
            <div id="printTest">
              <div class="flex-space-between" style="margin-bottom: 15px;width: 100%;">
                <span>调拨单号：{{transferSlipPageData.printingDialog.responseData.sn}}</span>
                <span>调出仓库：{{transferSlipPageData.printingDialog.responseData.out_shop}}</span>
                <span>调入仓库：{{transferSlipPageData.printingDialog.responseData.in_shop}}</span>
                <span>调拨时间：{{transferSlipPageData.printingDialog.responseData.create_time}}</span>
              </div>
              <div style="margin-bottom: 5px;width: 100%;">
                <span>备注：{{transferSlipPageData.printingDialog.responseData.remark || '无'}}</span>
              </div>
              <div style="width: 100%;margin-bottom: 10px;">
                <el-table :data="transferSlipPageData.printingDialog.responseData.item" border :row-style="{color:'#000'}"	:header-row-style="{color:'#000'}" class="print-table">
                  <el-table-column type="index" label="序号" width="150"></el-table-column>
                  <el-table-column prop="item" label="商品名称"></el-table-column>
                  <el-table-column prop="bar_code" label="条形码"></el-table-column>
                  <el-table-column prop="num" label="发货数量"></el-table-column>
                </el-table>
              </div>
              <div class="flex-space-between" style="margin-top:20px;margin-bottom: 15px;width: 100%;">
                  <span>制单人：{{transferSlipPageData.printingDialog.responseData.worker}}</span>
                  <span>配货人：</span>
                  <span>发货人：</span>
                  <span>收货人：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </div>
            </div>
            <div  style="text-align: center;margin-top: 20px;">
              <el-button @click="transferSlipPageData.printingDialog.isShow = false"  type="primary" plain>取消</el-button>
              <el-button  type="primary" v-print="'#printTest'">打印</el-button>
            </div>
          </el-dialog>
          <!-- 调拨单--调拨详情-->
          <el-dialog  :visible.sync="transferSlipPageData.detailsDialog.isShow" title="调拨详情" width="968px" :center="true">
            <div>
              <el-steps :active="transferSlipPageData.detailsDialog.responseData.status + 1" finish-status="success" :align-center="true">
                <el-step>
                  <template slot="title" >
                    <div style="color: #303133;font-weight: 700;">调拨(<span style="color: #1A1A1A;font-weight: normal;">{{transferSlipPageData.detailsDialog.responseData.out_shop}}</span>)</div>
                  </template>
                  <template slot="description">
                    <span style="color: black;">{{transferSlipPageData.detailsDialog.responseData.creator}}</span>
                    <br>
                    <span style="color: black;">{{transferSlipPageData.detailsDialog.responseData.create_time}}</span>
                  </template>
                </el-step>
                <el-step>
                  <template slot="title" >
                    <div style="color: #303133;font-weight: 700;">发货</div>
                  </template>
                  <template slot="description" >
                    <span style="color: black;">{{transferSlipPageData.detailsDialog.responseData.out_admin_user || '发货人'}}</span>
                    <br>
                    <span style="color: black;">{{transferSlipPageData.detailsDialog.responseData.out_time}}</span>
                  </template>
                </el-step>
                <el-step title="">
                  <template slot="title">
                    <div style="color: #303133;font-weight: 700;">确认收货(<span style="color: #1A1A1A;font-weight: normal;">{{transferSlipPageData.detailsDialog.responseData.in_shop}}</span>)</div>
                  </template>
                  <template slot="description" >
                    <span class="font-red">{{transferSlipPageData.detailsDialog.responseData.in_admin_user}}</span>
                    <br>
                    <span class="font-red">{{transferSlipPageData.detailsDialog.responseData.in_time}}</span>
                  </template>
                </el-step>
              </el-steps>
            </div>
            <div style="margin-top: 30px;">
              <el-table :data="transferSlipPageData.detailsDialog.responseGoodList" max-height="400" border style="width: 100%;">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="item" label="商品名称"></el-table-column>
                <el-table-column prop="bar_code" label="条形码"></el-table-column>
                <el-table-column prop="stock" label="当前库存"></el-table-column>
                <el-table-column prop="num" label="调拨数量"></el-table-column>
              </el-table>
            </div>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="盘点单" name="2">
          <div>
            <div class="search">
<!--              <el-select  clearable placeholder="选择盘点仓库"  v-model="checkOrderRequestData.shop">-->
<!--                <el-option v-for="item in shopList" :label="item.name" :key="item.id" :value="item.id"></el-option>-->
<!--              </el-select>-->
              <el-select  clearable placeholder="选择状态" v-model="checkOrderRequestData.status">
                <el-option
                  v-for="item in checkOrderPageData.status"
                  :label="item.name"
                  :key="item.id"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-date-picker
                type="daterange"
                v-model="checkOrderRequestData.time"
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <el-input style="width: 300px;" v-model="checkOrderRequestData.name" placeholder="订单号/商品名(目前仅支持单号搜索)" clearable>
              </el-input>
              <el-button @click="getCheckOrderList" type="primary">搜索</el-button>
            </div>
            <div class="search" style="margin-top: 15px;">
              <el-button type="primary" plain>导出</el-button>
              <el-button @click="clickAddCheckOrder(1)" type="primary">新增盘点</el-button>
              <el-button @click="clickAddCheckOrder(2)" type="primary" plain>部分盘点</el-button>
            </div>
          </div>
          <div  style="margin-top: 15px;">
            <el-table :data="checkOrderPageData.list"  border style="width: 100%;" height="620">
              <el-table-column prop="order_sn" label="订单号"></el-table-column>
              <el-table-column prop="shop_id" label="盘点仓库"></el-table-column>
              <el-table-column prop="user_id" label="盘点人员"></el-table-column>
              <el-table-column prop="stime" label="盘点时间"></el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" v-if="scope.row.status === '盘点待确认'" size="mini" @click="clickCheckOrderConfirm(scope.row.id)">确认盘点</el-button>
                  <el-button type="text" v-if="scope.row.status === '盘点待确认'" size="mini" @click="clickCheckOrderEdit(scope.row.id)">编辑</el-button>
                  <el-button type="text" size="mini" @click="clickCheckOrderDetails(scope.row.id)">详情</el-button>
                  <el-button type="text" v-if="scope.row.status === '盘点待确认'" size="mini" @click="clickCheckOrderDel(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="footer" style="text-align: right;margin-top: 15px;">
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="checkOrderPageSizeChange"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="checkOrderRequestData.limit"
              @current-change="checkOrderOnePageCurrentChange"
              :current-page.sync="checkOrderRequestData.page"
              :total="checkOrderPageData.count">
            </el-pagination>
          </div>
          <!-- 盘点单--新增盘点-->
          <el-dialog :visible.sync="checkOrderPageData.addDialog.isShow"  title="新增盘点"  width="968px" :center="true">
            <div style="margin-bottom: 15px;">
              <el-button  @click="checkOrderPageData.addDialog.list = []"  type="danger" plain>全部删除</el-button>
              <el-button  @click="checkOrderPageData.addGoodsDialog.isShow = true"  type="primary" plain>新增商品</el-button>
              <el-button  @click="addCheckOrderDialongLoadMoreGoods" type="primary" plain :disabled="checkOrderPageData.addDialog.is_enable"
                v-if="!checkOrderPageData.addDialog.isShow2">加载下一批商品</el-button>
            </div>
            <div>
              <el-table :data="checkOrderPageData.addDialog.list" border style="width: 100%;" height="400px">
                <el-table-column type="index" label="序号" width="80"></el-table-column>
                <el-table-column prop="item_title" label="商品名称"></el-table-column>
                <el-table-column prop="bar_code" label="条形码"></el-table-column>
                <el-table-column prop="top_category" label="一级分类"></el-table-column>
                <el-table-column prop="two_category" label="二级分类"></el-table-column>
                <el-table-column prop="stock_reality" label="当前库存"></el-table-column>
                <el-table-column label="盘点库存">
                  <template slot-scope="scope">
                    <el-input placehoder="请输入盘点库存" v-model="scope.row.stock_now"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" @click="clickAddCheckOrderDialogDelGoods(scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div style="margin-top: 15px;">
              <el-form>
                <el-form-item label="备注：" label-width="55px">
                  <el-input placeholder="请输入备注信息" v-model="checkOrderPageData.addDialog.remarks"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div style="text-align: center;">
              <el-button @click="checkOrderPageData.addDialog.isShow = false"  type="primary" plain>取消</el-button>
              <el-button @click="clickAddCheckOrderDialogOk"  type="primary">确定</el-button>
            </div>
          </el-dialog>
          <!-- 盘点单-- 新增商品-->
          <el-dialog  title="选择商品" :visible.sync="checkOrderPageData.addGoodsDialog.isShow" width="968px" :center="true">
<!--            <div style="margin-bottom: 15px;">-->
<!--              <el-radio-group v-model="checkOrderPageData.addGoodsDialog.stock_type">-->
<!--                <el-radio :label="2">只看未盘点商品</el-radio>-->
<!--                <el-radio :label="1">全部</el-radio>-->
<!--              </el-radio-group>-->
<!--            </div>-->
            <div style="margin-bottom: 15px;">
              <el-input placeholder="商品名称/条形码" v-model="checkOrderPageData.addGoodsDialog.title" @keyup.enter.native="getCheckOrderGoodList" style="width: 180px;"></el-input>
              <el-select  clearable placeholder="选择一级分类" v-model="checkOrderPageData.addGoodsDialog.topCategoryId" @change="clickAddCheckOrderTwoCategory">
                <el-option
                  v-for="item in checkOrderPageData.addGoodsDialog.topCategory"
                  :label="item.cname"
                  :key="item.id"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select  clearable placeholder="选择二级分类" v-model="checkOrderPageData.addGoodsDialog.twoCategoryId">
                <el-option
                  v-for="item in checkOrderPageData.addGoodsDialog.twoCategory"
                  :label="item.cname"
                  :key="item.id"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-button @click="getCheckOrderGoodList"  type="primary">查询</el-button>
            </div>
            <div>
              <el-table :data="checkOrderPageData.addGoodsDialog.list"
                        tooltip-effect="dark"
                        @selection-change="clickAddGoodsDialogHandleSelectionChange"
                        height="460"
                        border style="width: 100%;">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="title" label="商品名称"></el-table-column>
                <el-table-column prop="bar_code" label="条形码"></el-table-column>
                <el-table-column prop="type_ids" label="一级分类"></el-table-column>
                <el-table-column prop="types" label="二级分类"></el-table-column>
                <el-table-column prop="stock" label="库存"></el-table-column>
              </el-table>
            </div>
            <div style="text-align: right;margin-top: 15px;">
              <el-pagination
                background
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="getCheckOrderGoodListPageSizeChange"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="checkOrderPageData.addGoodsDialog.limit"
                @current-change="getCheckOrderGoodListOnePageCurrentChange"
                :current-page.sync="checkOrderPageData.addGoodsDialog.page"
                :total="checkOrderPageData.addGoodsDialog.count">
              </el-pagination>
            </div>
            <div style="text-align: center;margin-top: 20px;">
              <el-button @click="checkOrderPageData.addGoodsDialog.isShow = false" type="primary" plain>取消</el-button>
              <el-button @click="clickAddGoodsDialogOk" type="primary">确定</el-button>
            </div>
          </el-dialog>
          <!-- 盘点单--确认盘点-->
          <el-dialog :visible.sync="checkOrderPageData.confirmDialog.isShow"  title="确认盘点"  width="968px" :center="true">
            <div>
              <el-table :data="checkOrderPageData.confirmDialog.data.item" border style="width: 100%;">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="title" label="商品名称"></el-table-column>
                <el-table-column prop="type" label="一级分类"></el-table-column>
                <el-table-column prop="type_id" label="二级分类"></el-table-column>
                <el-table-column prop="stock_reality" label="当前库存"></el-table-column>
                <el-table-column label="盘点库存">
                  <template slot-scope="scope">
                    <span class="font-red" v-if="scope.row.stock_now<scope.row.stock_reality">{{scope.row.stock_now}}</span>
                    <span v-if="scope.row.stock_now===scope.row.stock_reality">{{scope.row.stock_now}}</span>
                    <span class="font-blue" v-if="scope.row.stock_now>scope.row.stock_reality">{{scope.row.stock_now}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div style="margin-top: 15px;">
              <el-form>
                <el-form-item label="备注：" label-width="55px">
                  <el-input  v-model="checkOrderPageData.confirmDialog.data.remarks"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div style="text-align: center;">
              <el-button @click="checkOrderPageData.confirmDialog.isShow = false" type="primary" plain>取消</el-button>
              <el-button @click="clickCheckOrderConfirmOk"  type="primary">确认盘点</el-button>
            </div>
          </el-dialog>
          <!-- 盘点单--详情-->
          <el-dialog :visible.sync="checkOrderPageData.detailsDialog.isShow"  title="盘点详情"  width="968px" :center="true">
            <div>
              <el-table :data="checkOrderPageData.detailsDialog.list" border style="width: 100%;" height="400px">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="title" label="商品名称"></el-table-column>
                <el-table-column prop="type" label="一级分类"></el-table-column>
                <el-table-column prop="type_id" label="二级分类"></el-table-column>
                <el-table-column prop="stock_reality" label="当前库存"></el-table-column>
                <el-table-column label="盘点库存">
                  <template slot-scope="scope">
                    <span class="font-red" v-if="scope.row.stock_now<scope.row.stock_reality">{{scope.row.stock_now}}</span>
                    <span v-if="scope.row.stock_now===scope.row.stock_reality">{{scope.row.stock_now}}</span>
                    <span class="font-blue" v-if="scope.row.stock_now>scope.row.stock_reality">{{scope.row.stock_now}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div style="margin-top: 15px;">
              <el-form>
                <el-form-item label="备注：" label-width="55px">
                  <el-input placeholder="无"  :disabled="true" v-model="checkOrderPageData.detailsDialog.remarks"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-dialog>
          <!-- 盘点单--编辑-->
          <el-dialog :visible.sync="checkOrderPageData.editDialog.isShow"  title="编辑盘点单"  width="968px" :center="true">
            <div style="margin-bottom: 15px;">
              <el-button  @click="checkOrderPageData.addGoodsDialog.isShow2 = true"  type="primary" plain>新增商品</el-button>
            </div>
            <div>
              <el-table :data="checkOrderPageData.editDialog.responseData.item" border style="width: 100%;"  height="400px">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="title" label="商品名称"></el-table-column>
                <el-table-column prop="type_id" label="一级分类"></el-table-column>
                <el-table-column prop="type" label="二级分类"></el-table-column>
                <el-table-column prop="stock_reality" label="当前库存"></el-table-column>
                <el-table-column label="盘点库存">
                  <template slot-scope="scope">
<!--                    <span class="font-red" v-if="scope.row.stock_now<scope.row.stock_reality">{{scope.row.stock_now}}</span>-->
<!--                    <span v-if="scope.row.stock_now===scope.row.stock_reality">{{scope.row.stock_now}}</span>-->
<!--                    <span class="font-blue" v-if="scope.row.stock_now>scope.row.stock_reality">{{scope.row.stock_now}}</span>-->
                    <el-input placehoder="请输入盘点库存" v-model="scope.row.stock_now"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" @click="clickCheckOrderDelGoods(scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div style="margin-top: 15px;">
              <el-form>
                <el-form-item label="备注：" label-width="55px">
                  <el-input placeholder="无"  v-model="checkOrderPageData.editDialog.responseData.remarks"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div style="text-align: center;">
              <el-button @click="checkOrderPageData.editDialog.isShow = false" type="primary" plain>取消</el-button>
              <el-button @click="clickCheckOrderEditOk" type="primary">确定编辑</el-button>
            </div>
          </el-dialog>
          <!-- 盘点单-- 编辑盘点-新增商品-->
          <el-dialog  title="选择商品" :visible.sync="checkOrderPageData.addGoodsDialog.isShow2" width="968px" :center="true">
            <div style="margin-bottom: 15px;">
              <el-input placeholder="商品名称/条形码" v-model="checkOrderPageData.addGoodsDialog.title" @keyup.enter.native="getCheckOrderGoodList" style="width: 180px;"></el-input>
              <el-select  clearable placeholder="选择一级分类" v-model="checkOrderPageData.addGoodsDialog.topCategoryId" @change="clickAddCheckOrderTwoCategory">
                <el-option
                  v-for="item in checkOrderPageData.addGoodsDialog.topCategory"
                  :label="item.cname"
                  :key="item.id"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select  clearable placeholder="选择二级分类" v-model="checkOrderPageData.addGoodsDialog.twoCategoryId">
                <el-option
                  v-for="item in checkOrderPageData.addGoodsDialog.twoCategory"
                  :label="item.cname"
                  :key="item.id"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-button @click="getCheckOrderGoodList"  type="primary">查询</el-button>
            </div>
            <div>
              <el-table :data="checkOrderPageData.addGoodsDialog.list"
                        tooltip-effect="dark"
                        @selection-change="clickAddGoodsDialogHandleSelectionChange"
                        height="460"
                        border style="width: 100%;">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="title" label="商品名称"></el-table-column>
                <el-table-column prop="bar_code" label="条形码"></el-table-column>
                <el-table-column prop="type_ids" label="一级分类"></el-table-column>
                <el-table-column prop="types" label="二级分类"></el-table-column>
                <el-table-column prop="stock" label="库存"></el-table-column>
              </el-table>
            </div>
            <div style="text-align: right;margin-top: 15px;">
              <el-pagination
                background
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="getCheckOrderGoodListPageSizeChange"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="checkOrderPageData.addGoodsDialog.limit"
                @current-change="getCheckOrderGoodListOnePageCurrentChange"
                :current-page.sync="checkOrderPageData.addGoodsDialog.page"
                :total="checkOrderPageData.addGoodsDialog.count">
              </el-pagination>
            </div>
            <div style="text-align: center;margin-top: 20px;">
              <el-button @click="checkOrderPageData.addGoodsDialog.isShow2 = false" type="primary" plain>取消</el-button>
              <el-button @click="clickCheckOrderEditChooseGoodsOk" type="primary">确定</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="盘亏单" name="3">
          <div>
            <div class="search">
<!--              <el-select  clearable placeholder="选择盘点仓库"  v-model="checkLossOrderRequestData.shop">-->
<!--                <el-option v-for="item in shopList" :label="item.name" :key="item.id" :value="item.id"></el-option>-->
<!--              </el-select>-->
              <el-select  clearable placeholder="选择状态" v-model="checkLossOrderRequestData.status">
                <el-option v-for="item in checkLossOrderPageData.status" :label="item.name" :key="item.id" :value="item.id"></el-option>
              </el-select>
              <el-date-picker
                v-model="checkLossOrderRequestData.time"
                type="daterange"
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <el-input v-model="checkLossOrderRequestData.name" style="width: 300px;" placeholder="请输入需查询的订单号/商品名" clearable>
              </el-input>
              <el-button @click="searchCheckLossOrder"  type="primary">搜索</el-button>
            </div>
            <div class="search" style="margin-top: 15px;">
              <el-button  type="primary" plain>导出</el-button>
            </div>
          </div>
          <div style="margin-top: 15px;">
            <el-table :data="checkLossOrderPageData.list" border style="width: 100%;" height="620">
              <el-table-column prop="order_sn" label="订单号"></el-table-column>
              <el-table-column prop="shop_id" label="盘点仓库"></el-table-column>
              <el-table-column prop="creator_id" label="盘点人员"></el-table-column>
              <el-table-column prop="time" label="盘点时间"></el-table-column>
              <el-table-column  prop="status" label="状态"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text"  size="mini" @click="checkLossOrderDetails(scope.row.id)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="footer" style="text-align: right;margin-top: 15px;">
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="checkLossOrderPageSizeChange"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="checkLossOrderRequestData.limit"
              @current-change="checkLossOrderOnePageCurrentChange"
              :current-page.sync="checkLossOrderRequestData.page"
              :total="checkLossOrderPageData.count">
            </el-pagination>
          </div>
          <!-- 盘亏单--详情-->
          <el-dialog  title="盘亏单详情" :visible.sync="checkLossOrderPageData.detailsDialog.isShow"   width="968px" :center="true">
            <div>
              <el-table :data="checkLossOrderPageData.detailsDialog.responseData.item" border style="width: 100%;">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="title" label="商品名称"></el-table-column>
                <el-table-column prop="type_id" label="一级分类"></el-table-column>
                <el-table-column prop="type" label="二级分类"></el-table-column>
                <el-table-column prop="stock" label="当前库存"></el-table-column>
                <el-table-column prop="pay_all_price" label="盘点库存">
                  <template slot-scope="scope">
                    <span class="font-red" v-if="scope.row.stock>scope.row.num">{{scope.row.num}}</span>
                    <span v-if="scope.row.stock===scope.row.num">{{scope.row.num}}</span>
                    <span class="font-blue" v-if="scope.row.stock<scope.row.num">{{scope.row.num}}</span>
                  </template>
                </el-table-column>
                <el-table-column porp="remarks" label="备注"></el-table-column>
              </el-table>
            </div>
            <div style="margin-top: 15px;">
              <el-form>
                <el-form-item label="备注：" label-width="55px">
                  <el-input :disabled="true" placeholder="无" v-model="checkLossOrderPageData.detailsDialog.responseData.remarks"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="盘盈单" name="4">
          <div>
            <div class="search">
<!--              <el-select  clearable placeholder="选择盘点仓库"  v-model="checkWinOrderRequestData.shop">-->
<!--                <el-option v-for="item in shopList" :label="item.name" :key="item.id" :value="item.id"></el-option>-->
<!--              </el-select>-->
              <el-select  clearable placeholder="选择状态" v-model="checkWinOrderRequestData.status">
                <el-option v-for="item in checkWinOrderPageData.status" :label="item.name" :key="item.id" :value="item.id"></el-option>
              </el-select>
              <el-date-picker
                type="daterange"
                v-model="checkWinOrderRequestData.time"
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <el-input style="width: 300px;" placeholder="请输入需查询的订单号/商品名" clearable v-model="checkWinOrderRequestData.name"></el-input>
              <el-button @click="searchCheckWinOrder"  type="primary">搜索</el-button>
            </div>
            <div class="search" style="margin-top: 15px;">
              <el-button type="primary" plain>导出</el-button>
            </div>
          </div>
          <div style="margin-top: 15px">
            <el-table :data="checkWinOrderPageData.list" border style="width: 100%;" height="620">
              <el-table-column prop="order_sn" label="订单号"></el-table-column>
              <el-table-column prop="shop_id" label="盘点仓库"></el-table-column>
              <el-table-column prop="creator_id" label="盘点人员"></el-table-column>
              <el-table-column prop="time" label="盘点时间"></el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text"  size="mini" @click="checkWinOrderDetails(scope.row.id)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="footer" style="text-align: right;margin-top: 15px;">
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="checkWinOrderPageSizeChange"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="checkWinOrderRequestData.limit"
              @current-change="checkWinOrderOnePageCurrentChange"
              :current-page.sync="checkWinOrderRequestData.page"
              :total="checkWinOrderPageData.count">
            </el-pagination>
          </div>
          <!-- 盘盈单--详情-->
          <el-dialog  title="盘盈单详情" :visible.sync="checkWinOrderPageData.detailsDialog.isShow"   width="968px" :center="true">
            <div>
              <el-table :data="checkWinOrderPageData.detailsDialog.responseData.item" border style="width: 100%;">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="title" label="商品名称"></el-table-column>
                <el-table-column prop="type_id" label="一级分类"></el-table-column>
                <el-table-column prop="type" label="二级分类"></el-table-column>
                <el-table-column prop="stock" label="当前库存"></el-table-column>
                <el-table-column prop="pay_all_price" label="盘点库存">
                  <template slot-scope="scope">
                    <span class="font-red" v-if="scope.row.stock>scope.row.num">{{scope.row.num}}</span>
                    <span  v-if="scope.row.stock===scope.row.num">{{scope.row.num}}</span>
                    <span class="font-blue" v-if="scope.row.stock<scope.row.num">{{scope.row.num}}</span>
                  </template>
                </el-table-column>
                <el-table-column porp="remarks" label="备注"></el-table-column>
              </el-table>
            </div>
            <div style="margin-top: 15px;">
              <el-form>
                <el-form-item label="备注：" label-width="55px">
                  <el-input :disabled="true" placeholder="无" v-model="checkWinOrderPageData.detailsDialog.responseData.remarks"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { postCheckStockGoodsList, postTransferSlipGetGoodList, postTransferSlipConfirmGoods, postTransferSlipSendGoodsGetInfo, postTransferSlipSendGoodsGetGoodList, postTransferSlipGoodsDetails, postTransferSlipDetails, postTransferSlipSendGoods, postTransferSlipSendGoodsCancel, postTransferSlipDel, postTransferSlipAdd, postShopList, postTransferSlipList, postCheckOrderList, postTwotype, postCheckOrderAddGoodList, postCheckOrderAdd, postCheckOrderInfo, postCheckOrderDel, postCheckOrderConfirm, postCheckOrderEdit, postCheckLossOrWinOrderList, postCheckLossOrWinOrderDetails, postTransferSlipPrint,
  postCheckOrderAddGoodList2,
} from '../../api/getData'
export default {
  name: 'InventoryManage', // 库存管理，进销存
  data () {
    return {
      type: '0', // 0=库存查询 1=调拨单，2=盘点单，3=盘亏单，4=盘盈单
      // 调出 或调出 仓库
      shopList: [
        // {id: 0, name: '总店'},
        // {id: 1, name: '江与城'},
        // {id: 2, name: '已完成'}
      ],
      // 0=库存查询
      stockCheck:{
        topCategory:[

        ],
        twoCategory:[

        ],
        requestData:{
          page:1,
          limit:20,
          type_id:'',
          type:'',
          title:'',
          stock:'',
        },
        responseData:{
          count:0,
          data:[
            {
              id: 1752, //商品id
              title: "商品新增hhh",//商品名称
              type_id: "26",    //一级分类名称
              type: "测试分类11",   //二级分类名称
              bar_code: "123123",   //商品条形码
              shop_id: 60,  //门店id（暂时无用）
              stock: 20 //剩余库存
            },
          ]
        }
      },

      // 1=调拨单
      transferSlipPageData: {
        status: [
          {id: 0, name: '待发货'},
          {id: 1, name: '调拨中'},
          {id: 2, name: '已完成'}
        ],
        time: [
          {id: 'create_time', name: '调拨时间'},
          {id: 'out_time', name: '发货时间'},
          {id: 'in_time', name: '入库时间'}
        ],
        // 数据总数
        count: 0,
        list: [
          // {
          //   message: "\r\n    \t\t<p>订单号：DB2019072300003</p>\r\n    \t\t<p>调拨人员：堕落嚣张</p>\r\n    \t\t<p>调出仓库：留云路店</p>\r\n    \t\t<p>调拨时间：2019-07-23 15:47:23</p>\t\r\n    \t\t",
          //   out_message: "\r\n    \t\t<p>发货人员：堕落嚣张</p>\r\n    \t\t<p>发货时间：2019-07-23 15:47:29</p>\r\n    \t\t",
          //   in_message: "未入库",
          //   item: "<p>港版美素佳儿1段  1罐装</p>",
          //   number: "<p>1</p>",
          //   status: 1,
          //   id: 3
          // }
        ],
        // 新增调拨单弹框
        addDialog: {
          isShow: false,
          responseData: {
            allot_in: '', // 调入仓库id
            count: 1, // 调拨商品总数
            bar_code: ['', 'fdadsfad'], // 调拨商品的条形码s
            item_id: [1, 2], // 调拨商品ids
            item_name: ['fasdfadf', 'dfadsfas'], // 调拨商品名s
            purchase_number: [1, 2], // 调拨数量s
            remark: ['备注1', '备注2'], // 调拨商品的描述s
            remarks: '', // 调拨单描述
            worker_id: ''// 调拨人id//数据来源vuex
          },
          list: [
            // {
            //   id: 1738,     //商品id
            //   title: "测试商品7/18",    //商品名称
            //   type_id: "玩具童车",  //一级分类名称
            //   type: "拼插积木", //二级分类名称
            //   selling_price: "11000.00",    //销售价格
            //   stock: 8,  //当前库存,
            //   num:'',//调拨数量
            //   remark:'',//备注
            // }
          ]
        },
        // 选择商品弹框
        chooseGoodsDialog: {
          isShow: false,
          name: '',
          code: '',
          multipleSelection: [],
          responseData:{
            code: 0,
            count: 0,
            data: [
              // {
              //   bar_code: "26",
              //   cname: "米粉",
              //   id: 1746,
              //   p_type: "营养辅食",
              //   pid: 36,
              //   price: "0.00",
              //   status: 1,
              //   stock: 21,
              //   title: "测试前端",
              //   type: 97
              // }
            ],
          },
          // 一级分类
          topCategoryId: '', // 当前选中的一级分类,用来获取二级分类
          topCategory: [
            // {cname:'奶粉',id:1,pid:0}
          ],
          // 二级分类
          twoCategoryId: '',
          twoCategory: [
            // {cname:'奶粉',id:1,pid:0}
          ],
          page:1,
          limit:5,
        },
        // 发货弹框
        sendGoodsDialog: {
          isShow: false,
          id: 0, // 需要发货的调拨单id
          // 调拨单信息
          responseData: {
            // sn: "DB2019072300001",
            // shop_name: "留云路店",
            // creator: "堕落嚣张",
            // time: "2019-07-23 15:38:57",
            // remark: "",
            // id: 1
          },
          // 发货商品列表
          responseGoodList: [
            {
              // item_id: 27,
              // item: "港版美素佳儿1段  1罐装",
              // num: 1,
              // bar_code: "暂无条形码",
              // stock: 0
            }
          ]
        },
        // 打印
        printingDialog: {
          isShow: false,
          responseData: {
            create_time: "",
            id: 25,
            in_shop: "",
            item: [],
            out_shop: "",
            remark: "",
            sn: "",
            worker: "",
          },
        },
        // 调拨详情
        detailsDialog: {
          isShow: false,
          responseData: {
            // amount: null,
            // create_time: "2019-07-25 14:45:26",
            // creator: "公司帐户",
            // creator_id: 177,
            // del: "1",
            // id: 14,
            // in_admin_id: 0,
            // in_admin_user: "到期时间",
            // in_shop: "测试门店10",
            // in_time: "2019-07-26 14:45:40",
            // number: 1,
            // out_admin_id: null,
            // out_admin_user: null,
            // out_shop: "测试WY",
            // out_time: "2019-07-25 14:45:40",
            // remark: "发斯蒂芬",
            // sn: "DB2019072500004",
            // status: 1,
            // type: 1,
            // union_code: null,
          },
          responseGoodList: [
            {
              // item_id: 27,
              // item: "港版美素佳儿1段  1罐装",
              // num: 1,
              // bar_code: "暂无条形码",
              // stock: 0
            }
          ]
        }
      },
      transferSlipRequestData: {
        out_shop: '',
        in_shop: '',
        page: 1,
        limit: 10,
        time: '',
        search: '',
        status: '',
        start_end_time: null
      },

      // 2=盘点单 页面需要的参数
      checkOrderPageData: {
        // 状态：1盘点待确定,2库存待确认(已确认盘点单),3已完成
        status: [
          {id: 1, name: '盘点待确定'},
          {id: 2, name: '库存待确认(已确认盘点单)'},
          {id: 3, name: '已完成'}
        ],
        // 盘点单列表总数
        count: 0,
        // 盘点单请求列表
        list: [
          // {
          //   id: 1, // 查看详情时的id
          //   order_sn: '123132132', // 盘点单号
          //   status: '盘点待确认', // 状态
          //   shop_id: '总店', // 门店
          //   stime: '2019-08-19 10:37:23', // 盘点时间
          //   user_id: 'admin' // 盘点人员
          // }
        ],
        // 新增盘点单弹框
        addDialog: {
          isShow: false,

          //2=盘点单  新增部分盘点
          isShow2: false,

          list: [
            // {
            //   item_id: 1768,    //商品id
            //   item_title: "\u5546\u54c1",   //商品名称
            //   top_category:'一级分类', //一级分类
            //   two_category:'二级分类',//二级分类
            //   stock_reality:5,  //当前库存
            //   stock_now:0,//盘点库存
            // }
          ],
          page:1,//分页
          limit:20,//每页显示的条数
          is_enable: false,//加载下一批商品
          // 备注
          remarks: ''
        },
        // 新增商品弹框
        addGoodsDialog: {
          //新增盘点，新增商品弹框是否显示
          isShow: false,
          //编辑盘点，新增商品弹框是否显示
          isShow2: false,
          // 一级分类
          topCategoryId: '', // 当前选中的一级分类,用来获取二级分类
          topCategory: [
            // {cname:'奶粉',id:1,pid:0}
          ],
          // 二级分类
          twoCategoryId: '',
          twoCategory: [
            // {cname:'奶粉',id:1,pid:0}
          ],
          title: '', // 商品名称
          stock_type: 1, // 获取商品的类型：1获取库存不为0的列表,2获取库存为0的列表
          page:1, // 分页
          limit:20,// 每页显示的条数
          count:0,//数据总数
          multipleSelection: [],
          list: [
            // {
            //   id: 1738,     //商品id
            //   title: "测试商品7/18",    //商品名称
            //   type_id: "玩具童车",  //一级分类名称
            //   type: "拼插积木", //二级分类名称
            //   selling_price: "11000.00",    //销售价格
            //   stock: 8  //当前库存
            // }
          ]
        },
        // 盘点详情
        detailsDialog: {
          isShow: false,
          remarks: '',
          list: [
            // {
            //   id: 1768,    //商品id
            //   title: "\u5546\u54c1",   //商品名称
            //   type:'一级分类', //一级分类
            //   type_id:'二级分类',//二级分类
            //   stock_reality:5,  //当前库存
            //   stock_now:0,//盘点库存
            // }
          ]
        },
        // 编辑盘点单
        editDialog: {
          isShow: false,
          responseData: {
            remarks: '',
            item: [
              // {
              //   id: 1768, // 商品id
              //   title: '\u5546\u54c1', // 商品名称
              //   type: '一级分类', // 一级分类
              //   type_id: '二级分类', // 二级分类
              //   stock_reality: 5, // 当前库存
              //   stock_now: 0// 盘点库存
              // }
            ]
          }
        },
        // 确认盘点弹框
        confirmDialog:{
          isShow: false,
          data:{
            id: 63,
            item: [],
            remarks: null,
          }
        }
      },
      // 2=盘点单请求需要的数据
      checkOrderRequestData: {
        shop: '', // 盘点仓库
        status: '', // 状态：1盘点待确定,2库存待确认(已确认盘点单),3已完成
        name: '', // 盘点单单号(目前仅支持单号搜索)
        page: 1, // 页码
        limit: 10, // 每页条数
        time: null// 开始时间结束时间
      },

      // 3=盘亏单 页面需要的参数
      checkLossOrderPageData: {
        status: [
          {id: 1, name: '待确认'},
          {id: 2, name: '已确认(确认库存)'}
        ],
        // 盘亏单数据总数
        count: 0,
        list: [
          // {
          //   id: 1,
          //   order_sn: '123456789', // 订单号
          //   creator_id: 1,
          //   status: '待确认', // 状态
          //   shop_id: '总店', // 门店
          //   time: '2019-07-15 16:03:20', // 时间
          //   creator_id: 'admin' // 盘点人
          // }
        ],
        detailsDialog: {
          isShow: false,
          responseData: {
            id: 1, // 盘亏盘盈单的id
            remarks: '留言', // 整个单据的备注
            item: [
              // {
              //   id: 1,    //单据的商品列表的id
              //   stock: 10,    //当前库存
              //   num: 11,  //盘点库存
              //   remarks: "盘盈",  //每条商品的留言
              //   title: "测试商品7/18",    //商品名称
              //   type_id: "玩具童车",  //一级分类名称
              //   type: "拼插积木"  //二级分类名称
              // }
            ]
          }
        }
      },
      checkLossOrderRequestData: {
        shop: '',
        status: '',
        time: null,
        page: 1,
        limit: 10,
        name: '',
        type: 2
      },

      // 4=盘盈单 页面需要的参数
      checkWinOrderPageData: {
        status: [
          {id: 1, name: '待确认'},
          {id: 2, name: '已确认(确认库存)'}
        ],
        count: 0,
        list: [
          // {
          //   id: 1,
          //   order_sn: '123456789', // 订单号
          //   creator_id: 1,
          //   status: '待确认', // 状态
          //   shop_id: '总店', // 门店
          //   time: '2019-07-15 16:03:20', // 时间
          //   creator_id: 'admin' // 盘点人
          // }
        ],
        detailsDialog: {
          isShow: false,
          responseData: {
            id: 1, // 盘亏盘盈单的id
            remarks: '留言', // 整个单据的备注
            item: [
              // {
              //   id: 1,    //单据的商品列表的id
              //   stock: 10,    //当前库存
              //   num: 11,  //盘点库存
              //   remarks: "盘盈",  //每条商品的留言
              //   title: "测试商品7/18",    //商品名称
              //   type_id: "玩具童车",  //一级分类名称
              //   type: "拼插积木"  //二级分类名称
              // }
            ]
          }
        }
      },
      checkWinOrderRequestData: {
        shop: '',
        status: '',
        time: null,
        page: 1,
        limit: 10,
        name: '',
        type: 1
      }
    }
  },
  mounted () {
    postTwotype().then(res => {
      if (res.data.length) {
        this.stockCheck.topCategory = res.data
      }
    })
    this.getShopList()
    this.getStockCheckList()
  },
  methods: {
    // tab切换
    handleClick (tab, event) {
      // 1=调拨单，2=盘点单，3=盘亏单，4=盘盈单
      switch (tab.name) {
        case '0':
          this.stockCheck.requestData.page = 1
          this.getStockCheckList()
          break
        case '1':
          this.getTransferSlipList()
          break
        case '2':
          this.checkOrderRequestData.page = 1
          this.getCheckOrderList()
          break
        case '3':
          this.checkLossOrderRequestData.page = 1
          this.getCheckLossOrWinOrderList(2)
          break
        case '4':
          this.checkWinOrderRequestData.page = 1
          this.getCheckLossOrWinOrderList(1)
          break
      }
    },

    //库存查询
    getStockCheckList(){
      let data = {
        type_id:this.stockCheck.requestData.type_id,
        type:this.stockCheck.requestData.type,
        title:this.stockCheck.requestData.title,
        page:`${this.stockCheck.requestData.page},${this.stockCheck.requestData.limit}`,
        stock:this.stockCheck.requestData.stock,
      }
      postCheckStockGoodsList(data).then(res => {
        this.stockCheck.responseData = res
      })
    },
    // 库存查询 页码操作
    stockCheckPageCurrentChange (val) {
      this.stockCheck.requestData.page = val
      this.getStockCheckList()
    },
    //库存查询，每页数据条数操作
    stockCheckPageSizeChange (val) {
      this.stockCheck.requestData.limit = val
      this.getStockCheckList()
    },
    // 库存查询 获取二级分类列表
    stockCheckTwoCategory () {
      this.stockCheck.requestData.type = ''
      this.stockCheck.twoCategory = []
      if (!this.stockCheck.requestData.type_id) {
        // 没有选择一级分类
        return
      }
      let data = {
        type: this.stockCheck.requestData.type_id
      }
      postTwotype(data).then(res => {
        if (res.data.length) {
          this.stockCheck.twoCategory = res.data
        }
      })
    },

    //调拨单打印
    async clickTransferSlipPrinting(id){
      await postTransferSlipPrint({id}).then(res => {
        if (res.code === "200") {
          this.transferSlipPageData.printingDialog.responseData = res.data
          this.transferSlipPageData.printingDialog.isShow = true
        }
      })
    },
    // 调拨单获取列表
    getTransferSlipList () {
      let data = {
        page: this.transferSlipRequestData.page,
        limit: this.transferSlipRequestData.limit,
        status: this.transferSlipRequestData.status,
        search: this.transferSlipRequestData.search,
        out_shop: this.transferSlipRequestData.out_shop,
        in_shop: this.transferSlipRequestData.out_shop,
        time: this.transferSlipRequestData.time,
        start_time: this.transferSlipRequestData.start_end_time ? this.transferSlipRequestData.start_end_time[0] : '',
        end_time: this.transferSlipRequestData.start_end_time ? this.transferSlipRequestData.start_end_time[1] : ''
      }
      postTransferSlipList(data).then(res => {
        this.transferSlipPageData.count = res.count
        this.transferSlipPageData.list = res.data ? res.data : []
      })
    },
    // 调拨单 页码操作
    TransferSlipOnePageCurrentChange (val) {
      this.transferSlipRequestData.page = val
      this.getTransferSlipList()
    },
    // 调拨单，每页数据条数操作
    TransferSlipPageSizeChange (val) {
      this.transferSlipRequestData.limit = val
      this.getTransferSlipList()
    },
    // 删除调拨单
    clickTransferSlipDel (id) {
      this.$confirm('您确认删除本条调拨信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postTransferSlipDel({id: id}).then(res => {
          if (res.code === '200') {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            setTimeout(() => {this.getTransferSlipList()}, 1000)
          }
        })
      }).catch(() => {
      })
    },
    // 调拨单取消发货操作
    clickTransferSlipSendGoodsCancel (id) {
      this.$confirm('您确认取消发货操作吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postTransferSlipSendGoodsCancel({id, worker_id:this.userInfo.id}).then(res => {
          if (res.code === '200') {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            setTimeout(() => {this.getTransferSlipList()}, 1000)
          }
        })
      }).catch(() => {
      })
    },
    // 调拨单发货弹框展示操作
    async clickTransferSlipSendGoods (id) {
      this.transferSlipPageData.sendGoodsDialog.id = id
      await postTransferSlipSendGoodsGetGoodList({id}).then(res => {
        this.transferSlipPageData.sendGoodsDialog.responseGoodList = res.data
      })
      await postTransferSlipSendGoodsGetInfo({id}).then(res => {
        this.transferSlipPageData.sendGoodsDialog.responseData = res.data
      })
      this.transferSlipPageData.sendGoodsDialog.isShow = true
    },
    // 调拨单确认发货
    clickTransferSlipSendGoodsOk (id) {
      this.$confirm('您确认进行发货操作吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postTransferSlipSendGoods({id, worker_id:this.userInfo.id}).then(res => {
          this.transferSlipPageData.sendGoodsDialog.isShow = false
          if (res.code === '200') {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            setTimeout(() => {this.getTransferSlipList()}, 1000)
          }
        })
      }).catch(() => {
      })
    },
    // 调拨单详情
    async clickTransferSlipDetails (id) {
      await postTransferSlipDetails({id}).then(res => {
        this.transferSlipPageData.detailsDialog.responseData = res.data
      })
      await postTransferSlipGoodsDetails({id}).then(res => {
        this.transferSlipPageData.detailsDialog.responseGoodList = res.data
        this.transferSlipPageData.detailsDialog.isShow = true
      })
    },
    // 调拨单确认收货
    clickTransferSlipConfirmGoods (id) {
      this.$confirm('您正在进行确认收货操作？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postTransferSlipConfirmGoods({id, worker_id:this.userInfo.id}).then(res => {
          this.getTransferSlipList()
          this.transferSlipPageData.detailsDialog.isShow = false
        })
      }).catch(() => {
      })
    },
    // 新增调拨单弹框显示
    transferSlipAddDialogShow () {
      // 获取一级分类
      postTwotype().then(res => {
        if (res.data.length) {
          this.transferSlipPageData.chooseGoodsDialog.topCategory = res.data
        }
      })
      this.transferSlipPageData.addDialog.isShow = true
    },
    // 新增调拨 获取商品列表对话框 获取二级分类列表
    clickTransferSlipAddTwoCategory () {
      this.transferSlipPageData.chooseGoodsDialog.twoCategoryId = ''
      this.transferSlipPageData.chooseGoodsDialog.twoCategory = []
      if (!this.transferSlipPageData.chooseGoodsDialog.topCategoryId) {
        // 没有选择一级分类
        return
      }
      let data = {
        type: this.transferSlipPageData.chooseGoodsDialog.topCategoryId
      }
      postTwotype(data).then(res => {
        if (res.data.length) {
          this.transferSlipPageData.chooseGoodsDialog.twoCategory = res.data
        }
      })
    },
    // 新增调拨—>新增商品弹框 选中商品操作
    clickTransferSlipAddGoodsChange (val) {
      console.log(val)
      this.transferSlipPageData.chooseGoodsDialog.multipleSelection = val
    },
    // 新增调拨单，新增商品弹框，查询商品列表
    clickTransferSlipSearchGoods () {
      let data = {
        page:this.transferSlipPageData.chooseGoodsDialog.page,
        limit:this.transferSlipPageData.chooseGoodsDialog.limit,
        name:this.transferSlipPageData.chooseGoodsDialog.name,
        code:this.transferSlipPageData.chooseGoodsDialog.code,
        parent: this.transferSlipPageData.chooseGoodsDialog.topCategoryId,
        child: this.transferSlipPageData.chooseGoodsDialog.twoCategoryId
      }
      postTransferSlipGetGoodList(data).then(res => {
        this.transferSlipPageData.chooseGoodsDialog.responseData = res
      })
    },
    clickTransferSlipSearchGoodsPageSizeChange(val){
      this.transferSlipPageData.chooseGoodsDialog.limit = val
      this.clickTransferSlipSearchGoods()
    },
    clickTransferSlipSearchGoodsPageCurrentChange (val) {
      this.transferSlipPageData.chooseGoodsDialog.page = val
      this.clickTransferSlipSearchGoods()
    },
    // 选中商品后确认添加到本次调拨列表中
    clickTransferSlipChoosesGoods () {
      let formatArr = []
      this.transferSlipPageData.chooseGoodsDialog.multipleSelection.forEach((item) => {
        formatArr.push({
          id:item.id,
          title: item.title, // 商品
          bar_code: item.bar_code, // 商品名称
          p_type: item.p_type, // 一级分类
          cname: item.cname, // 二级分类
          stock: item.stock, // 当前库存
          price: item.price,
          num: '',
          remark: '',
        })
      })
      let newArr = this.transferSlipPageData.addDialog.list.concat(formatArr)
      console.log(newArr)
      // 去重
      let obj = {}
      newArr = newArr.reduce(function (item, next) {
        obj[next.id] ? '' : obj[next.id] = true && item.push(next)
        return item
      }, [])
      this.transferSlipPageData.addDialog.list = newArr
      this.transferSlipPageData.chooseGoodsDialog.isShow = false
    },
    // 新增调拨单中商品移除
    removeTransferSlipGood (index) {
      this.transferSlipPageData.addDialog.list.splice(index, 1)
    },
    // 新增调拨单
    addtransferSlipGoodOk () {
      // responseData:{
      //     allot_in:'',//调入仓库id
      //     count:1,//调拨商品总数
      //     bar_code:['','fdadsfad'],//调拨商品的条形码s
      //     item_id:[1,2],//调拨商品ids
      //     item_name:['fasdfadf','dfadsfas'],//调拨商品名s
      //     purchase_number:[1,2],//调拨数量s
      //     remark:['备注1','备注2'],//调拨商品的描述s
      //     remarks:'dfsgdasfads',//调拨单描述
      //     worker_id:1,//调拨人id
      // },
      let data = {
        allot_in: this.transferSlipPageData.addDialog.responseData.allot_in,
        count: this.transferSlipPageData.addDialog.list.length, // 调拨商品总数
        bar_code: [], // 调拨商品的条形码s
        item_id: [], // 调拨商品ids
        item_name: [], // 调拨商品名s
        purchase_number: [], // 调拨数量s
        remark: [], // 调拨商品的描述s
        remarks: this.transferSlipPageData.addDialog.responseData.remarks, // 调拨单描述
        worker_id: this.userInfo.id// 调拨人id //数据来源vuex
      }
      if (!data.allot_in) {
        alert('请选择调入仓库')
        return
      }
      for (let i = 0; i < this.transferSlipPageData.addDialog.list.length; i++) {
        data.bar_code.push(this.transferSlipPageData.addDialog.list[i].bar_code)
        data.item_id.push(this.transferSlipPageData.addDialog.list[i].id)
        data.item_name.push(this.transferSlipPageData.addDialog.list[i].title)
        if (!(/^[0-9]*[1-9][0-9]*$/.test(this.transferSlipPageData.addDialog.list[i].num))) {
          alert(`【${this.transferSlipPageData.addDialog.list[i].title}】调拨数量必须为整数，且小于库存`)
          return
        }
        if (!((this.transferSlipPageData.addDialog.list[i].num <= this.transferSlipPageData.addDialog.list[i].stock))) {
          alert(`【${this.transferSlipPageData.addDialog.list[i].title}】调拨数量必须为整数，且小于库存`)
          return
        }
        if (!(this.transferSlipPageData.addDialog.list[i].num >= 1)) {
          alert(`【${this.transferSlipPageData.addDialog.list[i].title}】调拨数量必须为整数，且小于库存`)
          return
        }
        data.purchase_number.push(this.transferSlipPageData.addDialog.list[i].num)
        data.remark.push(this.transferSlipPageData.addDialog.list[i].remark)
      }
      postTransferSlipAdd({data: data}).then(res => {
        this.transferSlipPageData.addDialog.isShow = false
        this.transferSlipRequestData.page = 1
        this.getTransferSlipList()
      })
    },
    // 获取仓库列表
    getShopList () {
      postShopList().then(res => {
        if (res.code === 200) {
          this.shopList = res.data
        }
      })
    },

    // 盘点单 页码操作
    checkOrderOnePageCurrentChange (val) {
      this.checkOrderRequestData.page = val
      this.getCheckOrderList()
    },
    // 盘点单，每页数据条数操作
    checkOrderPageSizeChange (val) {
      this.checkOrderRequestData.limit = val
      this.getCheckOrderList()
    },
    // 获取盘点单列表
    getCheckOrderList () {
      let data = {
        status: this.checkOrderRequestData.status,
        name: this.checkOrderRequestData.name,
        page: `${this.checkOrderRequestData.page},${this.checkOrderRequestData.limit}`,
        start_time: this.checkOrderRequestData.time ? this.checkOrderRequestData.time[0] : '',
        end_time: this.checkOrderRequestData.time ? this.checkOrderRequestData.time[1] : '',
        shop: this.checkOrderRequestData.shop
      }
      postCheckOrderList(data).then(res => {
        if (res.code === 200) {
          this.checkOrderPageData.count = res.count
          this.checkOrderPageData.list = res.data
        }
      })
    },
    // 新增盘点单对话框显示
    clickAddCheckOrder (type = 1) {
      if (type === 2){
        // 新增部分盘点
        this.checkOrderPageData.addDialog.isShow2 = true
        this.checkOrderPageData.addDialog.isShow = true
      }

      // 获取一级分类
      postTwotype().then(res => {
        if (res.data.length) {
          this.checkOrderPageData.addGoodsDialog.topCategory = res.data
        }
      })
      this.checkOrderPageData.addDialog.page = 1
      this.checkOrderPageData.addDialog.is_enable = false
      if (type === 1){
        // 非新增部分盘点 去请求第一页数据
        this.clickAddCheckOrderDialogSearchBtn()
      }
    },
    addCheckOrderDialongLoadMoreGoods(){
      this.checkOrderPageData.addDialog.page += 1
      this.clickAddCheckOrderDialogSearchBtn()
    },
    clickAddCheckOrderDialogSearchBtn () {
      let data = {
        page:`${this.checkOrderPageData.addDialog.page},${this.checkOrderPageData.addDialog.limit}`,
        stock_type: 1,
        title: '',
        type_id: '',
        type: ''
      }
      postCheckOrderAddGoodList(data).then(res => {
        if (res.data.length) {
          let formatArr = []
          res.data.forEach((item) => {
            formatArr.push({
              item_id: item.id, // 商品id
              bar_code: item.bar_code,//商品二维码
              item_title: item.title, // 商品名称
              top_category: item.type_ids, // 一级分类
              two_category: item.types, // 二级分类
              stock_reality: item.stock, // 当前库存
              stock_now: ''// 盘点库存
            })
          })

          // 数据拼接
          let newArr = this.checkOrderPageData.addDialog.list.concat(formatArr)
          // 去重
          let obj = {}
          newArr = newArr.reduce(function (item, next) {
            obj[next.item_id] ? '' : obj[next.item_id] = true && item.push(next)
            return item
          }, [])

          this.checkOrderPageData.addDialog.list = newArr
        }
        if (res.data.length < this.checkOrderPageData.addDialog.limit) {
          this.checkOrderPageData.addDialog.is_enable = true //关闭加载更多商品按钮
        }
        this.checkOrderPageData.addDialog.isShow = true
      })
    },

    // 新增盘点单对话框获取二级分类列表
    clickAddCheckOrderTwoCategory () {
      this.checkOrderPageData.addGoodsDialog.twoCategoryId = ''
      this.checkOrderPageData.addGoodsDialog.twoCategory = []
      if (!this.checkOrderPageData.addGoodsDialog.topCategoryId) {
        // 没有选择一级分类
        return
      }
      let data = {
        type: this.checkOrderPageData.addGoodsDialog.topCategoryId
      }
      postTwotype(data).then(res => {
        if (res.data.length) {
          this.checkOrderPageData.addGoodsDialog.twoCategory = res.data
        }
      })
    },
    // 新增盘点单弹框盘—>新增商品弹框 选中商品操作
    clickAddGoodsDialogHandleSelectionChange (val) {
      console.log(val)
      this.checkOrderPageData.addGoodsDialog.multipleSelection = val
    },
    // 盘点单 -新增盘点单时 获取商品别表
    getCheckOrderGoodList () {
      if (this.checkOrderPageData.addDialog.isShow2 === true) {
        let data = {
          page: `${this.checkOrderPageData.addGoodsDialog.page},${this.checkOrderPageData.addGoodsDialog.limit}`,
          title: this.checkOrderPageData.addGoodsDialog.title,
          type_id: this.checkOrderPageData.addGoodsDialog.topCategoryId,
          type: this.checkOrderPageData.addGoodsDialog.twoCategoryId
        }
        postCheckOrderAddGoodList2(data).then(res => {
          if (res.code === 200){
            this.checkOrderPageData.addGoodsDialog.count = res.count
            if (res.data.length) {
              this.checkOrderPageData.addGoodsDialog.list = res.data
            }else {
              this.checkOrderPageData.addGoodsDialog.list = []
            }
          }
        })

        return
      }
      let data = {
        page: `${this.checkOrderPageData.addGoodsDialog.page},${this.checkOrderPageData.addGoodsDialog.limit}`,
        stock_type: 2,
        title: this.checkOrderPageData.addGoodsDialog.title,
        type_id: this.checkOrderPageData.addGoodsDialog.topCategoryId,
        type: this.checkOrderPageData.addGoodsDialog.twoCategoryId
      }
      postCheckOrderAddGoodList(data).then(res => {
        if (res.code === 200){
          this.checkOrderPageData.addGoodsDialog.count = res.count
          if (res.data.length) {
            this.checkOrderPageData.addGoodsDialog.list = res.data
          }else {
            this.checkOrderPageData.addGoodsDialog.list = []
          }
        }
      })
    },
    // 盘点单 新增盘点单时 获取商品列表 页码操作
    getCheckOrderGoodListOnePageCurrentChange (val) {
      this.checkOrderPageData.addGoodsDialog.page = val
      this.getCheckOrderGoodList()
    },
    // 盘点单，新增盘点单时 获取商品列表  每页数据条数操作
    getCheckOrderGoodListPageSizeChange (val) {
      this.checkOrderPageData.addGoodsDialog.limit = val
      this.getCheckOrderGoodList()
    },
    // 新增盘点单弹框盘->选择商品—>确定按钮
    clickAddGoodsDialogOk () {
      // {
      //   "item_id": 1738,    //商品id
      //   "item_title": "\u5546\u54c1",   //商品名称
      //   top_category:'一级分类', //一级分类
      //   two_category:'二级分类',//二级分类
      //   "stock_reality": 20,    //当前库存
      //   "stock_now": 10     //盘点库存
      // }
      // 数据格式化
      let formatArr = []
      this.checkOrderPageData.addGoodsDialog.multipleSelection.forEach((item) => {
        formatArr.push({
          item_id: item.id, // 商品id
          item_title: item.title, // 商品名称
          bar_code: item.bar_code, // 商品条形码
          top_category: item.type_ids, // 一级分类
          two_category: item.types, // 二级分类
          stock_reality: item.stock, // 当前库存
          stock_now: ''// 盘点库存
        })
      })

      // 数据拼接
      let newArr = this.checkOrderPageData.addDialog.list.concat(formatArr)
      // 去重
      let obj = {}
      newArr = newArr.reduce(function (item, next) {
        obj[next.item_id] ? '' : obj[next.item_id] = true && item.push(next)
        return item
      }, [])
      this.checkOrderPageData.addDialog.list = newArr
      this.checkOrderPageData.addGoodsDialog.isShow = false
    },
    // 新增盘点单弹框盘—>确定按钮
    clickAddCheckOrderDialogOk () {
      let itemArr = []
      for (let i = 0; i < this.checkOrderPageData.addDialog.list.length; i++) {
        if (!Number.isInteger(Number.parseFloat(this.checkOrderPageData.addDialog.list[i].stock_now))) {
          this.$message({
            showClose: true,
            message: `请正确输入【${this.checkOrderPageData.addDialog.list[i].item_title}】商品的盘点库存。`,
            type: 'error'
          })
          return
        }
        itemArr.push({
          item_id: this.checkOrderPageData.addDialog.list[i].item_id, // 商品id
          item_title: this.checkOrderPageData.addDialog.list[i].item_title, // 商品名称
          stock_reality: this.checkOrderPageData.addDialog.list[i].stock_reality, // 当前库存
          stock_now: this.checkOrderPageData.addDialog.list[i].stock_now// 盘点库存
        })
      }
      let data = {
        remarks: this.checkOrderPageData.addDialog.remarks,
        item: itemArr
      }
      postCheckOrderAdd(data).then(res => {
        if (res.code === 200) {
          this.checkOrderRequestData.page = 1
          this.getCheckOrderList()
          this.checkOrderPageData.addDialog.list = []
          this.checkOrderPageData.addDialog.isShow = false
        }
      })
    },
    // 新增盘点单弹框盘—>删除某个商品
    clickAddCheckOrderDialogDelGoods (index) {
      this.checkOrderPageData.addDialog.list.splice(index, 1)
    },
    // 盘点单查看详情
    async clickCheckOrderDetails (id) {
      await postCheckOrderInfo({id: id}).then(res => {
        if (res.code === 200) {
          this.checkOrderPageData.detailsDialog.isShow = true
          this.checkOrderPageData.detailsDialog.remarks = res.data.remarks
          this.checkOrderPageData.detailsDialog.list = res.data.item
        }
      })
    },
    // 盘点单删除
    clickCheckOrderDel (id) {
      this.$confirm('您确认删除本条盘点信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postCheckOrderDel({id}).then(() => {
          this.getCheckOrderList()
        })
      }).catch(() => {
      })
    },
    // 盘点单 确认盘点
    async clickCheckOrderConfirm (id) {
      await postCheckOrderInfo({id: id}).then(res => {
        if (res.code === 200) {
          this.checkOrderPageData.confirmDialog.data = res.data
          this.checkOrderPageData.confirmDialog.isShow = true
        }
      })
    },
    // 盘点单 确认盘点
    async clickCheckOrderConfirmOk(){
        await postCheckOrderConfirm(this.checkOrderPageData.confirmDialog.data).then(res => {
          this.checkOrderPageData.confirmDialog.isShow = false
          if (res.code === 200) {
              this.$message({
                message: res.msg,
                type: 'success'
              });
              setTimeout(() => { this.getCheckOrderList()}, 1000)
          }
        })
      },
    // 盘点单 编辑
    async clickCheckOrderEdit (id) {
      await postCheckOrderInfo({id: id}).then(res => {
        if (res.code === 200) {
          this.checkOrderPageData.editDialog.responseData = res.data
          // 获取一级分类
          postTwotype().then(res => {
            if (res.data.length) {
              this.checkOrderPageData.addGoodsDialog.topCategory = res.data
            }
          })
          this.checkOrderPageData.editDialog.isShow = true
        }
      })
    },
    // 盘点单 编辑 删除某个商品
    clickCheckOrderDelGoods(index){
      this.checkOrderPageData.editDialog.responseData.item.splice(index, 1)
    },
    // 编辑盘点单弹框盘->选择商品—>确定按钮
    clickCheckOrderEditChooseGoodsOk () {
      console.log(this.checkOrderPageData.editDialog.responseData.item)
      // {
      //   "item_id": 1738,    //商品id
      //   "item_title": "\u5546\u54c1",   //商品名称
      //   top_category:'一级分类', //一级分类
      //   two_category:'二级分类',//二级分类
      //   "stock_reality": 20,    //当前库存
      //   "stock_now": 10     //盘点库存
      // }
      // 数据格式化
      let formatArr = []
      this.checkOrderPageData.addGoodsDialog.multipleSelection.forEach((item) => {
        formatArr.push({
          id: '',
          item_id: item.id, // 商品id
          title: item.title, // 商品名称
          type: item.types, // 一级分类
          type_id: item.type_ids, // 二级分类
          stock_reality: item.stock, // 当前库存
          stock_now: ''// 盘点库存
        })
      })

      // 数据拼接
      let newArr = this.checkOrderPageData.editDialog.responseData.item.concat(formatArr)
      // 去重
      let obj = {}
      newArr = newArr.reduce(function (item, next) {
        obj[next.item_id] ? '' : obj[next.item_id] = true && item.push(next)
        return item
      }, [])
      this.checkOrderPageData.editDialog.responseData.item = newArr
      this.checkOrderPageData.addGoodsDialog.isShow2 = false
    },
    // 盘点单 确认编辑
    async clickCheckOrderEditOk () {
      for (let i = 0; i < this.checkOrderPageData.editDialog.responseData.item.length; i++) {
        if (!Number.isInteger(Number.parseFloat(this.checkOrderPageData.editDialog.responseData.item[i].stock_now)) || Number.parseFloat(this.checkOrderPageData.editDialog.responseData.item[i].stock_now)<0) {
          this.$message({
            showClose: true,
            message: `请正确输入【${this.checkOrderPageData.editDialog.responseData.item[i].title}】商品的盘点库存。`,
            type: 'error'
          })
          return
        }
      }
      this.$confirm('您确认编辑该盘点吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postCheckOrderEdit(this.checkOrderPageData.editDialog.responseData).then(res => {
          this.checkOrderPageData.editDialog.isShow = false
          if (res.code === 200) {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            setTimeout(() => { this.getCheckOrderList()}, 1000)
          }
        })
      }).catch(() => {
      })
    },

    // 盘亏单，盘盈单请求列表
    getCheckLossOrWinOrderList (type) {
      // 1 盘盈单 2 盘亏单
      switch (type) {
        case 1:
          let requestData = {
            type: type,
            status: this.checkWinOrderRequestData.status,
            page: `${this.checkWinOrderRequestData.page},${this.checkWinOrderRequestData.limit}`,
            start_time: this.checkWinOrderRequestData.time ? this.checkWinOrderRequestData.time[0] : '',
            end_time: this.checkWinOrderRequestData.time ? this.checkWinOrderRequestData.time[1] : '',
            name: this.checkWinOrderRequestData.name,
            shop: this.checkWinOrderRequestData.shop
          }
          postCheckLossOrWinOrderList(requestData).then(res => {
            if (res.code === 200) {
              this.checkWinOrderPageData.count = res.count
              this.checkWinOrderPageData.list = res.data
            }
          })
          break
        case 2:
          let data = {
            type: type,
            status: this.checkLossOrderRequestData.status,
            page: `${this.checkLossOrderRequestData.page},${this.checkLossOrderRequestData.limit}`,
            start_time: this.checkLossOrderRequestData.time ? this.checkLossOrderRequestData.time[0] : '',
            end_time: this.checkLossOrderRequestData.time ? this.checkLossOrderRequestData.time[1] : '',
            name: this.checkLossOrderRequestData.name,
            shop: this.checkLossOrderRequestData.shop
          }
          postCheckLossOrWinOrderList(data).then(res => {
            if (res.code === 200) {
              this.checkLossOrderPageData.count = res.count
              this.checkLossOrderPageData.list = res.data
            }
          })
          break
      }
    },
    // 盘亏单搜索按钮
    searchCheckLossOrder () {
      this.checkLossOrderRequestData.page = 1
      this.getCheckLossOrWinOrderList(2)
    },
    // 盘亏单 页码操作
    checkLossOrderOnePageCurrentChange (val) {
      this.checkLossOrderRequestData.page = val
      this.getCheckLossOrWinOrderList(2)
    },
    // 盘亏单，每页数据条数操作
    checkLossOrderPageSizeChange (val) {
      this.checkLossOrderRequestData.limit = val
      this.getCheckLossOrWinOrderList(2)
    },
    // 盘亏单 详情
    async checkLossOrderDetails (id) {
      await postCheckLossOrWinOrderDetails({id}).then(res => {
        if (res.code === 200) {
          this.checkLossOrderPageData.detailsDialog.responseData = res.data
          this.checkLossOrderPageData.detailsDialog.isShow = true
        }
      })
    },

    // 盘盈单搜索按钮
    searchCheckWinOrder () {
      this.checkWinOrderRequestData.page = 1
      this.getCheckLossOrWinOrderList(1)
    },
    // 盘盈单 页码操作
    checkWinOrderOnePageCurrentChange (val) {
      this.checkWinOrderRequestData.page = val
      this.getCheckLossOrWinOrderList(1)
    },
    // 盘盈单，每页数据条数操作
    checkWinOrderPageSizeChange (val) {
      this.checkLossOrderRequestData.limit = val
      this.getCheckLossOrWinOrderList(1)
    },
    // 盘盈单 详情
    async checkWinOrderDetails (id) {
      await postCheckLossOrWinOrderDetails({id}).then(res => {
        if (res.code === 200) {
          this.checkWinOrderPageData.detailsDialog.responseData = res.data
          this.checkWinOrderPageData.detailsDialog.isShow = true
        }
      })
    }
  },
  watch:{
    // 新增盘点单弹框
    "checkOrderPageData.addDialog.isShow":{
      handler(newVal,oldVal){
        if (newVal === false) {
          this.checkOrderPageData.addDialog.isShow2 = false
          this.checkOrderPageData.addDialog.list = []
        }
      },
      deep:true
    },
    // 新增盘点商品
    "checkOrderPageData.addGoodsDialog.isShow":{
      handler(newVal,oldVal){
        if (newVal === false) {
          this.checkOrderPageData.addGoodsDialog.list = []
        }
      },
      deep:true
    },

  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style lang="less" scoped>
.inventory-manage{

}
</style>

<style scoped>
  #printTest{
    color: #000000!important;
  }
  .print-table{
    border-color:#000000!important;
  }
  .print-table:before{
    background: #000!important;
  }
  .print-table:after{
    background: #000!important;
  }
  .print-table /deep/ *{
    border-color:#000!important;
  }
</style>
