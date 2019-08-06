<template>
    <div class="bg bg-blue">
      <v-head></v-head>
      <div class="get-money-content">
          <div style="width: 1038px;max-width:1038px;overflow: hidden;">
            <div class="all-goods">
              <div class="goods-type">
                <div v-for="item in serviceCategoryList" :key="item.id" class="my-div" @click="getFuwuGoods(item.id)">
                  <button class="fenlei-button"  :class="{'fenlei-button-active':requestFuwuGoodData.who === item.id}">{{item.cname}}</button>
                  <div class="after" :class="{'after-active':requestFuwuGoodData.who === item.id}"></div>
                </div>
              </div>
              <div style="overflow: hidden;width: 100%;flex: 1;margin-top: 28px;" ref="allGoodsScroll">
                <div  ref="allGoodsScrollContent" class="flex-goods" >
                  <v-good v-for="(item) in goodsList" :key="item.id" :ogood="item" class="goods" @click.native="checkGoodsTypeAndAddShoppingCar(item)"></v-good>
                  <div v-if="goodsList.length === 0" style="top: 50%;position: relative;left: 50%;width: 322px;height: 359px;margin-top: -179px;margin-left: -161px;">
                    <img src="../../assets/images/no-goods.png" alt="暂无商品" style="width: 322px;">
                    <p style="position: absolute;bottom:0;width: 100%;color: #1A1A1A;font-size: 24px;text-align: center;">暂无商品</p>
                  </div>
                </div>
              </div>
              <div class="page-buttons">
                <el-button  @click="clickPrePageBtn" :disabled="prePageBtnDisabled">上一页</el-button>
                <el-button class="page-button"  @click="clickNextPageBtn" :disabled="nextPageBtnDisabled">下一页</el-button>
              </div>
            </div>
          </div>
          <div style="max-width:100px;width:8.02%;overflow: hidden;">
            <div class="caozuo-buttons">
              <el-button @click="clickAddNumShoppingCarGood" class="caozuo-button">
                <i class="el-icon-plus" style="font-weight: 900;"></i>
              </el-button>
              <el-button @click="clickSubNumShoppingCarGood" class="caozuo-button">
                <i class="el-icon-minus"  style="font-weight: 900;"></i>
              </el-button>
              <el-button @click="clickBtnXiugaishuliangShoppingCarGood" class="caozuo-button">数量</el-button>
              <el-button @click="clickBtnXiugaijiageShoppingCarGood" class="caozuo-button">改价</el-button>
              <el-button @click="clickDelShoppingCarGood" class="caozuo-button">删除</el-button>
              <el-button @click="chongzhiDialog.isShow = true" class="caozuo-button">充值</el-button>
              <el-button @click="huiyuanDialog.isShow = true" class="caozuo-button">会员</el-button>
              <el-button @click="goukaDialogShow" class="caozuo-button">购卡</el-button>
            </div>
          </div>
          <div style="max-width: 636px;width:33.13%;overflow: hidden;">
            <div class="jiesuan-goods" >
              <div class="search">
                <el-input class="goods-search" @input="getGoodByCondition" @keyup.enter.native="getGoods()" placeholder="商品名称/条形码"  v-model="requestGoodData.title">
                  <i slot="suffix" class="el-input__icon el-icon-search" @click="requestFuwuGoodData.who = -1 ;getGoods()"></i>
                </el-input>
              </div>
              <div class="pay-goods-box">
                <ul v-if="chooeseGoods.goods.length" v-for="(good, key) in chooeseGoods.goods" :key="key" :class="{'active':good.is_checked}" @click="clickShoppingCarGood(chooeseGoods.goods,key)">
                    <li class="title clear-both">
                      <span class="float-left">{{good.title}}</span>
                      <span class="float-right">X {{good.num}}</span>
                    </li>
                    <li class="title code clear-both">
                      <span class="float-left">{{good.bar_code}}</span>
                      <span class="float-right red">￥{{good.is_edit ? parseFloat(good.edit_price * good.num).toFixed(2) : parseFloat(good.price * good.num).toFixed(2)}}</span>
                    </li>
                    <li class="title code clear-both">
                      <span class="yuanjia" v-if="good.is_edit">￥{{good.price}}</span>
                      <el-tag v-if="good.is_edit" size="mini" type="danger" effect="dark">改</el-tag>
                      <span class="red danjia" v-if="good.is_edit">￥{{good.edit_price}}</span>
                      <span class="red danjia" v-else>￥{{good.price}}</span>
                      <span v-if="good.is_edit && good.is_service_goods === '0'" style="color:#f5960c;font-size: 12px;">不低于{{good.minimum_selling_price}}</span>
  <!--                    <span class="huiyuanjia">会员价￥{{good.price}}</span>-->
                      <span class="float-right" v-if="good.is_service_goods === '1'">
                        <el-dropdown class="user-name" trigger="click" @command="serviceGoodsChoosesWaiter">
                          <span class="el-dropdown-link"  @click="getWaiterList()">
                            <span v-if="good.nowWaiter.id != -1"><span class="font-blue">{{good.nowWaiter.name}}</span> [{{good.nowWaiter.type}}]  <i class="el-icon-arrow-down"></i></span>
                            <span v-else> <span class="font-blue">请选择服务人员</span> <i class="el-icon-arrow-down"></i></span>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(item) in waiterList" :key="item.id" :command="{key:key,value:item}">
                              <span class="font-blue">{{item.name}}</span>
                              [{{item.type}}]
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </span>
                    </li>
                  </ul>
                <ul v-if="chooeseGoods.outServiceGoods.length" v-for="(good, key) in chooeseGoods.outServiceGoods" :key="key" :class="{'active':good.is_checked}" @click="clickShoppingCarGood(chooeseGoods.outServiceGoods,key)">
                  <li class="title clear-both">
                    <span class="float-left">{{good.title}}</span>
                    <span class="float-right">X {{good.num}}</span>
                  </li>
                  <li class="title code clear-both">
                    <span class="float-left">{{good.bar_code}}</span>
                    <span class="float-right red">￥{{good.is_edit ? parseFloat(good.edit_price * good.num).toFixed(2) : parseFloat(good.price * good.num).toFixed(2)}}</span>
                  </li>
                  <li class="title code clear-both">
                    <span class="yuanjia" v-if="good.is_edit">￥{{good.price}}</span>
                    <el-tag v-if="good.is_edit" size="mini" type="danger" effect="dark">改</el-tag>
                    <span class="red danjia" v-if="good.is_edit">￥{{good.edit_price}}</span>
                    <span class="red danjia" v-else>￥{{good.price}}</span>
                    <span v-if="good.is_edit && good.is_service_goods === '0'" style="color:#f5960c;font-size: 12px;">不低于{{good.minimum_selling_price}}</span>
                    <!--                    <span class="huiyuanjia">会员价￥{{good.price}}</span>-->
                    <span class="float-right" v-if="good.is_service_goods === '1'">
                        <el-dropdown class="user-name" trigger="click" @command="serviceGoodsChoosesWaiter">
                          <span class="el-dropdown-link"  @click="getWaiterList()">
                            <span v-if="good.nowWaiter.id != -1"><span class="font-blue">{{good.nowWaiter.name}}</span> [{{good.nowWaiter.type}}]  <i class="el-icon-arrow-down"></i></span>
                            <span v-else> <span class="font-blue">请选择服务人员</span> <i class="el-icon-arrow-down"></i></span>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(item) in waiterList" :key="item.id" :command="{key:key,value:item}">
                              <span class="font-blue">{{item.name}}</span>
                              [{{item.type}}]
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </span>
                  </li>
                </ul>
                <ul v-if="chooeseGoods.outOrdinaryGoods.length" v-for="(good, key) in chooeseGoods.outOrdinaryGoods" :key="key" :class="{'active':good.is_checked}" @click="clickShoppingCarGood(chooeseGoods.outOrdinaryGoods,key)">
                  <li class="title clear-both">
                    <span class="float-left">{{good.title}}</span>
                    <span class="float-right">X {{good.num}}</span>
                  </li>
                  <li class="title code clear-both">
                    <span class="float-left">{{good.bar_code}}</span>
                    <span class="float-right red">￥{{good.is_edit ? parseFloat(good.edit_price * good.num).toFixed(2) : parseFloat(good.price * good.num).toFixed(2)}}</span>
                  </li>
                  <li class="title code clear-both">
                    <span class="yuanjia" v-if="good.is_edit">￥{{good.price}}</span>
                    <el-tag v-if="good.is_edit" size="mini" type="danger" effect="dark">改</el-tag>
                    <span class="red danjia" v-if="good.is_edit">￥{{good.edit_price}}</span>
                    <span class="red danjia" v-else>￥{{good.price}}</span>
                    <span v-if="good.is_edit && good.is_service_goods === '0'" style="color:#f5960c;font-size: 12px;">不低于{{good.minimum_selling_price}}</span>
                    <!--                    <span class="huiyuanjia">会员价￥{{good.price}}</span>-->
                    <span class="float-right" v-if="good.is_service_goods === '1'">
                        <el-dropdown class="user-name" trigger="click" @command="serviceGoodsChoosesWaiter">
                          <span class="el-dropdown-link"  @click="getWaiterList()">
                            <span v-if="good.nowWaiter.id != -1"><span class="font-blue">{{good.nowWaiter.name}}</span> [{{good.nowWaiter.type}}]  <i class="el-icon-arrow-down"></i></span>
                            <span v-else> <span class="font-blue">请选择服务人员</span> <i class="el-icon-arrow-down"></i></span>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(item) in waiterList" :key="item.id" :command="{key:key,value:item}">
                              <span class="font-blue">{{item.name}}</span>
                              [{{item.type}}]
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </span>
                  </li>
                </ul>
                <ul v-if="chooeseGoods.cardList.length" v-for="(good, key) in chooeseGoods.cardList" :key="good.id" :class="{'active':good.is_checked}" @click="clickShoppingCarGood(chooeseGoods.cardList,key)">
                  <li class="title clear-both">
                    <span class="float-left">{{good.card_name}}</span>
                    <span class="float-right">X {{good.num}}</span>
                  </li>
                  <li class="title code clear-both">
                    <span class="float-left"></span>
                    <span class="float-right red">￥{{good.is_edit ? parseFloat(good.edit_price * good.num).toFixed(2) : parseFloat(good.price * good.num).toFixed(2)}}</span>
                  </li>
                  <li class="title">
                    <span class="yuanjia" v-if="good.is_edit">￥{{good.price}}</span>
                    <el-tag v-if="good.is_edit" size="mini" type="danger" effect="dark">改</el-tag>
                    <span class="red danjia" v-if="good.is_edit">￥{{good.edit_price}}</span>
                    <span class="red danjia" v-else>￥{{good.price}}</span>
                    <!--                    <span class="huiyuanjia">会员价￥{{good.price}}</span>-->
                  </li>
                </ul>
              </div>
              <div class="queren-xinxi">
                <ul>
                  <li v-if="jiezhangDialog.isShowChooeseWaiterBlock">
                    <span class="float-left">商品服务人员</span>
                    <span class="float-right select">
                      <el-dropdown class="user-name" trigger="click" @command="clickWaiter">
                        <span class="el-dropdown-link"  @click="getWaiterList()">
                          <span v-if="jiezhangDialog.nowWaiter.id != -1"><span class="font-blue">{{jiezhangDialog.nowWaiter.name}}</span> [{{jiezhangDialog.nowWaiter.type}}]  <i class="el-icon-arrow-down"></i></span>
                          <span v-else> <span class="font-blue">请选择商品服务人员</span> <i class="el-icon-arrow-down"></i></span>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item v-for="(item) in waiterList" :key="item.id" :command="item">
                            <span class="font-blue">{{item.name}}</span>
                            [{{item.type}}]
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </span>
                  </li>
                  <li v-if="chooeseGoods.cardList.length">
                    <span class="float-left">服务卡服务人员</span>
                    <span class="float-right select">
                      <el-dropdown class="user-name" trigger="click" @command="clickWaiterServiceCard">
                        <span class="el-dropdown-link"  @click="getWaiterList()">
                          <span v-if="jiezhangDialog.serviceCardNowWaiter.id != -1"><span class="font-blue">{{jiezhangDialog.serviceCardNowWaiter.name}}</span> [{{jiezhangDialog.serviceCardNowWaiter.type}}]  <i class="el-icon-arrow-down"></i></span>
                          <span v-else> <span class="font-blue">请选择服务人员</span> <i class="el-icon-arrow-down"></i></span>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item v-for="(item) in waiterList" :key="item.id" :command="item">
                            <span class="font-blue">{{item.name}}</span>
                            [{{item.type}}]
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </span>
                  </li>
                  <li>
                    <span class="float-left">
                      会员&nbsp;
                      <span class="font-blue" @click="xuanzehuiyuanDialog.isShow = true">{{jiezhangDialog.memberVip.nickname ? jiezhangDialog.memberVip.nickname : '未选择'}}</span>
                      <el-tag v-if="jiezhangDialog.memberVip.nickname" size="small" type="danger" style="cursor: pointer;color: #F83D3D;background: #fff;border: 1px solid #F83D3D;" @click="jiezhangDialog.memberVip={}">删除</el-tag>
                    </span>
                    <span class="float-right">余额￥{{jiezhangDialog.memberVip.money ? jiezhangDialog.memberVip.money : '0.00'}}</span>
                  </li>
                  <li>
                    <span class="float-left">合计</span>
                    <span  class="float-right">￥{{parseFloat(jiezhangDialog.sumMoney).toFixed(2)}}</span>
                  </li>
                  <li>
                    <span class="float-left">改价</span>
                    <span  class="float-right">￥{{parseFloat(jiezhangDialog.modifyMoney - jiezhangDialog.sumMoney).toFixed(2)}}</span>
                  </li>
                  <li>
                    <span class="float-left">结算</span>
                    <!-- 支付方式为赠送 门店自用，需要支付的钱为0-->
                    <span class="float-right" v-if="jiezhangDialog.chooesePayWay === 7 || jiezhangDialog.chooesePayWay ===8">￥0.00</span>
                    <span class="float-right" v-else>￥{{jiezhangDialog.modifyMoney}}</span>
                  </li>
                </ul>
                <div class="buttons" style="margin-top: 40px;">
                  <el-button @click="xuanzehuiyuanDialog.isShow = true" class="my-btn">选择会员</el-button>
                  <el-button @click="jiezhangDialogClickBtn"  class="my-btn active">结账</el-button>
                </div>
              </div>
            </div>
          </div>
      </div>

      <!--修改价格弹框-->
      <el-dialog class="gaijia-tanchuan" title="修改价格" :visible.sync="xiugaijiageDialog.isShow" width="434px" :center="true">
        <div>
          <el-input class="gaijia-input" placeholder="请输入内容" clearable v-model="xiugaijiageDialog.inputValue" type="number"  min="0"></el-input>
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
          <el-input class="gaijia-input" placeholder="请输入内容" clearable v-model="xiugaishuliangDialog.inputValue" type="number" min="1" @keydown.native="inputNumShoppingCarGood"></el-input>
          <div class="clear-both" style="height: 290px;">
            <div class="float-left">
              <v-keyboard-without-point @getNumber="clickChangeNumShoppingCarGood"></v-keyboard-without-point>
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
              <el-input v-model="chongzhiDialog.mobile" @input.native="chongzhiDialogSearchMemberVip" @focus="chongzhiDialogInputFocus('mobile')"  placeholder="请输入会员手机号" clearable maxlength="11"></el-input>
            </div>
            <div class="two">
              <ul>
                <li>
                  <span class="float-left">会员</span>
                  <span class="float-right font-blue">{{ chongzhiDialog.huiyuanInfo.nickname }}</span>
                </li>
                <li>
                  <span class="float-left">累积充值</span>
                  <span class="float-right">{{chongzhiDialog.huiyuanInfo.amount ? '￥ ' + parseFloat(chongzhiDialog.huiyuanInfo.amount).toFixed(2) : ''}}</span>
                </li>
                <li>
                  <span class="float-left">余额</span>
                  <span class="float-right font-red">{{chongzhiDialog.huiyuanInfo.money ? '￥ ' + parseFloat(chongzhiDialog.huiyuanInfo.money).toFixed(2) : ''}}</span>
                </li>
                <li>
                  <span class="float-left">会员等级</span>
                  <span class="float-right">{{ chongzhiDialog.huiyuanInfo.level_name }}&nbsp;<i class="el-icon-question font-blue" @click="getMemberLevelInfo"></i></span>
                </li>
              </ul>
            </div>
            <div class="three">
              <el-radio-group v-model="chongzhiDialog.payType">
