<!--suppress ALL -->
<template>
    <div class="bg">
      <v-head></v-head>
      <div class="get-money-content">
          <div style="width: 1038px">
            <div class="all-goods">
              <div class="goods-type">
                <div><el-button class="fenlei-button float-left" :class="{'fenlei-button-active':requestFuwuGoodData.isChooeseFuwuGood}" @click="clickFuwuGood">服务项目</el-button></div>
                <div><el-button class="page-fenlei-button float-left" icon="el-icon-arrow-left" @click="clickFenleiBtnPre"></el-button></div>
                <div class='type-btn'>
                    <el-button v-for="(item) in requestGoodData.typeNameList"  :key="item.id" class="fenlei-button" :class="{'fenlei-button-active':(requestGoodData.isChooeseFenleiGood && requestGoodData.who === item.id)}" @click="clickFenleiBtn(item.id)">{{ item.cname }}</el-button>
                </div>
                <div><el-button class="page-fenlei-button float-right" icon="el-icon-arrow-right" @click="clickFenleiBtnNext"></el-button></div>
              </div>
              <div class="flex-goods">
                  <v-good v-for="(item) in goodsList" :key="item.id" :ogood="item" class="goods" @click.native="addShoppingCar(item)"></v-good>
              </div>
              <div class="page-buttons">
                <button class="page-button" @click="clickPrePageBtn">上一页</button>
                <button class="page-button"  @click="clickNextPageBtn">下一页</button>
              </div>
            </div>
          </div>
          <div style="width: 154px;">
            <div class="caozuo-buttons">
              <el-button @click="clickAddNumShoppingCarGood" class="caozuo-button" type="primary" style="font-size: 45px;">&nbsp;&nbsp;+&nbsp;&nbsp;</el-button>
              <el-button @click="clickSubNumShoppingCarGood" class="caozuo-button" type="primary">&nbsp;&nbsp;-&nbsp;&nbsp;</el-button>
              <el-button @click="clickBtnXiugaishuliangShoppingCarGood" class="caozuo-button" type="primary">数量</el-button>
              <el-button @click="clickBtnXiugaijiageShoppingCarGood" class="caozuo-button" type="primary">改价</el-button>
              <el-button @click="clickDelShoppingCarGood" class="caozuo-button" type="primary">删除</el-button>
              <el-button @click="chongzhiDialog.isShow = true" class="caozuo-button" type="primary">充值</el-button>
              <el-button @click="huiyuanDialog.isShow = true" class="caozuo-button" type="primary">会员</el-button>
              <el-button @click="goukaDialogShow" class="caozuo-button" type="primary">购卡</el-button>
            </div>
          </div>
          <div style="width: 636px;">
            <div class="jiesuan-goods" >
              <div class="search">
                <el-input class="goods-search"  @keyup.enter.native="getGoodByCondition" placeholder="商品名称/条形码"  v-model="sousuoshangpingDialog.title">
                  <el-button slot="append" icon="el-icon-search" @click="getGoodByCondition"></el-button>
                </el-input>
              </div>
              <div class="pay-goods-box">
                <ul v-if="chooeseGoods.goods.length" v-for="(good, key) in chooeseGoods.goods" :key="good.id" :class="{'active':good.is_checked}" @click="clickShoppingCarGood(key)">
                  <li class="title clear-both">
                    <span class="float-left">{{good.title}}</span>
                    <span class="float-right">数量 {{good.num}}</span>
                  </li>
                  <li class="title code clear-both">
                    <span class="float-left">{{good.bar_code}}</span>
                    <span class="float-right red">￥{{good.is_edit ? good.edit_price * good.num : good.price * good.num}}</span>
                  </li>
                  <li class="title">
                    <span class="red danjia" v-if="good.is_edit">￥{{good.edit_price}}</span>
                    <span class="red danjia" v-else>￥{{good.price}}</span>
                    <span class="yuanjia" v-if="good.is_edit">原价￥{{good.price}}</span>
<!--                    <span class="huiyuanjia">会员价￥{{good.price}}</span>-->
                  </li>
                </ul>
                <ul v-if="chooeseGoods.fuwuGoods.length" v-for="(good, key) in chooeseGoods.fuwuGoods" :key="good.id" :class="{'active':good.is_checked}" @click="clickShoppingCarGood(key)">
                  <li class="title clear-both">
                    <span class="float-left">{{good.title}}</span>
                    <span class="float-right">数量 {{good.num}}</span>
                  </li>
                  <li class="title code clear-both">
                    <span class="float-left"></span>
                    <span class="float-right red">￥{{good.is_edit ? good.edit_price * good.num : good.price * good.num}}</span>
                  </li>
                  <li class="title">
                    <span class="red danjia" v-if="good.is_edit">￥{{good.edit_price}}</span>
                    <span class="red danjia" v-else>￥{{good.price}}</span>
                    <span class="yuanjia" v-if="good.is_edit">原价￥{{good.price}}</span>
                    <span class="huiyuanjia">会员价￥{{good.price}}</span>
                  </li>
                </ul>
                <ul v-if="chooeseGoods.cardList.length" v-for="(good, key) in chooeseGoods.cardList" :key="good.id" :class="{'active':good.is_checked}" @click="clickShoppingCarGood(key)">
                  <li class="title clear-both">
                    <span class="float-left">{{good.card_name}}</span>
                    <span class="float-right">数量 {{good.num}}</span>
                  </li>
                  <li class="title code clear-both">
                    <span class="float-left"></span>
                    <span class="float-right red">￥{{good.is_edit ? good.edit_price * good.num : good.price * good.num}}</span>
                  </li>
                  <li class="title">
                    <span class="red danjia" v-if="good.is_edit">￥{{good.edit_price}}</span>
                    <span class="red danjia" v-else>￥{{good.price}}</span>
                    <span class="yuanjia" v-if="good.is_edit">原价￥{{good.price}}</span>
                    <!--                    <span class="huiyuanjia">会员价￥{{good.price}}</span>-->
                  </li>
                </ul>
              </div>
              <div class="queren-xinxi">
                <ul>
                  <li>
                    <span class="float-left">服务人员</span>
                    <span class="float-right select">
                      <el-dropdown class="user-name" trigger="click" @command="clickWaiter">
                        <span class="el-dropdown-link"  @click="getWaiterList()">
                          <span class="font-blue">{{jiezhangDialog.nowWaiter.name}}</span> [{{jiezhangDialog.nowWaiter.type}}]  <i class="el-icon-arrow-down"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item v-for="(item) in jiezhangDialog.waiter" :key="item.id" :command="item">
                            <span class="font-blue">{{item.name}}</span>
                            [{{item.type}}]
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </span>
                  </li>
                  <li>
                    <span class="float-left">会员&nbsp;<span class="font-blue">{{jiezhangDialog.memberVip.nickname}}</span></span>
                    <span class="float-right">余额￥{{jiezhangDialog.memberVip.money}}</span>
                  </li>
                  <li>
                    <span class="float-left">合计</span>
                    <span  class="float-right">￥{{jiezhangDialog.sumMoney}}</span>
                  </li>
                  <li>
                    <span class="float-left">改价</span>
                    <span  class="float-right">￥{{jiezhangDialog.modifyMoney - jiezhangDialog.sumMoney}}</span>
                  </li>
