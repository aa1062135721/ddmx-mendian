<template>
    <div class="expenditure-manage">
      <div class="search-condition">
        <div class="item">
        <el-select  clearable placeholder="选择类型" v-model="requestData.type_id">
          <el-option
            v-for="item in typeName"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
        </div>
        <div class="item">
          <el-date-picker
            v-model="requestData.start_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="开始时间">
          </el-date-picker>
        </div>
        <div class="item">
          <el-date-picker
            v-model="requestData.end_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="结束时间">
          </el-date-picker>
        </div>
        <div class="item">
          <el-button @click="clickSearchBtn"  type="primary">搜索</el-button>
        </div>
      </div>
      <div class="add-expenditure">
        <el-button @click="addExpenditureDialog.isShow = true" type="primary">新增</el-button>
      </div>
      <div>
        <el-table :data="tableData" border style="width: 100%;" height="650px">
          <el-table-column label="门店名称">{{userInfo.shop_name}}</el-table-column>
          <el-table-column prop="type" label="类型名称"></el-table-column>
          <el-table-column prop="price" label="金额"></el-table-column>
          <el-table-column prop="remarks" label="备注"></el-table-column>
          <el-table-column  label="操作人">{{userInfo.user_nickname}}</el-table-column>
          <el-table-column prop="create_time" label="新增时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope" v-if="
              (new Date(new Date().setHours(0, 0, 0, 0)).getTime() <= new Date(scope.row.create_time))
               && (new Date(new Date().setHours(23, 59, 59, 999)).getTime() >= new Date(scope.row.create_time))">
              <el-button size="mini" @click="clickDelExpenditureBtn(scope.row.id)">删除</el-button>
              <el-button size="mini" @click="clickEditExpenditureBtn(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="footer">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="pageSizeChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="requestData.my_limit"
          @current-change="pageCurrentChange"
          :current-page.sync="requestData.my_page"
          :total="requestData.count">
        </el-pagination>
      </div>
      <!-- 新增支出弹框-->
      <el-dialog class="expenditure-manage-add" title="新增" :visible.sync="addExpenditureDialog.isShow" width="500px" :center="true">
        <div>
         <div class="item clear-both">
           <div class="float-left"><span class="font-red">*</span> 类型名称：</div>
           <div class="float-right">
             <el-select  clearable placeholder="选择类型" v-model="addExpenditureDialog.addRequestData.type_id">
               <el-option
                 v-for="item in typeName"
                 :key="item.id"
                 :label="item.title"
                 :value="item.id">
               </el-option>
            </el-select>
           </div>
         </div>
         <div class="item clear-both">
           <div class="float-left"><span class="font-red">*</span> 支出金额：</div>
           <div class="float-right">
            <el-input placeholder="请输入支出金额" v-model="addExpenditureDialog.addRequestData.price"></el-input>
           </div>
         </div>
         <div class="item clear-both" style="height: 70px">
           <div class="float-left">备注：</div>
           <div class="float-right">
             <el-input
               type="textarea"
               :rows="3"
               placeholder="请输入备注"
               v-model="addExpenditureDialog.addRequestData.remarks">
             </el-input>
           </div>
         </div>
          <div class="item clear-both">
            <el-button  style="width: 100%;margin-top: 20px;" @click="clickAddExpenditureBtn"  type="primary">
              保存
            </el-button>
          </div>
        </div>
      </el-dialog>
      <!-- 编辑支出弹框-->
      <el-dialog class="expenditure-manage-add" title="编辑" :visible.sync="editExpenditureDialog.isShow" width="500px" :center="true">
        <div>
          <div class="item clear-both">
            <div class="float-left"><span class="font-red">*</span> 类型名称：</div>
            <div class="float-right">
              <el-select  clearable placeholder="选择类型" v-model="editExpenditureDialog.requestData.type_id">
                <el-option
                  v-for="item in typeName"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="item clear-both">
            <div class="float-left"><span class="font-red">*</span> 支出金额：</div>
            <div class="float-right">
              <el-input placeholder="请输入支出金额" v-model="editExpenditureDialog.requestData.price"></el-input>
            </div>
          </div>
          <div class="item clear-both" style="height: 70px">
            <div class="float-left">备注：</div>
            <div class="float-right">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入备注"
                v-model="editExpenditureDialog.requestData.remarks">
              </el-input>
            </div>
          </div>
          <div class="item clear-both">
            <el-button style="width: 100%;margin-top: 20px;" @click="clickEditExpenditureBtnOk" type="primary">
              保存
            </el-button>
          </div>
        </div>
      </el-dialog>
      <!-- 删除支出弹框-->
      <el-dialog title="删除" :visible.sync="delExpenditureDialog.isShow" width="500px">
        <el-form>
          <el-form-item label="请选择删除原因">
            <el-select v-model="delExpenditureDialog.requestData.delete_why" placeholder="请选择删除原因">
              <el-option  label="数据录入错误"  value="数据录入错误"></el-option>
              <el-option  label="操作异常"  value="操作异常"></el-option>
              <el-option  label="其他"  value="其他"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delExpenditureDialog.isShow = false"  type="primary" plain>取 消</el-button>
          <el-button type="primary" @click="clickDelExpenditureBtnOk">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'//  这儿需要用到vuex里的数据 shop_id
