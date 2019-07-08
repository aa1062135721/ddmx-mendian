<!--suppress ALL -->
<template>
    <div class="bg">
      <v-head></v-head>
      <div style="padding: 10px 20px;">
        <el-row :gutter="20">
          <el-col :span="14">
            <div class="grid-content all-goods">
              <div class="goods-type clear-both">
                <el-button class="fenlei-button float-left" :class="{'fenlei-button-active':requestFuwuGoodData.isChooeseFuwuGood}" @click="clickFuwuGood">服务项目</el-button>
                <el-button class="page-fenlei-button float-left" icon="el-icon-arrow-left" @click="clickFenleiBtnPre"></el-button>
                <div class='type-btn'>
                  <el-button v-for="(item) in requestGoodData.typeNameList"  :key="item.id" class="fenlei-button" :class="{'fenlei-button-active':(requestGoodData.isChooeseFenleiGood && requestGoodData.who === item.id)}" @click="clickFenleiBtn(item.id)">{{ item.cname }}</el-button>
                </div>
                <el-button class="page-fenlei-button float-right" icon="el-icon-arrow-right" @click="clickFenleiBtnNext"></el-button>
              </div>
              <div class="flex-goods">
                  <v-good v-for="(item) in goodsList" :key="item.id" :ogood="item" class="goods"></v-good>
                </div>
                <div class="page-buttons">
                <button class="page-button" @click="clickPrePageBtn">上一页</button>
                <button class="page-button"  @click="clickNextPageBtn">下一页</button>
              </div>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content caozuo-buttons">
              <el-button class="caozuo-button" type="primary" style="font-size: 45px;">&nbsp;&nbsp;+&nbsp;&nbsp;</el-button>
              <br><br>
              <el-button class="caozuo-button" type="primary">&nbsp;&nbsp;-&nbsp;&nbsp;</el-button>
              <br><br>
              <el-button @click="xiugaishuliang = true" class="caozuo-button" type="primary">数量</el-button>
              <br><br>
              <el-button @click="xiugaijiage = true" class="caozuo-button" type="primary">改价</el-button>
              <br><br>
              <el-button class="caozuo-button" type="primary">删除</el-button>
              <br><br>
              <el-button @click="chongzhiDialog.isShow = true" class="caozuo-button" type="primary">充值</el-button>
              <br><br>
              <el-button @click="huiyuanDialog.isShow = true" class="caozuo-button" type="primary">会员</el-button>
              <br><br>
              <el-button class="caozuo-button" type="primary">购卡</el-button>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple jiesuan-goods" >
              <div class="search">
                <el-input class="goods-search"  @keyup.enter.native="getGoodByCondition" placeholder="商品名称/条形码"  v-model="sousuoshangpingDialog.title">
                  <el-button slot="append" icon="el-icon-search" @click="getGoodByCondition"></el-button>
                </el-input>
              </div>
              <div class="pay-goods-box">
                <ul>
                  <li class="title clear-both">
                    <span class="float-left">衡欣牌新姿态粉 原蛋白益生菌</span>
                    <span class="float-right">数量 1</span>
                  </li>
                  <li class="title code clear-both">
                    <span class="float-left">1234567890123431373</span>
                    <span class="float-right red">￥300.00</span>
                  </li>
                  <li class="title">
                    <span class="red danjia">￥300.00</span>
                    <span class="yuanjia">原价￥600.00</span>
                    <span class="huiyuanjia">会员价￥216.50</span>
                  </li>
                </ul>

              </div>
              <div class="queren-xinxi">
                <ul>
                  <li>
                    <span class="float-left">服务人员</span>
                    <span class="float-right select">
                      <el-dropdown class="user-name" trigger="click" @command="clickWaiter()">
                        <span class="el-dropdown-link"  @click="getWaiterList()">
                          <span class="font-blue">张三</span> [婴儿游泳]  <i class="el-icon-arrow-down"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <!--todo-->
                          <el-dropdown-item v-for="(item) in waiter" :key="item.id" :command="item">
                            <span class="font-blue">{{item.name}}</span>
                            [{{item.type}}]
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </span>
                  </li>
                  <li>
                    <span class="float-left">会员&nbsp;<span class="font-blue">李四</span></span>
                    <span class="float-right">余额￥866.00</span>
                  </li>
                  <li>
                    <span class="float-left">合计</span>
                    <span  class="float-right">￥600.00</span>
                  </li>
                  <li>
                    <span class="float-left">折扣</span>
                    <span  class="float-right">100%</span>
                  </li>
                  <li>
                    <span class="float-left">优惠</span>
                    <span  class="float-right font-blue">-￥5.00</span>
                  </li>
                  <li>
                    <span class="float-left">结算</span>
                    <span class="float-right">￥600.00</span>
                  </li>
                </ul>
                <div class="buttons">
                  <button @click="xuanzehuiyuanDialog.isShow = true" class="my-btn">选择会员</button>
                  <button @click="jiezhang = true"  class="my-btn">结账</button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <!--修改价格弹框-->
      <el-dialog class="gaijia-tanchuan" title="修改价格" :visible.sync="xiugaijiage" width="434px" :center="true">
        <div>
          <el-input class="gaijia-input" placeholder="请输入内容" clearable></el-input>
          <div class="clear-both" style="height: 290px;">
            <div class="float-left">
              <v-keyboard></v-keyboard>
            </div>
            <div class="float-right">
              <el-button class="gaijia-queding-btn">确定</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
      <!--修改数量弹框-->
      <el-dialog class="gaijia-tanchuan" title="修改数量" :visible.sync="xiugaishuliang" width="434px" :center="true">
        <div>
          <el-input class="gaijia-input" placeholder="请输入内容" clearable></el-input>
          <div class="clear-both" style="height: 290px;">
            <div class="float-left">
              <v-keyboard></v-keyboard>
            </div>
            <div class="float-right">
              <el-button class="gaijia-queding-btn">确定</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
      <!--充值按钮弹框-->
      <el-dialog class="chongzhi-tanchuan" title="充值" :visible.sync="chongzhiDialog.isShow" width="750px" :center="true">
        <div class="clear-both both">
          <div class="float-left left">
            <div class="one">
              <el-input v-model="chongzhiDialog.mobile" placeholder="请输入会员手机号" clearable maxlength="11"></el-input>
            </div>
            <div class="two">
              <ul>
                <li>
                  <span class="float-left">会员</span>
                  <span class="float-right font-blue">{{ chongzhiDialog.huiyuanInfo.nickname }}</span>
                </li>
                <li>
                  <span class="float-left">累积充值</span>
                  <span class="float-right">¥ {{ chongzhiDialog.huiyuanInfo.amount }}</span>
                </li>
                <li>
                  <span class="float-left">余额</span>
                  <span class="float-right font-red">¥ {{ chongzhiDialog.huiyuanInfo.money }}</span>
                </li>
                <li>
                  <span class="float-left">会员等级</span>
                  <span class="float-right">三星会员&nbsp;<i class="el-icon-question font-blue" @click="chongzhiDialog.isShowHuiyuanDengjiDialog = true"></i></span>
                </li>
              </ul>
            </div>
            <div class="three">
              <el-radio-group v-model="chongzhiDialog.payType">
                <el-radio label="现金">现价</el-radio>
                <el-radio label="微信">微信</el-radio>
                <el-radio label="支付宝">支付宝</el-radio>
                <el-radio label="银行卡">银行卡</el-radio>
              </el-radio-group>
            </div>
            <div class="four">
              <el-input v-model="chongzhiDialog.payMoney" placeholder="请输入充值金额" clearable></el-input>
            </div>
          </div>
          <div class="float-right right">
            <v-keyboard></v-keyboard>
            <el-button class="queding-chongzhi">确定充值</el-button>
          </div>
        </div>
      </el-dialog>
      <!--会员等级说明弹框-->
      <el-dialog class="huiyuandengjishuoming-tanchuan" title="会员等级说明" :visible.sync="chongzhiDialog.isShowHuiyuanDengjiDialog" width="372px" :center="true">
        <div class="content">
          <span>三星会员：充值200</span>
          <span>四星会员：充值200</span>
          <span>五星会员：充值200</span>
          <span>六星会员：充值200</span>
          <span>七星会员：充值200</span>
        </div>
      </el-dialog>
      <!--结账弹框-->
      <el-dialog class="jiezhang-tanchuan" title="结账" :visible.sync="jiezhang" width="780px" :center="true">
        <div class="clear-both box">
          <div class="float-left my-left">
            <ul>
              <li class="clear-both">
                <span class="float-left">应收</span>
                <span class="float-right font-red">¥ 600</span>
              </li>
              <li class="clear-both">
                <span class="float-left">代金券</span>
                <span class="float-right">¥ 20</span>
              </li>
              <li class="clear-both">
                <span class="float-left">改价</span>
                <span class="float-right">¥ 10</span>
              </li>
              <li class="clear-both">
                <span class="float-left"><span>会员</span> <span class="font-blue">李四</span></span>
                <span class="float-right">余额：¥ 300</span>
              </li>
              <li class="clear-both">
                <span class="float-left"><span>服务人员</span> <span class="font-blue">张三</span></span>
                <span class="float-right"></span>
              </li>
            </ul>
            <div class="div">
              <button>取消</button>
              <button>确认结账</button>
            </div>
          </div>
          <div class="float-right my-right">
            <div class="div">
              <span class="span-btn">
                <img src="../../assets/icon/checkout-huiyuanka.png" alt="">
                <span>会员卡</span>
              </span>
              <span class="span-btn closed">
                <img src="../../assets/icon/checkout-xianjing.png" alt="">
                <span>现金</span>
              </span>
            </div>
            <div class="div">
              <span class="span-btn active">
                <img src="../../assets/icon/checkout-weixin.png" alt="">
                <span>微信</span>
              </span>
              <span class="span-btn">
                <img src="../../assets/icon/checkout-zhifubao.png" alt="">
                <span>支付宝</span>
              </span>
            </div>
             <div class="div">
               <span class="span-btn">
                <img src="../../assets/icon/checkout-yinhangka.png" alt=""><span>银行卡</span>
               </span>
               <span class="span-btn">
                <img src="../../assets/icon/checkout-meituan.png" alt=""><span>美团</span>
              </span>
             </div>
             <div class="div">
               <span class="span-btn">
                <img src="../../assets/icon/checkout-zengpin-sel.png" alt=""><span>赠送</span>
               </span>
               <span class="span-btn">
                <img src="../../assets/icon/checkout-mendian.png" alt=""><span>门店自用</span>
               </span>
             </div>
          </div>
        </div>
      </el-dialog>
      <!-- 搜索商品弹框 -->
       <el-dialog class="sousuoshangping-tanchuan" title="搜索商品" :visible.sync="sousuoshangpingDialog.isShow" width="660px" :center="true">
        <div class="content">
          <div class="clear-both" style="width:100%;height:52px;margin-bottom: 20px;">
            <div class="float-left" style="width: 75%;">
              <el-input  placeholder="请输入您需要查询的商品名字" v-model="sousuoshangpingDialog.title"></el-input>
            </div>
            <div class="float-right"  style="width: 20%;text-align: right;">
              <el-button type="primary" plain @click="getGoodByCondition">搜索</el-button>
            </div>
          </div>
          <div>
            <el-table :data="sousuoshangpingDialog.goodsList" height="250" border style="width: 100%">
              <el-table-column prop="title" label="名称" width="180"></el-table-column>
              <el-table-column prop="stock" label="库存"></el-table-column>
              <el-table-column prop="price" label="单价"></el-table-column>
              <el-table-column prop="price" label="会员价"></el-table-column>
              <el-table-column label="操作"><el-button type="primary">确定</el-button></el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>
      <!-- 选择会员弹框 -->
      <el-dialog class="xuanzehuiyuan-tanchuan" title="选择会员" :visible.sync="xuanzehuiyuanDialog.isShow" width="810px" :center="true">
        <div class="clear-both div">
            <div class="float-left left">
              <div class="search">
                <el-input v-model="xuanzehuiyuanDialog.mobile" placeholder="请输入会员手机号" maxlength="11"></el-input>
              </div>
              <div class="content">
                <ul>
                  <li><span class="float-left">会员</span><span class="float-right font-blue">{{xuanzehuiyuanDialog.huiyuanInfo.nickname}}</span></li>
                  <li><span class="float-left">余额</span><span class="float-right font-red">￥{{xuanzehuiyuanDialog.huiyuanInfo.money}}</span></li>
                  <li><span class="float-left">会员等级</span><span class="float-right">{{xuanzehuiyuanDialog.huiyuanInfo.level_name}}</span></li>
                  <li>
                    <span class="float-left">服务卡</span>
                    <span class="float-right">
                      <el-badge value="3">
                        <el-button size="mini">查看</el-button>
                      </el-badge>
                    </span>
                  </li>
                  <li style="margin-top: 20px;">
                    <span class="float-left">代金卷</span>
                    <span class="float-right">
                      <el-badge value="无">
                        <el-button size="mini">查看</el-button>
                      </el-badge>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="float-right right">
              <v-keyboard-without-point-with-ok></v-keyboard-without-point-with-ok>
            </div>
          </div>
      </el-dialog>
      <!--  会员按钮弹框-会员查询 -->
      <el-dialog class="huiyuanchaxun-tanchuan" title="会员查询" :visible.sync="huiyuanDialog.isShow" width="960px" :center="true">
        <div class="content">
          <div class="clear-both header">
            <div class="float-left left">
              <div class="search-btns">
                <el-button type="primary" @click="huiyuanDialog.addHuiyuanDialog.isShow = true">新增会员</el-button>
                <el-input style="width:392px;" v-model="huiyuanDialog.mobile" placeholder="请输入您需要查询的会员手机号码"></el-input>
                <el-button  plain>搜索</el-button>
              </div>
              <div class="user-info el-table--border">
                <table class="el-table el-table__body" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td colspan="3">手机号：{{ huiyuanDialog.huiyuanInfo.mobile }}</td>
                    <td colspan="2">姓名：<span class="font-blue">{{ huiyuanDialog.huiyuanInfo.nickname }}</span></td>
                    <td colspan="2">会员等级：{{ huiyuanDialog.huiyuanInfo.level_name }}</td>
                  </tr>
                  <tr>
                    <td colspan="4">累计充值：{{ huiyuanDialog.huiyuanInfo.amount }} 余额：<span class="font-red">¥ {{ huiyuanDialog.huiyuanInfo.money }}</span></td>
                    <td colspan="3">加入时间：{{ huiyuanDialog.huiyuanInfo.regtime }}</td>
                  </tr>
                </table>
              </div>
              <div class="tab-btns">
                <el-button :class="{'active':!huiyuanDialog.showFuwuTable}" @click="huiyuanDialog.showFuwuTable = false">充值记录</el-button>
                <el-button :class="{'active':huiyuanDialog.showFuwuTable}" @click="huiyuanDialog.showFuwuTable = true">服务卡</el-button>
              </div>
            </div>
            <div class="float-right right">
              <v-keyboard-without-point></v-keyboard-without-point>
            </div>
          </div>
          <div class="my-table">
            <!-- 服务卡 -->
            <el-table v-show="huiyuanDialog.showFuwuTable" :data="huiyuanDialog.fuwukaList" min-height="216" border style="width: 100%">
              <el-table-column prop="card_name" label="服务卡名称" width="180"></el-table-column>
              <el-table-column prop="real_price" label="购买金额"></el-table-column>
              <el-table-column prop="price" label="项目服务"></el-table-column>
              <el-table-column prop="type_card" label="类型"></el-table-column>
              <el-table-column prop="create_time" label="购买时间"></el-table-column>
              <el-table-column prop="start_time" label="激活时间"></el-table-column>
              <el-table-column prop="end_time" label="过期时间"></el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
              <el-table-column label="操作">
                <el-button size="mini" @click="huiyuanDialog.haokaDialog.isShow = true">耗卡</el-button>
                <el-button size="mini" @click="huiyuanDialog.shiyongjiluDialog.isShow = true">使用记录</el-button>
                <el-button size="mini">激活</el-button>
                <el-button size="mini" @click="huiyuanDialog.tuikaDialog.isShow = true">退卡详情</el-button>
              </el-table-column>
            </el-table>
            <!-- 充值记录 -->
            <el-table v-show="!huiyuanDialog.showFuwuTable" :data="huiyuanDialog.chongzhijiluList" min-height="216" border style="width: 100%">
              <el-table-column prop="nickname" label="会员" width="180"></el-table-column>
              <el-table-column prop="chongzhijine" label="充值金额"></el-table-column>
              <el-table-column prop="daozhangjine" label="到账金额"></el-table-column>
              <el-table-column prop="xianzhiyaoqiu" label="限制要求"></el-table-column>
              <el-table-column prop="fuwurenyuan" label="服务人员"></el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
              <el-table-column prop="create_time" label="充值时间"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>
      <!-- 会员查询-新增会员-->
      <el-dialog title="新增会员" :visible.sync="huiyuanDialog.addHuiyuanDialog.isShow" width="688px" :center="true">
        <div class="clear-both" style="height: 290px;">
          <div class="float-left left" style="width: 50%;">
              <div style="margin-bottom: 48px;">
                <el-input v-model="huiyuanDialog.addHuiyuanDialog.mobile" placeholder="请输入会员手机号码" maxlength="11"></el-input>
              </div>
              <div>
                <el-input v-model="huiyuanDialog.addHuiyuanDialog.nickname"  placeholder="请输入会员昵称"></el-input>
              </div>
          </div>
          <div class="float-right right" style="width: 45%;">
            <v-keyboard-without-point-with-ok></v-keyboard-without-point-with-ok>
          </div>
        </div>
      </el-dialog>
      <!-- 会员查询-耗卡  -->
      <el-dialog title="耗卡" :visible.sync="huiyuanDialog.haokaDialog.isShow" width="648px" :center="true">
        <div style="height: 240px;">
          <el-table :data="huiyuanDialog.haokaDialog.tableData" border  style="height: 240px;">
            <el-table-column prop="name" label="服务项目" width="180"></el-table-column>
            <el-table-column prop="haveTimes" label="次数" width="180"></el-table-column>
            <el-table-column prop="haisheng" label="剩余次数" width="180"></el-table-column>
            <el-table-column prop="caozuo" label="操作" width="180"></el-table-column>
          </el-table>
        </div>
      </el-dialog>
      <!-- 会员查询-使用记录  -->
      <el-dialog title="使用记录" :visible.sync="huiyuanDialog.shiyongjiluDialog.isShow" width="648px" :center="true">
        <div style="height: 240px;">
          <el-table :data="huiyuanDialog.shiyongjiluDialog.tableData" border  style="height: 240px;">
            <el-table-column prop="name" label="服务项目"></el-table-column>
            <el-table-column prop="time" label="使用时间"></el-table-column>
            <el-table-column prop="who" label="服务人员"></el-table-column>
          </el-table>
        </div>
      </el-dialog>
      <!-- 会员查询-退卡详情   -->
      <el-dialog title="退卡详情" :visible.sync="huiyuanDialog.tuikaDialog.isShow" width="976px" :center="true">
        <div style="height: 240px;">
          <el-table :data="huiyuanDialog.tuikaDialog.tableData" border>
            <el-table-column prop="name" label="服务卡名"></el-table-column>
            <el-table-column prop="time" label="退卡时间"></el-table-column>
            <el-table-column prop="money" label="退卡金额"></el-table-column>
            <el-table-column prop="why" label="退卡原因"></el-table-column>
            <el-table-column prop="reg" label="备注"></el-table-column>
            <el-table-column prop="who" label="操作人员"></el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import vHead from '../common/Header.vue'