<!--                  <li>-->
<!--                    <span class="float-left">折扣</span>-->
<!--                    <span  class="float-right">100%</span>-->
<!--                  </li>-->
<!--                  <li>-->
<!--                    <span class="float-left">优惠</span>-->
<!--                    <span  class="float-right font-blue">-￥5.00</span>-->
<!--                  </li>-->
                  <li>
                    <span class="float-left">结算</span>
                    <span class="float-right">￥{{jiezhangDialog.modifyMoney}}</span>
                  </li>
                </ul>
                <div class="buttons">
                  <button @click="xuanzehuiyuanDialog.isShow = true" class="my-btn">选择会员</button>
                  <button @click="jiezhangDialogClickBtn"  class="my-btn">结账</button>
                </div>
              </div>
            </div>
          </div>
      </div>

      <!--修改价格弹框-->
      <el-dialog class="gaijia-tanchuan" title="修改价格" :visible.sync="xiugaijiageDialog.isShow" width="434px" :center="true">
        <div>
          <el-input class="gaijia-input" placeholder="请输入内容" clearable v-model="xiugaijiageDialog.inputValue"></el-input>
          <div class="clear-both" style="height: 290px;">
            <div class="float-left">
              <v-keyboard @getNumber="clickChangejiageShoppingCarGood"></v-keyboard>
            </div>
            <div class="float-right">
              <el-button @click="clickChangejiageShoppingCarGoodOk" class="gaijia-queding-btn">确定</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
      <!--修改数量弹框-->
      <el-dialog class="gaijia-tanchuan" title="修改数量" :visible.sync="xiugaishuliangDialog.isShow" width="434px" :center="true">
        <div>
          <el-input class="gaijia-input" placeholder="请输入内容" clearable v-model="xiugaishuliangDialog.inputValue"></el-input>
          <div class="clear-both" style="height: 290px;">
            <div class="float-left">
              <v-keyboard @getNumber="clickChangeNumShoppingCarGood"></v-keyboard>
            </div>
            <div class="float-right">
              <el-button @click="clickChangeNumShoppingCarGoodOk" class="gaijia-queding-btn">确定</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
      <!--充值按钮弹框-->
      <el-dialog class="chongzhi-tanchuan" title="充值" :visible.sync="chongzhiDialog.isShow" width="750px" :center="true">
        <div class="clear-both both">
          <div class="float-left left">
            <div class="one">
              <el-input @keyup.13.native="chongzhiDialogSearchMemberVip" @focus="chongzhiDialogInputFocus('mobile')" v-model="chongzhiDialog.mobile" placeholder="请输入会员手机号" clearable></el-input>
            </div>
            <div class="two">
              <ul>
                <li>
                  <span class="float-left">会员</span>
                  <span class="float-right font-blue">{{ chongzhiDialog.huiyuanInfo.nickname }}</span>
                </li>
                <li>
                  <span class="float-left">累积充值</span>
                  <span class="float-right">￥{{chongzhiDialog.huiyuanInfo.amount}}</span>
                </li>
                <li>
                  <span class="float-left">余额</span>
                  <span class="float-right font-red">￥{{ chongzhiDialog.huiyuanInfo.money }}</span>
                </li>
                <li>
                  <span class="float-left">会员等级</span>
                  <span class="float-right">{{ chongzhiDialog.huiyuanInfo.level_name }}&nbsp;<i class="el-icon-question font-blue" @click="chongzhiDialog.isShowHuiyuanDengjiDialog = true"></i></span>
                </li>
              </ul>
            </div>
            <div class="three">
              <el-radio-group v-model="chongzhiDialog.payType">
<!--                //支付方式：1=微信支付 2=支付宝 3=余额(会员卡)4=银行卡5=现金6=美团7=赠送8=门店自用 9=兑换10=包月服务11=定制疗程99=管理员充值-->
                <el-radio label="5">现价</el-radio>
                <el-radio label="1">微信</el-radio>
                <el-radio label="2">支付宝</el-radio>
                <el-radio label="4">银行卡</el-radio>
              </el-radio-group>
            </div>
            <div class="four">
              <el-input @focus="chongzhiDialogInputFocus('money')" v-model="chongzhiDialog.payMoney" placeholder="请输入充值金额" clearable></el-input>
            </div>
          </div>
          <div class="float-right right">
            <v-keyboard @getNumber="chongzhiDialogGetCode"></v-keyboard>
            <el-button @click="chongzhiDialogBtnOk" class="queding-chongzhi">确定充值</el-button>
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
      <el-dialog class="jiezhang-tanchuan" title="结账" :visible.sync="jiezhangDialog.isShow" width="780px" :center="true">
        <div class="clear-both box">
          <div class="float-left my-left">
            <ul>
              <li class="clear-both">
                <span class="float-left">应收</span>
                <span class="float-right font-red">¥ {{jiezhangDialog.modifyMoney}}</span>
              </li>
              <li class="clear-both">
                <span class="float-left"></span>
                <span class="float-right"></span>
              </li>
              <li class="clear-both">
                <span class="float-left">改价</span>
                <span class="float-right">¥ {{jiezhangDialog.modifyMoney - jiezhangDialog.sumMoney}}</span>
              </li>
              <li class="clear-both">
                <span class="float-left"><span>会员</span> <span class="font-blue">{{jiezhangDialog.memberVip.nickname}}</span></span>
                <span class="float-right">余额：¥ {{jiezhangDialog.memberVip.money}}</span>
              </li>
              <li class="clear-both">
                <span class="float-left"><span>服务人员</span> <span class="font-blue">{{jiezhangDialog.nowWaiter.name}}</span></span>
                <span class="float-right"></span>
              </li>
            </ul>
            <div class="div">
              <button @click="jiezhangDialog.isShow = false">取消</button>
              <button @click="jiezhangDialogClickOk">确认结账</button>
            </div>
          </div>
          <div class="float-right my-right">
