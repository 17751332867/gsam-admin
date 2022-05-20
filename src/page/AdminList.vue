<template>
    <div>
        <head-top></head-top>
        <el-row style="height: 100px;line-height: 100px">
            <el-col :span="2" :offset="2">
                <el-button type="info" @click="addVisible=true">添加</el-button>
            </el-col>
            <el-col :span="2" :offset="1" style="font-size: 22px">
                用户名:
            </el-col>
            <el-col :span="5" >
                <el-input placeholder="请输入名称" prefix-icon="el-icon-search" v-model="username"></el-input>
            </el-col>
            <el-col :span="2" :offset="1" style="font-size: 22px">
                手机号:
            </el-col>
            <el-col :span="5">
                <el-input placeholder="请输入描述关键字" prefix-icon="el-icon-search" v-model="phone"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-table
                :data="table"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="100">
                </el-table-column>
                <el-table-column
                    property="password"
                    label="密码"
                    width="220">
                </el-table-column>
                <el-table-column
                    property="username"
                    label="用户姓名"
                    width="220">
                </el-table-column>
                <el-table-column
                    property="phone"
                    label="电话">
                </el-table-column>
                <el-table-column
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button type="primary" @click="beforeUpdate(scope.row)">修改</el-button>
                        <el-button type="danger" @click="beforeDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                    layout="total, prev, pager, next"
                    :total="tableData.length">
                </el-pagination>
            </div>
        </el-row>
        <div>
            <el-dialog
                title="添加"
                :visible.sync="addVisible"
                style="width: 60%;margin: auto"
                :before-close="handleClose">
                <el-form label-position="right" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="addAdmin.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="addAdmin.password"></el-input>
                    </el-form-item>
                    <el-form-item label="手机">
                        <el-input v-model="addAdmin.phone"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                   <el-button @click="addVisible = false">取 消</el-button>
                   <el-button type="primary" @click="handleAddAdmin">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                title="修改"
                :visible.sync="updateVisible"
                style="width: 60%;margin: auto"
                :before-close="handleClose">
                <el-form label-position="right" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="updateAdmin.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="updateAdmin.password"></el-input>
                    </el-form-item>
                    <el-form-item label="手机">
                        <el-input v-model="updateAdmin.phone"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                   <el-button @click="updateVisible = false">取 消</el-button>
                   <el-button type="primary" @click="handleUpdateAdmin">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                title="提示"
                :visible.sync="deleteVisible"
                width="30%"
                :before-close="handleClose">
                <span>你确定要删除用户:{{deleteAdmin.username}}吗</span>
                <span slot="footer" class="dialog-footer">
                <el-button @click="deleteVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDeleteUser">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import headTop from "../components/headTop";
import {addAdmin, deleteAdmin, getAllAdmin, updateAdmin} from "../api/getData";

export default {
    name: "AdminList",
    components: {
        headTop
    },data(){
        return{
            pagesize: 15,
            offset: 0,
            limit: 20,
            count: 0,
            currentPage: 1,
            deleteVisible: false,
            updateVisible: false,
            addVisible:false,
            username: '',
            phone:'',
            tableData:[],
            tempData:[],
            addAdmin:{
                username:'',
                password:'',
                phone:''
            },updateAdmin:{
                username:'',
                password:'',
                phone:''
            },deleteAdmin:{
                username:'',
                password:'',
                phone:''
            }
        }
    },methods:{
        handleDeleteUser(){
            deleteAdmin(this.deleteAdmin.id).then(res=>{
                this.tableData = res.data
                this.tempData = res.data
                this.$notify.success('删除成功')
            })
            this.deleteVisible = false
        },
        beforeDelete(admin){
            this.deleteAdmin = admin
            this.tempData = res.data
            this.deleteVisible = true
        },
        beforeUpdate(admin){
            this.updateAdmin = admin
            this.updateVisible = true
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {
                });
        },
        init(){
            getAllAdmin().then(res=>{
                this.tableData = res.data
                this.tempData = res.data
                console.log(res)
            })
        },
        handleAddAdmin(){
            addAdmin(this.addAdmin).then(res=>{
                this.tableData = res.data
                this.addVisible = false
                this.$notify.success('添加成功')
            })
        },handleUpdateAdmin(){
            updateAdmin(this.updateAdmin).then(res=>{
                this.tableData = res.data
                this.updateVisible = false
                this.$notify.success('修改成功')
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        }
    },mounted() {
            this.init()
    },
    computed:{
        table(){
            return this.tableData.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        }
    },
    watch:{
        username(newName,oldName){
            // console.log(newName)
            this.tableData = []
            this.tempData.forEach(res=>{
                if(res.username.indexOf(newName)!==-1&&res.phone.indexOf(this.phone)!==-1){
                    this.tableData.push(res)
                }
            })
        },phone(newName,oldName){
            this.tableData = []
            this.tempData.forEach(res=>{
                if(res.username.indexOf(this.username)!==-1&&res.phone.indexOf(newName)!==-1){
                    this.tableData.push(res)
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
