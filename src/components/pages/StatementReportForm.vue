<template>
  <div class="statement-report-form">
    <el-tabs v-model="requestData.type" @tab-click="handleClick">
            <el-tab-pane label="订单统计" name="1">
              <div class="search-condition">
                <div class="div">
                  <el-button-group>
                    <el-button class="btn" @click="chooseTime(1)" :class="{'active' : requestData.timeBtnValue === 1}">今日
                    </el-button>
                    <el-button class="btn" @click="chooseTime(2)" :class="{'active' : requestData.timeBtnValue === 2}">昨日
                    </el-button>
                    <el-button class="btn" @click="chooseTime(3)" :class="{'active' : requestData.timeBtnValue === 3}">本周
                    </el-button>
                  </el-button-group>
                </div>
                <div class="div">
                  <el-date-picker
                    @focus="chooseTimeDIY"
                    :clearable="false"
                    v-model="requestData.date"
                    type="daterange"
                    range-separator="至"
                    value-format="yyyy-MM-dd"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
                <div class="div">
                  <el-button type="primary" plain>导出</el-button>
                </div>
                <div class="div">
                  <el-button type="primary" @click="requestData.page = 1;getList()">搜索</el-button>
                </div>
              </div>
              <div class="content1">
                <el-card class="box-card" v-for="(item, index) in responseData1.data" :key="index">
                  <div slot="header" class="clearfix">
                    <span>{{item.name}}</span>
                  </div>
                  <h1>
                    {{item.price}}
                  </h1>
                </el-card>
              </div>
            </el-tab-pane>