import { postExpenditureList, postExpenditureTypeNameList, postAddExpenditure, postDelExpenditure } from '../../api/getData'
export default {
  name: 'ExpenditureManage', // 支出管理
  data () {
    return {
      typeName: [
        // {id: 4, title: "水费",   update_time: "2019-06-22 13:52:32"}
      ],
      requestData: {
        my_page: 1,
        my_limit: 20,
        page: '',
        end_time: '',
        start_time: '',
        type_id: '',
        count: 10, // 数据总数
        shop_id: '' // vuex里获取shop_id
      },
      tableData: [
        // {type_id: "水费",          shop_id: "重庆城口店",          user_id: "admin",          price: "30.00",          remarks: "重庆城口的水费！！",          create_time: "2019-06-22 13:59:50"}
      ],
      addExpenditureDialog: {
        isShow: false,
        addRequestData: {
          type_id: '',
          price: '',
          shop_id: '', // vuex里获取shop_id
          remarks: ''
        }
      },
      editExpenditureDialog: {
        isShow: false,
        requestData: {
          id:'',
          type_id: '',
          price: '',
          shop_id: '', // vuex里获取shop_id
          remarks: ''
        }
      },
      delExpenditureDialog:{
        isShow: false,
        requestData:{
          id:'',
          delete_why:''
        }
      }
    }
  },
  mounted () {
    this.getExpenditureList()
    this.getExpenditureTypeNameList()
  },
  methods: {
    getExpenditureList () {
      this.requestData.page = `${this.requestData.my_page},${this.requestData.my_limit}`
      this.requestData.shop_id = this.userInfo.shop_id
      postExpenditureList(this.requestData).then(res => {
        if (res.data.length) {
          this.tableData = res.data
        } else {
          this.tableData = []
        }
        this.requestData.count = res.count
        this.$forceUpdate()
      }).catch(err => {
        console.log(err)
      })
    },
    getExpenditureTypeNameList () {
      postExpenditureTypeNameList().then(res => {
        if (res.data.length) {
          this.typeName = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    clickSearchBtn () {
      this.getExpenditureList()
    },
    clickAddExpenditureBtn () {
      if (!this.addExpenditureDialog.addRequestData.type_id) {
        this.$message({
          showClose: true,
          message: '请选择类型',
          type: 'error'
        })
        return
      }
      if (!/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/.test(this.addExpenditureDialog.addRequestData.price)) {
        this.$message({
          showClose: true,
          message: '请输入金额或输入的金额格式不正确',
          type: 'error'
        })
        return
      }
      this.addExpenditureDialog.addRequestData.shop_id = this.userInfo.shop_id
      postAddExpenditure(this.addExpenditureDialog.addRequestData).then(res => {
        if (res.code === '200') {
          this.addExpenditureDialog.isShow = false
          this.$message({
            showClose: true,
            message: '新增成功',
            type: 'success'
          })
          this.addExpenditureDialog.addRequestData.price = ''
          this.addExpenditureDialog.addRequestData.remarks = ''
          this.addExpenditureDialog.addRequestData.type_id = ''
          setTimeout(() => {this.getExpenditureList()}, 1000)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    clickDelExpenditureBtn(id){
      this.delExpenditureDialog.requestData.id = id
      this.delExpenditureDialog.isShow = true
    },
    async clickDelExpenditureBtnOk () {
      if (!this.delExpenditureDialog.requestData.delete_why) {
        this.$message.closeAll()
        this.$message({
          showClose: true,
          message: '请选择删除原因',
          type: 'error'
        })
        return
      }

      await this.$confirm('您确认删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await postDelExpenditure(this.delExpenditureDialog.requestData).then(res => {
          if (res.code === '200') {
            this.delExpenditureDialog.isShow = false
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
            setTimeout(() => {this.getExpenditureList()}, 1000)
            this.delExpenditureDialog.requestData.id = ''
            this.delExpenditureDialog.requestData.delete_why = ''
          }
        })
      }).catch(() => {
      })

    },
    clickEditExpenditureBtn(item) {
        this.editExpenditureDialog.requestData.id = item.id
        this.editExpenditureDialog.requestData.price = item.price
        this.editExpenditureDialog.requestData.remarks = item.remarks
        this.editExpenditureDialog.requestData.type_id = item.type_id
        this.editExpenditureDialog.isShow = true
    },
    async clickEditExpenditureBtnOk(){
      if (!this.editExpenditureDialog.requestData.type_id) {
        this.$message.closeAll()
        this.$message({
          showClose: true,
          message: '请选择类型',
          type: 'error'
        })
        return
      }
      if (!/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/.test(this.editExpenditureDialog.requestData.price)) {
        this.$message({
          showClose: true,
          message: '请输入金额或输入的金额格式不正确',
          type: 'error'
        })
        return
      }
      await this.$confirm('您确认编辑吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.editExpenditureDialog.requestData.shop_id = this.userInfo.shop_id
        await postAddExpenditure(this.editExpenditureDialog.requestData).then(res => {
          if (res.code === '200') {
            this.editExpenditureDialog.isShow = false
            this.$message({
              showClose: true,
              message: '编辑成功',
              type: 'success'
            })
            this.editExpenditureDialog.requestData.id = ''
            this.editExpenditureDialog.requestData.price = ''
            this.editExpenditureDialog.requestData.remarks = ''
            this.editExpenditureDialog.requestData.type_id = ''
            setTimeout(() => {this.getExpenditureList()}, 1000)
          }
        })
      }).catch(() => {
      })
    },
    pageSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.requestData.my_limit = val
      this.getExpenditureList()
    },
    pageCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.requestData.my_page = val
      this.getExpenditureList()
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>

<style scoped lang="less">
.expenditure-manage{
  .search-condition{
    display: flex;
    justify-content: flex-start;
    flex-direction:row;
    flex-wrap: nowrap;
    .item{
      margin-right: 20px;
    }
    margin-bottom: 20px;
  }
  .add-expenditure{
    margin-bottom: 20px;
  }
  .footer{
    margin-top: 20px;
    text-align: right;
  }
  /*新增支出弹框*/
  .expenditure-manage-add{
    .item{
      height: 48px;
      width: 100%;
      margin-bottom: 10px;
      .float-left{
        width: 30%;
        text-align: center;
        line-height: 48px;
      }
      .float-right{
        width: 70%;
        text-align: left;
      }
    }
  }
}
</style>