<!--                //支付方式：1=微信支付 2=支付宝 3=余额(会员卡)4=银行卡5=现金6=美团7=赠送8=门店自用 9=兑换10=包月服务11=定制疗程99=管理员充值-->
                <el-radio label="5">现金</el-radio>
                <el-radio label="1">微信</el-radio>
                <el-radio label="2">支付宝</el-radio>
                <el-radio label="4">银行卡</el-radio>
              </el-radio-group>
            </div>
            <div class="four">
              <el-input @focus="chongzhiDialogInputFocus('money')" v-model="chongzhiDialog.payMoney" placeholder="请输入充值金额" clearable></el-input>
            </div>
            <div style="height: 40px">
              <el-form >
                <el-form-item label="请选择服务人员">
                  <el-select v-model="chongzhiDialog.nowWaiter" placeholder="请选择" @focus="getWaiterList()">
                    <el-option
                      v-for="item in waiterList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      <span style="float: left" class="font-blue">{{ item.name }}</span>
                      <span style="float: right;color: #ccc;" >({{ item.type }})</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="float-right right">
            <v-keyboard @getNumber="chongzhiDialogGetCode"></v-keyboard>
            <el-button @click="chongzhiDialogBtnOk" class="queding-chongzhi">确定充值</el-button>
          </div>
        </div>
      </el-dialog>
      <!--会员等级说明弹框-->
      <el-dialog class="huiyuandengjishuoming-tanchuan" title="会员等级说明" :visible.sync="chongzhiDialog.isShowHuiyuanDengjiDialog.isShow" width="480px" :center="true">
        <div class="content">
          <span class="overflow-row2-ellipsis" v-for="(item, index) in chongzhiDialog.isShowHuiyuanDengjiDialog.responseData" :key="index">{{item.level_name}}：充值{{item.price}}</span>
        </div>
      </el-dialog>
      <!--结账弹框-->
      <el-dialog class="jiezhang-tanchuan" title="结账" :visible.sync="jiezhangDialog.isShow" width="780px" :center="true">
        <div class="clear-both box">
          <div class="float-left my-left">
            <ul>
              <li class="clear-both">
                <span class="float-left">应收</span>
                <!-- 选择赠送和门店自用的支付方式，费用显示为0-->
                <span class="float-right font-red" v-if="jiezhangDialog.chooesePayWay === 7 || jiezhangDialog.chooesePayWay ===8">￥ 0.00</span>
                <span class="float-right font-red" v-else>¥ {{jiezhangDialog.modifyMoney}}</span>
              </li>
              <li class="clear-both">
                <span class="float-left">改价</span>
                <span class="float-right">¥ {{parseFloat(jiezhangDialog.modifyMoney - jiezhangDialog.sumMoney).toFixed(2)}}</span>
              </li>
              <li class="clear-both">
                <span class="float-left"><span>会员</span> <span class="font-blue"  @click="xuanzehuiyuanDialog.isShow = true">{{jiezhangDialog.memberVip.nickname?jiezhangDialog.memberVip.nickname:'未选择'}}</span></span>
                <span class="float-right">余额：¥ {{jiezhangDialog.memberVip.money ? jiezhangDialog.memberVip.money : '0.00'}}</span>
              </li>
              <li>
                <el-form label-width="50px">
                  <el-form-item label="备注:">
                    <el-input v-model="jiezhangDialog.remarks" placholder="请输入购买备注"></el-input>
                  </el-form-item>
                </el-form>
              </li>
            </ul>
            <div class="div clear-both">
              <button @click="jiezhangDialog.isShow = false" class="float-left">取消</button>
              <button @click="jiezhangDialogClickOk" class="float-right active">确认结账</button>
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
               <span  v-if="jiezhangDialog.closedPayWay.indexOf(8) !== -1 || jiezhangDialog.memberVip.id"   class="span-btn closed">
                <img src="../../assets/icon/checkout-mendian.png" alt="门店自用"><span>门店自用</span>
               </span>
               <span v-else class="span-btn" :class="{'active' : jiezhangDialog.chooesePayWay === 8}" @click="jiezhangDialogChoosesPayWay(8)">
                <img src="../../assets/icon/checkout-mendian.png" alt="门店自用"><span>门店自用</span>
               </span>
             </div>
          </div>
        </div>
      </el-dialog>
      <!-- 选择会员弹框 -->
      <el-dialog class="xuanzehuiyuan-tanchuan" title="选择会员" :visible.sync="xuanzehuiyuanDialog.isShow" width="810px" :center="true">
        <div class="clear-both div">
            <div class="float-left left">
              <div class="search">
                <el-input @keyup.native="searchMember()" @keyup.enter.native="searchMember()" v-model="xuanzehuiyuanDialog.mobile" placeholder="请输入会员手机号" maxlength="11"></el-input>
              </div>
              <div class="content">
                <ul>
                  <li><span class="float-left">会员</span><span class="float-right font-blue">{{xuanzehuiyuanDialog.memberVip.nickname}}</span></li>
                  <li><span class="float-left">余额</span><span class="float-right font-red">{{xuanzehuiyuanDialog.memberVip.money ? `￥`+xuanzehuiyuanDialog.memberVip.money:''}}</span></li>
                  <li><span class="float-left">会员等级</span><span class="float-right">{{xuanzehuiyuanDialog.memberVip.level_name}}</span></li>
                  <li>
                    <span class="float-left">服务卡</span>
                    <span class="float-right" v-if="xuanzehuiyuanDialog.memberVip.service_card || xuanzehuiyuanDialog.memberVip.service_card === 0">
                      <el-badge :value="xuanzehuiyuanDialog.memberVip.service_card">
                        <el-button size="mini" @click="xuanzehuiyuanDialogSeeServiceCard">查看</el-button>
                      </el-badge>
                    </span>
                  </li>
