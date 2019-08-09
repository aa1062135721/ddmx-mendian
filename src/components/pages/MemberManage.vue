<template>
    <div>
      <div class="search-condition">
        <div class="item" style="width: 300px">
          <el-input placeholder="请输入要查询的会员手机号码"  maxlength="11" v-model="requestData.mobile" clearable></el-input>
        </div>
        <div class="item">
          <el-button type="primary" @click="getMemberList">搜索</el-button>
        </div>
      </div>
      <div>
        <el-table :data="member.list" border style="width: 100%;" height="650px">
          <el-table-column type="index" label="序号" width="100"></el-table-column>
          <el-table-column prop="mobile" label="手机号码"></el-table-column>
          <el-table-column prop="nickname" label="昵称"></el-table-column>
          <el-table-column label="余额">
            <template slot-scope="scope">
              {{ scope.row.money | moneyToFixed}}
            </template>
          </el-table-column>
          <el-table-column label="累计充值">
            <template slot-scope="scope">
              {{ scope.row.amount | moneyToFixed}}
            </template>
          </el-table-column>
          <el-table-column prop="level_name" label="会员等级"></el-table-column>
          <el-table-column prop="addtime" label="注册时间"></el-table-column>
        </el-table>
      </div>
      <div class="footer">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="pageSizeChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="requestData.limit"
          @current-change="pageCurrentChange"
          :current-page.sync="requestData.page"
          :total="member.count">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  import { postMemberList, } from '../../api/getData'
    export default {
      name: "MemberManage",
      data(){
        return {
          requestData:{
            limit:10,
            page:1,
            mobile:'',
          },
          member:{
            count:0,
            list:[
              // {
              //   id: 13,   //id
              //   mobile: "15213710636",    //手机号
              //   nickname: "吴黎明6",  //姓名
              //   addtime: "2019-08-06 10:26:58",   //注册时间
              //   level_name: "普通会员",   //会员等级
              //   money: "0.00", //余额
              //   amount: 210023,//累积充值
              // },
            ],
          },
        }
      },
      methods:{
        pageSizeChange (val) {
          this.requestData.limit = val
          this.getMemberList()
        },
        pageCurrentChange (val) {
          this.requestData.page = val
          this.getMemberList()
        },
        async getMemberList(){
          let requestData = {
            page: `${this.requestData.page},${this.requestData.limit}`,
            mobile: this.requestData.mobile,
          }
          await postMemberList(requestData).then(res => {
            this.member.count = res.count
            this.member.list = res.data
          })
        },
      },
      mounted() {
        this.getMemberList()
      },
    }
</script>

<style scoped lang="less">
  .search-condition{
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-start;
    flex-direction:row;
    flex-wrap: nowrap;
    .item{
      margin-right: 20px;
    }
  }
  .footer{
    margin-top: 20px;
    text-align: right;
  }
</style>