<!--      <el-tab-pane label="订单统计" name="1">-->
<!--        <div class="search-condition">-->
<!--          <div class="div">-->
<!--            <el-button-group>-->
<!--              <el-button class="btn" @click="requestData1.type = 1;requestData.search = '';" :class="{'active' : requestData1.type === 1}">全部</el-button>-->
<!--              <el-button class="btn" @click="requestData1.type = 2;requestData.search = '';" :class="{'active' : requestData1.type === 2}">商品</el-button>-->
<!--              <el-button class="btn" @click="requestData1.type = 3;requestData.search = '';" :class="{'active' : requestData1.type === 3}">服务卡项目</el-button>-->
<!--              <el-button class="btn" @click="requestData1.type = 4;requestData.search = '';" :class="{'active' : requestData1.type === 4}">服务卡</el-button>-->
<!--            </el-button-group>-->
<!--          </div>-->
<!--          <div class="div" style="width: 250px">-->
<!--            <el-input-->
<!--              v-model="requestData.search"-->
<!--              placeholder="请输入查询关键字"-->
<!--              :disabled="requestData1.type===1"-->
<!--              clearable>-->
<!--            </el-input>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="search-condition">-->
<!--          <div class="div">-->
<!--            <el-button-group>-->
<!--              <el-button class="btn" @click="chooseTime(1)" :class="{'active' : requestData.timeBtnValue === 1}">今日-->
<!--              </el-button>-->
<!--              <el-button class="btn" @click="chooseTime(2)" :class="{'active' : requestData.timeBtnValue === 2}">昨日-->
<!--              </el-button>-->
<!--              <el-button class="btn" @click="chooseTime(3)" :class="{'active' : requestData.timeBtnValue === 3}">本周-->
<!--              </el-button>-->
<!--            </el-button-group>-->
<!--          </div>-->
<!--          <div class="div">-->
<!--            <el-date-picker-->
<!--              @focus="chooseTimeDIY"-->
<!--              :clearable="false"-->
<!--              v-model="requestData.date"-->
<!--              type="daterange"-->
<!--              range-separator="至"-->
<!--              value-format="yyyy-MM-dd"-->
<!--              start-placeholder="开始日期"-->
<!--              end-placeholder="结束日期">-->
<!--            </el-date-picker>-->
<!--          </div>-->
<!--          <div class="div">-->
<!--            <el-button type="primary" plain>导出</el-button>-->
<!--          </div>-->
<!--          <div class="div">-->
<!--            <el-button type="primary" @click="requestData.page = 1;getList()">搜索</el-button>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="content1">-->
<!--          <el-card class="box-card" v-for="(item, index) in responseData1.data" :key="index">-->
<!--            <div slot="header" class="clearfix">-->
<!--              <span>{{item.name}}</span>-->
<!--            </div>-->
<!--            <h1>-->
<!--              {{item.price}}-->
<!--            </h1>-->
<!--          </el-card>-->
<!--        </div>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="充值统计" name="2">-->
<!--        <div class="search-condition">-->
<!--          <div class="div">-->
<!--            <el-button-group>-->
<!--              <el-button class="btn" @click="chooseTime(1)" :class="{'active' : requestData.timeBtnValue === 1}">今日-->
<!--              </el-button>-->
<!--              <el-button class="btn" @click="chooseTime(2)" :class="{'active' : requestData.timeBtnValue === 2}">昨日-->
<!--              </el-button>-->
<!--              <el-button class="btn" @click="chooseTime(3)" :class="{'active' : requestData.timeBtnValue === 3}">本周-->
<!--              </el-button>-->
<!--            </el-button-group>-->
<!--          </div>-->
<!--          <div class="div">-->
<!--            <el-date-picker-->
<!--              @focus="chooseTimeDIY"-->
<!--              :clearable="false"-->
<!--              v-model="requestData.date"-->
<!--              type="daterange"-->
<!--              range-separator="至"-->
<!--              value-format="yyyy-MM-dd"-->
<!--              start-placeholder="开始日期"-->
<!--              end-placeholder="结束日期">-->
<!--            </el-date-picker>-->
<!--          </div>-->
<!--          <div class="div">-->
<!--            <el-button type="primary" plain>导出</el-button>-->
<!--          </div>-->
<!--          <div class="div">-->
<!--            <el-button type="primary" @click="requestData.page = 1;getList()">搜索</el-button>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="content1">-->
<!--          <el-card class="box-card">-->
<!--            <div slot="header" class="clearfix">-->
<!--              <span>充值金额</span>-->
<!--            </div>-->
<!--            <h1>-->
<!--              {{responseData2.all_price | moneyToFixed}}元-->
<!--            </h1>-->
<!--          </el-card>-->
<!--          <el-card class="box-card">-->
<!--            <div slot="header" class="clearfix">-->
<!--              <span>退款金额</span>-->
<!--            </div>-->
<!--            <h1>-->
<!--              {{responseData2.price | moneyToFixed}}元-->
<!--            </h1>-->
<!--          </el-card>-->
<!--        </div>-->
<!--      </el-tab-pane>-->
      <el-tab-pane label="会员统计" name="3">
        <div class="search-condition">
          <div class="div">
            <el-button-group>
              <el-button class="btn" @click="chooseTime(1)" :class="{'active' : requestData.timeBtnValue === 1}">今日
              </el-button>
              <el-button class="btn" @click="chooseTime(2)" :class="{'active' : requestData.timeBtnValue === 2}">昨日
              </el-button>
              <el-button class="btn" @click="chooseTime(3)" :class="{'active' : requestData.timeBtnValue === 3}">本周
              </el-button>
            </el-button-group>
          </div>
          <div class="div">
            <el-date-picker
              @focus="chooseTimeDIY"
              :clearable="false"
              v-model="requestData.date"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="div">
            <el-button type="primary" plain>导出</el-button>
          </div>
          <div class="div">
            <el-button type="primary" @click="requestData.page = 1;getList()">搜索</el-button>
          </div>
        </div>
        <div class="content1">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>总会员</span>
            </div>
            <h1>
              {{responseData3.all_total}}人
            </h1>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>消费会员</span>
            </div>
            <h1>
              {{responseData3.xiao_total}}人
            </h1>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>新客会员</span>
            </div>
            <h1>
              {{responseData3.new_member}}人
            </h1>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>散客</span>
            </div>
            <h1>
              {{responseData3.sanCount}}人
            </h1>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>总分销员</span>
            </div>
            <h1>
              {{responseData3.all_distributor}}人
            </h1>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>新增分销员</span>
            </div>
            <h1>
              {{responseData3.new_add_distributor}}人
            </h1>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>总粉丝</span>
            </div>
            <h1>
              {{responseData3.all_fans}}人
            </h1>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>新增粉丝</span>
            </div>
            <h1>
              {{responseData3.new_add_fans}}人
            </h1>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="服务统计" name="4">
        <div class="search-condition">
          <div class="div">
            <el-select v-model="requestData4.waiter_id" clearable placeholder="选择服务人员">
              <el-option
                v-for="item in waiter"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="div">
            <el-select v-model="requestData4.service_id" clearable placeholder="选择服务项目">
              <el-option
                v-for="item in serviceItemList"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="search-condition">
          <div class="div">
            <el-button-group>
              <el-button class="btn" @click="chooseTime(1)" :class="{'active' : requestData.timeBtnValue === 1}">今日
              </el-button>
              <el-button class="btn" @click="chooseTime(2)" :class="{'active' : requestData.timeBtnValue === 2}">昨日
              </el-button>
              <el-button class="btn" @click="chooseTime(3)" :class="{'active' : requestData.timeBtnValue === 3}">本周
              </el-button>
            </el-button-group>
          </div>
          <div class="div">
            <el-date-picker
              @focus="chooseTimeDIY"
              :clearable="false"
              v-model="requestData.date"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="div">
            <el-button type="primary" plain>导出</el-button>
          </div>
          <div class="div">
            <el-button type="primary" @click="requestData.page = 1;getList()">搜索</el-button>
          </div>
        </div>
        <div class="content2">
          <el-table :data="responseData4.data" border style="width: 100%;margin-top: 30px" height="565">
            <el-table-column label="排行" type="index" width="150"></el-table-column>
            <el-table-column prop="start_time" label="开始时间"></el-table-column>
            <el-table-column prop="end_time" label="结束时间"></el-table-column>
            <el-table-column prop="name" label="服务人员"></el-table-column>
            <el-table-column prop="service_name" label="服务项目"></el-table-column>
            <el-table-column prop="num" label="服务次数"></el-table-column>
          </el-table>