<!--            1=微信支付 2=支付宝 3=余额(会员卡)4=银行卡5=现金6=美团7=赠送8=门店自用 9=兑换10=包月服务11=定制疗程99=管理员充值-->
            <div class="div">
              <span v-if="jiezhangDialog.closedPayWay.indexOf(3) !== -1" class="span-btn closed">
                <img src="../../assets/icon/checkout-huiyuanka.png" alt="会员卡">
                <span>会员卡</span>
              </span>
              <span v-else class="span-btn" :class="{'active' : jiezhangDialog.chooesePayWay === 3}" @click="jiezhangDialogChoosesPayWay(3)">
                <img src="../../assets/icon/checkout-huiyuanka.png" alt="会员卡">
                <span>会员卡</span>
              </span>
              <span  v-if="jiezhangDialog.closedPayWay.indexOf(5) !== -1"  class="span-btn closed">
                <img src="../../assets/icon/checkout-xianjing.png" alt="现金支付">
                <span>现金</span>
              </span>
              <span  v-else class="span-btn" :class="{'active' : jiezhangDialog.chooesePayWay === 5}" @click="jiezhangDialogChoosesPayWay(5)">
                <img src="../../assets/icon/checkout-xianjing.png" alt="现金支付">
                <span>现金</span>
              </span>
            </div>
            <div class="div">
              <span v-if="jiezhangDialog.closedPayWay.indexOf(1) !== -1" class="span-btn closed">
                <img src="../../assets/icon/checkout-weixin.png" alt="微信图标">
                <span>微信</span>
              </span>
              <span v-else class="span-btn" :class="{'active' : jiezhangDialog.chooesePayWay === 1}" @click="jiezhangDialogChoosesPayWay(1)">
                <img src="../../assets/icon/checkout-weixin.png" alt="微信图标">
                <span>微信</span>
              </span>
              <span v-if="jiezhangDialog.closedPayWay.indexOf(2) !== -1" class="span-btn closed">
                <img src="../../assets/icon/checkout-zhifubao.png" alt="支付宝图标">
                <span>支付宝</span>
              </span>
              <span v-else class="span-btn" :class="{'active' : jiezhangDialog.chooesePayWay === 2}" @click="jiezhangDialogChoosesPayWay(2)">
                <img src="../../assets/icon/checkout-zhifubao.png" alt="支付宝图标">
                <span>支付宝</span>
              </span>
            </div>
            <div class="div">
               <span v-if="jiezhangDialog.closedPayWay.indexOf(4) !== -1" class="span-btn closed">
                <img src="../../assets/icon/checkout-yinhangka.png" alt="银行卡"><span>银行卡</span>
               </span>
               <span v-else class="span-btn" :class="{'active' : jiezhangDialog.chooesePayWay === 4}" @click="jiezhangDialogChoosesPayWay(4)">
                <img src="../../assets/icon/checkout-yinhangka.png" alt="银行卡"><span>银行卡</span>
               </span>
               <span v-if="jiezhangDialog.closedPayWay.indexOf(6) !== -1"  class="span-btn closed">
                <img src="../../assets/icon/checkout-meituan.png" alt=""><span>美团</span>
               </span>
               <span v-else class="span-btn" :class="{'active' : jiezhangDialog.chooesePayWay === 6}" @click="jiezhangDialogChoosesPayWay(6)">
                <img src="../../assets/icon/checkout-meituan.png" alt=""><span>美团</span>
               </span>
             </div>
            <div class="div">
               <span v-if="jiezhangDialog.closedPayWay.indexOf(7) !== -1"  class="span-btn closed">
                <img src="../../assets/icon/checkout-zengpin-sel.png" alt="赠送"><span>赠送</span>
               </span>
               <span v-else class="span-btn" :class="{'active' : jiezhangDialog.chooesePayWay === 7}" @click="jiezhangDialogChoosesPayWay(7)">
                <img src="../../assets/icon/checkout-zengpin-sel.png" alt="赠送"><span>赠送</span>
               </span>
               <span  v-if="jiezhangDialog.closedPayWay.indexOf(8) !== -1"   class="span-btn closed">
                <img src="../../assets/icon/checkout-mendian.png" alt="门店自用"><span>门店自用</span>
               </span>
               <span class="span-btn" :class="{'active' : jiezhangDialog.chooesePayWay === 8}" @click="jiezhangDialogChoosesPayWay(8)">
                <img src="../../assets/icon/checkout-mendian.png" alt="门店自用"><span>门店自用</span>
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
              <el-input  placeholder="请输入您需要查询的商品名字" v-model="sousuoshangpingDialog.title" @keyup.enter.native="searchGoodsByGoodName" ></el-input>
            </div>
            <div class="float-right"  style="width: 20%;text-align: right;">
              <el-button type="primary" plain @click="searchGoodsByGoodName">搜索</el-button>
            </div>
          </div>
          <div>
            <el-table :data="sousuoshangpingDialog.goodsList" height="250" border style="width: 100%">
              <el-table-column prop="title" label="名称" width="180"></el-table-column>
              <el-table-column prop="stock" label="库存"></el-table-column>
              <el-table-column prop="price" label="单价"></el-table-column>
              <el-table-column prop="price" label="会员价"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" @click="addShoppingCar(scope.row)">确定</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>
      <!-- 选择会员弹框 -->
      <el-dialog class="xuanzehuiyuan-tanchuan" title="选择会员" :visible.sync="xuanzehuiyuanDialog.isShow" width="810px" :center="true">
        <div class="clear-both div">
            <div class="float-left left">
              <div class="search">
                <el-input @keyup.enter.native="clickChoosesMemberByKeyboard('ok')" v-model="xuanzehuiyuanDialog.mobile" placeholder="请输入会员手机号" maxlength="11"></el-input>
              </div>
              <div class="content">
                <ul>
                  <li><span class="float-left">会员</span><span class="float-right font-blue">{{jiezhangDialog.memberVip.nickname}}</span></li>
                  <li><span class="float-left">余额</span><span class="float-right font-red">￥{{jiezhangDialog.memberVip.money}}</span></li>
                  <li><span class="float-left">会员等级</span><span class="float-right">{{jiezhangDialog.memberVip.level_name}}</span></li>
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
              <v-keyboard-without-point-with-ok @getNumber="clickChoosesMemberByKeyboard"></v-keyboard-without-point-with-ok>
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
                <el-input style="width:392px;" @keyup.enter.native="huiyuanDialogSearchMemberVip" v-model="huiyuanDialog.mobile" placeholder="请输入您需要查询的会员手机号码"></el-input>
                <el-button  plain @click="huiyuanDialogSearchMemberVip">搜索</el-button>
              </div>
              <div class="user-info el-table--border">
                <table class="el-table el-table__body" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td colspan="3">手机号：{{ huiyuanDialog.huiyuanInfo.mobile }}</td>
                    <td colspan="2">姓名：<span class="font-blue">{{ huiyuanDialog.huiyuanInfo.nickname }}</span></td>
                    <td colspan="2">会员等级：{{ huiyuanDialog.huiyuanInfo.level_name }}</td>
                  </tr>
                  <tr>
                    <td colspan="4">累计充值：￥ {{ huiyuanDialog.huiyuanInfo.amount }} &nbsp;&nbsp;&nbsp;余额：<span class="font-red">￥ {{ huiyuanDialog.huiyuanInfo.money }}</span></td>
                    <td colspan="3">加入时间：{{ huiyuanDialog.huiyuanInfo.regtime }}</td>
                  </tr>
                </table>
              </div>
              <div class="tab-btns">
                <el-button :class="{'active':!huiyuanDialog.showFuwuTable}" @click="huiyuanDialogSearchRechargeLog">充值记录</el-button>
                <el-button :class="{'active':huiyuanDialog.showFuwuTable}" @click="huiyuanDialogSearchServiceCardList">服务卡</el-button>
              </div>
            </div>
            <div class="float-right right">
              <v-keyboard-without-point @getNumber="huiyuanDialogGetCode"></v-keyboard-without-point>
            </div>
          </div>
          <div class="my-table">
            <!-- 服务卡 -->
            <el-table v-show="huiyuanDialog.showFuwuTable" :data="huiyuanDialog.fuwukaList" min-height="216" border style="width: 100%">
              <el-table-column prop="card_name" label="服务卡名称" width="180"></el-table-column>
              <el-table-column prop="real_price" label="购买金额"></el-table-column>
              <el-table-column prop="" label="项目服务"></el-table-column>
              <el-table-column prop="type_card" label="类型"></el-table-column>
              <el-table-column prop="create_time" label="购买时间"></el-table-column>
              <el-table-column prop="start_time" label="激活时间"></el-table-column>
              <el-table-column prop="end_time" label="过期时间"></el-table-column>
              <el-table-column prop="status_name" label="状态"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.type === '0'" size="mini">激活</el-button>
                  <el-button v-if="scope.row.type === '1'" size="mini" @click="huiyuanDialog.haokaDialog.isShow = true">耗卡</el-button>
                  <el-button v-if="scope.row.type === '2'" size="mini" @click="huiyuanDialog.shiyongjiluDialog.isShow = true">使用记录</el-button>
                  <el-button v-if="scope.row.type === '4'" size="mini" @click="huiyuanDialog.tuikaDialog.isShow = true">退卡详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 充值记录 -->
            <el-table v-show="!huiyuanDialog.showFuwuTable" :data="huiyuanDialog.chongzhijiluList" min-height="216" border style="width: 100%">
              <el-table-column prop="member_id" label="会员"></el-table-column>
              <el-table-column prop="price" label="充值金额"></el-table-column>
              <el-table-column prop="price" label="到账金额"></el-table-column>
              <el-table-column prop="waiter" label="服务人员"></el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.price < 0">已退</span>
                  <span class='font-red' v-else>成功</span>
                  <br>
                  <span v-if="scope.row.price < 0">{{ scope.row.create_time }}</span>
                </template>
              </el-table-column>
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
                <el-input @keyup.enter.native="huiyuanDialogAddMemberVip" v-model="huiyuanDialog.addHuiyuanDialog.mobile" placeholder="请输入会员手机号码" maxlength="11"></el-input>
              </div>
              <div>
                <el-input @keyup.enter.native="huiyuanDialogAddMemberVip" v-model="huiyuanDialog.addHuiyuanDialog.nickname"  placeholder="请输入会员昵称"></el-input>
              </div>
          </div>
          <div class="float-right right" style="width: 45%;">
            <v-keyboard-without-point-with-ok @getNumber="huiyuanDialogAddMemberGetCode"></v-keyboard-without-point-with-ok>
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
      <!-- 点击购卡按钮弹窗-购卡项目 -->
      <el-dialog class="goukaxiangmu-tanchuan" title="购卡项目" :visible.sync="goukaDialog.isShow" width="886px" :center="true">
       <div class="content">
         <div class="search">
           <el-input class="goods-search" @keyup.enter.native="goukaDialogChoosesCardType(0)"   placeholder="搜索服务卡名称"  v-model="goukaDialog.title">
             <el-button slot="append" icon="el-icon-search" @click="goukaDialogChoosesCardType(0)"></el-button>
           </el-input>
         </div>
         <div class="tab-btns">
           <el-button @click="goukaDialogChoosesCardType(1)" class="btn" :class="{'active': (!goukaDialog.title && goukaDialog.requestData.type === 1)}">次卡</el-button>
           <el-button @click="goukaDialogChoosesCardType(2)" class="btn" :class="{'active': (!goukaDialog.title && goukaDialog.requestData.type === 2)}">月卡</el-button>
           <el-button @click="goukaDialogChoosesCardType(4)" class="btn" :class="{'active': (!goukaDialog.title && goukaDialog.requestData.type === 4)}">年卡</el-button>
         </div>
         <div class="bodys">
             <v-card v-for="(item, index) in goukaDialog.cardsList" :key="item.id" :ocard="item" @click.native="goukaDialogClickChoosesCard(index)"></v-card>
         </div>
         <div class="footer">
           <el-button @click="goukaDialogSearchCardsPre" class="btn">上一页</el-button>
           <el-button @click="goukaDialogSearchCardsNext" class="btn">下一页</el-button>
           <el-button @click="goukaDialog.isShow = false" class="btn">取消</el-button>
           <el-button @click="goukaDialogNowBuy" class="btn">立即购买</el-button>
         </div>
       </div>
      </el-dialog>
      <!--      结账成功弹框-->
      <v-show-my-dialog :dialogTableVisible="jiezhangDialog.jiezhangSuccessDialog.isShow" :content="jiezhangDialog.jiezhangSuccessDialog.content" :seconds="jiezhangDialog.jiezhangSuccessDialog.seconds"></v-show-my-dialog>
    </div>
