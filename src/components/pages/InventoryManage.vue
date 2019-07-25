<template>
    <div class="inventory-manage">
      <el-tabs v-model="type" @tab-click="handleClick">
        <el-tab-pane label="调拨单" name="1">
          <div>
            <div class="search">
<!--              <el-select  clearable placeholder="选择调入仓库" v-model="transferSlipRequestData.in_shop">-->
<!--                <el-option v-for="item in shopList" :label="item.name" :key="item.id" :value="item.id"></el-option>-->
<!--              </el-select>-->
              <el-select  clearable placeholder="选择调出仓库" v-model="transferSlipRequestData.out_shop">
                <el-option v-for="item in shopList" :label="item.name" :key="item.id" :value="item.id"></el-option>
              </el-select>
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
              <el-button>搜索</el-button>
            </div>
            <div class="search" style="margin-top: 15px;">
              <el-button>导出</el-button>
              <el-button @click="transferSlipAddDialogShow">新增调拨</el-button>
            </div>
          </div>
          <div style="margin-top: 15px;">
            <el-table  :data="transferSlipPageData.list" border style="width: 100%;" height="620">
              <el-table-column  label="调拨信息"></el-table-column>
              <el-table-column  label="商品信息">
                <template slot-scope="scope">
                  <div v-html="scope.row.item">
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="单位成本"></el-table-column>
              <el-table-column  label="商品成本"></el-table-column>
              <el-table-column  label="调拨数量">
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
              <el-table-column prop="in_message" label="入库信息"></el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                 <span v-if="scope.row.status === 1">调拨中</span>
                 <span v-if="scope.row.status === 0">待发货</span>
                 <span v-if="scope.row.status === 2">已完成</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" v-if="scope.row.status === 0" @click="clickTransferSlipSendGoods(scope.row.id)">发货</el-button>
                  <el-button type="text" size="mini" v-if="scope.row.status === 1" @click="clickTransferSlipSendGoodsCancel(scope.row.id)">取消发货</el-button>
                  <el-button type="text" size="mini" @click="transferSlipPageData.printingDialog.isShow = true">打印</el-button>
                  <el-button type="text" size="mini" v-if="scope.row.status === 1" @click="clickTransferSlipDetails(scope.row.id)">确认收货</el-button>
                  <el-button type="text" size="mini" v-if="scope.row.status === 0" @click="clickTransferSlipDel(scope.row.id)">删除</el-button>
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
              <el-button @click="transferSlipPageData.chooseGoodsDialog.isShow = true">选择商品</el-button>
            </div>
            <div style="margin-top: 15px;">
              <el-table :data="transferSlipPageData.addDialog.list" border style="width: 100%;">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="title" label="商品名称"></el-table-column>
                <el-table-column prop="title" label="条形码"></el-table-column>
                <el-table-column prop="type_id" label="一级分类"></el-table-column>
                <el-table-column prop="type" label="二级分类"></el-table-column>
                <el-table-column prop="stock" label="当前库存"></el-table-column>
                <el-table-column prop="selling_price" label="单价"></el-table-column>
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
              <el-button class="my-secondary-btn" @click="transferSlipPageData.addDialog.isShow = false">取消</el-button>
              <el-button class="my-primary-btn" @click="addtransferSlipGoodOk">确定</el-button>
            </div>
          </el-dialog>
          <!-- 调拨单--新增调拨 选择商品-->
          <el-dialog  :visible.sync="transferSlipPageData.chooseGoodsDialog.isShow" title="选择商品" width="968px" :center="true">
            <div style="margin-bottom: 15px;">
              <el-input placeholder="请输入商品名称" style="width: 180px;" v-model="transferSlipPageData.chooseGoodsDialog.title"></el-input>
              <el-input placeholder="请输入条形码" style="width: 180px;"  v-model="transferSlipPageData.chooseGoodsDialog.title"></el-input>
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
              <el-button @click="clickTransferSlipSearchGoods">查询</el-button>
            </div>
            <div>
              <el-table
                :data="transferSlipPageData.chooseGoodsDialog.list"
                tooltip-effect="dark"
                @selection-change="clickTransferSlipAddGoodsChange"
                border style="width: 100%;">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="title" label="条形码"></el-table-column>
                <el-table-column prop="title" label="商品名称"></el-table-column>
                <el-table-column prop="type_id" label="一级分类"></el-table-column>
                <el-table-column prop="type" label="二级分类"></el-table-column>
                <el-table-column prop="stock" label="库存"></el-table-column>
                <el-table-column prop="selling_price" label="单价"></el-table-column>
              </el-table>
            </div>
            <div style="text-align: center;margin-top: 20px;">
              <el-button class="my-secondary-btn" @click="transferSlipPageData.chooseGoodsDialog.isShow = false">取消</el-button>
              <el-button class="my-primary-btn" @click="clickTransferSlipChoosesGoods">确定</el-button>
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
              <el-button class="my-secondary-btn" @click="transferSlipPageData.sendGoodsDialog.isShow = false">取消</el-button>
              <el-button class="my-primary-btn" @click="clickTransferSlipSendGoodsOk(transferSlipPageData.sendGoodsDialog.id)">确定发货</el-button>
            </div>
          </el-dialog>
          <!-- 调拨单--打印-->
          <el-dialog  :visible.sync="transferSlipPageData.printingDialog.isShow" title="调拨单-打印" width="968px" :center="true">
            <div class="flex-space-between" style="margin-bottom: 15px;">
              <span>调拨单号：XXXX</span>
              <span>调拨仓库：XXXXXX</span>
              <span>调拨人员：XXXXXX</span>
              <span>调拨时间：2017-11-20 13:15:32</span>
            </div>
            <div style="margin-bottom: 5px;">
              <span>备注：无大神打发第三方大神的法定分</span>
            </div>
            <div>
              <el-table border style="width: 100%;">
                <el-table-column >序号</el-table-column>
                <el-table-column prop="num" label="商品名称"></el-table-column>
                <el-table-column prop="real_price" label="条形码"></el-table-column>
                <el-table-column prop="price" label="发货数量"></el-table-column>
              </el-table>
            </div>
            <div class="flex-space-between" style="margin-top:30px;margin-bottom: 15px;">
              <span>制单人：XXXX</span>
              <span>配货人：XXXXXX</span>
              <span>发货人：XXXXXX</span>
              <span>收货人：fasdfads</span>
            </div>
            <div style="text-align: center;margin-top: 20px;">
              <el-button class="my-secondary-btn" @click="transferSlipPageData.printingDialog.isShow = false">取消</el-button>
              <el-button class="my-primary-btn" @click="window.print()">打印</el-button>
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
              <el-table :data="transferSlipPageData.detailsDialog.responseGoodList" border style="width: 100%;">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="item" label="商品名称"></el-table-column>
                <el-table-column prop="bar_code" label="条形码"></el-table-column>
                <el-table-column prop="stock" label="当前库存"></el-table-column>
                <el-table-column prop="num" label="调拨数量"></el-table-column>
              </el-table>
            </div>
            <div style="text-align: center;margin-top: 20px;"  v-if="transferSlipPageData.detailsDialog.responseData.status === 1">
              <el-button class="my-secondary-btn" @click="transferSlipPageData.detailsDialog.isShow = false">取消</el-button>
              <el-button class="my-primary-btn" @click="clickTransferSlipConfirmGoods(transferSlipPageData.detailsDialog.responseData.id)">确认收货</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="盘点单" name="2">
          <div>
            <div class="search">
              <el-select  clearable placeholder="选择盘点仓库"  v-model="checkOrderRequestData.shop">
                <el-option
                  v-for="item in shopList"
                  :label="item.name"
                  :key="item.id"
                  :value="item.id">
                </el-option>
              </el-select>
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
              <el-button @click="getCheckOrderList">搜索</el-button>
            </div>
            <div class="search" style="margin-top: 15px;">
              <el-button>导出</el-button>
              <el-button @click="clickAddCheckOrder">新增盘点</el-button>
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
              <el-radio-group v-model="checkOrderPageData.addDialog.stock_type">
                <el-radio :label="1">只看未盘点商品</el-radio>
                <el-radio :label="2">全部</el-radio>
              </el-radio-group>
            </div>
            <div style="margin-bottom: 15px;">
              <el-select  clearable placeholder="选择一级分类" v-model="checkOrderPageData.addDialog.topCategoryId"  @change="clickAddCheckOrderTwoCategory">
                <el-option
                  v-for="item in checkOrderPageData.addDialog.topCategory"
                  :label="item.cname"
                  :key="item.id"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select  clearable placeholder="选择二级分类" v-model="checkOrderPageData.addDialog.twoCategoryId">
                <el-option
                  v-for="item in checkOrderPageData.addDialog.twoCategory"
                  :label="item.cname"
                  :key="item.id"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-input placeholder="请输入需查询的商品名称" v-model="checkOrderPageData.addDialog.title" style="width: 300px;"></el-input>
              <el-button  @click="getCheckOrderGoodList">查询</el-button>
            </div>
            <div>
              <el-table :data="checkOrderPageData.addDialog.list" border style="width: 100%;">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="item_title" label="商品名称"></el-table-column>
                <el-table-column prop="top_category" label="一级分类"></el-table-column>
                <el-table-column prop="two_category" label="二级分类"></el-table-column>
                <el-table-column prop="stock_reality" label="当前库存"></el-table-column>
                <el-table-column label="盘点库存">
                  <template slot-scope="scope">
                    <el-input placehoder="请输入盘点库存" v-model="scope.row.stock_now"></el-input>
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
              <el-button class="my-secondary-btn" @click="checkOrderPageData.addDialog.isShow = false">取消</el-button>
              <el-button class="my-primary-btn" @click="clickAddCheckOrderDialogOk">确定</el-button>
            </div>
          </el-dialog>
          <!-- 盘点单--新增调拨 新增商品-->
          <el-dialog  title="选择商品" :visible.sync="checkOrderPageData.addGoodsDialog.isShow" width="968px" :center="true">
            <div style="margin-bottom: 15px;">
              <el-input placeholder="请输入商品名称" v-model="checkOrderPageData.addDialog.title"  style="width: 180px;"></el-input>
              <el-input placeholder="请输入条形码" style="width: 180px;"></el-input>
              <el-select  clearable placeholder="选择一级分类" v-model="checkOrderPageData.addDialog.topCategoryId" @change="clickAddCheckOrderTwoCategory">
                <el-option
                  v-for="item in checkOrderPageData.addDialog.topCategory"
                  :label="item.cname"
                  :key="item.id"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select  clearable placeholder="选择二级分类" v-model="checkOrderPageData.addDialog.twoCategoryId">
                <el-option
                  v-for="item in checkOrderPageData.addDialog.twoCategory"
                  :label="item.cname"
                  :key="item.id"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-button @click="getCheckOrderGoodList">查询</el-button>
            </div>
            <div>
              <el-table :data="checkOrderPageData.addGoodsDialog.list"
                        tooltip-effect="dark"
                        @selection-change="clickAddGoodsDialogHandleSelectionChange"
                        border style="width: 100%;">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="title" label="商品名称"></el-table-column>
                <el-table-column prop="type_id" label="一级分类"></el-table-column>
                <el-table-column prop="type" label="二级分类"></el-table-column>
                <el-table-column prop="stock" label="库存"></el-table-column>
                <el-table-column prop="selling_price" label="单价"></el-table-column>
              </el-table>
            </div>
            <div style="text-align: center;margin-top: 20px;">
              <el-button class="my-secondary-btn" @click="checkOrderPageData.addGoodsDialog.isShow = false">取消</el-button>
              <el-button class="my-primary-btn" @click="clickAddGoodsDialogOk">确定</el-button>
            </div>
          </el-dialog>
          <!-- 盘点单--详情-->
          <el-dialog :visible.sync="checkOrderPageData.detailsDialog.isShow"  title="盘点详情"  width="968px" :center="true">
            <div>
              <el-table :data="checkOrderPageData.detailsDialog.list" border style="width: 100%;">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="title" label="商品名称"></el-table-column>
                <el-table-column prop="type" label="一级分类"></el-table-column>
                <el-table-column prop="type_id" label="二级分类"></el-table-column>
                <el-table-column prop="stock_reality" label="当前库存"></el-table-column>
                <el-table-column label="盘点库存">
                  <template slot-scope="scope">
                    <span class="font-red" v-if="scope.row.stock_now<scope.row.stock_reality">{{scope.row.stock_now}}</span>
                    <span class="font-blue" v-else>{{scope.row.stock_now}}</span>
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
          <!-- 盘点单--编辑 只允许 编辑 备注信息，其他信息不允许编辑 -->
          <el-dialog :visible.sync="checkOrderPageData.editDialog.isShow"  title="编辑盘点单"  width="968px" :center="true">
            <div>
              <el-table :data="checkOrderPageData.editDialog.responseData.item" border style="width: 100%;">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="title" label="商品名称"></el-table-column>
                <el-table-column prop="type" label="一级分类"></el-table-column>
                <el-table-column prop="type_id" label="二级分类"></el-table-column>
                <el-table-column prop="stock_reality" label="当前库存"></el-table-column>
                <el-table-column label="盘点库存">
                  <template slot-scope="scope">
                    <span class="font-red" v-if="scope.row.stock_now<scope.row.stock_reality">{{scope.row.stock_now}}</span>
                    <span class="font-blue" v-else>{{scope.row.stock_now}}</span>
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
              <el-button class="my-secondary-btn" @click="checkOrderPageData.editDialog.isShow = false">取消</el-button>
              <el-button class="my-primary-btn" @click="clickCheckOrderEditOk">确定编辑</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="盘亏单" name="3">
          <div>
            <div class="search">
              <el-select  clearable placeholder="选择盘点仓库"  v-model="checkLossOrderRequestData.shop">
                <el-option v-for="item in shopList" :label="item.name" :key="item.id" :value="item.id"></el-option>
              </el-select>
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
              <el-button @click="searchCheckLossOrder">搜索</el-button>
            </div>
            <div class="search" style="margin-top: 15px;">
              <el-button>导出</el-button>
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
                    <span class="font-blue" v-if="scope.row.stock>scope.row.num">{{scope.row.num}}</span>
                    <span class="font-red" v-else>{{scope.row.num}}</span>
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
              <el-select  clearable placeholder="选择盘点仓库"  v-model="checkWinOrderRequestData.shop">
                <el-option v-for="item in shopList" :label="item.name" :key="item.id" :value="item.id"></el-option>
              </el-select>
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
              <el-button @click="searchCheckWinOrder">搜索</el-button>
            </div>
            <div class="search" style="margin-top: 15px;">
              <el-button>导出</el-button>
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
                    <span class="font-blue" v-if="scope.row.stock>scope.row.num">{{scope.row.num}}</span>
                    <span class="font-red" v-else>{{scope.row.num}}</span>
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
import { postTransferSlipConfirmGoods, postTransferSlipSendGoodsGetInfo, postTransferSlipSendGoodsGetGoodList, postTransferSlipGoodsDetails, postTransferSlipDetails, postTransferSlipSendGoods, postTransferSlipSendGoodsCancel, postTransferSlipDel, postTransferSlipAdd, postShopList, postTransferSlipList, postCheckOrderList, postTwotype, postCheckOrderAddGoodList, postCheckOrderAdd, postCheckOrderInfo, postCheckOrderDel, postCheckOrderConfirm, postCheckOrderEdit, postCheckLossOrWinOrderList, postCheckLossOrWinOrderDetails } from '../../api/getData'
export default {
  name: 'InventoryManage', // 库存管理，进销存
  data () {
    return {
      type: '1', // 1=调拨单，2=盘点单，3=盘亏单，4=盘盈单
      //调出 或调出 仓库
      shopList:[
        // {id: 0, name: '总店'},
        // {id: 1, name: '江与城'},
        // {id: 2, name: '已完成'}
      ],
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
        //数据总数
        count:0,
        list:[
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
          responseData:{
            allot_in:'',//调入仓库id
            count:1,//调拨商品总数
            bar_code:['','fdadsfad'],//调拨商品的条形码s
            item_id:[1,2],//调拨商品ids
            item_name:['fasdfadf','dfadsfas'],//调拨商品名s
            purchase_number:[1,2],//调拨数量s
            remark:['备注1','备注2'],//调拨商品的描述s
            remarks:'',//调拨单描述
            worker_id:1,//调拨人id//TODO
          },
          list:[
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
          title:'',
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
          ],
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
        },
        // 发货弹框
        sendGoodsDialog: {
          isShow: false,
          id:0,//需要发货的调拨单id
          // 调拨单信息
          responseData:{
           // sn: "DB2019072300001",
           // shop_name: "留云路店",
           // creator: "堕落嚣张",
           // time: "2019-07-23 15:38:57",
           // remark: "",
           // id: 1
          },
          //发货商品列表
          responseGoodList:[
            {
              // item_id: 27,
              // item: "港版美素佳儿1段  1罐装",
              // num: 1,
              // bar_code: "暂无条形码",
              // stock: 0
            }
          ],
        },
        // 打印
        printingDialog: {
          isShow: false
        },
        // 调拨详情
        detailsDialog: {
          isShow: false,
          responseData:{
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
          responseGoodList:[
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
        out_shop:'',
        in_shop:'',
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
        count: 200,
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
          // 备注
          remarks: ''
        },
        // 新增商品弹框
        addGoodsDialog: {
          isShow: false,
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
        }
      },
      // 2=盘点单请求需要的数据
      checkOrderRequestData: {
        shop:'',//盘点仓库
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
        count: 100,
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
        shop:'',
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
        count: 100,
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
        shop:'',
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
    // this.getCheckOrderList()
    // this.getCheckLossOrWinOrderList(1)
    this.getShopList()
    this.getTransferSlipList()
  },
  methods: {
    // tab切换
    handleClick (tab, event) {
      // 1=调拨单，2=盘点单，3=盘亏单，4=盘盈单
      switch (tab.name) {
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

    //调拨单获取列表
    getTransferSlipList() {
      let data = {
        page:this.transferSlipRequestData.page,
        limit:this.transferSlipRequestData.limit,
        status:this.transferSlipRequestData.status,
        search:this.transferSlipRequestData.search,
        out_shop:this.transferSlipRequestData.out_shop,
        in_shop:this.transferSlipRequestData.out_shop,
        time:this.transferSlipRequestData.time,
        start_time: this.transferSlipRequestData.start_end_time ? this.transferSlipRequestData.start_end_time[0] : '',
        end_time: this.transferSlipRequestData.start_end_time ? this.transferSlipRequestData.start_end_time[1] : '',
      }
      postTransferSlipList(data).then(res=>{
          this.transferSlipPageData.count = res.count
          this.transferSlipPageData.list = res.data ? res.data : []
      })
    },
    //删除调拨单
    clickTransferSlipDel(id){
      this.$confirm('您确认删除本条调拨信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postTransferSlipDel({id:id}).then(res=>{
          if (res.result) {
            this.getTransferSlipList()
          }
        })
      }).catch(() => {
      });
    },
    //调拨单取消发货操作
    clickTransferSlipSendGoodsCancel(id){
      this.$confirm('您确认取消发货操作吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postTransferSlipSendGoodsCancel({id}).then(res=>{
          if (res.result){
            this.getTransferSlipList()
          }
        })
      }).catch(() => {
      });

    },
    //调拨单发货弹框展示操作
    async clickTransferSlipSendGoods(id){
      this.transferSlipPageData.sendGoodsDialog.id = id
      await postTransferSlipSendGoodsGetGoodList({id}).then(res=>{
        this.transferSlipPageData.sendGoodsDialog.responseGoodList = res.data
      })
      await postTransferSlipSendGoodsGetInfo({id}).then(res=>{
        this.transferSlipPageData.sendGoodsDialog.responseData = res.data
      })
      this.transferSlipPageData.sendGoodsDialog.isShow = true
    },
    //调拨单确认发货
    clickTransferSlipSendGoodsOk(id){
      this.$confirm('您确认进行发货操作吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postTransferSlipSendGoods({id}).then(res=>{
          if (res.result){
            this.getTransferSlipList()
            this.transferSlipPageData.sendGoodsDialog.isShow = true
          }
        })
      }).catch(() => {
      });
    },
    //调拨单详情
    async clickTransferSlipDetails(id){
      await postTransferSlipDetails({id}).then(res=>{
        this.transferSlipPageData.detailsDialog.responseData = res.data
      })
      await postTransferSlipGoodsDetails({id}).then(res=>{
        this.transferSlipPageData.detailsDialog.responseGoodList = res.data
        this.transferSlipPageData.detailsDialog.isShow = true
      })
    },
    //调拨单确认收货
    clickTransferSlipConfirmGoods(id){
      this.$confirm('您正在进行确认收货操作？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postTransferSlipConfirmGoods({id}).then(res=>{
          this.getTransferSlipList()
          this.transferSlipPageData.detailsDialog.isShow = false
        })
      }).catch(() => {
      })
    },
    //新增调拨单弹框显示
    transferSlipAddDialogShow(){
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
    //新增调拨单，新增商品弹框，查询商品列表
    clickTransferSlipSearchGoods(){
      let data = {
        stock_type:1,
        title: this.transferSlipPageData.chooseGoodsDialog.title,
        type_id: this.transferSlipPageData.chooseGoodsDialog.topCategoryId,
        type: this.transferSlipPageData.chooseGoodsDialog.twoCategoryId
      }
      postCheckOrderAddGoodList(data).then(res => {
        if (res.data.length) {
          this.transferSlipPageData.chooseGoodsDialog.list = res.data
        }
      })
    },
    //选中商品后确认添加到本次调拨列表中
    clickTransferSlipChoosesGoods(){
      // {
      //   id: 1738,     //商品id
      //     title: "测试商品7/18",    //商品名称
      //   type_id: "玩具童车",  //一级分类名称
      //   type: "拼插积木", //二级分类名称
      //   selling_price: "11000.00",    //销售价格
      //   stock: 8,  //当前库存,
      //   num:'',//调拨数量
      //   remark:'',//备注
      // }
      // 数据格式化
      let formatArr = []
      this.transferSlipPageData.chooseGoodsDialog.multipleSelection.forEach((item) => {
        let data = {
          id:item.id,
          title:item.title,
          type_id:item.type_id,
          type:item.type,
          selling_price:item.selling_price,
          stock:item.stock,
          num:'',
          remark:'',
        }
        formatArr.push(data)
      })

      // 数据拼接
      let newArr = this.transferSlipPageData.addDialog.list.concat(formatArr)
      // 去重
      let obj = {}
      newArr = newArr.reduce(function (item, next) {
        obj[next.id] ? '' : obj[next.id] = true && item.push(next)
        return item
      }, [])
      this.transferSlipPageData.addDialog.list = newArr
      this.transferSlipPageData.chooseGoodsDialog.isShow = false
    },
    //新增调拨单中商品移除
    removeTransferSlipGood(index){
      this.transferSlipPageData.addDialog.list.splice(index, 1)
    },
    //新增调拨单
    addtransferSlipGoodOk(){
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
        allot_in:this.transferSlipPageData.addDialog.responseData.allot_in,
        count:this.transferSlipPageData.addDialog.list.length,//调拨商品总数
        bar_code:[],//调拨商品的条形码s
        item_id:[],//调拨商品ids
        item_name:[],//调拨商品名s
        purchase_number:[],//调拨数量s
        remark:[],//调拨商品的描述s
        remarks:this.transferSlipPageData.addDialog.responseData.remarks,//调拨单描述
        worker_id:177,//调拨人id //TODO
      }
      if (!data.allot_in){
        alert('请选择调入仓库')
        return
      }
      for (let i=0; i < this.transferSlipPageData.addDialog.list.length; i++) {
        data.bar_code.push(this.transferSlipPageData.addDialog.list[i].title) //暂时没有返回条形码
        data.item_id.push(this.transferSlipPageData.addDialog.list[i].id)
        data.item_name.push(this.transferSlipPageData.addDialog.list[i].title)
        if (!(/^[0-9]*[1-9][0-9]*$/.test(this.transferSlipPageData.addDialog.list[i].num))){
          alert(`【${this.transferSlipPageData.addDialog.list[i].title}】调拨数量必须为整数，且小于库存`)
          return
        }
        if (!((this.transferSlipPageData.addDialog.list[i].num <= this.transferSlipPageData.addDialog.list[i].stock))){
          alert(`【${this.transferSlipPageData.addDialog.list[i].title}】调拨数量必须为整数，且小于库存`)
          return
        }
        if (!(this.transferSlipPageData.addDialog.list[i].num >= 1)){
          alert(`【${this.transferSlipPageData.addDialog.list[i].title}】调拨数量必须为整数，且小于库存`)
          return
        }
        data.purchase_number.push(this.transferSlipPageData.addDialog.list[i].num)
        data.remark.push(this.transferSlipPageData.addDialog.list[i].remark)
      }
      postTransferSlipAdd({data:data}).then(res=>{
        this.transferSlipPageData.addDialog.isShow = false
        this.transferSlipRequestData.page = 1
        this.getTransferSlipList()
      })
    },
    //获取仓库列表
    getShopList(){
      postShopList().then(res=>{
        if (res.code === 200){
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
        shop: this.checkOrderRequestData.shop,
      }
      postCheckOrderList(data).then(res => {
        if (res.code === 200) {
          this.checkOrderPageData.count = res.count
          this.checkOrderPageData.list = res.data
        }
      })
    },
    // 新增盘点单对话框显示
    clickAddCheckOrder () {
      this.checkOrderPageData.addDialog.isShow = true
      // 获取一级分类
      postTwotype().then(res => {
        if (res.data.length) {
          this.checkOrderPageData.addDialog.topCategory = res.data
        }
      })
    },
    // 新增盘点单对话框获取二级分类列表
    clickAddCheckOrderTwoCategory () {
      this.checkOrderPageData.addDialog.twoCategoryId = ''
      this.checkOrderPageData.addDialog.twoCategory = []
      if (!this.checkOrderPageData.addDialog.topCategoryId) {
        // 没有选择一级分类
        return
      }
      let data = {
        type: this.checkOrderPageData.addDialog.topCategoryId
      }
      postTwotype(data).then(res => {
        if (res.data.length) {
          this.checkOrderPageData.addDialog.twoCategory = res.data
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
      this.checkOrderPageData.addGoodsDialog.isShow = true
      let data = {
        stock_type: this.checkOrderPageData.addDialog.stock_type,
        title: this.checkOrderPageData.addDialog.title,
        type_id: this.checkOrderPageData.addDialog.topCategoryId,
        type: this.checkOrderPageData.addDialog.twoCategoryId
      }
      postCheckOrderAddGoodList(data).then(res => {
        if (res.data.length) {
          this.checkOrderPageData.addGoodsDialog.list = res.data
        }
      })
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
          top_category: item.type_id, // 一级分类
          two_category: item.type, // 二级分类
          stock_reality: item.stock, // 当前库存
          stock_now: 0// 盘点库存
        })
      })

      // 数据拼接
      let newArr = this.checkOrderPageData.addDialog.list.concat(formatArr)
      // 去重
      // let obj = {}
      // newArr = newArr.reduce(function (item, next) {
      //   obj[next.item_id] ? '' : obj[next.item_id] = true && item.push(next)
      //   return item
      // }, [])
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
      postCheckOrderDel({id}).then(res => {
        if (res.code === 200) {
          this.getCheckOrderList()
        }
      })
    },
    // 盘点单 确认盘点
    async clickCheckOrderConfirm (id) {
      let responseData = null
      await postCheckOrderInfo({id: id}).then(res => {
        if (res.code === 200) {
          responseData = res.data
        }
      })
      if (responseData) {
        await postCheckOrderConfirm(responseData).then(res => {
          if (res.code === 200) {
            this.getCheckOrderList()
          }
        })
      }
    },
    // 盘点单 编辑
    async clickCheckOrderEdit (id) {
      await postCheckOrderInfo({id: id}).then(res => {
        if (res.code === 200) {
          this.checkOrderPageData.editDialog.responseData = res.data
          this.checkOrderPageData.editDialog.isShow = true
        }
      })
    },
    // 盘点单 确认编辑
    async clickCheckOrderEditOk () {
      postCheckOrderEdit(this.checkOrderPageData.editDialog.responseData).then(res => {

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
            shop:this.checkWinOrderRequestData.shop,
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
            shop: this.checkLossOrderRequestData.shop,
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
  }
}
</script>

<style lang="less" scoped>
.inventory-manage{

}
</style>