<!--          <div class="footer">-->
<!--            <el-pagination-->
<!--              background-->
<!--              layout="total, sizes, prev, pager, next, jumper"-->
<!--              @size-change="pageSizeChange"-->
<!--              :page-sizes="[10, 20, 30, 40]"-->
<!--              :page-size="requestData.limit"-->
<!--              @current-change="pageCurrentChange"-->
<!--              :current-page.sync="requestData.page"-->
<!--            >-->
<!--            </el-pagination>-->
<!--          </div>-->
        </div>
      </el-tab-pane>
<!--      <el-tab-pane label="销量统计" name="5">-->
<!--        <div class="search-condition">-->
<!--          <div class="div">-->
<!--            <el-button-group>-->
<!--              <el-button class="btn" @click="requestData5.type = 1;" :class="{'active' : requestData5.type === 1}">商品</el-button>-->
<!--              <el-button class="btn" @click="requestData5.type = 2;" :class="{'active' : requestData5.type === 2}">服务卡项目</el-button>-->
<!--              <el-button class="btn" @click="requestData5.type = 3;" :class="{'active' : requestData5.type === 3}">服务卡</el-button>-->
<!--            </el-button-group>-->
<!--          </div>-->
<!--          <div class="div" style="width: 250px">-->
<!--            <el-input-->
<!--              v-model="requestData.search"-->
<!--              placeholder="请输入需查询的商品名称/条形码"-->
<!--              clearable>-->
<!--            </el-input>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="search-condition">-->
<!--          <div class="div">-->
<!--            <el-button-group>-->
<!--              <el-button class="btn" @click="chooseTime(1)" :class="{'active' : requestData.timeBtnValue === 1}">今日-->
<!--              </el-button>-->
<!--              <el-button class="btn" @click="chooseTime(2)" :class="{'active' : requestData.timeBtnValue === 2}">昨日-->
<!--              </el-button>-->
<!--              <el-button class="btn" @click="chooseTime(3)" :class="{'active' : requestData.timeBtnValue === 3}">本周-->
<!--              </el-button>-->
<!--            </el-button-group>-->
<!--          </div>-->
<!--          <div class="div">-->
<!--            <el-date-picker-->
<!--              @focus="chooseTimeDIY"-->
<!--              :clearable="false"-->
<!--              v-model="requestData.date"-->
<!--              type="daterange"-->
<!--              range-separator="至"-->
<!--              value-format="yyyy-MM-dd"-->
<!--              start-placeholder="开始日期"-->
<!--              end-placeholder="结束日期">-->
<!--            </el-date-picker>-->
<!--          </div>-->
<!--          <div class="div">-->
<!--            <el-button type="primary" plain>导出</el-button>-->
<!--          </div>-->
<!--          <div class="div">-->
<!--            <el-button type="primary" @click="requestData.page = 1;getList()">搜索</el-button>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="content2">-->
<!--          <el-table :data="responseData5.data" border style="width: 100%;" height="565">-->
<!--            <el-table-column label="排行" type="index" width="130"></el-table-column>-->
<!--            <el-table-column prop="start_time" label="开始时间"></el-table-column>-->
<!--            <el-table-column prop="end_time" label="结束时间"></el-table-column>-->
<!--            <el-table-column prop="item_name" label="商品名称"></el-table-column>-->
<!--            <el-table-column prop="bar_code" label="条形码"></el-table-column>-->
<!--            <el-table-column prop="all_num" label="销量"></el-table-column>-->
<!--          </el-table>-->
<!--        </div>-->
<!--      </el-tab-pane>-->
      <el-tab-pane label="支出统计" name="6">
        <div class="search-condition">
          <div class="div">
            <el-select clearable placeholder="选择支出类型" v-model="requestData6.type_id">
              <el-option
                v-for="item in typeName"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="div">
            <el-button-group>
              <el-button class="btn" @click="chooseTime(1)" :class="{'active' : requestData.timeBtnValue === 1}">今日
              </el-button>
              <el-button class="btn" @click="chooseTime(2)" :class="{'active' : requestData.timeBtnValue === 2}">昨日
              </el-button>
              <el-button class="btn" @click="chooseTime(3)" :class="{'active' : requestData.timeBtnValue === 3}">本周
              </el-button>
            </el-button-group>
          </div>
          <div class="div">
            <el-date-picker
              @focus="chooseTimeDIY"
              :clearable="false"
              v-model="requestData.date"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="div">
            <el-button type="primary" plain>导出</el-button>
          </div>
          <div class="div">
            <el-button type="primary" @click="requestData.page = 1;getList()">搜索</el-button>
          </div>
        </div>
        <div class="clear-both" style="width: 100%;">
          <div class="content1 float-left" style="width: 20%">
            <el-card class="box-card" style="margin-top: 0;">
              <div slot="header" class="clearfix">
                <span>总金额</span>
              </div>
              <h1>
                {{responseData6.data.all_price | moneyToFixed}}元
              </h1>
            </el-card>
          </div>
          <div class="content2 float-right" style="width: 80%;">
            <el-table :data="responseData6.data.data" border style="width: 100%;" height="500">
              <el-table-column prop="title" label="支出类型"></el-table-column>
              <el-table-column label="金额">
                <template slot-scope="scope">
                  {{scope.row.price | moneyToFixed}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {
    postStatisticsExpenditure,
    postExpenditureTypeNameList,
    postStatisticsMember,
    postStatisticsCz,
    postStatisticsVolume,
    postStatisticsService,
    postWaiter,
    postServiceItemList,
    postStatisticsOrder,
  } from '../../api/getData'
  import {changeTime, getWeekStartDateAndEndDateRange} from '../../utils'

  export default {
    name: 'StatementReportForm',
    data () {
      return {
        requestData: {
          page: 1,
          limit: 10,
          search: '',
          type: '1',
          // 筛选时间 自定义时间 公共参数
          date: [],
          // 当前选择的时间// 1=今日，2=昨日，3=本周 0=未选择 公共参数
          timeBtnValue: 0,
          startTime: '', // 开始时间 公共参数
          endTime: '' // 结束时间 公共参数
        },

        //订单统计
        requestData1: {
          type: 1,//条件类型：1全部;2商品;3服务项目;4服务卡
        },
        responseData1:{
          data:[]
        },

        //充值统计
        responseData2: {
          all_price: 0,    //充值金额
          price: 0        //退款金额
        },

        //会员统计
        responseData3: {
          all_total: 0,     //总会员
          new_member: 0,    //新客会员
          xiao_total: 0,    //消费会员
          sanCount: 0,      //散客
          all_distributor: 0, //总分销员
          all_fans: 0, // 总粉丝
          new_add_distributor: 0, //新增分销员
          new_add_fans: 0, // 新增粉丝
        },

        //服务统计
        //服务人员列表
        waiter: [],
        //选择服务项目
        serviceItemList: [],
        requestData4: {
          waiter_id: '',
          service_id:'',
          page:1,//用于选择服务项目分页请求
          limit:10,//用于选择服务项目分页请求
        },
        responseData4:{
          // count: 0,
          data:[]
        },

        //销量统计
        requestData5: {
          type: 1,//类型：1商品;2服务项目;3服务卡
        },
        responseData5:{
          // count: 0,
          data:[]
        },

        //支出统计
        requestData6: {
          type_id: '',
        },
        responseData6: {
          count: 0,
          data: {
            all_price: 0,    //总金额
            data: []
          }
        },
        //选择支出类型
        typeName: [],
      }
    },
    methods: {
      // 页码操作
      pageCurrentChange (val) {
        this.requestData.page = val
        this.getList()
      },
      // 页码操作
      pageSizeChange (val) {
        this.requestData.limit = val
        this.getList()
      },
      getList () {
        switch (this.requestData.type) {
          case '1':
            this.getStatisticsOrder()
            break
          case '2':
            this.getStatisticsCz()
            break
          case '3':
            this.getStatisticsMember()
            break
          case '4':
            this.getStatisticsService()
            break
          case '5':
            this.getStatisticsVolume()
            break
          case '6':
            this.getStatisticsExpenditure()
            break
        }
      },
      // 1=今日，2=昨日，3=本周
      chooseTime (type) {
        this.requestData.timeBtnValue = type
        switch (type) {
          case 1:
            this.requestData.startTime = changeTime(new Date().getTime())
            this.requestData.endTime = changeTime(new Date().getTime())
            this.requestData.date = []
            break
          case 2:
            this.requestData.startTime = changeTime(new Date().getTime() - 24 * 60 * 60 * 1000)
            this.requestData.endTime = changeTime(new Date().getTime() - 24 * 60 * 60 * 1000)
            this.requestData.date = []
            break
          case 3:
            let date = getWeekStartDateAndEndDateRange()
            this.requestData.startTime = date[0]
            this.requestData.endTime = date[1]
            this.requestData.date = []
            break
        }
      },
      // 自定义时间
      chooseTimeDIY () {
        this.requestData.startTime = ''
        this.requestData.endTime = ''
        this.requestData.timeBtnValue = 0
      },
      // tab切换
      handleClick () {
        this.requestData.page = 1
        this.requestData.search = ''
        this.chooseTime(1)
        this.requestData.date = []
        this.getList()
      },

      //订单统计
      async getStatisticsOrder(){
        let data = {
          start_time: this.requestData.date[0] || this.requestData.startTime,
          end_time: this.requestData.date[1] || this.requestData.endTime,
          type:this.requestData1.type,
          title:this.requestData.search,
        }
        await postStatisticsOrder(data).then(res => {
          if (res.code === 200) {
            this.responseData1.data = res.data
          }
        })
      },

      //充值统计
      async getStatisticsCz () {
        let data = {
          start_time: this.requestData.date[0] || this.requestData.startTime,
          end_time: this.requestData.date[1] || this.requestData.endTime,
        }
        await postStatisticsCz(data).then(res => {
          if (res.code === 200) {
            this.responseData2 = res.data
          }
        })
      },

      //会员统计
      async getStatisticsMember () {
        let data = {
          start_time: this.requestData.date[0] || this.requestData.startTime,
          end_time: this.requestData.date[1] || this.requestData.endTime,
        }
        await postStatisticsMember(data).then(res => {
          if (res.code === 200) {
            this.responseData3 = res.data
          }
        })
      },

      //服务统计
      async getStatisticsService(){
        let data = {
          start_time: this.requestData.date[0] || this.requestData.startTime,
          end_time: this.requestData.date[1] || this.requestData.endTime,
          service_id:this.requestData4.service_id,
          waiter_id:this.requestData4.waiter_id,
        }
        await postStatisticsService(data).then(res => {
          if (res.code === 200){
            this.responseData4.data = res.data
          }
        })
      },
      getWaiterList(){
        postWaiter().then(res => {
          if (res.data.length) {
            this.waiter = res.data
          }
        })
      },
      getServiceItemList(){
        let data = {
          page:`${this.requestData4.page},${this.requestData4.limit}`
        }
        postServiceItemList(data).then(res => {
          if (res.data.length) {
            this.serviceItemList.push(...res.data)
            this.requestData4.page++
            this.getServiceItemList()
          }
        })
      },

      //销量统计
      async getStatisticsVolume(){
        let data = {
          start_time: this.requestData.date[0] || this.requestData.startTime,
          end_time: this.requestData.date[1] || this.requestData.endTime,
          type:this.requestData5.type,
          title: this.requestData.search
        }
        await postStatisticsVolume(data).then(res => {
          if (res.code === 200){
            this.responseData5.data = res.data
          }
        })
      },

      //支出统计
      async getStatisticsExpenditure () {
        let data = {
          start_time: this.requestData.date[0] || this.requestData.startTime,
          end_time: this.requestData.date[1] || this.requestData.endTime,
          type_id: this.requestData6.type_id,
        }
        await postStatisticsExpenditure(data).then(res => {
          if (res.code === 200) {
            this.responseData6.data = res
          }
        })
      },
      getExpenditureTypeNameList () {
        postExpenditureTypeNameList().then(res => {
          if (res.data.length) {
            this.typeName = res.data
          }
        })
      },
    },
    mounted () {
      this.chooseTime(1)
      this.getList()
      this.getExpenditureTypeNameList()
      this.getWaiterList()
      this.getServiceItemList()
    }
  }
</script>

<style scoped lang="less">
  .statement-report-form {
    .search-condition {
      display: flex;
      flex-direction: row;
      margin-bottom: 15px;

      .div {
        margin-right: 15px;

        input {
          width: 250px;
        }

        .btn {
          color: #606266;
          border-color: #DCDFE6;
          background: #fff;
        }

        .active {
          color: #409EFF;
          background: #ecf5ff;
          border-color: #b3d8ff;
        }
      }
    }

    .content1 {
      flex: 1;
      display: flex;
      margin: auto;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-content: flex-start;
      align-items: flex-start;
      overflow: hidden;

      .box-card {
        height: 140px;
        width: 200px;
        margin: 10px 20px 10px 0;

        .el-card__body {
          h1 {
            text-align: center;
          }
        }
      }
    }

    .footer {
      margin-top: 20px;
      text-align: right;
    }
  }

</style>
