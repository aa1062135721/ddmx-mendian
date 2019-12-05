<template>
  <div class="statement-report-form">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>刷新时间：{{time}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="loadData">刷新</el-button>
      </div>
      <div class="content1">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>合计总人数</span>
          </div>
          <h1>
            {{responseData.all_people}}
          </h1>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日销售总金额(元)</span>
          </div>
          <h1>
            {{responseData.today_all_price}}
          </h1>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日销售订单数</span>
          </div>
          <h1>
            {{responseData.today_all_count}}
          </h1>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>总分销人员</span>
          </div>
          <h1>
            {{responseData.all_retail_user}}
          </h1>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日新增人数</span>
          </div>
          <h1>
            {{responseData.today_all_people}}
          </h1>
        </el-card>
      </div>
      <div>
        <el-table
          :data="responseData.list"
          border
          height="250"
          style="width: 100%">
          <el-table-column
            type="index"
            label="排名">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号码">
          </el-table-column>
          <el-table-column
            prop="all_num"
            label="分销人数">
          </el-table-column>
        </el-table>
      </div>
    </el-card>

  </div>
</template>

<script>
import Axios from 'axios'
import {getNowTime } from '../utils'

  export default {
    name: 'StatementReportForm',
    data () {
      return {
        time: '',
        responseData: {
          all_people: 0,
          today_all_people: 0,
          today_all_price: 0,
          today_all_count: 0,
          all_retail_user: 0,
          list:[]
        }
      }
    },
    methods: {
      loadData(){
        Axios.post('https://www.ddxm661.com/wxshop/test/tongji')
          .then(response => {
            console.log(response)
            if (response.data.code === 200) {
              this.responseData = response.data.data
              this.time =  getNowTime()
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    mounted () {
     this.loadData()
    }
  }
</script>

<style scoped lang="less">
  .statement-report-form {
    .box-card{
      margin:5% auto;
      width: 50%;
      height: 50%;
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
  }

</style>