import vGood from '../common/Good.vue'
import vKeyboard from '../common/Keyboard.vue'
import vKeyboardWithoutPointWithOk from '../common/Keyboard-without-point-with-ok'
import vKeyboardWithoutPoint from '../common/Keyboard-without-point'
import { postTwotype, postGoods, postGoodsByCode, postServiceItemList, postWaiter } from '../../api/getData'

export default {
  name: 'Money',
  data () {
    return {
      // 服务商品
      requestFuwuGoodData: {
        isChooeseFuwuGood: true, // 是否选择服务商品
        page: 1, // 当前页码
        num: 15// 每页的数据
      },
      goodsList: [], // 收银大屏展示的商品列表（普通商品和服务商品）
      chooeseGoods: [], // 结账中的商品
      // 普通商品
      requestGoodData: {// 请求商品列表中的页数，页码服务器数据
        typeNameList: [], // 分类列表
        isChooeseFenleiGood: false, // 是否选择分类商品
        page: 1, // 当前页码
        num: 15, // 每页的数据
        who: 0, // 当前选中的分类名id
        type_category: 0
      },
      // 当前选中的会员信息
      memberVip: {
        id: 5110, // 会员id
        mobile: '13637765376', // 会员电话
        shop_code: 'A00036', // 所属门店的门店编号
        level_id: 6, // 会员等级id
        nickname: '荣柱', // 姓名
        level_name: '七星会员', // 会员等级名称
        money: '0.00', // 余额
        amount: '0.05', // 累积充值
        regtime: '1970-01-01 08:33:37' // 加入时间
      },
      // 服务人员列表
      waiter: [
        {
          id: 0, // 服务员id  当服务员的id为0师表示为当前登录的店长
          name: '管理员', // 服务员名称
          type: '店长' // 服务类型
        }
      ],
      xiugaijiage: false, // 修改价格弹窗显示与否
      xiugaishuliang: false, // 修改数量弹窗显示与否
      jiezhang: false, // 结账对话框显示与否
      sousuoshangpingDialog: {
        isShow: false, // 搜索商品弹窗显示与否
        title: '', // 搜索商品标题，这里是标题，不是条形码，如果是条形码，点击按钮直接添加到购物车
        goodsList: [
          {
            id: 1730, // 商品id
            title: '美杰紫色毛巾', // 商品名称
            price: '7.00', // 商品的原价，现价
            bar_code: '2300201800208', // 商品条形码
            pics: 'http://picture.ddxm661.com/9a47a20190318164340290', // 商品的图片
            stock: 10// 商品的库存
          }
        ] // 按标题搜索商品后得到的结果
      },
      // 单击会员按钮后的弹窗所需要的数据
      huiyuanDialog: {
        isShow: false, // 是否显示会员查询对话框
        mobile: '', // 要查询的会员手机号码
        // 会员信息
        huiyuanInfo: {
          id: 5110, // 会员id
          mobile: '13637765376', // 会员电话
          shop_code: 'A00036', // 所属门店的门店编号
          level_id: 6, // 会员等级id
          nickname: '荣柱', // 姓名
          level_name: '七星会员', // 会员等级名称
          money: '0.00', // 余额
          amount: '0.05', // 累积充值
          regtime: '1970-01-01 08:33:37'// 加入时间
        },
        // 新增会员对话框
        addHuiyuanDialog: {
          isShow: false, // 新增会员对话框是否显示
          mobile: '',
          nickname: ''
        },
        // 展示服务卡购买记录
        showFuwuTable: false,
        // 会员查询弹框里的表格-数据为 服务卡购买记录
        fuwukaList: [
          {
            id: 1,
            card_name: '艾灸推拿1艾灸推拿1艾灸推拿1艾灸推拿1艾灸推拿1',
            type: 1,
            real_price: 100.00,
            month: 2,
            year: 2019,
            create_time: '2019-07-03 11:47:15',
            start_time: '未激活',
            end_time: '2019-07-13 11:47:15',
            over_time: 1562989635,
            status: 0,
            type_card: '次卡',
            status_name: '未激活'
          },
          {
            id: 1,
            card_name: '艾灸推拿1艾灸推拿1艾灸推拿1艾灸推拿1艾灸推拿1',
            type: 1,
            real_price: 100.00,
            month: 2,
            year: 2019,
            create_time: '2019-07-03 11:47:15',
            start_time: '未激活',
            end_time: '2019-07-13 11:47:15',
            over_time: 1562989635,
            status: 0,
            type_card: '次卡',
            status_name: '未激活'
          }
        ],
        // 会员充值记录
        chongzhijiluList: [
          {
            id: 1,
            nickname: '会员名',
            create_time: '2019-07-03 11:47:15',
            status: '成功',
            fuwurenyuan: '张三',
            chongzhijine: 300,
            daozhangjine: 300,
            xianzhiyaoqiu: '无限制'
          }
        ],
        // 耗卡弹窗
        haokaDialog: {
          isShow: false,
          tableData: [
            {name: '水域', haveTimes: 100, haisheng: 5, caozuo: 0},
            {name: '水域', haveTimes: 100, haisheng: 5, caozuo: 0},
            {name: '水域', haveTimes: 100, haisheng: 5, caozuo: 0},
            {name: '水域', haveTimes: 100, haisheng: 5, caozuo: 0},
            {name: '水域', haveTimes: 100, haisheng: 5, caozuo: 0},
          ]
        },
        // 使用记录弹窗
        shiyongjiluDialog: {
          isShow: false,
          tableData: [
            {name: '水育', time: '2018-09-20 14:12:20', who: 5},
            {name: '水域', time: '2018-09-20 14:12:20', who: 5},
            {name: '水域', time: '2018-09-20 14:12:20', who: 5},
            {name: '水域', time: '2018-09-20 14:12:20', who: 5},
            {name: '水域', time: '2018-09-20 14:12:20', who: 5},
          ]
        },
        // 退卡详情
        tuikaDialog: {
          isShow: false,
          tableData: [
            {name: '水育', time: '2018-09-20 14:12:20', who: '店长', money: 11.2, why: '不想用了',reg: '无'},
            {name: '水育', time: '2018-09-20 14:12:20', who: '店长', money: 11.2, why: '不想用了',reg: '无'},
            {name: '水育', time: '2018-09-20 14:12:20', who: '店长', money: 11.2, why: '不想用了',reg: '无'},
            {name: '水育', time: '2018-09-20 14:12:20', who: '店长', money: 11.2, why: '不想用了',reg: '无'}
          ]
        }
      },
      // 单击充值按钮后的弹窗所需要的数据
      chongzhiDialog: {
        isShow: false, // 充值弹窗显示与否
        mobile: '',
        huiyuanInfo: {
          id: 5110, // 会员id
          mobile: '13637765376', // 会员电话
          shop_code: 'A00036', // 所属门店的门店编号
          level_id: 6, // 会员等级id
          nickname: '荣柱', // 姓名
          level_name: '七星会员', // 会员等级名称
          money: '0.00', // 余额
          amount: '0.05', // 累积充值
          regtime: '1970-01-01 08:33:37'// 加入时间
        },
        isShowHuiyuanDengjiDialog: false, // 等级说明弹框显示与否
        payType: '', // 充值方式
        payMoney: 0 // 充值金额
      },
      // 选择会员弹框是否显示
      xuanzehuiyuanDialog: {
        isShow: false,
        mobile: '',
        huiyuanInfo: {
          id: 5110, // 会员id
          mobile: '13637765376', // 会员电话
          shop_code: 'A00036', // 所属门店的门店编号
          level_id: 6, // 会员等级id
          nickname: '荣柱', // 姓名
          level_name: '七星会员', // 会员等级名称
          money: '0.00', // 余额
          amount: '0.05', // 累积充值
          regtime: '1970-01-01 08:33:37'// 加入时间
        }
      }
    }
  },
  components: {
    vHead, vGood, vKeyboard, vKeyboardWithoutPointWithOk, vKeyboardWithoutPoint
  },
  mounted () {
    this.getGoodsType()
    this.getServiceItemList()
  },
  methods: {
    // 获取分类
    getGoodsType () {
      postTwotype().then((res) => {
        this.requestGoodData.typeNameList = res.data
      }).catch((err) => {
        console.log(err, '分类列表获取失败')
      })
    },
    // 获取商品列表
    getGoods () {
      let data = {}
      data.page = `${this.requestGoodData.page},${this.requestGoodData.num}`
      if (this.requestGoodData.who) {
        data.type = this.requestGoodData.who
      }
      if (this.requestGoodData.title) {
        data.title = this.requestGoodData.title
      }
      if (this.requestGoodData.type_category) {
        data.type_category = this.requestGoodData.type_category
      }
      postGoods(data).then((res) => {
        if (res.data.length === 0) {
          if (this.requestGoodData.page === 1) {
            this.goodsList = res.data
          } else {
            this.requestGoodData.page -= 1
          }
        } else {
          this.goodsList = res.data
        }
      }).catch((err) => {
        console.log(err, '商品获取失败')
      })
    },
    // 获取服务商品
    getServiceItemList () {
      let data = {}
      data.page = `${this.requestFuwuGoodData.page},${this.requestFuwuGoodData.num}`
      data.vip_rank = this.memberVip.level_id
      postServiceItemList(data).then((res) => {
        if (res.data.length === 0) {
          if (this.requestFuwuGoodData.page !== 1) {
            this.requestFuwuGoodData.page -= 1
          }
        } else {
          this.goodsList = res.data
        }
      }).catch((err) => {
        console.log(err, '服务商品获取失败')
      })
    },
    // 是否选择服务商品
    clickFuwuGood () {
      this.requestGoodData.isChooeseFenleiGood = false
      this.requestFuwuGoodData.isChooeseFuwuGood = true
      this.requestFuwuGoodData.page = 1
      this.getServiceItemList()
    },
    // 点击了分类商品按钮
    clickFenleiBtn (id) {
      this.requestGoodData.page = 1
      this.requestGoodData.who = id
      this.requestGoodData.type_category = 1
      this.requestFuwuGoodData.isChooeseFuwuGood = false
      this.requestGoodData.isChooeseFenleiGood = true
      this.getGoods()
    },
    // 点击了分类按钮中的上一个
    clickFenleiBtnPre () {
      for (let i = 0; i < this.requestGoodData.typeNameList.length; i++) {
        if (this.requestGoodData.typeNameList[i].id === this.requestGoodData.who) {
          if (i === 0) {
            this.requestGoodData.who = this.requestGoodData.typeNameList[this.requestGoodData.typeNameList.length - 1].id
          } else {
            this.requestGoodData.who = this.requestGoodData.typeNameList[i - 1].id
          }
          this.clickFenleiBtn (this.requestGoodData.who)
          break
        }
      }
    },
    // 点击了分类按钮中的下一个
    clickFenleiBtnNext () {
      for (let i = 0; i < this.requestGoodData.typeNameList.length; i++) {
        if (this.requestGoodData.typeNameList[i].id === this.requestGoodData.who) {
          if (i === this.requestGoodData.typeNameList.length - 1) {
            this.requestGoodData.who = this.requestGoodData.typeNameList[0].id
          } else {
            this.requestGoodData.who = this.requestGoodData.typeNameList[i + 1].id
          }
          this.clickFenleiBtn (this.requestGoodData.who)
          break
        }
      }
    },
    // 点击了上一页
    clickPrePageBtn () {
      // 服务商品
      if (this.requestFuwuGoodData.isChooeseFuwuGood) {
        if (this.requestFuwuGoodData.page > 1) {
          this.requestFuwuGoodData.page = this.requestFuwuGoodData.page - 1
          this.getServiceItemList()
        }
      } else {
        if (this.requestGoodData.page > 1) {
          this.requestGoodData.page = this.requestGoodData.page - 1
          this.getGoods()
        }
      }
    },
    // 点击了下一页
    clickNextPageBtn () {
      // 服务商品
      if (this.requestFuwuGoodData.isChooeseFuwuGood) {
        this.requestFuwuGoodData.page = this.requestFuwuGoodData.page + 1
        this.getServiceItemList()
      } else {
        this.requestGoodData.page = this.requestGoodData.page + 1
        this.getGoods()
      }
    },
    // 选择服务人员
    getWaiterList () {
      postWaiter().then((res) => {
        this.waiter = res.data
      }).catch((err) => {
        console.log(err, '服务人员获取失败')
      })
    },
    clickWaiter (e) {
      console.log(e)
    },
    // 按搜索商品(商品标题和条形码)
    getGoodByCondition (str) {
      if (this.sousuoshangpingDialog.title.length === 0) {
        alert('请输入内容')
        return
      }
      if (/^[0-9]+$/.test(this.sousuoshangpingDialog.title)) {
        // alert('全部是数字')
        this.searchGoodsByGoodCode()
      } else {
        this.sousuoshangpingDialog.isShow = true
        // alert('非纯数字')
        this.searchGoodsByGoodName()
      }
    },
    // 搜索商品按商品名
    searchGoodsByGoodName () {
      let data = {}
      data.title = `${this.sousuoshangpingDialog.title}`
      postGoods(data).then((res) => {
        this.sousuoshangpingDialog.goodsList = res.data
      }).catch((err) => {
        console.log(err, '搜索商品失败')
      })
    },
    // 搜索商品按商品条形码
    searchGoodsByGoodCode () {
      let data = {}
      data.bar_code = `${this.sousuoshangpingDialog.title}`
      postGoodsByCode(data).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err, '按条形码搜索商品失败')
      })
    }
  }
}
</script>