</template>

<script>
import vHead from '../common/Header.vue'
import vGood from '../common/Good.vue'
import vKeyboard from '../common/Keyboard.vue'
import vKeyboardWithoutPointWithOk from '../common/Keyboard-without-point-with-ok'
import vKeyboardWithoutPoint from '../common/Keyboard-without-point'
import vCard from '../common/card.vue'
import vShowMyDialog from '../common/ShowMyDialog'
import { postTwotype, postGoods, postGoodsByCode, postServiceItemList, postWaiter, postSearchVip, postMemberVipRecharge, postAddMemberVip, postMemberServiceCards, postBuyServiceCards, postMemberVipRechargeLog, postNowPayGoods, postNowPayServiceCards  } from '../../api/getData'

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
      // 普通商品
      requestGoodData: {// 请求商品列表中的页数，页码服务器数据
        typeNameList: [], // 分类列表
        isChooeseFenleiGood: false, // 是否选择分类商品
        page: 1, // 当前页码
        num: 15, // 每页的数据
        who: 0, // 当前选中的分类名id
        type_category: 0
      },

      // 结账中的商品
      chooeseGoods: {
        //选择的普通商品
        goods:[
            // {
            //   bar_code: "4897097930084",
            //   id: 1617,
            //   is_service_goods: "0",
            //   pics: "http://picture.ddxm661.com/9a47a20190318164340290",
            //   price: "198.00",
            //   stock: 8,
            //   title: "芮欧轻奢婴儿纸尿裤NB68片",
            //   is_checked: false,//是否被选中
            //   num: 3,         //商品数量
            //   is_edit: "1",     //此商品是否修改了单价：1是，0否
            //   edit_price: "10.00"   //修改的单价，如果edit_price=1，则必填此参数
            // }
        ],
        //选择的服务商品
        fuwuGoods:[
          // {
          //     bar_code: "4897097930084",
          //     id: 1617,
          //     is_service_goods: "1",
          //     pics: "http://picture.ddxm661.com/9a47a20190318164340290",
          //     price: "198.00",
          //     stock: 8,
          //     title: "芮欧轻奢婴儿纸尿裤NB68片",
          //     num: 3,         //商品数量
          //     is_edit: "1",     //此商品是否修改了单价：1是，0否
          //     edit_price: "10.00"   //修改的单价，如果edit_price=1，则必填此参数
          // }
        ],
        //购卡弹窗选择的卡片列表
        cardList: []
      },
      // 修改价格弹窗显示与否
      xiugaijiageDialog: {
        isShow: false,
        inputValue: ''
      },

      // 购物车 修改商品数量弹窗
      xiugaishuliangDialog: {
        isShow: false,// 修改数量弹窗显示与否
        inputValue: '' // 修改数量的值
      },
      // 搜索商品弹窗
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
      //  会员查询 - 单击会员按钮后的弹窗所需要的数据
      huiyuanDialog: {
        isShow: false, // 是否显示会员查询对话框
        mobile: '13637765376', // 要查询的会员手机号码
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
        // 服务卡购买记录
        fuwukaList: [
          {
            id: 1,
            card_name: '艾灸推拿1艾灸推拿1艾灸推拿1艾灸推拿1艾灸推拿1',
            type: '1',
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
            id: 5,
            member_id: "哈哈(18046057585)",   //会员信息
            price: "10.11",   //充值金额、到账金额（当price小于0是表示已退，已退时间与充值时间一致）
            create_time: "2019-07-03 09:57:06",   //时间
            waiter: "1"   //服务人员名称
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
        mobile: '13637765376',
        chooeseWho: 'mobile',
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
        payType: '5', // 充值方式
        payMoney: '' // 充值金额
      },
      // 选择会员弹框是否显示
      xuanzehuiyuanDialog: {
        isShow: false,
        mobile: ''
      },

      //购卡弹窗
      goukaDialog: {
        isShow: false,
        title: '',// 请输入购卡名称
        cardsList:[// 服务卡列表
          {
            is_checked: false,
            id: 3,
            card_id: null,
            shop_id: 27,
            shop_name: "江与城店",
            card_name: "艾灸推拿",
            cover: "",
            critulation: 100,
            exchange_num: 100,
            restrict_num: 2,
            start_time: 1561478400,
            end_time: 1565823999,
            integral_price: 0,
            create_time: 1561533639,
            status: "1",
            del: "1",
            creator_id: 1,
            update_time: null,
            modifier: null,
            type: "2",
            term_of_validity: null,
            all_shop: "1",
            give: "0",
            day: 10,
            use_day: 30,
            month: 0,
            year: 0
          },
          {
            is_checked: false,
            id: 4,
            card_id: null,
            shop_id: 27,
            shop_name: "江与城店",
            card_name: "艾灸推拿",
            cover: "",
            critulation: 100,
            exchange_num: 100,
            restrict_num: 2,
            start_time: 1561478400,
            end_time: 1565823999,
            integral_price: 0,
            create_time: 1561533639,
            status: "1",
            del: "1",
            creator_id: 1,
            update_time: null,
            modifier: null,
            type: "2",
            term_of_validity: null,
            all_shop: "1",
            give: "0",
            day: 10,
            use_day: 30,
            month: 0,
            year: 0
          },
        ],
        requestData: {
          total:0,
          page: 1,
          limit: 4,
          type: 1,// 卡卷类型 1为次卡 2为月卡  3为季卡  4为年卡
        }
      },
      // 结账弹窗所需要的数据
      jiezhangDialog:{
        isShow: false, // 结账对话框显示与否
        // 当前选中的会员信息
        memberVip: {
          // id: 5110, // 会员id
          // mobile: '13637765376', // 会员电话
          // shop_code: 'A00036', // 所属门店的门店编号
          // level_id: 6, // 会员等级id
          // nickname: '荣柱', // 姓名
          // level_name: '七星会员', // 会员等级名称
          // money: '0.00', // 余额
          // amount: '0.05', // 累积充值
          // regtime: '1970-01-01 08:33:37' // 加入时间
        },
        // 服务人员列表
        waiter: [
          // {
          //   id: 0, // 服务员id  当服务员的id为0师表示为当前登录的店长
          //   name: '管理员', // 服务员名称
          //   type: '店长' // 服务类型
          // }
        ],
        // 当前选中的服务人员
        nowWaiter: {
          id: -1, // 服务员id  当服务员的id为0师表示为当前登录的店长
          name: '请选择服务员', // 服务员名称
          type: '未知' // 服务类型
        },
        sumMoney: 0.00,//所购商品的合计
        modifyMoney: 0.00,//改价参数,
        chooesePayWay: 1,//支付方式
        closedPayWay: [ //被禁用的支付方式
          // 1,4,5
        ],
        // 支付完成之后弹出的结账成功弹框
        jiezhangSuccessDialog:{
          isShow: false,
          content: '结账成功',
          seconds: 1500//多少毫秒之后自动关闭
        }
      }
    }
  },
  components: {
    vHead, vGood, vKeyboard, vKeyboardWithoutPointWithOk, vKeyboardWithoutPoint, vCard, vShowMyDialog
  },
  mounted () {
    this.getGoodsType()
    this.getServiceItemList()
  },
  methods: {
    // 将商品加入购物车
    addShoppingCar (good){
      // console.log(good)
      //服务商品
      if (good.is_service_goods === '1') {
        good.num = 1
        good.is_checked = false
        good.is_edit = 0
        good.edit_price = good.price
        for (let i = 0; i < this.chooeseGoods.fuwuGoods.length; i++) {
          if (this.chooeseGoods.fuwuGoods[i].id === good.id) {
            alert('该服务商品已经存在购物车了')
            return
          }
        }
        this.chooeseGoods.goods = []
        this.chooeseGoods.cardList = []
        this.chooeseGoods.fuwuGoods.push(good)
      }
      //普通商品
      if (good.is_service_goods === '0') {
        //检查库存是否为0
        if (good.stock > 0){
          good.num = 1
          good.is_checked = false
          good.is_edit = 0
          good.edit_price = good.price
        } else {
          alert('该商品的库存不足')
          return
        }
        for (let i = 0; i < this.chooeseGoods.goods.length; i++) {
          if (this.chooeseGoods.goods[i].id === good.id) {
            alert('该商品已经存在购物车了')
            return
          }
        }
        this.chooeseGoods.fuwuGoods = []
        this.chooeseGoods.cardList = []
        this.chooeseGoods.goods.push(good)
      }
      this.sumChooseGoodsMoney()
      this.$forceUpdate()
    },
    // 购物车里的商品被单击后处于选中状态，然后进行修改操作，比如加数量、减数量、修改价格、删除
    clickShoppingCarGood (key) {
      if (this.chooeseGoods.goods.length) {
        this.chooeseGoods.goods.map((good, index) => {
          good.is_checked = false
        })
        this.chooeseGoods.goods[key].is_checked = true
      }
      if (this.chooeseGoods.fuwuGoods.length) {
        this.chooeseGoods.fuwuGoods.map((good, index) => {
          good.is_checked = false
        })
        this.chooeseGoods.fuwuGoods[key].is_checked = true
      }
      if (this.chooeseGoods.cardList.length) {
        this.chooeseGoods.cardList.map((good, index) => {
          good.is_checked = false
        })
        this.chooeseGoods.cardList[key].is_checked = true
      }
      this.$forceUpdate()
    },
    // 购物车里的商品被删除
    clickDelShoppingCarGood () {
      if (this.chooeseGoods.goods.length) {
        let key = 'undefined'
        this.chooeseGoods.goods.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          this.chooeseGoods.goods.splice(key, 1);
        }
      }
      if (this.chooeseGoods.fuwuGoods.length) {
        let key = 'undefined'
        this.chooeseGoods.fuwuGoods.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          this.chooeseGoods.fuwuGoods.splice(key, 1);
        }
      }
      if (this.chooeseGoods.cardList.length) {
        let key = 'undefined'
        this.chooeseGoods.cardList.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          this.chooeseGoods.cardList.splice(key, 1);
        }
      }
      this.sumChooseGoodsMoney()
      this.$forceUpdate()
    },
    // 购物车里的商品增加数量
    clickAddNumShoppingCarGood () {
      if (this.chooeseGoods.goods.length) {
        let key = 'undefined'
        this.chooeseGoods.goods.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          if (this.chooeseGoods.goods[key].num < this.chooeseGoods.goods[key].stock)
            this.chooeseGoods.goods[key].num++
        }
      }
      if (this.chooeseGoods.fuwuGoods.length) {
        let key = 'undefined'
        this.chooeseGoods.fuwuGoods.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          this.chooeseGoods.fuwuGoods[key].num++
        }
      }
      if (this.chooeseGoods.cardList.length) {
        let key = 'undefined'
        this.chooeseGoods.cardList.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          this.chooeseGoods.cardList[key].num++
        }
      }
      this.sumChooseGoodsMoney()
      this.$forceUpdate()
    },
    // 购物车里的商品减少数量
    clickSubNumShoppingCarGood () {
      if (this.chooeseGoods.goods.length) {
        let key = 'undefined'
        this.chooeseGoods.goods.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          if (this.chooeseGoods.goods[key].num > 1)
            this.chooeseGoods.goods[key].num --
        }
      }
      if (this.chooeseGoods.fuwuGoods.length) {
        let key = 'undefined'
        this.chooeseGoods.fuwuGoods.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          if (this.chooeseGoods.fuwuGoods[key].num > 1)
            this.chooeseGoods.fuwuGoods[key].num --
        }
      }
      if (this.chooeseGoods.cardList.length) {
        let key = 'undefined'
        this.chooeseGoods.cardList.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          if (this.chooeseGoods.cardList[key].num > 1)
            this.chooeseGoods.cardList[key].num --
        }
      }
      this.sumChooseGoodsMoney()
      this.$forceUpdate()
    },
    // 选中购物车里的商品，后点修改数量
    clickBtnXiugaishuliangShoppingCarGood () {
      if (this.chooeseGoods.goods.length) {
        let key = 'undefined'
        this.chooeseGoods.goods.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          this.xiugaishuliangDialog.inputValue = this.chooeseGoods.goods[key].num
          this.xiugaishuliangDialog.isShow = true
        } else {
          alert('请购物车选择要修改数量的商品');
        }
      }
      if (this.chooeseGoods.fuwuGoods.length) {
        let key = 'undefined'
        this.chooeseGoods.fuwuGoods.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          this.xiugaishuliangDialog.inputValue = this.chooeseGoods.fuwuGoods[key].num
          this.xiugaishuliangDialog.isShow = true
        } else {
          alert('请购物车选择要修改数量的服务商品');
        }
      }
      if (this.chooeseGoods.cardList.length) {
        let key = 'undefined'
        this.chooeseGoods.cardList.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          this.xiugaishuliangDialog.inputValue = this.chooeseGoods.cardList[key].num
          this.xiugaishuliangDialog.isShow = true
        } else {
          alert('请购物车选择要修改数量的服务卡');
        }
      }
    },
    clickChangeNumShoppingCarGood (code){
      let n = this.xiugaishuliangDialog.inputValue.toString()
      n += code
      if(/^\+?[1-9][0-9]*$/.test(n)) {
        this.xiugaishuliangDialog.inputValue += code
      }
    },
    clickChangeNumShoppingCarGoodOk (){
      if (this.chooeseGoods.goods.length) {
        let key = 'undefined'
        this.chooeseGoods.goods.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          if ((parseFloat(this.xiugaishuliangDialog.inputValue) <= parseFloat(this.chooeseGoods.goods[key].stock)) && (parseFloat(this.xiugaishuliangDialog.inputValue) >= 1)) {
            this.chooeseGoods.goods[key].num = this.xiugaishuliangDialog.inputValue
            this.xiugaishuliangDialog.inputValue = ''
            this.xiugaishuliangDialog.isShow = false
          }
        }
      }
      if (this.chooeseGoods.fuwuGoods.length) {
        let key = 'undefined'
        this.chooeseGoods.fuwuGoods.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          if (parseFloat(this.xiugaishuliangDialog.inputValue) >= 1) {
            this.chooeseGoods.fuwuGoods[key].num = this.xiugaishuliangDialog.inputValue
            this.xiugaishuliangDialog.inputValue = ''
            this.xiugaishuliangDialog.isShow = false
          }
        }
      }
      if (this.chooeseGoods.cardList.length) {
        let key = 'undefined'
        this.chooeseGoods.cardList.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          if (parseFloat(this.xiugaishuliangDialog.inputValue) >= 1) {
            this.chooeseGoods.cardList[key].num = this.xiugaishuliangDialog.inputValue
            this.xiugaishuliangDialog.inputValue = ''
            this.xiugaishuliangDialog.isShow = false
          }
        }
      }
      this.sumChooseGoodsMoney()
      this.$forceUpdate()
    },

    // 选中购物车里的商品，后点击改价按钮
    clickBtnXiugaijiageShoppingCarGood () {
      if (this.chooeseGoods.goods.length) {
        // 显示弹窗
        let key = 'undefined'
        this.chooeseGoods.goods.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          if (this.chooeseGoods.goods[key].is_edit === 1) {
            this.xiugaijiageDialog.inputValue = this.chooeseGoods.goods[key].edit_price
          } else {
            this.xiugaijiageDialog.inputValue = this.chooeseGoods.goods[key].price
          }
          this.xiugaijiageDialog.isShow = true
        } else {
          alert('请在购物车选择要修改价格的商品');
        }
      }
      if (this.chooeseGoods.fuwuGoods.length) {
        // 显示弹窗
        let key = 'undefined'
        this.chooeseGoods.fuwuGoods.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          if (this.chooeseGoods.fuwuGoods[key].is_edit === 1) {
            this.xiugaijiageDialog.inputValue = this.chooeseGoods.fuwuGoods[key].edit_price
          } else {
            this.xiugaijiageDialog.inputValue = this.chooeseGoods.fuwuGoods[key].price
          }
          this.xiugaijiageDialog.isShow = true
        } else {
          alert('请在购物车选择要修改价格的服务商品');
        }
      }
      if (this.chooeseGoods.cardList.length) {
        // 显示弹窗
        let key = 'undefined'
        this.chooeseGoods.cardList.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          if (this.chooeseGoods.cardList[key].is_edit === 1) {
            this.xiugaijiageDialog.inputValue = this.chooeseGoods.cardList[key].edit_price
          } else {
            this.xiugaijiageDialog.inputValue = this.chooeseGoods.cardList[key].price
          }
          this.xiugaijiageDialog.isShow = true
        } else {
          alert('请在购物车选择要修改价格的服务卡');
        }
      }
    },
    clickChangejiageShoppingCarGood (code){
      let n = this.xiugaijiageDialog.inputValue
      if(code !== '.')
        n += code
      else
        n += code + '0'
      if(/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/.test(n)) {
        this.xiugaijiageDialog.inputValue += code
      }
    },
    clickChangejiageShoppingCarGoodOk (){
      if (this.chooeseGoods.goods.length) {
        let key = 'undefined'
        this.chooeseGoods.goods.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          if ((parseFloat(this.xiugaijiageDialog.inputValue) < parseFloat(this.chooeseGoods.goods[key].price)) && (parseFloat(this.xiugaijiageDialog.inputValue) > 0)) {
            this.chooeseGoods.goods[key].is_edit = 1
            this.chooeseGoods.goods[key].edit_price = this.xiugaijiageDialog.inputValue
            this.xiugaijiageDialog.inputValue = ''
            this.xiugaijiageDialog.isShow = false
          }
        }
      }
      if (this.chooeseGoods.fuwuGoods.length) {
        let key = 'undefined'
        this.chooeseGoods.fuwuGoods.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          if ((parseFloat(this.xiugaijiageDialog.inputValue) < parseFloat(this.chooeseGoods.fuwuGoods[key].price)) && (parseFloat(this.xiugaijiageDialog.inputValue) > 0)) {
            this.chooeseGoods.fuwuGoods[key].is_edit = 1
            this.chooeseGoods.fuwuGoods[key].edit_price = this.xiugaijiageDialog.inputValue
            this.xiugaijiageDialog.inputValue = ''
            this.xiugaijiageDialog.isShow = false
          }
        }
      }
      if (this.chooeseGoods.cardList.length) {
        let key = 'undefined'
        this.chooeseGoods.cardList.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          if ((parseFloat(this.xiugaijiageDialog.inputValue) < parseFloat(this.chooeseGoods.cardList[key].price)) && (parseFloat(this.xiugaijiageDialog.inputValue) > 0)) {
            this.chooeseGoods.cardList[key].is_edit = 1
            this.chooeseGoods.cardList[key].edit_price = this.xiugaijiageDialog.inputValue
            this.xiugaijiageDialog.inputValue = ''
            this.xiugaijiageDialog.isShow = false
          }
        }
      }
      this.sumChooseGoodsMoney()
      this.$forceUpdate()
    },

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
      data.member_id = this.jiezhangDialog.memberVip.id
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
        this.jiezhangDialog.waiter = res.data
      }).catch((err) => {
        console.log(err, '服务人员获取失败')
      })
    },
    clickWaiter (e) {
      this.jiezhangDialog.nowWaiter = e
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
        if (res.data instanceof Object && !(res.data instanceof Array)) {
          this.chooeseGoods.cardList = []
          this.chooeseGoods.goods = []
          let good = res.data
          good.num = 1
          good.is_checked = false
          good.is_edit = 0
          good.edit_price = good.price
          for (let i = 0; i < this.chooeseGoods.goods.length; i++) {
            if (this.chooeseGoods.goods[i].id === good.id) {
              alert('该商品已经存在购物车了')
              return
            }
          }
          this.chooeseGoods.goods.push(good)
          this.chooeseGoods.fuwuGoods = []
        } else {
        }

      }).catch((err) => {
        console.log(err, '按条形码搜索商品失败')
      })
    },
    //计算结算总价
    sumChooseGoodsMoney(){
      let sumMoney = 0
      let modifyMoney = 0
      if (this.chooeseGoods.goods.length) {
        for (let i = 0; i < this.chooeseGoods.goods.length; i++) {
          sumMoney += this.chooeseGoods.goods[i].num * this.chooeseGoods.goods[i].price
          if (this.chooeseGoods.goods[i].is_edit === 1) {
            modifyMoney += this.chooeseGoods.goods[i].num * this.chooeseGoods.goods[i].edit_price
          } else {
            modifyMoney += this.chooeseGoods.goods[i].num * this.chooeseGoods.goods[i].price
          }
        }
      }
      if (this.chooeseGoods.fuwuGoods.length) {
        for (let i = 0; i < this.chooeseGoods.fuwuGoods.length; i++) {
          sumMoney += this.chooeseGoods.fuwuGoods[i].num * this.chooeseGoods.fuwuGoods[i].price
          if (this.chooeseGoods.fuwuGoods[i].is_edit === 1) {
            modifyMoney += this.chooeseGoods.fuwuGoods[i].num * this.chooeseGoods.fuwuGoods[i].edit_price
          } else {
            modifyMoney += this.chooeseGoods.fuwuGoods[i].num * this.chooeseGoods.fuwuGoods[i].price
          }
        }
      }
      if (this.chooeseGoods.cardList.length) {
        for (let i = 0; i < this.chooeseGoods.cardList.length; i++) {
          sumMoney += this.chooeseGoods.cardList[i].num * this.chooeseGoods.cardList[i].price
          if (this.chooeseGoods.cardList[i].is_edit === 1) {
            modifyMoney += this.chooeseGoods.cardList[i].num * this.chooeseGoods.cardList[i].edit_price
          } else {
            modifyMoney += this.chooeseGoods.cardList[i].num * this.chooeseGoods.cardList[i].price
          }
        }
      }
      this.jiezhangDialog.sumMoney = sumMoney
      this.jiezhangDialog.modifyMoney = modifyMoney
    },
    // 选择会员
    clickChoosesMemberByKeyboard (code) {
      if (code === 'ok') {
        if (/^[1][3,4,5,7,8][0-9]{9}$/.test(this.xuanzehuiyuanDialog.mobile)) {
          let requestData = {mobile: this.xuanzehuiyuanDialog.mobile}
          postSearchVip(requestData).then(res => {
            if (res.data) {
              this.jiezhangDialog.memberVip = res.data
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          alert('请输入正确的手机号')
        }
      } else {
        this.xuanzehuiyuanDialog.mobile += code
      }
    },
    // 充值弹框
    chongzhiDialogInputFocus (str) {
      this.chongzhiDialog.chooeseWho = str
    },
    chongzhiDialogGetCode(code) {
      if (this.chongzhiDialog.chooeseWho === 'mobile') {
        this.chongzhiDialog.mobile += `${code}`
      }
      if (this.chongzhiDialog.chooeseWho === 'money') {
        this.chongzhiDialog.payMoney += `${code}`
      }
    },
    chongzhiDialogSearchMemberVip () {
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.chongzhiDialog.mobile)) {
        alert('请输入正确的手机号')
        return
      }
      let requestData = {mobile: this.chongzhiDialog.mobile}
      postSearchVip(requestData).then(res => {
        if (res.data) {
          this.chongzhiDialog.huiyuanInfo = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    chongzhiDialogBtnOk () {
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.chongzhiDialog.mobile)) {
        alert('请输入正确的手机号')
        return
      }
      if(!/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/.test(this.chongzhiDialog.payMoney)) {
        alert('请输入正确的充值金额')
        return
      }
      if(!this.chongzhiDialog.payType){
        alert('请选择支付方式')
        return
      }
      if (!this.chongzhiDialog.huiyuanInfo.id) {
        alert('请选择要充值的会员')
        return
      }
      let requestData = {
        member_id: this.chongzhiDialog.huiyuanInfo.id,
        price: this.chongzhiDialog.payMoney,
        pay_way: this.chongzhiDialog.payType,
      }
      postMemberVipRecharge(requestData).then(res => {
        if (res.data) {
          this.$message({
            message: '恭喜你，这是一条成功消息',
            type: 'success'
          })
          this.chongzhiDialogSearchMemberVip()
        }
      }).catch(err => {
        console.log('充值失败', err)
      })
    },
    //会员查询弹框中的事件
    huiyuanDialogGetCode (code) {
      this.huiyuanDialog.mobile += `${code}`
    },
    huiyuanDialogSearchMemberVip () {
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.huiyuanDialog.mobile)) {
        alert('请输入正确的手机号')
        return
      }
      let requestData = {mobile: this.huiyuanDialog.mobile}
      postSearchVip(requestData).then(res => {
        if (res.data) {
          this.huiyuanDialog.huiyuanInfo = res.data
          this.huiyuanDialogSearchRechargeLog()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    huiyuanDialogAddMemberGetCode (code) {
      if (code === 'ok') {
        this.huiyuanDialogAddMemberVip()
      } else {
        this.huiyuanDialog.addHuiyuanDialog.mobile += `${code}`
      }
    },
    huiyuanDialogAddMemberVip () {
      let requestData = {
        mobile: this.huiyuanDialog.addHuiyuanDialog.mobile,
        nickname: this.huiyuanDialog.addHuiyuanDialog.nickname
      }
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(requestData.mobile)) {
        alert('请输入正确的手机号')
        return
      }
      if (!/^[\u4e00-\u9fa5]+$/.test(requestData.nickname)) {
        alert('请输入正确的会员昵称')
        return
      }
      postAddMemberVip(requestData).then(res => {
        alert(res.msg)
      }).catch(err => {
        console.log('新增会员失败', err)
      })
    },
    huiyuanDialogSearchRechargeLog () {
      if (this.huiyuanDialog.huiyuanInfo.id) {
        this.huiyuanDialog.showFuwuTable = false
        let requestData = {member_id: this.huiyuanDialog.huiyuanInfo.id,page: '1,5'}
        postMemberVipRechargeLog(requestData).then(res => {
          this.huiyuanDialog.chongzhijiluList = res.data
        })
      } else {
        alert('请查询选择会员')
      }
    },
    huiyuanDialogSearchServiceCardList () {
      if (this.huiyuanDialog.huiyuanInfo.id) {
        this.huiyuanDialog.showFuwuTable = true
        let requestData = {member_id: this.huiyuanDialog.huiyuanInfo.id}
        postMemberServiceCards(requestData).then(res => {
          if (res.data) {
            this.huiyuanDialog.fuwukaList = res.data
          } else {
            this.huiyuanDialog.fuwukaList = []
          }
        }).catch(err => {

        })
      } else {
        alert('请查询选择会员')
      }
    },

    //购卡弹框
    goukaDialogShow () {
      this.goukaDialog.isShow = true
      this.goukaDialogSearch()
    },
    goukaDialogChoosesCardType (type) {
      if (type !== 0)
        this.goukaDialog.title = ''
      this.goukaDialog.requestData.type = type
      this.goukaDialog.requestData.page = 1
      this.goukaDialogSearch()
    },
    goukaDialogSearch () {
      let requestData = {
        search: this.goukaDialog.title,
        type: this.goukaDialog.requestData.type,
        page: this.goukaDialog.requestData.page,
        limit: this.goukaDialog.requestData.limit,
      }
      if (!requestData.search) {
        delete requestData.search
      }
      if (!requestData.type) {
        delete requestData.type
      }
      postBuyServiceCards(requestData).then(res => {
        this.goukaDialog.requestData.total = res.total
        if(res.data) {
          res.data.map(item => {
            item.is_checked = false
          })
          this.goukaDialog.cardsList  = res.data
        } else {
          this.goukaDialog.cardsList  = []
        }
      }).catch(err => {

      })
    },
    goukaDialogSearchCardsNext () {
      if (this.goukaDialog.requestData.page < (this.goukaDialog.requestData.total / this.goukaDialog.requestData.limit)) {
        this.goukaDialog.requestData.page ++
        this.goukaDialogSearch()
      }
    },
    goukaDialogSearchCardsPre () {
      if (this.goukaDialog.requestData.page > 1) {
        this.goukaDialog.requestData.page --
        this.goukaDialogSearch()
      }
    },
    goukaDialogClickChoosesCard(key) {
      this.goukaDialog.cardsList.map(res => {
        res.is_checked = false
      })
      this.goukaDialog.cardsList[key].is_checked = true
    },
    goukaDialogNowBuy(){
      let key = 'flag'
      this.goukaDialog.cardsList.map((item, index) => {
        if(item.is_checked === true) {
          key = index
        }
      })
      if (key === 'flag') {
        alert('请选择要购买的服务卡')
        return
      } else {
        // 支付方式  1=微信支付 2=支付宝  3=余额  4=银行卡  5=现金  6=美团   7=赠送  8=门店自用 9=兑换  10=包月服务    11=定制疗程     99=管理员充值
        // let requestData = {
        //   member_id: this.jiezhangDialog.memberVip.id,
        //   price: this.goukaDialog.cardsList[key].price,
        //   card_id: this.goukaDialog.cardsList[key].id,
        //   waiter: this.jiezhangDialog.nowWaiter.id,
        //   pay: 1
        // }
        // console.log(requestData)
//添加服务卡进购物车
        this.chooeseGoods.cardList = []
        this.chooeseGoods.fuwuGoods = []
        this.chooeseGoods.goods = []
        let addTopCarCard = this.goukaDialog.cardsList[key]
        addTopCarCard.num = 1
        addTopCarCard.is_checked = false
        addTopCarCard.is_edit = 0
        addTopCarCard.edit_price = addTopCarCard.price
        this.chooeseGoods.cardList.push(addTopCarCard)
        this.goukaDialog.isShow = false
        this.sumChooseGoodsMoney()
        this.$forceUpdate()
      }
    },

    //结账操作
    jiezhangDialogClickBtn() {
      if (!this.jiezhangDialog.memberVip.id) {
        alert('请先选择会员')
        return
      }
      if (this.jiezhangDialog.nowWaiter.id === -1) {
        alert('请先选择服务人员')
        return
      }
      if (!(this.chooeseGoods.goods.length !== 0 || this.chooeseGoods.cardList.length !== 0 ||  this.chooeseGoods.fuwuGoods.length !== 0)) {
        alert('购物车里为空，请选择商品')
        return
      }
      this.jiezhangDialog.isShow = true
    },
    jiezhangDialogChoosesPayWay(way) {
      this.jiezhangDialog.chooesePayWay = way
    },
    jiezhangDialogClickOk () {
      let requestData = {
        member: this.jiezhangDialog.memberVip.id,       //会员id
        waiter: this.jiezhangDialog.nowWaiter.id,        //服务员id
        pay_way: this.jiezhangDialog.chooesePayWay,
        goods: [],
        service_goods:[],
      }
      if (this.chooeseGoods.goods.length) {
        let arr = []
        let obj = {}
        this.chooeseGoods.goods.map((item, index) => {
          obj.id = item.id
          obj.num = item.num
          obj.price = item.price
          obj.is_edit = item.is_edit
          if (item.is_edit) {
            obj.edit_price = item.edit_price
          }
          arr.push(obj)
        })
        requestData.goods = arr
        // delete requestData.service_goods
        postNowPayGoods(requestData).then(res => {
          this.jiezhangDialog.jiezhangSuccessDialog.isShow = true
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
      if (this.chooeseGoods.fuwuGoods.length) {
        let arr = []
        let obj = {}
        this.chooeseGoods.fuwuGoods.map((item, index) => {
          obj.id = item.id
          obj.num = item.num
          obj.price = item.price
          obj.is_edit = item.is_edit
          if (item.is_edit) {
            obj.edit_price = item.edit_price
          }
          arr.push(obj)
        })
        requestData.service_goods = arr
        // delete requestData.goods
        postNowPayGoods(requestData).then(res => {
          this.jiezhangDialog.jiezhangSuccessDialog.isShow = true
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
      if (this.chooeseGoods.cardList.length) {
        // TODO
        let requestData = {
          member_id: this.jiezhangDialog.memberVip.id,       //会员id
          waiter: this.jiezhangDialog.nowWaiter.id,        //服务员id
          pay: this.jiezhangDialog.chooesePayWay,//支付方式
          card_id:this.chooeseGoods.cardList[0].id,//服务卡id
          price:100,//服务卡id
        }
        postNowPayServiceCards(requestData).then(res => {
          this.jiezhangDialog.jiezhangSuccessDialog.isShow = true
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    },
  }
}
</script>

<style lang="less">
  .bg{
    height: 100%;
    width: 100%;
    background:#a6c9e2;
  }
  .get-money-content{
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
    overflow:hidden;
    padding: 20px 20px 0 20px;
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
      /*align-items: center;*/
      flex-wrap: nowrap;
      justify-content: space-between;
      .type-btn{
        width:700px;
        overflow: hidden;
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
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
      max-height: 824px;
      overflow-y: scroll;
      width: 100%;
      display: flex;
      align-items: flex-start;
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
      height: 42px;
      padding-bottom: 10;
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
    overflow: hidden;
    height: calc(100vh - 110px);
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap:nowrap;
    justify-content:space-between;
    flex-direction:column;
    padding-bottom: 10px;
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
    padding-bottom: 10px;
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
      .active{
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
            &:hover{
              cursor:pointer;
            }
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
  /*购卡项目弹窗*/
  .goukaxiangmu-tanchuan{
    .content{
      .search{
        width: 100%;
        margin-bottom: 24px;
      }
      .tab-btns{
        width: 100%;
        margin-bottom: 40px;
        display: flex;
        align-items: center;
        flex-wrap:wrap;
        justify-content: space-between;
        align-content:flex-start;
        .btn{
          width:228px;
          height:48px;
          background:#6BD2F4;
          font-size:24px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          color:rgba(26,26,26,1);
          &:active{
            color: #ffffff;
            background: #F55656;
          }
        }
        .active{
          color: #ffffff;
          background: #F55656;
        }
      }
      .bodys{
        width: 100%;
        height: 410px;
        margin-bottom:28px;
        display: flex;
        align-items: center;
        flex-wrap:wrap;
        align-items:flex-start;
        justify-content: space-between;
        align-content:flex-start;
      }
      .footer{
        width: 100%;
        text-align: center;
        .btn{
          width:168px;
          height:44px;
          background:rgba(255,255,255,1);
          border:1px solid rgba(46,202,241,1);
          border-radius:8px;
          color: #2ECAF1;
          font-size:20px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
          &:active{
            color: #ffffff;
            background: #2DC2F3;
          }
        }
      }
    }
  }
</style>