<!--                  <li style="margin-top: 20px;">-->
<!--                    <span class="float-left">代金卷</span>-->
<!--                    <span class="float-right">-->
<!--                      <el-badge value="无">-->
<!--                        <el-button size="mini">查看</el-button>-->
<!--                      </el-badge>-->
<!--                    </span>-->
<!--                  </li>-->
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
                <el-button type="primary" @click="huiyuanDialog.isShow = false;huiyuanDialog.addHuiyuanDialog.isShow = true;">新增会员</el-button>
                <el-input style="width:392px;" @keyup.native="huiyuanDialogSearchMemberVip" v-model="huiyuanDialog.mobile" placeholder="请输入您需要查询的会员手机号码"  maxlength="11"></el-input>
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
                <el-button :class="{'active':huiyuanDialog.showWho === 'rechargeLog'}" @click="huiyuanDialogChoosesWho('rechargeLog')">充值记录</el-button>
                <el-button :class="{'active':huiyuanDialog.showWho === 'serviceCard'}" @click="huiyuanDialogChoosesWho('serviceCard')">服务卡</el-button>
              </div>
            </div>
            <div class="float-right right">
              <v-keyboard-without-point @getNumber="huiyuanDialogGetCode"></v-keyboard-without-point>
            </div>
          </div>
          <div class="my-table" v-if="huiyuanDialog.fuwukaList.length || huiyuanDialog.chongzhijiluList.length">
            <!-- 服务卡 -->
            <el-table v-show="huiyuanDialog.showWho === 'serviceCard'" :data="huiyuanDialog.fuwukaList" height="300" border style="width: 100%">
              <el-table-column type="index" label="序号" width="80"></el-table-column>
              <el-table-column prop="card_name" label="服务卡名称"></el-table-column>
              <el-table-column prop="real_price" label="购买金额"></el-table-column>
              <el-table-column prop="type_card" label="类型"></el-table-column>
              <el-table-column prop="create_time" label="购买时间"></el-table-column>
              <el-table-column prop="start_time" label="激活时间"></el-table-column>
              <el-table-column prop="end_time" label="过期时间"></el-table-column>
              <el-table-column prop="status_name" label="状态"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <!-- 状态 0未激活  1待使用 2为已使用 3为已过期 4 已退卡-->
                  <el-button v-if="scope.row.status === 0" type="text" size="mini" @click="huiyuanDialogActiveServiceCard(scope.row.id)">激活</el-button>
                  <el-button v-if="scope.row.status === 1" type="text" size="mini" @click="huiyuanDialogUseServiceCardList(scope.row)">耗卡</el-button>
                  <el-button v-if="scope.row.status === 2 || scope.row.status === 1" type="text" size="mini" @click="huiyuanDialogServiceCardUseRecords(scope.row)">使用记录</el-button>
                  <el-button v-if="scope.row.status === 4" type="text" size="mini" @click="huiyuanDialogServiceCardReturnCardsDetails(scope.row)">退卡详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 充值记录 -->
            <el-table v-show="huiyuanDialog.showWho === 'rechargeLog'" :data="huiyuanDialog.chongzhijiluList" height="300" border style="width: 100%">
              <el-table-column type="index" label="序号" width="80"></el-table-column>
              <el-table-column prop="member_id" label="会员"></el-table-column>
              <el-table-column prop="title" label="充值名称"></el-table-column>
              <el-table-column label="充值金额">
                <template slot-scope="scope">
                  <span v-if="scope.row.price < 0" class="font-red">{{scope.row.price}}</span>
                  <span v-else>{{scope.row.price}}</span>
                </template>
              </el-table-column>
              <el-table-column label="到账金额">
                <template slot-scope="scope">
                  <span v-if="scope.row.price < 0" class="font-red">{{scope.row.price}}</span>
                  <span v-else>{{scope.row.price}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="waiter" label="服务人员"></el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.price < 0">已退</span>
                  <span class='font-red' v-else>成功</span>
                  <br>
                  <span v-if="scope.row.price < 0">{{ scope.row.create_time }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="create_time" label="充值时间"  width="155"></el-table-column>
            </el-table>
            <div class="footer" style="margin-top: 10px;text-align: right;">
              <el-pagination
                background
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="huiyuanDialogPageSizeChange"
                :page-sizes="[5, 10, 20, 30]"
                :page-size="huiyuanDialog.limit"
                @current-change="huiyuanDialogOnePageCurrentChange"
                :current-page.sync="huiyuanDialog.page"
                :total="huiyuanDialog.count">
              </el-pagination>
            </div>
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
        <div>
          <el-table :data="huiyuanDialog.haokaDialog.tableData" border style="height: 240px;">
            <el-table-column prop="sname" label="服务项目"></el-table-column>
            <el-table-column prop="num" label="次数"></el-table-column>
            <el-table-column prop="s_num" label="剩余次数"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <span v-if="scope.row.type === '立即使用'" style="color: blue;" @click="huiyuanDialogUseServiceCard(scope.row)">{{scope.row.type}}</span>
                <span v-else-if="scope.row.type === '不可用'" class="font-red">{{scope.row.type}}</span>
                <span v-else>{{scope.row.type}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
      <!--会员查询-耗卡-选择服务人员-->
      <el-dialog title="是否确定使用" :visible.sync="huiyuanDialog.haokaDialog.choosesWaiterDialog.isShow" width="500px">
        <el-form>
          <el-form-item label="请选择服务人员">
            <el-select v-model="huiyuanDialog.haokaDialog.choosesWaiterDialog.waiter_id" placeholder="请选择服务人员" @focus="getWaiterList()">
              <el-option v-for="item in waiterList" :label="item.name" :key="item.id" :value="item.id">
                <span style="float: left" class="font-blue">{{ item.name }}</span>
                <span style="float: right;color: #ccc;" >({{ item.type }})</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="huiyuanDialog.haokaDialog.choosesWaiterDialog.isShow = false">取 消</el-button>
          <el-button type="primary" @click="huiyuanDialogUseServiceCardToGo">确 定</el-button>
        </span>
      </el-dialog>
      <!--会员查询-服务卡列表-激活服务卡-->
      <el-dialog title="是否激活服务卡" :visible.sync="huiyuanDialog.activeServiceCardDialog.isShow" width="500px">
        <el-form>
          <el-form-item label="请选择服务人员">
            <el-select v-model="huiyuanDialog.activeServiceCardDialog.waiter_id" placeholder="请选择服务人员" @focus="getWaiterList()">
              <el-option v-for="item in waiterList" :label="item.name" :key="item.id" :value="item.id">
                <span style="float: left" class="font-blue">{{ item.name }}</span>
                <span style="float: right;color: #ccc;" >({{ item.type }})</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="huiyuanDialog.activeServiceCardDialog.isShow = false">取 消</el-button>
          <el-button type="primary" @click="huiyuanDialogActiveServiceCardToGo">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 会员查询-使用记录  -->
      <el-dialog title="使用记录" :visible.sync="huiyuanDialog.shiyongjiluDialog.isShow" width="648px" :center="true">
        <div>
          <el-table :data="huiyuanDialog.shiyongjiluDialog.tableData" border height="300">
            <el-table-column prop="service_name" label="服务项目"></el-table-column>
            <el-table-column prop="time" label="使用时间"></el-table-column>
            <el-table-column prop="waiter" label="服务人员"></el-table-column>
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
         <div class="search">
           <el-input class="goods-search" @keyup.enter.native="goukaDialogChoosesCardType({name:'0'})"   placeholder="搜索服务卡名称"  v-model="goukaDialog.title">
             <i slot="suffix" class="el-input__icon el-icon-search" @click="goukaDialogChoosesCardType({name:'0'})"></i>
           </el-input>
         </div>
         <el-tabs v-model="goukaDialog.requestData.type" @tab-click="goukaDialogChoosesCardType">
               <el-tab-pane label="次卡" name="1" v-infinite-scroll="goukaDialogSearchCardsNext" infinite-scroll-immediate="false">
                 <v-card class="card-botton" v-for="(item, index) in goukaDialog.cardsList" :key="item.id" :ocard="item" @click.native="goukaDialogClickChoosesCard(index)"></v-card>
               </el-tab-pane>
               <el-tab-pane label="月卡" name="2" v-infinite-scroll="goukaDialogSearchCardsNext" infinite-scroll-immediate="false">
                 <v-card class="card-botton" v-for="(item, index) in goukaDialog.cardsList" :key="item.id" :ocard="item" @click.native="goukaDialogClickChoosesCard(index)"></v-card>
               </el-tab-pane>
               <el-tab-pane label="年卡" name="4" v-infinite-scroll="goukaDialogSearchCardsNext" infinite-scroll-immediate="false">
                 <v-card class="card-botton" v-for="(item, index) in goukaDialog.cardsList" :key="item.id" :ocard="item" @click.native="goukaDialogClickChoosesCard(index)"></v-card>
               </el-tab-pane>
               <el-tab-pane  label="搜索"  name="0" v-infinite-scroll="goukaDialogSearchCardsNext" infinite-scroll-immediate="false" 	>
                 <v-card class="card-botton" v-for="(item, index) in goukaDialog.cardsList" :key="item.id" :ocard="item" @click.native="goukaDialogClickChoosesCard(index)"></v-card>
               </el-tab-pane>
             </el-tabs>
         <div slot="footer" class="footer">
           <el-button @click="goukaDialog.isShow = false" class="btn" style="margin-right: 20px;">取消</el-button>
           <el-button @click="goukaDialogNowBuy" class="btn active" style="margin-left: 20px;">立即购买</el-button>
         </div>
      </el-dialog>
      <!-- 结账成功弹框-->
      <el-dialog class="jiezhang-chenggong-tanchuan" :visible.sync="jiezhangDialog.jiezhangSuccessDialog.isShow" width="298px">
        <div class="box">
          <img  src="../../assets/images/alert-logo.png" alt="图片">
          <div class="txt">
            {{jiezhangDialog.jiezhangSuccessDialog.content}}
          </div>
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
import vCard from '../common/card.vue'
import BScroll from 'better-scroll' // 滚动插件
import { postServiceCategory, postMemberLevelInfo, postGoods, postGoodsByCode, postServiceItemList, postWaiter, postSearchVip, postMemberVipRecharge, postAddMemberVip, postMemberServiceCards, postBuyServiceCards, postMemberVipRechargeLog, postNowPayGoods, postNowPayServiceCards, postMemberServiceCardsUseList, postMemberServiceCardsActive, postMemberServiceCardsUseListTicket, postMemberServiceCardsUseRecords } from '../../api/getData'

export default {
  name: 'Money',
  data () {
    return {
      /**
       * 公共参数
       */
      waiterList: [
        {
          id: 0, // 服务员id  当服务员的id为0师表示为当前登录的店长
          name: '管理员', // 服务员名称
          type: '店长' // 服务类型
        },
      ],
      // 服务分类
      serviceCategoryList:[
        {cname: "服务商品1", id: 205},
        {cname: "服务商品2", id: 204},
        {cname: "服务商品3", id: 203},
        {cname: "查询结果", id: 202},
      ],
      // 服务商品
      requestFuwuGoodData: {
        page: 1, // 当前页码
        num: 15,// 每页的数据
        service_type:'',//根据服务商品分类id获取服务商品
        who: 0, // 当前选中的分类名id
      },
      goodsList: [], // 收银大屏展示的商品列表（普通商品和服务商品）
      // 普通商品
      requestGoodData: {// 请求商品列表中的页数，页码服务器数据
        title:'',
        page: 1, // 当前页码
        num: 15, // 每页的数据
        who: '', // 当前选中的分类名id
        type_category: ''
      },

      // 上一页，下一页是否禁用
      prePageBtnDisabled: false,
      nextPageBtnDisabled: false,

      // 结账中的商品
      chooeseGoods: {
        // 选择的 非外包商品，包括 非外包服务商品 和 非外包普通商品
        goods: [],
        // // 选择的 外包商品 包括 外包服务商品 和 外包普通商品
        // outsourcing_goods:[],
        //外包服务
        outServiceGoods: [],
        //外包普通商品
        outOrdinaryGoods:[],
        // 购卡弹窗选择的卡片列表
        cardList: []
      },
      // 修改价格弹窗显示与否
      xiugaijiageDialog: {
        isShow: false,
        inputValue: ''
      },

      // 购物车 修改商品数量弹窗
      xiugaishuliangDialog: {
        isShow: false, // 修改数量弹窗显示与否
        inputValue: '' // 修改数量的值
      },
      //  会员查询 - 单击会员按钮后的弹窗所需要的数据
      huiyuanDialog: {
        isShow: false, // 是否显示会员查询对话框
        mobile: '', // 要查询的会员手机号码
        // 会员信息
        huiyuanInfo: {
          // id: 5110, // 会员id
          // mobile: '13637765376', // 会员电话
          // shop_code: 'A00036', // 所属门店的门店编号
          // level_id: 6, // 会员等级id
          // nickname: '荣柱', // 姓名
          // level_name: '七星会员', // 会员等级名称
          // money: '0.00', // 余额
          // amount: '0.05', // 累积充值
          // regtime: '1970-01-01 08:33:37'// 加入时间
        },
        // 新增会员对话框
        addHuiyuanDialog: {
          isShow: false, // 新增会员对话框是否显示
          mobile: '',
          nickname: ''
        },
        // 展示哪个数据 默认为充值记录
        showWho: 'rechargeLog',
        count:1,
        page:1,
        limit:5,
        // 服务卡购买记录
        fuwukaList: [
          // {
          //   id: 1,
          //   card_name: '艾灸推拿1艾灸推拿1艾灸推拿1艾灸推拿1艾灸推拿1',
          //   type: '1',
          //   real_price: 100.00,
          //   month: 2,
          //   year: 2019,
          //   create_time: '2019-07-03 11:47:15',
          //   start_time: '未激活',
          //   end_time: '2019-07-13 11:47:15',
          //   over_time: 1562989635,
          //   status: 0,
          //   type_card: '次卡',
          //   status_name: '未激活'
          // }
        ],
        // 会员充值记录
        chongzhijiluList: [
          // {
          //   id: 5,
          //   member_id: '哈哈(18046057585)', // 会员信息
          //   price: '10.11', // 充值金额、到账金额（当price小于0是表示已退，已退时间与充值时间一致）
          //   create_time: '2019-07-03 09:57:06', // 时间
          //   waiter: '1' // 服务人员名称
          // }
        ],
        // 耗卡弹窗
        haokaDialog: {
          isShow: false,
          tableData: [
            // {sname: '艾灸', num: '不限制', id: 1, s_num: '不限制', status: 1, year_num: 100, start_year: 1562230469, end_year: 1593852844, r_year: 100, month_num: 0, start_month: 0, end_month: 0, r_month: 0, day_num: 0, start_day: 0, end_day: 0, r_day: 0, type: '不可用'},
          ],
          choosesWaiterDialog:{
            isShow: false,
            service_id: '',
            waiter_id: ''
          }
        },
        // 使用记录弹窗
        shiyongjiluDialog: {
          isShow: false,
          tableData: [
            // {service_name: '水育', time: '2018-09-20 14:12:20', waiter: 5},
          ]
        },
        // 退卡详情
        tuikaDialog: {
          isShow: false,
          tableData: [
            // {name: '水育', time: '2018-09-20 14:12:20', who: '店长', money: 11.2, why: '不想用了', reg: '无'},
            // {name: '水育', time: '2018-09-20 14:12:20', who: '店长', money: 11.2, why: '不想用了', reg: '无'},
            // {name: '水育', time: '2018-09-20 14:12:20', who: '店长', money: 11.2, why: '不想用了', reg: '无'},
            // {name: '水育', time: '2018-09-20 14:12:20', who: '店长', money: 11.2, why: '不想用了', reg: '无'}
          ]
        },
        //激活服务卡弹框
        activeServiceCardDialog: {
          card_id: '',
          isShow: false,
          waiter_id: ''
        }
      },
      // 单击充值按钮后的弹窗所需要的数据
      chongzhiDialog: {
        isShow: false, // 充值弹窗显示与否
        mobile: '',
        chooeseWho: 'mobile',
        huiyuanInfo: {
          // id: 5110, // 会员id
          // mobile: '13637765376', // 会员电话
          // shop_code: 'A00036', // 所属门店的门店编号
          // level_id: 6, // 会员等级id
          // nickname: '荣柱', // 姓名
          // level_name: '七星会员', // 会员等级名称
          // money: '0.00', // 余额
          // amount: '0.05', // 累积充值
          // regtime: '1970-01-01 08:33:37'// 加入时间
        },
        isShowHuiyuanDengjiDialog: {
          isShow: false, // 等级说明弹框显示与否
          responseData: [
            // {
            //   price: "80.00",   //充值金额
            //   level_name: "五级会员"    //会员名称
            // },
            // {
            //   price: "60.00",
            //   level_name: "四级会员"
            // }
          ]
        },
        payType: '', // 充值方式
        payMoney: '', // 充值金额
        nowWaiter: '',
      },
      // 选择会员弹框是否显示
      xuanzehuiyuanDialog: {
        isShow: false,
        mobile: '',
        memberVip: {
          id: '', // 会员id
          mobile: '', // 会员电话
          shop_code: '', // 所属门店的门店编号
          level_id: '', // 会员等级id
          nickname: '', // 姓名
          level_name: '', // 会员等级名称
          money: '', // 余额
          amount: '', // 累积充值
          regtime: '', // 加入时间
          service_card:''
        },
      },

      // 购卡弹窗
      goukaDialog: {
        isShow: false,
        title: '', // 请输入购卡名称
        cardsList: [// 服务卡列表
          // {id: 1, card_name: '艾灸推拿1艾灸推拿1艾灸推拿1艾灸推拿1艾灸推拿1', type: '1', month: '', price: '100.00', mprice: '100.00', service: [{num: 10, service_name: '艾灸'}]},
          // {id: 2, card_name: '艾灸推拿', type: '2', month: '', price: '100.00', mprice: '100.00', service: []},
          // {id: 3, card_name: '艾灸推拿1艾灸推拿1艾灸推拿1艾灸推拿1艾灸推拿1', type: '3', month: '', price: '100.00', mprice: '100.00', service: [{num: 10, service_name: '艾灸'}]},
          // {id: 4, card_name: '艾灸推拿', type: '4', month: '', price: '100.00', mprice: '100.00', service: []}
        ],
        requestData: {
          total: 0,
          page: 1,
          limit: 5,
          type: "1"// 卡卷类型 1为次卡 2为月卡  3为季卡  4为年卡
        }
      },
      // 结账弹窗所需要的数据
      jiezhangDialog: {
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
        // 当购物车里有 普通商品，这时候需要选择普通商品的服务人员
        isShowChooeseWaiterBlock: false,
        // 当前选中的服务人员 当购物车里有 普通商品，这时候需要选择普通商品的服务人员
        nowWaiter: {
          id: -1, // 服务员id  当服务员的id为0师表示为当前登录的店长
          name: '请选择服务员', // 服务员名称
          type: '' // 服务类型
        },
        //当购物车里是服务卡的时候，也需要选中服务人员
        serviceCardNowWaiter: {
          id: -1, // 服务员id  当服务员的id为0师表示为当前登录的店长
          name: '请选择服务员', // 服务员名称
          type: '' // 服务类型
        },
        sumMoney: 0.00, // 所购商品的合计
        modifyMoney: 0.00, // 改价参数,
        chooesePayWay: '', // 支付方式
        remarks:'',//备注
        closedPayWay: [ // 被禁用的支付方式：1=微信支付 2=支付宝 3=余额(会员卡)4=银行卡5=现金6=美团7=赠送8=门店自用 9=兑换10=包月服务11=定制疗程99=管理员充值-->
        ],
        // 支付完成之后弹出的结账成功弹框
        jiezhangSuccessDialog: {
          isShow: false,
          content: '结账成功',
          seconds: 1500// 多少毫秒之后自动关闭
        },
        //
      }
    }
  },
  components: {
    vHead, vGood, vKeyboard, vKeyboardWithoutPointWithOk, vKeyboardWithoutPoint, vCard
  },
  mounted () {
   this.getServiceCatgoryList()
    this.$nextTick(() => {
      if (!this.allGoodsScroll) {
        this.allGoodsScroll = new BScroll(this.$refs.allGoodsScroll, {
          startY: 0,
          click: true,
          scrollX: false,
          scrollY: true,
          mouseWheel: true
          // eventPassthrough: 'vertical'
        })
        this.$refs.allGoodsScrollContent.style.height = 824 + 'px' // 分类列表初始化长度
        this.$refs.allGoodsScrollContent.style.width = '100%' // 分类列表初始化长度
      } else {
        this.allGoodsScroll.refresh()
      }
    })
    this.getWaiterList()
  },
  methods: {
    // 购物车里的每个服务商品选择服务人员
    serviceGoodsChoosesWaiter (e) {
      if (this.chooeseGoods.goods.length) {
        this.chooeseGoods.goods[e.key].nowWaiter = e.value
      }
      if (this.chooeseGoods.outServiceGoods.length) {
        this.chooeseGoods.outServiceGoods[e.key].nowWaiter = e.value
      }
      this.$forceUpdate()
    },
    // 获取服务分类列表
   async getServiceCatgoryList(){
      await postServiceCategory().then(res=>{
        this.serviceCategoryList = res.data
        this.requestFuwuGoodData.service_type = res.data[0].id
        this.requestFuwuGoodData.who = res.data[0].id
        this.serviceCategoryList.push({cname:'查询结果', id: -1})
        this.getServiceItemList()
      })
    },
    //根据服务商品分类id 获取服务商品
    getFuwuGoods(id){
      if (id!== -1){
        this.requestFuwuGoodData.service_type = id;
        this.requestFuwuGoodData.who = id;
        this.getServiceItemList()
      }
  },
    // 获取会员等级说明
    async getMemberLevelInfo () {
      await postMemberLevelInfo().then(res => {
        if (res.code === '200') {
          this.chongzhiDialog.isShowHuiyuanDengjiDialog.responseData = res.data
          this.chongzhiDialog.isShowHuiyuanDengjiDialog.isShow = true
        }
      })
    },
    //判断商品是否为外包商品
    checkGoodsTypeAndAddShoppingCar(good){
      //外包普通商品或外包服务
      if (good.is_outsourcing_goods === '1') {
        //外包服务
        if (good.is_service_goods === '1'){
          this.addShoppingCarOutServiceGoods(good)
        }
        //外包普通商品
        if (good.is_service_goods === '0'){
          this.addShoppingCarOutOrdinaryGoods(good)
        }
      }
      //非外包普通商品或外包服务
      if (good.is_outsourcing_goods === '0') {
        this.addShoppingCar(good)
      }
    },
    // 将非外包的 服务或普通商品加入购物车
    async addShoppingCar (good) {
      // 非外包服务商品
      if (good.is_service_goods === '1') {
        good.num = 1
        good.is_checked = false
        good.is_edit = 0
        good.edit_price = parseFloat(good.price).toFixed(2)
        good.price = parseFloat(good.price).toFixed(2)
        good.nowWaiter = {
          id: -1,
          name: '请选择服务员',
          type: ''
        }
        for (let i = 0; i < this.chooeseGoods.goods.length; i++) {
          if ((this.chooeseGoods.goods[i].id === good.id) && (this.chooeseGoods.goods[i].is_service_goods === good.is_service_goods)) {
            this.$message.closeAll()
            this.$message({
              message: '该服务商品已经存在购物车了,请在购物车里选择它后编辑它',
              type: 'error'
            })
            return
          }
        }
      }
      // 非外包普通商品
      if (good.is_service_goods === '0') {
        // 检查库存是否为0
        if (good.stock > 0) {
          good.num = 1
          good.is_checked = false
          good.is_edit = 0
          good.edit_price = parseFloat(good.price).toFixed(2)
          good.price = parseFloat(good.price).toFixed(2)
        } else {
          this.$message.closeAll()
          this.$message({
            message: '该商品的库存不足，不能加入购物车',
            type: 'error'
          })
          return
        }
        for (let i = 0; i < this.chooeseGoods.goods.length; i++) {
          if ((this.chooeseGoods.goods[i].id === good.id) && (good.is_service_goods === this.chooeseGoods.goods[i].is_service_goods)) {
            this.$message.closeAll()
            this.$message({
              message: '该商品已经存在购物车了,请在购物车里选择它后编辑它',
              type: 'error'
            })
            return
          }
        }
      }
      if (this.chooeseGoods.cardList.length || this.chooeseGoods.outOrdinaryGoods.length || this.chooeseGoods.outServiceGoods.length) {
        await this.$confirm('您购物车里已经存在其他类型的商品，此操作会清空购物车，是否确认？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.chooeseGoods.cardList = []
          this.chooeseGoods.outOrdinaryGoods = []
          this.chooeseGoods.outServiceGoods = []
          this.chooeseGoods.goods.push(good)
        }).catch(() => {
        })
      } else {
        this.chooeseGoods.cardList = []
        this.chooeseGoods.outOrdinaryGoods = []
        this.chooeseGoods.outServiceGoods = []
        this.chooeseGoods.goods.push(good)
      }
      this.sumChooseGoodsMoney()
      this.isShowChooeseWaiterBlock()
      this.$forceUpdate()
    },
    // 将外包的 服务商品加入购物车
    async addShoppingCarOutServiceGoods (good) {
      // 外包服务商品
      if (good.is_service_goods === '1') {
        good.num = 1
        good.is_checked = false
        good.is_edit = 0
        good.edit_price = parseFloat(good.price).toFixed(2)
        good.price = parseFloat(good.price).toFixed(2)
        good.nowWaiter = {
          id: -1,
          name: '请选择服务员',
          type: ''
        }
        for (let i = 0; i < this.chooeseGoods.outServiceGoods.length; i++) {
          if ((this.chooeseGoods.outServiceGoods[i].id === good.id) && (this.chooeseGoods.outServiceGoods[i].is_service_goods === good.is_service_goods)) {
            this.$message.closeAll()
            this.$message({
              message: '该外包服务商品已经存在购物车了,请在购物车里选择它后编辑它',
              type: 'error'
            })
            return
          }
        }
      }
      if (this.chooeseGoods.goods.length || this.chooeseGoods.cardList.length || this.chooeseGoods.outOrdinaryGoods.length) {
        await this.$confirm('您购物车里已经存在其他类型的商品，此操作会清空购物车，是否确认？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.chooeseGoods.cardList = []
          this.chooeseGoods.goods = []
          this.chooeseGoods.outOrdinaryGoods = []
          this.chooeseGoods.outServiceGoods.push(good)
        }).catch(() => {
        })
      } else {
        this.chooeseGoods.cardList = []
        this.chooeseGoods.goods = []
        this.chooeseGoods.outOrdinaryGoods = []
        this.chooeseGoods.outServiceGoods.push(good)
      }
      this.sumChooseGoodsMoney()
      this.isShowChooeseWaiterBlock()
      this.$forceUpdate()
    },
    // 将外包的 普通商品加入购物车
    async addShoppingCarOutOrdinaryGoods (good) {
      // 外包普通商品
      if (good.is_service_goods === '0') {
        // 检查库存是否为0
        if (good.stock > 0) {
          good.num = 1
          good.is_checked = false
          good.is_edit = 0
          good.edit_price = parseFloat(good.price).toFixed(2)
          good.price = parseFloat(good.price).toFixed(2)
        } else {
          this.$message.closeAll()
          this.$message({
            message: '该商品的库存不足，不能加入购物车',
            type: 'error'
          })
          return
        }
        for (let i = 0; i < this.chooeseGoods.outOrdinaryGoods.length; i++) {
          if ((this.chooeseGoods.outOrdinaryGoods[i].id === good.id) && (good.is_service_goods === this.chooeseGoods.outOrdinaryGoods[i].is_service_goods)) {
            this.$message.closeAll()
            this.$message({
              message: '该外包商品已经存在购物车了,请在购物车里选择它后编辑它',
              type: 'error'
            })
            return
          }
        }
      }
      if (this.chooeseGoods.goods.length || this.chooeseGoods.cardList.length || this.chooeseGoods.outServiceGoods.length) {
        await this.$confirm('您购物车里已经存在其他类型的商品，此操作会清空购物车，是否确认？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.chooeseGoods.cardList = []
          this.chooeseGoods.goods = []
          this.chooeseGoods.outServiceGoods = []
          this.chooeseGoods.outOrdinaryGoods.push(good)
        }).catch(() => {
        })
      } else {
        this.chooeseGoods.cardList = []
        this.chooeseGoods.goods = []
        this.chooeseGoods.outServiceGoods = []
        this.chooeseGoods.outOrdinaryGoods.push(good)
      }
      this.sumChooseGoodsMoney()
      this.isShowChooeseWaiterBlock()
      this.$forceUpdate()
    },

    // 购物车里的商品被单击后处于选中状态，然后进行修改操作，比如加数量、减数量、修改价格、删除
    clickShoppingCarGood (arr = [], key = 0) {
      arr.map((good) => {
        good.is_checked = false
      })
      if (arr.length){
        arr[key].is_checked = true
        this.$forceUpdate()
      }
    },

    // 购物车里的商品被删除
    clickDelShoppingCarGood () {
      if (this.chooeseGoods.goods.length){
        this.clickDelShoppingCarGoodWho(this.chooeseGoods.goods)
      }
      if (this.chooeseGoods.outServiceGoods.length){
        this.clickDelShoppingCarGoodWho(this.chooeseGoods.outServiceGoods)
      }
      if (this.chooeseGoods.outOrdinaryGoods.length){
        this.clickDelShoppingCarGoodWho(this.chooeseGoods.outOrdinaryGoods)
      }
      if (this.chooeseGoods.cardList.length){
        this.clickDelShoppingCarGoodWho(this.chooeseGoods.cardList)
      }
    },
    clickDelShoppingCarGoodWho(arr = []){
        let key = 'undefined'
        arr.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          arr.splice(key, 1)
          this.sumChooseGoodsMoney()
          this.isShowChooeseWaiterBlock()
          this.$forceUpdate()
        } else {
          this.$message.closeAll()
          this.$message({
            message: '请选中要删除的商品',
            type: 'error'
          })
        }
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
          if (this.chooeseGoods.goods[key].is_service_goods === '1') {
            this.clickAddNumShoppingCarGoodToAdd(this.chooeseGoods.goods, false)
          }
          if (this.chooeseGoods.goods[key].is_service_goods === '0') {
            this.clickAddNumShoppingCarGoodToAdd(this.chooeseGoods.goods, true)
          }
        } else {
          this.$message.closeAll()
          this.$message({
            message: '请选择购物车里的商品',
            type: 'error'
          })
        }
      }
      if (this.chooeseGoods.outServiceGoods.length) {
        this.clickAddNumShoppingCarGoodToAdd(this.chooeseGoods.outServiceGoods, false)
      }
      if (this.chooeseGoods.outOrdinaryGoods.length) {
        this.clickAddNumShoppingCarGoodToAdd(this.chooeseGoods.outOrdinaryGoods, true)
      }
      if (this.chooeseGoods.cardList.length) {
        this.clickAddNumShoppingCarGoodToAdd(this.chooeseGoods.cardList, true)
      }
    },
    /**
     * 选择购物车里的商品，单击增加数量按钮，更改数量
     * @param arr
     * @param isCheckStock 是否检出库存
     */
    clickAddNumShoppingCarGoodToAdd (arr = [], isCheckStock = false){
      let key = 'undefined'
      arr.map((good, index) => {
        if (good.is_checked === true) {
          key = index
        }
      })
      if (key !== 'undefined') {
        if (isCheckStock) {
          if (arr[key].num < arr[key].stock) {
            arr[key].num ++
          } else {
            this.$message.closeAll()
            this.$message({
              message: '购买数量达到最大值',
              type: 'error'
            })
          }
        } else {
          arr[key].num ++
        }
      } else {
        this.$message.closeAll()
        this.$message({
          message: '请选择购物车里的商品',
          type: 'error'
        })
      }
      this.sumChooseGoodsMoney()
      this.$forceUpdate()
    },

    // 购物车里的商品减少数量
    clickSubNumShoppingCarGood () {
      if (this.chooeseGoods.goods.length){
        this.clickSubNumShoppingCarGoodWho(this.chooeseGoods.goods)
      }
      if (this.chooeseGoods.outServiceGoods.length){
        this.clickSubNumShoppingCarGoodWho(this.chooeseGoods.outServiceGoods)
      }
      if (this.chooeseGoods.outOrdinaryGoods.length){
        this.clickSubNumShoppingCarGoodWho(this.chooeseGoods.outOrdinaryGoods)
      }
      if (this.chooeseGoods.cardList.length){
        this.clickSubNumShoppingCarGoodWho(this.chooeseGoods.cardList)
      }
    },
    clickSubNumShoppingCarGoodWho (arr = []) {
      let key = 'undefined'
      arr.map((good, index) => {
        if (good.is_checked === true) {
          key = index
        }
      })
      if (key !== 'undefined') {
        if (arr[key].num > 1) {
          arr[key].num--
        } else {
          this.$message.closeAll()
          this.$message({
            message: '购买数量最少为1',
            type: 'error'
          })
        }
      } else {
        this.$message.closeAll()
        this.$message({
          message: '请选择购物车里的商品',
          type: 'error'
        })
      }
      this.sumChooseGoodsMoney()
      this.$forceUpdate()
    },

    // 选中购物车里的商品，后点修改数量
    clickBtnXiugaishuliangShoppingCarGood () {
      if (this.chooeseGoods.goods.length) {
        this.clickBtnXiugaishuliangShoppingCarGoodShowXiugaishuliangDialog(this.chooeseGoods.goods)
      }
      if (this.chooeseGoods.outServiceGoods.length) {
        this.clickBtnXiugaishuliangShoppingCarGoodShowXiugaishuliangDialog(this.chooeseGoods.outServiceGoods)
      }
      if (this.chooeseGoods.outOrdinaryGoods.length) {
        this.clickBtnXiugaishuliangShoppingCarGoodShowXiugaishuliangDialog(this.chooeseGoods.outOrdinaryGoods)
      }
      if (this.chooeseGoods.cardList.length) {
        this.clickBtnXiugaishuliangShoppingCarGoodShowXiugaishuliangDialog(this.chooeseGoods.cardList)
      }
    },
    clickBtnXiugaishuliangShoppingCarGoodShowXiugaishuliangDialog (arr = []){
      let key = 'undefined'
      arr.map((good, index) => {
        if (good.is_checked === true) {
          key = index
        }
      })
      if (key !== 'undefined') {
        this.xiugaishuliangDialog.inputValue = arr[key].num
        this.xiugaishuliangDialog.isShow = true
      } else {
        this.$message.closeAll()
        this.$message({
          message: '请选中购物车里的商品',
          type: 'error'
        })
      }
    },

    inputNumShoppingCarGood(){
      if (isNaN(this.xiugaishuliangDialog.inputValue)||this.xiugaishuliangDialog.inputValue<=0||!(/^\d+$/.test(this.xiugaishuliangDialog.inputValue))) {
        this.xiugaishuliangDialog.inputValue = this.xiugaishuliangDialog.inputValue.replace(/\D+/g,'')
      }
    },
    clickChangeNumShoppingCarGood (code) {
      let n = this.xiugaishuliangDialog.inputValue.toString()
      n += code
      if (/^\+?[1-9][0-9]*$/.test(n)) {
        this.xiugaishuliangDialog.inputValue += code
      }
    },
    clickChangeNumShoppingCarGoodOk () {
      if (this.chooeseGoods.goods.length) {
        let key = 'undefined'
        this.chooeseGoods.goods.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          if (this.chooeseGoods.goods[key].is_service_goods === '1') {
            this.clickChangeNumShoppingCarGoodOkOk(this.chooeseGoods.goods, false)
          }
          if (this.chooeseGoods.goods[key].is_service_goods === '0') {
            this.clickChangeNumShoppingCarGoodOkOk(this.chooeseGoods.goods, true)
          }
        }
      }
      if (this.chooeseGoods.outServiceGoods.length) {
        this.clickChangeNumShoppingCarGoodOkOk(this.chooeseGoods.outServiceGoods, false)
      }
      if (this.chooeseGoods.outOrdinaryGoods.length) {
        this.clickChangeNumShoppingCarGoodOkOk(this.chooeseGoods.outOrdinaryGoods, true)
      }
      if (this.chooeseGoods.cardList.length) {
        this.clickChangeNumShoppingCarGoodOkOk(this.chooeseGoods.cardList, true)
      }
    },
    /**
     * 从输入框中更改数量
     * @param arr
     * @param isCheckStock 是否检查库存
     */
    clickChangeNumShoppingCarGoodOkOk(arr = [], isCheckStock = false) {
      let key = 'undefined'
      arr.map((good, index) => {
        if (good.is_checked === true) {
          key = index
        }
      })
      if (key !== 'undefined') {
        if (isCheckStock) {
          if ((parseInt(this.xiugaishuliangDialog.inputValue) <= parseInt(arr[key].stock)) && (parseInt(this.xiugaishuliangDialog.inputValue) >= 1)) {
            arr[key].num = parseInt(this.xiugaishuliangDialog.inputValue)
            this.xiugaishuliangDialog.inputValue = ''
            this.xiugaishuliangDialog.isShow = false
          } else {
            this.$message.closeAll()
            this.$message({
              message: '购买数量达到最大值或者小于1',
              type: 'error'
            })
          }
        } else {
          if (parseInt(this.xiugaishuliangDialog.inputValue) >= 1) {
            arr[key].num = parseInt(this.xiugaishuliangDialog.inputValue)
            this.xiugaishuliangDialog.inputValue = ''
            this.xiugaishuliangDialog.isShow = false
          } else {
            this.$message.closeAll()
            this.$message({
              message: '购买数量不能小于1',
              type: 'error'
            })
          }
        }
      }
      this.sumChooseGoodsMoney()
      this.$forceUpdate()
    },

    // 选中购物车里的商品，后点击改价按钮  显示弹窗
    clickBtnXiugaijiageShoppingCarGood () {
      if (this.chooeseGoods.goods.length) {
        this.clickBtnXiugaijiageShoppingCarGoodShowXiugaijiageDialog(this.chooeseGoods.goods)
      }
      if (this.chooeseGoods.outServiceGoods.length) {
        this.clickBtnXiugaijiageShoppingCarGoodShowXiugaijiageDialog(this.chooeseGoods.outServiceGoods)
      }
      if (this.chooeseGoods.outOrdinaryGoods.length) {
        this.clickBtnXiugaijiageShoppingCarGoodShowXiugaijiageDialog(this.chooeseGoods.outOrdinaryGoods)
      }
      if (this.chooeseGoods.cardList.length) {
        this.clickBtnXiugaijiageShoppingCarGoodShowXiugaijiageDialog(this.chooeseGoods.cardList)
      }
    },
    clickBtnXiugaijiageShoppingCarGoodShowXiugaijiageDialog (arr = []){
      let key = 'undefined'
      arr.map((good, index) => {
        if (good.is_checked === true) {
          key = index
        }
      })
      if (key !== 'undefined') {
        if (arr[key].is_edit === 1) {
          this.xiugaijiageDialog.inputValue = arr[key].edit_price
        } else {
          this.xiugaijiageDialog.inputValue = arr[key].price
        }
        this.xiugaijiageDialog.isShow = true
      } else {
        this.$message.closeAll()
        this.$message({
          message: '请选中购物车里的商品',
          type: 'error'
        })
      }
    },

    clickChangejiageShoppingCarGood (code) {
      if (code !== '.') { this.xiugaijiageDialog.inputValue = String(this.xiugaijiageDialog.inputValue) + code } else {
        if (this.xiugaijiageDialog.inputValue.indexOf(code) === -1) {
          this.xiugaijiageDialog.inputValue = String(this.xiugaijiageDialog.inputValue) + code
        } else {

        }
      }
    },
    clickChangejiageShoppingCarGoodOk () {
      if (this.chooeseGoods.goods.length) {
        let key = 'undefined'
        this.chooeseGoods.goods.map((good, index) => {
          if (good.is_checked === true) {
            key = index
          }
        })
        if (key !== 'undefined') {
          if (this.chooeseGoods.goods[key].is_service_goods === '1'){
            this.clickChangejiageShoppingCarGoodOkOk(this.chooeseGoods.goods, false)
          }
          if (this.chooeseGoods.goods[key].is_service_goods === '0'){
            this.clickChangejiageShoppingCarGoodOkOk(this.chooeseGoods.goods, true)
          }
        }
      }
      if (this.chooeseGoods.outServiceGoods.length) {
        this.clickChangejiageShoppingCarGoodOkOk(this.chooeseGoods.outServiceGoods, false)
      }
      if (this.chooeseGoods.outOrdinaryGoods.length) {
        this.clickChangejiageShoppingCarGoodOkOk(this.chooeseGoods.outOrdinaryGoods, true)
      }
      if (this.chooeseGoods.cardList.length) {
        this.clickChangejiageShoppingCarGoodOkOk(this.chooeseGoods.cardList, true)
      }
    },
    /**
     * 选中购物车里的商品，单击修改价格按钮
     * @param arr
     * @param isCheckMinimumSellingPrice 是否检查修改的商品价格和设置的最低价不符合
     */
    clickChangejiageShoppingCarGoodOkOk (arr = [], isCheckMinimumSellingPrice = false) {
      let key = 'undefined'
      arr.map((good, index) => {
        if (good.is_checked === true) {
          key = index
        }
      })
      if (key !== 'undefined') {
        if (isCheckMinimumSellingPrice){
          if (parseFloat(this.xiugaijiageDialog.inputValue).toFixed(2) >= parseFloat(arr[key].minimum_selling_price).toFixed(2)) {
            arr[key].is_edit = 1
            arr[key].edit_price = parseFloat(this.xiugaijiageDialog.inputValue).toFixed(2)
            this.xiugaijiageDialog.inputValue = ''
            this.xiugaijiageDialog.isShow = false
          } else {
            this.$message.closeAll()
            this.$message({
              message: '修改的价格不能低于设置的最低售价',
              type: 'error'
            })
          }
        } else {
          if (parseFloat(this.xiugaijiageDialog.inputValue).toFixed(2) > 0.0) {
            arr[key].is_edit = 1
            arr[key].edit_price = parseFloat(this.xiugaijiageDialog.inputValue).toFixed(2)
            this.xiugaijiageDialog.inputValue = ''
            this.xiugaijiageDialog.isShow = false
          } else {
            this.$message.closeAll()
            this.$message({
              message: '修改的价格必须正数',
              type: 'error'
            })
          }
        }
      }
      this.sumChooseGoodsMoney()
      this.$forceUpdate()
    },


    // 获取商品列表
    getGoods () {
      this.requestFuwuGoodData.who = -1
      let data = {}
      data.page = `${this.requestGoodData.page},${this.requestGoodData.num}`
      data.type = this.requestGoodData.who
      data.title = this.requestGoodData.title
      data.type_category = this.requestGoodData.type_category
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

        if (this.requestGoodData.page === 1) {
          this.prePageBtnDisabled = true
          if (res.data.length < this.requestGoodData.num) {
            this.nextPageBtnDisabled = true
          } else {
            this.nextPageBtnDisabled = false
          }
        } else {
          this.prePageBtnDisabled = false
          if (res.data.length < this.requestGoodData.num) {
            this.nextPageBtnDisabled = true
          } else {
            this.nextPageBtnDisabled = false
          }
        }
      })
    },
    // 获取服务商品
    getServiceItemList () {
      let data = {}
      data.service_type = this.requestFuwuGoodData.service_type
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
        if (this.requestFuwuGoodData.page === 1) {
          this.prePageBtnDisabled = true
          if (res.data.length < this.requestFuwuGoodData.num) {
            this.nextPageBtnDisabled = true
          } else {
            this.nextPageBtnDisabled = false
          }
        } else {
          this.prePageBtnDisabled = false
          if (res.data.length < this.requestFuwuGoodData.num) {
            this.nextPageBtnDisabled = true
          } else {
            this.nextPageBtnDisabled = false
          }
        }
      })
    },
    // 点击了上一页
    clickPrePageBtn () {
      // 服务商品
      if (this.requestFuwuGoodData.who !== -1) {
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
      if (this.requestFuwuGoodData.who !== -1) {
        this.requestFuwuGoodData.page = this.requestFuwuGoodData.page + 1
        this.getServiceItemList()
      } else {
        this.requestGoodData.page = this.requestGoodData.page + 1
        this.getGoods()
      }
    },
    // 选择服务人员 获取服务人员列表
    getWaiterList () {
      postWaiter().then((res) => {
        this.waiterList = res.data
      })
    },
    // 购物车里有普通商品，选择服务人员
    clickWaiter (e) {
      this.jiezhangDialog.nowWaiter = e
    },
    // 购物车里只有服务卡商品，选择服务人员
    clickWaiterServiceCard (e) {
      this.jiezhangDialog.serviceCardNowWaiter = e
    },
    // 按搜索商品(商品标题和条形码)
    getGoodByCondition (str) {
      if (/^[0-9]+$/.test(this.requestGoodData.title)) {
        if (this.requestGoodData.title.length >= 5) {
          // 全部是数字
          this.searchGoodsByGoodCode()
        }
      }
    },
    // 搜索商品按商品条形码
    searchGoodsByGoodCode () {
      let data = {}
      data.bar_code = `${this.requestGoodData.title}`
      postGoodsByCode(data).then((res) => {
        if (res.code === '200') {
          let good = res.data
          good.num = 1
          good.is_checked = false
          good.is_edit = 0
          good.edit_price = parseFloat(good.price).toFixed(2)
          good.price = parseFloat(good.price).toFixed(2)
          if (good.stock <= 0) {
            this.$message.closeAll()
            this.$message({
              message: '该商品库存不足，无法添加购物车',
              type: 'error'
            })
            return
          }
          //外包普通商品
          if (good.is_outsourcing_goods === '1') {
            let flag = true
            for (let i = 0; i < this.chooeseGoods.outOrdinaryGoods.length; i++) {
              if(this.chooeseGoods.outOrdinaryGoods[i].id === good.id && this.chooeseGoods.outOrdinaryGoods[i].is_service_goods === good.is_service_goods){
                flag = false
                if (parseInt(this.chooeseGoods.outOrdinaryGoods[i].num) + 1 <= parseInt(good.stock)) {
                  this.$message.closeAll()
                  this.$message({
                    message: '该商品已经存在购物车了，购买数量加1',
                    type: 'error'
                  })
                  this.chooeseGoods.outOrdinaryGoods[i].num++
                } else {
                  this.$message.closeAll()
                  this.$message({
                    message: '该商品已经存在购物车了，购买数量没有发生变化，因为购买数量等于库存数量',
                    type: 'error'
                  })
                }
              }
            }
            if (flag) {
              this.checkGoodsTypeAndAddShoppingCar(good)
            }
          }
          //非外包普通商品
          if (good.is_outsourcing_goods === '0') {
            let flag = true
            for (let i = 0; i < this.chooeseGoods.goods.length; i++) {
              if(this.chooeseGoods.goods[i].id === good.id && this.chooeseGoods.goods[i].is_service_goods === good.is_service_goods){
                flag = false
                if (this.chooeseGoods.goods[i].num + 1 <= good.stock) {
                  this.$message.closeAll()
                  this.$message({
                    message: '该商品已经存在购物车了，购买数量加1',
                    type: 'error'
                  })
                  this.chooeseGoods.goods[i].num++
                } else {
                  this.$message.closeAll()
                  this.$message({
                    message: '该商品已经存在购物车了，购买数量没有发生变化，因为购买数量等于库存数量',
                    type: 'error'
                  })
                }
              }
            }
            if (flag) {
              this.checkGoodsTypeAndAddShoppingCar(good)
            }
          }
          this.chooeseGoods.cardList = []
          this.chooeseGoods.outServiceGoods = []
          this.isShowChooeseWaiterBlock()
          this.sumChooseGoodsMoney()
          this.$forceUpdate()
        }
      })
    },
    // 计算结算总价
    sumChooseGoodsMoney () {
      let sumMoney = 0.00
      let modifyMoney = 0.00
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
      if (this.chooeseGoods.outServiceGoods.length) {
        for (let i = 0; i < this.chooeseGoods.outServiceGoods.length; i++) {
          sumMoney += this.chooeseGoods.outServiceGoods[i].num * this.chooeseGoods.outServiceGoods[i].price
          if (this.chooeseGoods.outServiceGoods[i].is_edit === 1) {
            modifyMoney += this.chooeseGoods.outServiceGoods[i].num * this.chooeseGoods.outServiceGoods[i].edit_price
          } else {
            modifyMoney += this.chooeseGoods.outServiceGoods[i].num * this.chooeseGoods.outServiceGoods[i].price
          }
        }
      }
      if (this.chooeseGoods.outOrdinaryGoods.length) {
        for (let i = 0; i < this.chooeseGoods.outOrdinaryGoods.length; i++) {
          sumMoney += this.chooeseGoods.outOrdinaryGoods[i].num * this.chooeseGoods.outOrdinaryGoods[i].price
          if (this.chooeseGoods.outOrdinaryGoods[i].is_edit === 1) {
            modifyMoney += this.chooeseGoods.outOrdinaryGoods[i].num * this.chooeseGoods.outOrdinaryGoods[i].edit_price
          } else {
            modifyMoney += this.chooeseGoods.outOrdinaryGoods[i].num * this.chooeseGoods.outOrdinaryGoods[i].price
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
      this.jiezhangDialog.sumMoney = sumMoney.toFixed(2)
      this.jiezhangDialog.modifyMoney = modifyMoney.toFixed(2)
    },

    // 选择会员
    searchMember(){
      if (this.xuanzehuiyuanDialog.mobile.length === 11) {
        if (/^[1][3,4,5,7,8][0-9]{9}$/.test(this.xuanzehuiyuanDialog.mobile)) {
          let requestData = {mobile: this.xuanzehuiyuanDialog.mobile}
          postSearchVip(requestData).then(res => {
            if (res.data.id) {
              this.xuanzehuiyuanDialog.memberVip = res.data
            } else {
              this.$message.closeAll()
              this.$message({
                message: '没有查询到该会员的信息',
                type: 'error'
              })
              this.xuanzehuiyuanDialog.memberVip = {}
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.$message.closeAll()
          this.$message({
            message: '请输入正确的手机号',
            type: 'error'
          })
          this.xuanzehuiyuanDialog.memberVip = {}
        }
      }
    },
    clickChoosesMemberByKeyboard (code) {
      if (code === 'ok') {
        if (this.xuanzehuiyuanDialog.mobile.length === 11) {
          if (/^[1][3,4,5,7,8][0-9]{9}$/.test(this.xuanzehuiyuanDialog.mobile)) {
            let requestData = {mobile: this.xuanzehuiyuanDialog.mobile}
            postSearchVip(requestData).then(res => {
              if (res.data.id) {
                this.jiezhangDialog.memberVip = res.data
                this.xuanzehuiyuanDialog.isShow = false
                this.choosesGoodsShowMemberPrice()
              } else {
                this.$message.closeAll()
                this.$message({
                  message: '没有查询到该会员的信息',
                  type: 'error'
                })
                this.xuanzehuiyuanDialog.memberVip = {}
                this.jiezhangDialog.memberVip = {}
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            this.$message.closeAll()
            this.$message({
              message: '请输入正确的手机号',
              type: 'error'
            })
            this.xuanzehuiyuanDialog.memberVip = {}
            this.jiezhangDialog.memberVip = {}
          }
        } else {
          this.xuanzehuiyuanDialog.memberVip = {}
          this.jiezhangDialog.memberVip = {}
        }
      } else {
        if (this.xuanzehuiyuanDialog.mobile.length < 11) { this.xuanzehuiyuanDialog.mobile += code }
      }
    },
    // 选择会员后，点查看会员
    xuanzehuiyuanDialogSeeServiceCard(){
      this.xuanzehuiyuanDialog.isShow = false
      this.huiyuanDialog.isShow = true
      this.huiyuanDialog.mobile = this.xuanzehuiyuanDialog.mobile
      this.huiyuanDialogSearchMemberVip()
    },
    // 选择会员后时，如果购物车里有服务商品，或服务卡，就要显示他的会员价 刷新接口
    choosesGoodsShowMemberPrice () {
      // 当前页面中，被选中的是服务商品 刷新接口展示出会员价来
      this.getServiceItemList()
      //购物车里有服务商品
      if (this.chooeseGoods.goods.length){
        let requestData = {
          member_id : this.jiezhangDialog.memberVip.id,
          ids:[]
        }
        for (let i = 0; i < this.chooeseGoods.goods.length; i++){
          if (this.chooeseGoods.goods[i].is_service_goods === '1') {
            requestData.ids.push(this.chooeseGoods.goods[i].id)
          }
        }
        postServiceItemList(requestData).then(res => {
          if (res.data.length){
            for(let i = 0;i<res.data.length;i++){
              for (let j = 0; j < this.chooeseGoods.goods.length; j++){
               if((this.chooeseGoods.goods[j].id === res.data[i].id) && (this.chooeseGoods.goods[j].is_service_goods === '1')) {
                 this.chooeseGoods.goods[j].price = res.data[i].price
               }
              }
            }
          }
        })
      }
      //购物车里有服务商品
      if (this.chooeseGoods.outServiceGoods.length){
        let requestData = {
          member_id : this.jiezhangDialog.memberVip.id,
          ids:[]
        }
        for (let i = 0; i < this.chooeseGoods.outServiceGoods.length; i++){
          if (this.chooeseGoods.outServiceGoods[i].is_service_goods === '1') {
            requestData.ids.push(this.chooeseGoods.outServiceGoods[i].id)
          }
        }
        postServiceItemList(requestData).then(res => {
          if (res.data.length){
            for(let i = 0;i<res.data.length;i++){
              for (let j = 0; j < this.chooeseGoods.outServiceGoods.length; j++){
                if((this.chooeseGoods.outServiceGoods[j].id === res.data[i].id) && (this.chooeseGoods.outServiceGoods[j].is_service_goods === '1')) {
                  this.chooeseGoods.outServiceGoods[j].price = res.data[i].price
                }
              }
            }
          }
        })
      }
      //刷新后结算面板的价格展示也刷新
      this.sumChooseGoodsMoney()
    },

    // 充值弹框
    chongzhiDialogInputFocus (str) {
      this.chongzhiDialog.chooeseWho = str
    },
    chongzhiDialogGetCode (code) {
      if (this.chongzhiDialog.chooeseWho === 'mobile') {
        if (this.chongzhiDialog.mobile.length < 11) {
          if (code !== '.') { this.chongzhiDialog.mobile += `${code}` }
        }
        if (this.chongzhiDialog.mobile.length === 11) { this.chongzhiDialogSearchMemberVip() }
      }
      if (this.chongzhiDialog.chooeseWho === 'money') {
        this.chongzhiDialog.payMoney += `${code}`
      }
    },
    chongzhiDialogSearchMemberVip () {
      if (this.chongzhiDialog.mobile.length !== 11) {
        return
      }
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.chongzhiDialog.mobile)) {
        this.$message.closeAll()
        this.$message({
          message: '请输入正确的手机号',
          type: 'error'
        })
        return
      }
      let requestData = {mobile: this.chongzhiDialog.mobile}
      postSearchVip(requestData).then(res => {
        if (res.data.id) {
          this.chongzhiDialog.huiyuanInfo = res.data
        } else {
          this.$message.closeAll()
          this.$message({
            message: '没有查询到该会员的信息',
            type: 'error'
          })
          this.chongzhiDialog.huiyuanInfo = {}
        }
      }).catch(err => {
        console.log(err)
      })
    },
    async chongzhiDialogBtnOk () {
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.chongzhiDialog.mobile)) {
        this.$message.closeAll()
        this.$message({
          message: '请输入正确的手机号',
          type: 'error'
        })
        return
      }
      if (!this.chongzhiDialog.huiyuanInfo.id) {
        this.$message.closeAll()
        this.$message({
          message: '请先查询会员的信息',
          type: 'error'
        })
        return
      }
      if ((!/^\d+(\.\d+)?$/.test(this.chongzhiDialog.payMoney)) || (parseFloat(this.chongzhiDialog.payMoney) <= 0)) {
        this.$message.closeAll()
        this.$message({
          message: '充值金额为正数哦',
          type: 'error'
        })
        return
      }
      if (!this.chongzhiDialog.payType) {
        this.$message.closeAll()
        this.$message({
          message: '请选择支付方式',
          type: 'error'
        })
        return
      }
      if (!this.chongzhiDialog.huiyuanInfo.id) {
        this.$message.closeAll()
        this.$message({
          message: '请选择要充值的会员',
          type: 'error'
        })
        return
      }
      if (!this.chongzhiDialog.nowWaiter) {
        this.$message.closeAll()
        this.$message({
          message: '选择服务人员',
          type: 'error'
        })
        return
      }
      let requestData = {
        member_id: this.chongzhiDialog.huiyuanInfo.id,
        price: this.chongzhiDialog.payMoney,
        pay_way: this.chongzhiDialog.payType,
        waiter_id: this.chongzhiDialog.nowWaiter
      }
      await this.$confirm(`是否确认给${this.chongzhiDialog.huiyuanInfo.mobile}充值，充值金额为：${requestData.price}元？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postMemberVipRecharge(requestData).then(res => {
          if (res.code === '200') {
            this.chongzhiDialog.isShow = false
            this.$message.closeAll()
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.chongzhiDialog.mobile = ''
            this.chongzhiDialog.huiyuanInfo = {}
            this.chongzhiDialog.payType = ''
            this.chongzhiDialog.payMoney = ''
            this.chongzhiDialog.nowWaiter = ''
          }
        })
      }).catch(() => {
      })
    },

    // 会员查询弹框中的事件
    huiyuanDialogGetCode (code) {
      if (this.huiyuanDialog.mobile.length < 11) {
        this.huiyuanDialog.mobile += `${code}`
      }
    },
    huiyuanDialogSearchMemberVip () {
      if (this.huiyuanDialog.mobile.length === 11) {
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.huiyuanDialog.mobile)) {
          this.$message.closeAll()
          this.$message({
            message: '请输入正确的手机号',
            type: 'error'
          })
          return
        }
        this.huiyuanDialog.huiyuanInfo = {}
        this.huiyuanDialog.fuwukaList = []
        this.huiyuanDialog.chongzhijiluList = []
        let requestData = {mobile: this.huiyuanDialog.mobile}
        postSearchVip(requestData).then(res => {
          if (res.data.id) {
            this.huiyuanDialog.huiyuanInfo = res.data
            this.huiyuanDialogChoosesWho()
          } else {
            this.huiyuanDialog.huiyuanInfo = {}
            this.huiyuanDialog.fuwukaList = []
            this.huiyuanDialog.chongzhijiluList = []
            this.$message.closeAll()
            this.$message({
              message: '没有查询到会员信息',
              type: 'error'
            })
          }
        })
      } else {
        this.huiyuanDialog.huiyuanInfo = {}
        this.huiyuanDialog.fuwukaList = []
        this.huiyuanDialog.chongzhijiluList = []
      }
    },
    huiyuanDialogAddMemberGetCode (code) {
      if (code === 'ok') {
        this.huiyuanDialogAddMemberVip()
      } else {
        this.huiyuanDialog.addHuiyuanDialog.mobile += `${code}`
      }
    },
    async huiyuanDialogAddMemberVip () {
      let requestData = {
        mobile: this.huiyuanDialog.addHuiyuanDialog.mobile,
        nickname: this.huiyuanDialog.addHuiyuanDialog.nickname
      }
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(requestData.mobile)) {
        this.$message.closeAll()
        this.$message({
          message: '请输入正确的手机号',
          type: 'error'
        })
        return
      }
      if (!requestData.nickname) {
        this.$message.closeAll()
        this.$message({
          message: '请输入会员昵称',
          type: 'error'
        })
        return
      }
      if (requestData.nickname.length > 10) {
        this.$message.closeAll()
        this.$message({
          message: '会员昵称要求在10个汉字内',
          type: 'error'
        })
        return
      }
      await this.$confirm(`是否选择新增加该会员（${requestData.mobile}）?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await postAddMemberVip(requestData).then(res => {
          if (res.code === '200') {
            this.huiyuanDialog.addHuiyuanDialog.isShow = false
            this.$message.closeAll()
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.huiyuanDialog.addHuiyuanDialog.mobile = ''
            this.huiyuanDialog.addHuiyuanDialog.nickname = ''
          }
        })
      }).catch(() => {
      })
    },
    huiyuanDialogChoosesWho(who){
      if (who) {
        this.huiyuanDialog.showWho = who
      }
      switch (this.huiyuanDialog.showWho) {
        case 'rechargeLog':
          this.huiyuanDialog.page = 1
          this.huiyuanDialogSearchRechargeLog()
          break
        case 'serviceCard':
          this.huiyuanDialog.page = 1
          this.huiyuanDialogSearchServiceCardList()
          break
      }
    },
    huiyuanDialogSearchRechargeLog () {
      if (this.huiyuanDialog.huiyuanInfo.id) {
        this.huiyuanDialog.showFuwuTable = false
        let requestData = {
          member_id: this.huiyuanDialog.huiyuanInfo.id,
          page: `${this.huiyuanDialog.page},${this.huiyuanDialog.limit}`,
        }
        postMemberVipRechargeLog(requestData).then(res => {
          this.huiyuanDialog.count = res.count
          if (res.data.length) {
            this.huiyuanDialog.chongzhijiluList = res.data
          }
        })
      } else {
        this.$message.closeAll()
        this.$message({
          message: '请输入要查询会员的手机号码后再查看Ta的充值记录',
          type: 'error'
        })
      }
    },
    huiyuanDialogSearchServiceCardList () {
      if (this.huiyuanDialog.huiyuanInfo.id) {
        this.huiyuanDialog.showFuwuTable = true
        let requestData = {
          member_id: this.huiyuanDialog.huiyuanInfo.id,
          page: this.huiyuanDialog.page,
          limit: this.huiyuanDialog.limit,
        }
        postMemberServiceCards(requestData).then(res => {
          this.huiyuanDialog.count = res.total
          if (res.data.length) {
            this.huiyuanDialog.fuwukaList = res.data
          } else {
            this.huiyuanDialog.fuwukaList = []
          }
        })
      } else {
        this.$message.closeAll()
        this.$message({
          message: '请输入要查询会员的手机号码后再查看Ta购买的服务卡',
          type: 'error'
        })
      }
    },
    huiyuanDialogPageSizeChange(val){
      this.huiyuanDialog.limit = val
      switch (this.huiyuanDialog.showWho) {
        case 'rechargeLog':
          this.huiyuanDialogSearchRechargeLog()
          break
        case 'serviceCard':
          this.huiyuanDialogSearchServiceCardList()
          break
      }
    },
    huiyuanDialogOnePageCurrentChange (val) {
      this.huiyuanDialog.page = val
      switch (this.huiyuanDialog.showWho) {
        case 'rechargeLog':
          this.huiyuanDialogSearchRechargeLog()
          break
        case 'serviceCard':
          this.huiyuanDialogSearchServiceCardList()
          break
      }
    },

    // 激活服务卡
    huiyuanDialogActiveServiceCard (card_id) {
      this.huiyuanDialog.activeServiceCardDialog.card_id = card_id
      this.huiyuanDialog.activeServiceCardDialog.isShow = true
    },
    //激活服务卡
    huiyuanDialogActiveServiceCardToGo(){
      let requestData = {
        card_id: this.huiyuanDialog.activeServiceCardDialog.card_id,
        waiter: this.huiyuanDialog.activeServiceCardDialog.waiter_id
      }
      if (requestData.waiter){
        postMemberServiceCardsActive(requestData).then(res => {
          if (res.code === '200'){
            this.huiyuanDialog.activeServiceCardDialog.card_id = ''
            this.huiyuanDialog.activeServiceCardDialog.waiter_id = ''
            this.huiyuanDialogSearchServiceCardList()
            this.huiyuanDialog.activeServiceCardDialog.isShow = false
          }
        })
      } else {
        this.$message.closeAll()
        this.$message({
          message: '请选择服务人员',
          type: 'error'
        })
        return
      }
    },
    // 耗卡列表
    async huiyuanDialogUseServiceCardList (card) {
      let requestData = {
        ticket_id: card.id
      }
      await postMemberServiceCardsUseList(requestData).then(res => {
        if (res.data.length) {
          this.huiyuanDialog.haokaDialog.tableData = res.data
        }
      })
      this.huiyuanDialog.haokaDialog.isShow = true
    },
    // 耗卡
    huiyuanDialogUseServiceCard (card) {
      this.huiyuanDialog.haokaDialog.choosesWaiterDialog.service_id = card.id
      this.huiyuanDialog.haokaDialog.choosesWaiterDialog.isShow = true
    },
    // 耗卡
    async huiyuanDialogUseServiceCardToGo(){
      let requestData = {
        member_id:this.huiyuanDialog.huiyuanInfo.id,
        service_id:this.huiyuanDialog.haokaDialog.choosesWaiterDialog.service_id,
        waiter_id:this.huiyuanDialog.haokaDialog.choosesWaiterDialog.waiter_id
      }
      if (requestData.waiter_id){
        await postMemberServiceCardsUseListTicket(requestData).then(res => {
            if (res.code === '200'){
              this.huiyuanDialogUseServiceCardList({id:requestData.service_id})
              this.huiyuanDialogSearchServiceCardList()
            }
        })
      } else {
        this.$message.closeAll()
        this.$message({
          message: '请选择服务人员',
          type: 'error'
        })
        return
      }
      this.huiyuanDialog.haokaDialog.choosesWaiterDialog.waiter_id = ''
      this.huiyuanDialog.haokaDialog.choosesWaiterDialog.service_id = ''
      this.huiyuanDialog.haokaDialog.choosesWaiterDialog.isShow = false
    },
    // 使用记录
    huiyuanDialogServiceCardUseRecords (card) {
      this.huiyuanDialog.shiyongjiluDialog.tableData = []
      let requestData = {
        member_id:this.huiyuanDialog.huiyuanInfo.id,
        ticket_id: card.id
      }
      postMemberServiceCardsUseRecords(requestData).then(res => {
        if (res.data.length) {
          this.huiyuanDialog.shiyongjiluDialog.tableData = res.data
        }
      })
      this.huiyuanDialog.shiyongjiluDialog.isShow = true
    },
    // 退卡详情
    huiyuanDialogServiceCardReturnCardsDetails (card) {
      this.huiyuanDialog.tuikaDialog.isShow = true
    },

    // 购卡弹框
    goukaDialogShow () {
      if (this.jiezhangDialog.memberVip.id) {
        this.goukaDialog.isShow = true
        this.goukaDialogSearch()
      } else {
        this.$message.closeAll()
        this.$message({
          message: '请先选择会员后在购卡',
          type: 'error'
        })
      }
    },
    goukaDialogChoosesCardType (type, e) {
      if (type.name !== '0') { this.goukaDialog.title = '' }
      this.goukaDialog.requestData.type = type.name
      this.goukaDialog.requestData.page = 1
      this.goukaDialog.cardsList = []
      this.goukaDialogSearch()
    },
    goukaDialogSearch () {
      let requestData = {
        search: this.goukaDialog.title,
        type: this.goukaDialog.requestData.type,
        page: this.goukaDialog.requestData.page,
        limit: this.goukaDialog.requestData.limit,
        member_id: this.jiezhangDialog.memberVip.id
      }
      if (requestData.type === '0') {
        delete requestData.type
      }
      postBuyServiceCards(requestData).then(res => {
        this.goukaDialog.requestData.total = res.total
        if (res.data.length) {
          res.data.map(item => {
            item.is_checked = false
          })
          if (this.goukaDialog.requestData.page === 1) {
            this.goukaDialog.cardsList =  res.data
          } else {
            this.goukaDialog.cardsList.push(...res.data)
          }
        }
      })
    },
    goukaDialogSearchCardsNext () {
      if (this.goukaDialog.requestData.page < (this.goukaDialog.requestData.total / this.goukaDialog.requestData.limit)) {
        this.goukaDialog.requestData.page++
        this.goukaDialogSearch()
      }
    },
    goukaDialogSearchCardsPre () {
      if (this.goukaDialog.requestData.page > 1) {
        this.goukaDialog.requestData.page--
        this.goukaDialogSearch()
      }
    },
    goukaDialogClickChoosesCard (key) {
      this.goukaDialog.cardsList.map(res => {
        res.is_checked = false
      })
      this.goukaDialog.cardsList[key].is_checked = true
    },
    async goukaDialogNowBuy () {
      let key = 'flag'
      this.goukaDialog.cardsList.map((item, index) => {
        if (item.is_checked === true) {
          key = index
        }
      })
      if (key === 'flag') {
        this.$message.closeAll()
        this.$message({
          message: '请选择要购买的服务卡',
          type: 'error'
        })
      } else {
        // 添加服务卡进购物车
        if (this.chooeseGoods.goods.length || this.chooeseGoods.outServiceGoods.length || this.chooeseGoods.outOrdinaryGoods.length) {
          await this.$confirm('您确认清空购物车中的商品，重新添加另一种商品吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.chooeseGoods.cardList = []
            this.chooeseGoods.outServiceGoods = []
            this.chooeseGoods.outOrdinaryGoods = []
            this.chooeseGoods.goods = []
            let addTopCarCard = this.goukaDialog.cardsList[key]
            addTopCarCard.num = 1
            addTopCarCard.stock = 1
            addTopCarCard.is_checked = false
            addTopCarCard.is_edit = 0
            addTopCarCard.minimum_selling_price = addTopCarCard.mprice
            addTopCarCard.edit_price = parseFloat(addTopCarCard.price).toFixed(2)
            addTopCarCard.price = parseFloat(addTopCarCard.price).toFixed(2)
            this.chooeseGoods.cardList.push(addTopCarCard)
            this.goukaDialog.isShow = false
          }).catch(() => {
          })
        } else {
          this.chooeseGoods.cardList = []
          this.chooeseGoods.outServiceGoods = []
          this.chooeseGoods.outOrdinaryGoods = []
          this.chooeseGoods.goods = []
          let addTopCarCard = this.goukaDialog.cardsList[key]
          addTopCarCard.num = 1
          addTopCarCard.stock = 1
          addTopCarCard.is_checked = false
          addTopCarCard.is_edit = 0
          addTopCarCard.minimum_selling_price = addTopCarCard.mprice
          addTopCarCard.edit_price = addTopCarCard.price
          this.chooeseGoods.cardList.push(addTopCarCard)
          this.goukaDialog.isShow = false
        }
        this.sumChooseGoodsMoney()
        this.$forceUpdate()
      }
    },

    // 结账操作
    jiezhangDialogClickBtn () {
      if (!(this.chooeseGoods.goods.length !== 0 || this.chooeseGoods.outServiceGoods.length !== 0 || this.chooeseGoods.outOrdinaryGoods.length !== 0 || this.chooeseGoods.cardList.length !== 0)) {
        this.$message.closeAll()
        this.$message({
          message: '购物车为空',
          type: 'error'
        })
        return
      }
      for (let i =0; i < this.chooeseGoods.goods.length; i++) {
        if(this.chooeseGoods.goods[i].is_service_goods === '1'){
          if(this.chooeseGoods.goods[i].nowWaiter.id === -1) {
            this.$message.closeAll()
            this.$message({
              message: `请选择【${this.chooeseGoods.goods[i].title}】服务的服务人员`,
              type: 'error'
            })
            return
          }
        }
      }
      for (let i =0; i < this.chooeseGoods.outServiceGoods.length; i++) {
        if(this.chooeseGoods.outServiceGoods[i].is_service_goods === '1'){
          if(this.chooeseGoods.outServiceGoods[i].nowWaiter.id === -1) {
            this.$message.closeAll()
            this.$message({
              message: `请选择【${this.chooeseGoods.outServiceGoods[i].title}】服务的服务人员`,
              type: 'error'
            })
            return
          }
        }
      }
      if (this.jiezhangDialog.isShowChooeseWaiterBlock) {
        if (this.jiezhangDialog.nowWaiter.id === -1) {
          this.$message.closeAll()
          this.$message({
            message: '您购物车里有普通商品，请选择商品的服务人员',
            type: 'error'
          })
          return
        }
      }
      if (this.chooeseGoods.cardList.length) {
        if (this.jiezhangDialog.serviceCardNowWaiter.id === -1) {
          this.$message.closeAll()
          this.$message({
            message: '请选择服务人员',
            type: 'error'
          })
          return
        }
      }
      // 这人需要确定用户的支付方式
      this.confirmPayWay()
      this.jiezhangDialog.isShow = true
    },
    //选择支付方式
    jiezhangDialogChoosesPayWay (way) {
      this.jiezhangDialog.chooesePayWay = way
    },
    //确认结账
    async jiezhangDialogClickOk () {
      if (!this.jiezhangDialog.chooesePayWay) {
        this.$message.closeAll()
        this.$message({
          message: '请选择支付方式',
          type: 'error'
        })
        return
      }
      if (
        ((this.jiezhangDialog.chooesePayWay === 7) ||
        (this.jiezhangDialog.modifyMoney - this.jiezhangDialog.sumMoney !== 0)) && (!this.jiezhangDialog.remarks.length)
      ) {
        this.$message.closeAll()
        this.$message({
          message: '请填入购买备注',
          type: 'error'
        })
        return
      }
      let requestData = {
        member: this.jiezhangDialog.memberVip ? this.jiezhangDialog.memberVip.id : '', // 会员id
        waiter: this.jiezhangDialog.isShowChooeseWaiterBlock ? this.jiezhangDialog.nowWaiter.id : '', // 普通商品服务员id
        pay_way: this.jiezhangDialog.chooesePayWay,
        goods: [],
        remarks: this.jiezhangDialog.remarks,
      }
      if (this.chooeseGoods.goods.length) {
        let arr = []
        this.chooeseGoods.goods.map((item, index) => {
          let obj = {}
          obj.id = item.id
          obj.num = item.num
          obj.is_edit = item.is_edit
          obj.is_service_goods = item.is_service_goods
          if (item.is_edit) {
            obj.edit_price = item.edit_price
          }
          if(item.is_service_goods === '1') {
            obj.waiter_id = item.nowWaiter.id
          }
          arr.push(obj)
        })
        requestData.goods = arr
      }
      if (this.chooeseGoods.outOrdinaryGoods.length) {
        let arr = []
        this.chooeseGoods.outOrdinaryGoods.map((item, index) => {
          let obj = {}
          obj.id = item.id
          obj.num = item.num
          obj.is_edit = item.is_edit
          obj.is_service_goods = item.is_service_goods
          if (item.is_edit) {
            obj.edit_price = item.edit_price
          }
          arr.push(obj)
        })
        requestData.goods = arr
      }
      if (this.chooeseGoods.outServiceGoods.length) {
        let arr = []
        this.chooeseGoods.outServiceGoods.map((item, index) => {
          let obj = {}
          obj.id = item.id
          obj.num = item.num
          obj.is_edit = item.is_edit
          obj.is_service_goods = item.is_service_goods
          if (item.is_edit) {
            obj.edit_price = item.edit_price
          }
          if(item.is_service_goods === '1') {
            obj.waiter_id = item.nowWaiter.id
          }
          arr.push(obj)
        })
        requestData.goods = arr
      }
      await postNowPayGoods(requestData).then(res => {
        if (res.code === '200') {
          this.clearJiezhangDialogData()
        }
      })

      //服务卡是另一个结算接口
      if (this.chooeseGoods.cardList.length) {
        let requestData = {
          member_id: this.jiezhangDialog.memberVip.id, // 会员id
          waiter: this.jiezhangDialog.serviceCardNowWaiter.id, // 服务员id
          pay: this.jiezhangDialog.chooesePayWay, // 支付方式
          card_id: this.chooeseGoods.cardList[0].id, // 服务卡id
          price: this.chooeseGoods.cardList[0].is_edit ? this.chooeseGoods.cardList[0].edit_price : this.chooeseGoods.cardList[0].price,
          remarks: this.jiezhangDialog.remarks,
        }
        await postNowPayServiceCards(requestData).then(res => {
          if (res.code === '200') {
            this.clearJiezhangDialogData()
          }
        })
      }
    },
    // 结账时可选支付方式
    confirmPayWay () {
      // 1=微信支付 2=支付宝 3=余额(会员卡)4=银行卡5=现金6=美团7=赠送8=门店自用 9=兑换10=包月服务11=定制疗程99=管理员充值
      if (this.jiezhangDialog.memberVip.id) { // 选择了会员
        if (this.chooeseGoods.goods.length) {
          let onlyOrdinaryGoods = 0, onlyServiceGoods = 0
          for (let i = 0; i < this.chooeseGoods.goods.length; i++){
            if (this.chooeseGoods.goods[i].is_service_goods === '1') {
              onlyServiceGoods ++
            }
            if (this.chooeseGoods.goods[i].is_service_goods === '0') {
              onlyOrdinaryGoods ++
            }
          }
          if (onlyOrdinaryGoods === this.chooeseGoods.goods.length){
            this.jiezhangDialog.closedPayWay = [8]
          }
          if (onlyServiceGoods === this.chooeseGoods.goods.length){
            this.jiezhangDialog.closedPayWay = [8]
          }
          if (onlyServiceGoods > 0 && onlyServiceGoods > 0){
            this.jiezhangDialog.closedPayWay = [8]
          }
        }
        if (this.chooeseGoods.outServiceGoods.length) {
          this.jiezhangDialog.closedPayWay = [8]
        }
        if (this.chooeseGoods.outOrdinaryGoods.length) {
          this.jiezhangDialog.closedPayWay = [8]
        }
        if (this.chooeseGoods.cardList.length) {
          this.jiezhangDialog.closedPayWay = [8,7]
        }
        // 余额不足，不能使用会员卡支付
        if (parseFloat(this.jiezhangDialog.memberVip.money) < parseFloat(this.jiezhangDialog.modifyMoney)){
          this.jiezhangDialog.closedPayWay.push(3)
        }
      } else {
        if (this.chooeseGoods.goods.length) {
          let onlyOrdinaryGoods = 0, onlyServiceGoods = 0
          for (let i = 0; i < this.chooeseGoods.goods.length; i++){
            if (this.chooeseGoods.goods[i].is_service_goods === '1') {
              onlyServiceGoods ++
            }
            if (this.chooeseGoods.goods[i].is_service_goods === '0') {
              onlyOrdinaryGoods ++
            }
          }
          if (onlyOrdinaryGoods === this.chooeseGoods.goods.length){
            this.jiezhangDialog.closedPayWay = [3]
          }
          if (onlyServiceGoods === this.chooeseGoods.goods.length){
            this.jiezhangDialog.closedPayWay = [3]
          }
          if (onlyServiceGoods > 0 && onlyServiceGoods > 0){
            this.jiezhangDialog.closedPayWay = [3]
          }
        }
        if (this.chooeseGoods.outServiceGoods.length) {
          this.jiezhangDialog.closedPayWay = [3]
        }
        if (this.chooeseGoods.outOrdinaryGoods.length) {
          this.jiezhangDialog.closedPayWay = [3]
        }
        if (this.chooeseGoods.cardList.length) {
          this.jiezhangDialog.closedPayWay = [3,7]
        }
      }
    },
    //添加商品（服务商品，普通商品）进购物车，普通商品要选择商品服务人员
    isShowChooeseWaiterBlock(){
      let flag = false
      for (let i =0; i < this.chooeseGoods.goods.length; i++) {
        if(this.chooeseGoods.goods[i].is_service_goods === '0'){
          flag = true
        }
      }
      if (this.chooeseGoods.outOrdinaryGoods.length) {
        flag = true
      }
      this.jiezhangDialog.isShowChooeseWaiterBlock = flag
      return flag
    },
    // 结账成功后需要清空的上一次结账需要的数据
    clearJiezhangDialogData (){
      this.jiezhangDialog.isShow = false
      this.jiezhangDialog.jiezhangSuccessDialog.isShow = true
      setTimeout(() => {
        this.jiezhangDialog.jiezhangSuccessDialog.isShow = false
      }, this.jiezhangDialog.jiezhangSuccessDialog.seconds)
      this.jiezhangDialog.isShowChooeseWaiterBlock = false
      this.jiezhangDialog.nowWaiter = {id: -1, name: '请选择服务员', type: ''}
      this.jiezhangDialog.remarks = ''
      //刷新接口
      if (this.requestFuwuGoodData.who !== -1) {
        this.getServiceItemList()
      } else {
        this.getGoods()
      }
      this.jiezhangDialog.memberVip = {}
      this.chooeseGoods.goods = []
      this.chooeseGoods.outServiceGoods = []
      this.chooeseGoods.outOrdinaryGoods = []
      this.chooeseGoods.cardList = []
      this.jiezhangDialog.sumMoney = 0.00
      this.jiezhangDialog.modifyMoney = 0.00
      this.jiezhangDialog.chooesePayWay = ''
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="less" scoped>
  .bg{
    height: 100%;
    width: 100%;
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
    display: flex;
    flex-direction:column;
    .goods-type{
      height: 54px;
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      justify-content: flex-start;
      .my-div{
        width: 150px;
        height:54px;
        position: relative;
        margin-right: 20px;
        .fenlei-button{
          left: 0;
          top: 0;
          position: absolute;
          font-size:20px;
          height:54px;
          width: 140px;
          border: 0;
          background:#6BD2F4;
          border-radius:10px;
          border-bottom-right-radius:0;
          color:rgba(26,26,26,1);
          border: 1px solid transparent;  //自定义边框
          outline: none;    //消除默认点击蓝色边框效果
        }
        .fenlei-button-active{
          background:rgba(245,86,86,1);
          color:rgba(255,255,255,1);
        }
        .after{
          position: absolute;
          right: 0;
          bottom: 0;
          content: '';
          width: 0;
          height: 0;
          border-top: 8px solid transparent;
          border-bottom: 0 solid transparent;
          border-left: 10px solid #6BD2F4;
        }
        .after-active{
          border-left: 10px solid rgba(245,86,86,1);
        }
      }
      .page-fenlei-button{
        width:58px;
        height:54px;
        background:rgba(107,210,244,1);
        border-radius:4px;
        border: 0;color:rgba(125,125,125,1);
      }
    }
    .flex-goods{
      flex: 1;
      overflow: hidden;
      display: flex;
      align-items: flex-start;
      flex-wrap:wrap;
      align-items:flex-start;
      justify-content: space-between;
      align-content:flex-start;
      &:after {
        content: "";
        width:326px;
      }
      .goods{
        margin: 0 0 16px 0;
        &:nth-child(3n) {
          margin-right: 0;
        }
        &:nth-child(13) {
          margin-bottom: 0;
        }
        &:nth-child(14) {
          margin-bottom: 0;
        }
        &:nth-child(15) {
          margin-bottom: 0;
        }
      }
    }
    .page-buttons{
      margin-top: 17px;
      text-align: center;
      width: 100%;
      height: 42px;
    }
  }
  .caozuo-buttons{
    overflow: hidden;
    /*height: calc(100vh - 110px);*/
    height: 700px;
    /*border: 1px solid red;*/
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap:nowrap;
    justify-content:space-between;
    flex-direction:column;
    padding-bottom: 10px;
    .caozuo-button{
      height: 60px!important;
      width: 100%;
      background:rgba(245,245,245,1)!important;
      border: 0!important;
      border-radius:10px!important;
      font-size:24px!important;
      font-family:SourceHanSansCN-Regular;
      font-weight:400!important;
      color:rgba(26,26,26,1)!important;
      margin-left: 0;
      &:last-child{
        margin-bottom: 0;
      }
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
    flex-direction:column;
    .search{
      display: flex;
      background: none;
      border-radius:10px;
      margin-bottom: 28px;
      .goods-search{
        font-size:16px;
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
      overflow: auto;
      overflow: hidden;
      margin-bottom: 28px;
      background:rgba(255,255,255,1);
      border-radius:10px;
      overflow-y: auto!important;
      ul{
        width: calc(100% - 22px);
        list-style-type: none;
        overflow: hidden;
        padding: 11px 0 11px 20px;
        height: auto;
        width: auto;
        border-bottom:1px solid #ccc;
        li{
          width: calc(100% - 22px);
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
            font-size: 18px;
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
        }
        .active{
          border: 0;
          background:rgba(45,194,243,1);
          color:rgba(255,255,255,1);
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
      width: 432px;
      display: flex;
      flex-direction:row;
      flex-wrap: wrap;
      justify-content:space-between;
      span{
        width:200px;
        height:40px;
        line-height: 20px;
        font-size:16px;
        margin-bottom: 18px;
        margin-left: 8px;
        margin-right: 8px;
        font-family:SourceHanSansCN-Regular;
        font-weight:400;
        color:rgba(128,128,128,1);
        &:nth-child(2n){
          text-align: right;
        }
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        ul{
          list-style-type: none;
          border-radius:8px;
          li{
            clear: both;
            min-height: 30px;
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
            /deep/ .el-form-item__label{
              color:rgba(128,128,128,1);
              font-size:16px;
            }
          }
        }
        .div {
          height: 44px;
          button{
            width:148px;
            height:44px;
            background:rgba(255,255,255,1);
            color: #2ECAF1;
            font-size:20px;
            border:1px solid rgba(46,202,241,1);
            border-radius:8px;
            outline: none;    //消除默认点击蓝色边框效果
          }
          .active{
            border:none;
            background:rgba(45,194,243,1);
            color:rgba(255,255,255,1);
          }
        }
      }
      .my-right{
        width: 370px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
          &:last-child{
            margin-bottom: 0;
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
            width: 584px;display: flex;justify-content: space-between;margin-bottom: 50px;
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
            margin-bottom: 50px;
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
      /deep/ .el-dialog{
      /deep/ .el-dialog__body{
          padding: 0!important;
         /deep/ .el-tabs{
            /deep/ .el-tabs__header {
              margin: 0;
              /deep/ .el-tabs__nav-wrap{
                &:after{
                  height: 0;
                  background: none;
                }
                /deep/ .el-tabs__nav-scroll{
                  text-align: center;
                  /deep/ .el-tabs__nav{
                    /*margin: auto;*/
                    float: none;
                    /*white-space: nowrap;*/
                    /*display: flex;*/
                    /*flex-direction: row;*/
                    /*justify-content: space-around;*/
                    .el-tabs__active-bar{
                      height: 0;
                      width: 0;
                      background: none;
                    }
                    .el-tabs__item{
                      padding: 0 80px;
                      font-size: 24px;
                      &:first-child{
                        padding-left: 0;
                      }
                      &:nth-child(2){
                        padding-left: 0;
                      }
                      &:last-child{
                        padding-right: 0;
                      }
                    }
                  }
                }
              }
            }
            /deep/ .el-tabs__content{
              height: 450px;
              overflow: hidden;
              overflow-y: auto;
              padding: 32px 18px 0 18px;
              background: #F2F2F2;
              /deep/ .el-tab-pane{
                display: flex;
                flex-direction:row;
                flex-wrap:wrap;
                justify-content:space-between;
                .card-botton{
                  margin-bottom: 28px;
                }
              }
            }
         }
      }
    }
      .search{
        padding: 15px 25px;
        width: cale(100% - 50px);
      }
      .footer{
        width: 100%;
        text-align: center;
        .btn{
          width:168px;
          height:44px;
          background:rgba(255,255,255,1);
          border:1px solid rgba(46,202,241,1);
          border-radius:4px;
          color: #2ECAF1;
          font-size:20px;
          font-family:SourceHanSansCN-Regular;
          font-weight:400;
        }
        .active{
          color: #ffffff;
          background: #2DC2F3;
        }
      }
  }
  /*结账成功弹框*/
  .jiezhang-chenggong-tanchuan{
    .box{
      width:100%;
      border-radius:10px;
      text-align: center;
      img{
        margin: auto;
        width:83px;
        height:104px;
      }
      .txt{
        width:100%;
        height:30px;
        line-height: 30px;
        font-size:30px;
        margin-top: 35px;
        margin-bottom: 64px;
        font-family:SourceHanSansCN-Regular;
        font-weight:400;
        color:rgba(26,26,26,1);
        text-align: center;
      }
    }
  }
</style>