<style lang="less">
  .bg{
    height: 100%;
    width: 100%;
    background:#a6c9e2;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    /*background: #99a9bf;*/
  }
  .bg-purple {
    /*background: #d3dce6;*/
    height: 100%;
  }
  .bg-purple-light {
    /*background: #e5e9f2;*/
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    /*background-color: #f9fafc;*/
  }
  .all-goods{
    height: calc(100vh - 110px);
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap;
    flex-direction:column;
    .goods-type{
      height: 54px;
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      justify-content: space-between;
      .type-btn{
        width:800px;
        overflow: hidden;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
      }
      .fenlei-button{
        font-size:20px!important;
        width:138px;
        height:54px;
        border: 0!important;
        background:rgba(107,210,244,1)!important;
        border-radius:10px;
        color:rgba(26,26,26,1)!important;
        font-family:SourceHanSansCN-Regular;
        font-size:20px;
      }
      .fenlei-button-active{
        background:rgba(245,86,86,1)!important;
        color:rgba(255,255,255,1)!important;
      }
      .page-fenlei-button{
        width:58px;
        height:52px;
        background:rgba(107,210,244,1);
        border-radius:4px;
        border: 0;color:rgba(125,125,125,1);
      }
    }
    .flex-goods{
      height: 700px;
      /*height: 100%;*/
      min-height: 700px;
      max-height: 885px;
      overflow-y: scroll;
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap:wrap;
      align-items:flex-start;
      justify-content: space-between;
      align-content:flex-start;
      .goods{
        margin-bottom: 16px;
      }
    }
    .page-buttons{
      text-align: center;
      width: 100%;
      height: 32px;
      .page-button{
        width:84px;
        height:32px;
        background:rgba(245,245,245,1)!important;
        border-radius:4px;
        font-size:18px!important;
        border: 0;
        font-family:SourceHanSansCN-Regular;
        font-weight:400;
        color:rgba(26,26,26,1)!important;
        margin-left: 20px;
        margin-right: 20px;
      }
      .page-button:active{
        border: none;
        background:rgba(0,0,0,1)!important;
        color:rgba(255,255,255,1)!important;
      }
    }
  }
  .caozuo-buttons{
    height: calc(100vh - 110px);
    width: 100%;display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap:wrap;
    flex-direction:column;
    .caozuo-button{
      width: 154px!important;
      height: 60px!important;
      background:rgba(245,245,245,1)!important;
      border: 0!important;
      border-radius:10px!important;
      font-size:24px!important;
      font-family:SourceHanSansCN-Regular;
      font-weight:400!important;
      color:rgba(26,26,26,1)!important;
    }
    .caozuo-button:active{
      color: #fff!important;
      background:rgba(245,86,86,1)!important;
    }
  }
  .jiesuan-goods{
    overflow: hidden;
    height: calc(100vh - 110px);
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap;
    flex-direction:column;
    .search{
      display: flex;
      background: none;
      border-radius:10px;
      .goods-search{
        font-size:22px;
        font-family:SourceHanSansCN-Regular;
        font-weight:400;
        color:rgba(26,26,26,1);
        border-radius:10px;
        input{
          text-align: center!important;
        }
      }
    }
    .pay-goods-box{
      width: 100%;
      height:482px;
      background:rgba(255,255,255,1);
      border-radius:10px;
      overflow-y:scroll;
      ul{
        list-style-type: none;
        padding: 11px;
        border-bottom:1px solid #ccc;
        li{
          width: 100%;
          height: 20px;
          margin-bottom: 14px;
        }
        .title{
          font-size:16px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          color:rgba(26,26,26,1);
          line-height:20px;
          .red{
            color:rgba(248,61,61,1);
          }
          .danjia{
            margin-right: 10px;
          }
          .yuanjia{
            color: #808080;
            margin-right: 10px;
            text-decoration:line-through;
          }
          .huiyuanjia{
            margin-right: 10px;
            color: #2ECAF1;
          }
        }
        .code{
          font-size:14px;
          color:rgba(128,128,128,1);
        }
        li:last-child{
          margin-bottom: 0;

        }
      }
      ul:active{
        background:rgba(190,231,246,1);
      }
    }
    .queren-xinxi{
      width: calc(100% - 30px);
      height:260px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(229,229,229,1);
      border-radius:10px;
      padding: 15px;
      overflow: hidden;
      ul{
        list-style-type: none;
        width: 100%;
        li{
          clear: both;
          min-height: 20px;
          font-size:16px;
          width: 100%;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          color:rgba(128,128,128,1);
          line-height:20px;
          margin-bottom: 16px;
          &:last-child {
            margin-bottom: 15px;
            font-size:22px;
            font-weight:400;
            color:rgba(248,61,61,1);
            line-height:22px;
          }
        }
      }
      .buttons{
        text-align: center;
        .my-btn{
          width:210px;
          height:44px;
          background:rgba(255,255,255,1);
          border:1px solid rgba(46,202,241,1);
          border-radius:4px;
          font-size:24px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          margin-left: 5px;
          margin-right: 5px;
          color:rgba(46,202,241,1);
          &:active{
            border: 0;
            background:rgba(45,194,243,1);
            color:rgba(255,255,255,1);
          }
        }
      }
    }
  }
  .font-red{
    color: #F83D3D;
  }
  .font-blue{
    color:rgba(46,202,241,1);
  }
  .float-left{
    float: left;
  }
  .float-right{
    float: right;
  }
  .clear-both{
    clear:both;
  }

  /*改价,改数量，弹出窗口样式*/
  .gaijia-tanchuan{
    .gaijia-input{
      margin-bottom: 10px;
    }
    .gaijia-queding-btn{
      width:80px;
      height:290px;
      background:rgba(9,183,240,1);
      border-radius:10px;
      border: 0;
      font-size:24px;
      font-family:SourceHanSansCN-Regular;
      font-weight:400;
      color:rgba(239,239,239,1);
      &:active{
        border: none;
      }
    }
  }
  /*充值弹窗样式*/
  .chongzhi-tanchuan{
    border-radius:10px;
    .both{
      width: 700px;
      height: 368px;
      .left{
        width: 394px;
        height: 368px;
        display: flex;
        flex-direction:column;
        justify-content:space-between;
        .one{

        }
        .two{
          width:368px;
          height:122px;
          border:1px solid rgba(210,210,210,1);
          border-radius:8px;
          padding: 27px 12px;
          ul{
            list-style-type: none;
            width: 100%;
            li{
              clear: both;
              min-height: 20px;
              font-size:16px;
              width: 100%;
              font-family:SourceHanSansCN-Regular;
              font-weight:400;
              color:rgba(128,128,128,1);
              line-height:20px;
              margin-bottom: 16px;
            }
          }
        }
        .three{
          .el-radio-group{
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            flex-direction:row;
            justify-content:space-between;
          }
        }
      }
      .right{
        height: 368px;
        width: 292px;
        display: flex;
        flex-direction:column;
        justify-content:space-between;
        .queding-chongzhi{
          width:292px;
          height:62px;
          background:rgba(45,194,243,1);
          border-radius:10px;;
          font-size:24px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          color:rgba(239,239,239,1);
        }
      }
    }

  }
  /*会员等级说明弹框样式*/
  .huiyuandengjishuoming-tanchuan{
    .content{
      width: 332px;
      display: flex;
      flex-direction:row;
      flex-wrap: wrap;
      justify-content:flex-start;
      span{
        width:150px;
        height:20px;
        overflow: hidden;
        line-height: 20px;
        font-size:16px;
        margin-bottom: 18px;
        margin-left: 8px;
        margin-right: 8px;
        font-family:SourceHanSansCN-Regular;
        font-weight:400;
        color:rgba(128,128,128,1);
      }
    }
  }
  /*结账弹框样式*/
  .jiezhang-tanchuan{
    .box{
      height: 300px;
      .my-left{
        width: 320px;
        height: 100%;
        ul{
          list-style-type: none;
          width: 100%;
          border-radius:8px;
          padding: 34px 12px;
          li{
            clear: both;
            min-height: 20px;
            font-size:16px;
            width: 100%;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(128,128,128,1);
            line-height:20px;
            margin-bottom: 16px;
            &:first-child{
              color: #000;
            }
          }
        }
        .div {
          text-align: center;
          button{
            width:148px;
            height:44px;
            background:rgba(255,255,255,1);
            color: #2ECAF1;
            font-size:20px;
            border:1px solid rgba(46,202,241,1);
            border-radius:8px;
            &:active{
              border:none;
              background:rgba(45,194,243,1);
              color:rgba(255,255,255,1);
            }
          }
        }
      }
      .my-right{
        width: 370px;
        height: 100%;
        display: flex;
        flex-direction: column;
        .div{
          width: 100%;
          height:56px;
          margin-bottom: 16px;
          display: flex;
          justify-content: space-between;
          .span-btn{
            position: relative;
            width:176px;
            height:56px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(210,210,210,1);
            border-radius:5px;
            font-size:20px;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            line-height: 56px;
            color:rgba(26,26,26,1);
            img{
              height: 40px;
              width: 40px;
              position: absolute;
              top: 8px;
              left: 26px;
            }
            span{
              line-height: 56px;
              position: absolute;
              top: 0px;
              left: 68px;
            }
          }
          .active{
            background:#BEE7F6;
            border:none;
          }
          .closed{
            background:#D2D2D2;
            border:none;
          }
        }
      }
    }
  }
  /*选择会员弹框样式*/
  .xuanzehuiyuan-tanchuan{
    .div{
      width:100%;
      height:300px;
      margin-bottom: 20px;
      .left{
        width: 50%;
        .search{
          margin-bottom: 20px;
        }
        .content{
          height:160px;
          padding: 34px 20px;
          background:rgba(255,255,255,1);
          border:1px solid rgba(210,210,210,1);
          border-radius:8px;
          ul{
            list-style-type: none;
            li{
              clear:both;
              min-height: 20px;
              font-size:16px;
              width: 100%;
              font-family:SourceHanSansCN-Regular;
              font-weight:400;
              color:rgba(128,128,128,1);
              line-height:20px;
              margin-bottom: 16px;
              button{
                &:active{
                  background: #2DC2F3;color: #fff;
                }
              }
            }
          }
        }
      }
      .right{
       width: 45%;
      }
    }
  }
  /*会员查询弹框样式*/
  .huiyuanchaxun-tanchuan{
    .content{
      .header{
        margin-bottom: 8px;
        height: 290px;
        .left{
          .search-btns{
            width: 584px;display: flex;justify-content: space-between;margin-bottom: 16px;
            button{
             &:first-child{
               background: #2DC2F3;
             }
              &:last-child{
                width: 84px;
              }
            }
          }
          .user-info{
            margin-bottom: 16px;
            width: 584px;
            text-align: center;
            td{
              height: 32px;
              text-align: center;
              color: #000000;
            }
          }
          .tab-btns{
            button{
             background:#6BD2F4;color: #000;
            }
            .active{
              background:#F55656;color: #ffffff;
            }
          }
        }
      }
      .my-table{
        .el-table__body tr{
          height:24px!important;
          td{
            padding: 0!important;
          }
        }
      }
    }

  }
</style>
