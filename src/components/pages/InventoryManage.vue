<template>
    <div class="inventory-manage">
      <el-tabs v-model="type" @tab-click="handleClick">
        <el-tab-pane label="调拨单" name="1">
          <div>
            <div class="search">
              <el-select  clearable placeholder="选择调出仓库" >
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
              </el-select>
              <el-select  clearable placeholder="选择调入仓库" >
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
              </el-select>
              <el-select  clearable placeholder="选择状态" >
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
              </el-select>
              <el-select  clearable placeholder="需要查询的时间" >
                <el-option label="调拨时间"></el-option>
                <el-option label="发货时间"></el-option>
                <el-option label="入库时间"></el-option>
              </el-select>
              <el-date-picker
                type="daterange"
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <el-input style="width: 300px;" placeholder="请输入需查询的订单号/商品名" clearable>
              </el-input>
              <el-button>搜索</el-button>
            </div>
            <div class="search">
              <el-button>导出</el-button>
              <el-button>新增调拨</el-button>
            </div>
          </div>
          <div>
            <el-table  border style="width: 100%;" height="565">
              <el-table-column prop="sn" label="调拨信息"></el-table-column>
              <el-table-column label="商品信息"></el-table-column>
              <el-table-column prop="amount" label="单位成本"></el-table-column>
              <el-table-column label="商品成本"></el-table-column>
              <el-table-column label="调拨数量"></el-table-column>
              <el-table-column label="发货信息"></el-table-column>
              <el-table-column label="入库信息"></el-table-column>
              <el-table-column label="状态"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="mini">发货</el-button>
                  <el-button type="text" size="mini">打印</el-button>
                  <el-button type="text" size="mini">编辑/详情</el-button>
                  <el-button type="text" size="mini">删除</el-button>
                </template>
              </el-table-column>

            </el-table>
          </div>
          <!-- 调拨单--新增调拨-->
          <el-dialog  title="调拨"  width="968px" :center="true">
            <div>
                <el-select  clearable placeholder="选择调出仓库" >
                  <el-option
                    label="item.name"
                    value="item.id">
                  </el-option>
                  <el-option
                    label="item.name"
                    value="item.id">
                  </el-option>
                </el-select>
                <el-select  clearable placeholder="选择调入仓库" >
                  <el-option
                    label="item.name"
                    value="item.id">
                  </el-option>
                  <el-option
                    label="item.name"
                    value="item.id">
                  </el-option>
                </el-select>
              <el-button>选择商品</el-button>
            </div>
            <div>
              <el-table border style="width: 100%;">
                <el-table-column prop="subtitle" label="序号"></el-table-column>
                <el-table-column prop="num" label="商品名称"></el-table-column>
                <el-table-column prop="real_price" label="条形码"></el-table-column>
                <el-table-column prop="price" label="一级分类"></el-table-column>
                <el-table-column prop="pay_all_price" label="二级分类"></el-table-column>
                <el-table-column prop="pay_all_price" label="当前库存"></el-table-column>
                <el-table-column prop="pay_all_price" label="调拨数量">
                  <el-input placehoder="请输入调拨数量"></el-input>
                </el-table-column>
                <el-table-column prop="pay_all_price" label="操作">
                  <el-button type="text">删除</el-button>
                </el-table-column>
              </el-table>
            </div>
            <div>
              <div class="clear-both" style="height: 50px;">
                <div class="float-left">合计调拨数量：4</div>
                <div class="float-right">
                  <el-form  label-width="80px">
                    <el-form-item label="备注：">
                      <el-input placeholder="请输入备注信息"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
            <div style="text-align: center;">
              <el-button class="my-secondary-btn">取消</el-button>
              <el-button class="my-primary-btn">确定</el-button>
            </div>
          </el-dialog>
          <!-- 调拨单--新增调拨 选择商品-->
          <el-dialog  title="选择商品" width="968px" :center="true">
            <div style="margin-bottom: 15px;">
              <el-input placeholder="请输入商品名称" style="width: 180px;"></el-input>
              <el-input placeholder="请输入条形码" style="width: 180px;"></el-input>
              <el-select  clearable placeholder="选择一级分类" >
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
              </el-select>
              <el-select  clearable placeholder="选择二级分类" >
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
              </el-select>
              <el-button>查询</el-button>
            </div>
            <div>
              <el-table border style="width: 100%;">
                <el-table-column ></el-table-column>
                <el-table-column prop="num" label="商品名称"></el-table-column>
                <el-table-column prop="real_price" label="条形码"></el-table-column>
                <el-table-column prop="price" label="一级分类"></el-table-column>
                <el-table-column prop="pay_all_price" label="二级分类"></el-table-column>
                <el-table-column prop="pay_all_price" label="库存"></el-table-column>
                <el-table-column prop="pay_all_price" label="单价"></el-table-column>
              </el-table>
            </div>
            <div style="text-align: center;margin-top: 20px;">
              <el-button class="my-secondary-btn">取消</el-button>
              <el-button class="my-primary-btn">确定</el-button>
            </div>
          </el-dialog>
          <!-- 调拨单--发货-->
          <el-dialog  title="发货"  width="968px" :center="true">
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
                <el-table-column ></el-table-column>
                <el-table-column prop="num" label="商品名称"></el-table-column>
                <el-table-column prop="real_price" label="条形码"></el-table-column>
                <el-table-column prop="price" label="一级分类"></el-table-column>
                <el-table-column prop="pay_all_price" label="二级分类"></el-table-column>
                <el-table-column prop="pay_all_price" label="库存"></el-table-column>
                <el-table-column prop="pay_all_price" label="单价"></el-table-column>
              </el-table>
            </div>
            <div style="text-align: center;margin-top: 20px;">
              <el-button class="my-secondary-btn">取消</el-button>
              <el-button class="my-primary-btn">确定发货</el-button>
            </div>
          </el-dialog>
          <!-- 调拨单--打印-->
          <el-dialog  title="调拨单-打印" width="968px" :center="true">
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
              <el-button class="my-secondary-btn">取消</el-button>
              <el-button class="my-primary-btn">打印</el-button>
            </div>
          </el-dialog>
          <!-- 调拨单--调拨详情-->
          <el-dialog  title="调拨详情" width="968px" :center="true">
            <div>
              <el-steps :active="1" finish-status="success" align-center="true">
                <el-step>
                  <template slot="title" >
                    <div style="color: #303133;font-weight: 700;">调拨(<span style="color: #1A1A1A;font-weight: normal;">总公司</span>)</div>
                  </template>
                  <template slot="description">
                    <span style="color: black;">张三</span>
                    <br>
                    <span style="color: black;">2019-10-12 12：12：12</span>
                  </template>
                </el-step>
                <el-step>
                  <template slot="title" >
                    <div style="color: #303133;font-weight: 700;">发货</div>
                  </template>
                  <template slot="description" >
                    <span style="color: black;">李四</span>
                    <br>
                    <span style="color: black;">2019-10-13 12：12：12</span>
                  </template>
                </el-step>
                <el-step title="">
                  <template slot="title">
                    <div style="color: #303133;font-weight: 700;">确认收货(<span style="color: #1A1A1A;font-weight: normal;">江与城店</span>)</div>
                  </template>
                  <template slot="description" >
                    <span class="font-red">到期时间</span>
                    <br>
                    <span class="font-red">2019-10-13 12：12：12</span>
                  </template>
                </el-step>
              </el-steps>
            </div>
            <div style="margin-top: 30px;">
              <el-table border style="width: 100%;">
                <el-table-column label="序号">序号</el-table-column>
                <el-table-column prop="num" label="商品名称"></el-table-column>
                <el-table-column prop="real_price" label="条形码"></el-table-column>
                <el-table-column prop="real_price" label="当前库存"></el-table-column>
                <el-table-column prop="price" label="调拨数量"></el-table-column>
              </el-table>
            </div>
            <div style="text-align: center;margin-top: 20px;">
              <el-button class="my-secondary-btn">取消</el-button>
              <el-button class="my-primary-btn">取消发货</el-button>
            </div>
            <div style="text-align: center;margin-top: 20px;">
              <el-button class="my-secondary-btn">取消</el-button>
              <el-button class="my-primary-btn">确认收货</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="盘点单" name="2">
          <div>
            <div class="search">
              <el-select  clearable placeholder="选择盘点仓库" >
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
              </el-select>
              <el-select  clearable placeholder="选择状态" >
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
              </el-select>
              <el-date-picker
                type="daterange"
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <el-input style="width: 300px;" placeholder="请输入需查询的订单号/商品名" clearable>
              </el-input>
              <el-button>搜索</el-button>
            </div>
            <div class="search">
              <el-button>导出</el-button>
              <el-button>新增盘点</el-button>
            </div>
          </div>
          <div>
            <el-table  border style="width: 100%;" height="565">
              <el-table-column prop="sn" label="订单号"></el-table-column>
              <el-table-column label="盘点仓库"></el-table-column>
              <el-table-column prop="amount" label="盘点人员"></el-table-column>
              <el-table-column label="盘点时间"></el-table-column>
              <el-table-column label="状态"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="mini">确认盘点</el-button>
                  <el-button type="text" size="mini">编辑</el-button>
                  <el-button type="text" size="mini">详情</el-button>
                  <el-button type="text" size="mini">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 盘点单--新增盘点-->
          <el-dialog  title="新增盘点"  width="968px" :center="true">
            <div style="margin-bottom: 15px;">
              <el-select  clearable placeholder="选择一级分类" ></el-select>
              <el-select  clearable placeholder="选择二级分类" ></el-select>
              <el-input placeholder="请输入需查询的商品名称" style="width: 300px;"></el-input>
              <el-button>查询</el-button>
            </div>
            <div style="margin-bottom: 15px;">
              <el-radio-group >
                <el-radio :label="3">只看未盘点商品</el-radio>
                <el-radio :label="6">全部</el-radio>
              </el-radio-group>
              <el-button style="margin-left:10px; ">新增商品</el-button>
            </div>
            <div>
              <el-table border style="width: 100%;">
                <el-table-column prop="subtitle" label="序号"></el-table-column>
                <el-table-column prop="num" label="商品名称"></el-table-column>
                <el-table-column prop="price" label="一级分类"></el-table-column>
                <el-table-column prop="pay_all_price" label="二级分类"></el-table-column>
                <el-table-column prop="pay_all_price" label="当前库存"></el-table-column>
                <el-table-column prop="pay_all_price" label="盘点库存">
                  <el-input placehoder="请输入盘点库存"></el-input>
                  <span class="font-red">48</span>
                  <span class="font-blue">40</span>
                </el-table-column>
              </el-table>
            </div>
            <div style="margin-top: 15px;">
              <el-form>
                <el-form-item label="备注：" label-width="55px">
                  <el-input placeholder="请输入备注信息"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div style="text-align: center;">
              <el-button class="my-secondary-btn">取消</el-button>
              <el-button class="my-primary-btn">确定</el-button>
            </div>
          </el-dialog>
          <!-- 盘点单--新增调拨 新增商品-->
          <el-dialog  title="选择商品"  width="968px" :center="true">
            <div style="margin-bottom: 15px;">
              <el-input placeholder="请输入商品名称" style="width: 180px;"></el-input>
              <el-input placeholder="请输入条形码" style="width: 180px;"></el-input>
              <el-select  clearable placeholder="选择一级分类" >
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
              </el-select>
              <el-select  clearable placeholder="选择二级分类" >
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
              </el-select>
              <el-button>查询</el-button>
            </div>
            <div>
              <el-table border style="width: 100%;">
                <el-table-column ></el-table-column>
                <el-table-column prop="num" label="商品名称"></el-table-column>
                <el-table-column prop="real_price" label="条形码"></el-table-column>
                <el-table-column prop="price" label="一级分类"></el-table-column>
                <el-table-column prop="pay_all_price" label="二级分类"></el-table-column>
                <el-table-column prop="pay_all_price" label="库存"></el-table-column>
                <el-table-column prop="pay_all_price" label="单价"></el-table-column>
              </el-table>
            </div>
            <div style="text-align: center;margin-top: 20px;">
              <el-button class="my-secondary-btn">取消</el-button>
              <el-button class="my-primary-btn">确定</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="盘亏单" name="3">
          <div>
            <div class="search">
              <el-select  clearable placeholder="选择盘点仓库" >
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
              </el-select>
              <el-select  clearable placeholder="选择状态" >
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
              </el-select>
              <el-date-picker
                type="daterange"
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <el-input style="width: 300px;" placeholder="请输入需查询的订单号/商品名" clearable>
              </el-input>
              <el-button>搜索</el-button>
            </div>
            <div class="search">
              <el-button>导出</el-button>
            </div>
          </div>
          <div>
            <el-table  border style="width: 100%;" height="565">
              <el-table-column prop="sn" label="订单号"></el-table-column>
              <el-table-column label="盘点仓库"></el-table-column>
              <el-table-column prop="amount" label="盘点人员"></el-table-column>
              <el-table-column label="盘点时间"></el-table-column>
              <el-table-column label="状态"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="mini">确认库存</el-button>
                  <el-button type="text" size="mini">编辑</el-button>
                  <el-button type="text" size="mini">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 盘亏单--盘点库存确认-->
          <el-dialog  title="盘点库存确认"   width="968px" :center="true">
            <div style="margin-bottom: 15px;">
              <el-select  clearable placeholder="选择一级分类" >
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
              </el-select>
              <el-select  clearable placeholder="选择二级分类" >
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
              </el-select>
              <el-input placeholder="请输入商品名称" style="width: 180px;"></el-input>
              <el-button>查询</el-button>
            </div>
            <div>
              <el-table border style="width: 100%;">
                <el-table-column ></el-table-column>
                <el-table-column prop="real_price" label="序号"></el-table-column>
                <el-table-column prop="num" label="商品名称"></el-table-column>
                <el-table-column prop="price" label="一级分类"></el-table-column>
                <el-table-column prop="pay_all_price" label="二级分类"></el-table-column>
                <el-table-column prop="pay_all_price" label="当前库存"></el-table-column>
                <el-table-column prop="pay_all_price" label="盘点库存">
                  <span class="font-blue">12</span>
                  <span class="font-red">11</span>
                </el-table-column>
                <el-table-column prop="pay_all_price" label="备注">
                  <el-input type="text" placeholder="请输入备注"></el-input>
                </el-table-column>
              </el-table>
            </div>
            <div style="margin-top: 15px;">
              <el-form>
                <el-form-item label="备注：" label-width="55px">
                  <el-input placeholder="请输入备注信息"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div style="text-align: center;margin-top: 20px;">
              <el-button class="my-secondary-btn">取消</el-button>
              <el-button class="my-primary-btn">确定</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="盘盈单" name="4">
          <div>
            <div class="search">
              <el-select  clearable placeholder="选择盘点仓库" >
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
              </el-select>
              <el-select  clearable placeholder="选择状态" >
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
              </el-select>
              <el-date-picker
                type="daterange"
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <el-input style="width: 300px;" placeholder="请输入需查询的订单号/商品名" clearable>
              </el-input>
              <el-button>搜索</el-button>
            </div>
            <div class="search">
              <el-button>导出</el-button>
            </div>
          </div>
          <div>
            <el-table  border style="width: 100%;" height="565">
              <el-table-column prop="sn" label="订单号"></el-table-column>
              <el-table-column label="盘点仓库"></el-table-column>
              <el-table-column prop="amount" label="盘点人员"></el-table-column>
              <el-table-column label="盘点时间"></el-table-column>
              <el-table-column label="状态"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="mini">确认库存</el-button>
                  <el-button type="text" size="mini">编辑</el-button>
                  <el-button type="text" size="mini">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 盘盈单--盘点库存确认-->
          <el-dialog  title="盘点库存确认" :visible.sync="show"  width="968px" :center="true">
            <div style="margin-bottom: 15px;">
              <el-select  clearable placeholder="选择一级分类" >
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
              </el-select>
              <el-select  clearable placeholder="选择二级分类" >
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
                <el-option
                  label="item.name"
                  value="item.id">
                </el-option>
              </el-select>
              <el-input placeholder="请输入商品名称" style="width: 180px;"></el-input>
              <el-button>查询</el-button>
            </div>
            <div>
              <el-table border style="width: 100%;">
                <el-table-column ></el-table-column>
                <el-table-column prop="real_price" label="序号"></el-table-column>
                <el-table-column prop="num" label="商品名称"></el-table-column>
                <el-table-column prop="price" label="一级分类"></el-table-column>
                <el-table-column prop="pay_all_price" label="二级分类"></el-table-column>
                <el-table-column prop="pay_all_price" label="当前库存"></el-table-column>
                <el-table-column prop="pay_all_price" label="盘点库存">
                  <span class="font-blue">12</span>
                  <span class="font-red">11</span>
                </el-table-column>
                <el-table-column prop="pay_all_price" label="备注">
                  <el-input type="text" placeholder="请输入备注"></el-input>
                </el-table-column>
              </el-table>
            </div>
            <div style="margin-top: 15px;">
              <el-form>
                <el-form-item label="备注：" label-width="55px">
                  <el-input placeholder="请输入备注信息"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div style="text-align: center;margin-top: 20px;">
              <el-button class="my-secondary-btn">取消</el-button>
              <el-button class="my-primary-btn">确定</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "InventoryManage", //库存管理，进销存
      data(){
        return{
          show:true,//
          type:"4",//1=调拨单，2=盘点单，3=盘亏单，4=盘盈单
        }
      },
      methods:{
        //tab切换
        handleClick (tab, event) {
          console.log(tab, event)
        },
      }
    }
</script>

<style lang="less" scoped>
.inventory-manage{

}
</style>
