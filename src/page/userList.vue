<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-row>
            <el-col :span="6" :offset="2" class="option">
                <el-button @click="addVisible=true">添加</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <div class="table_container">
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
                </div>
            </el-col>
        </el-row>
        <div>
            <el-dialog
                title="添加"
                :visible.sync="addVisible"
                style="width: 60%;margin: auto"
                :before-close="handleClose">
                <el-form label-position="right" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="addUser.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="addUser.password"></el-input>
                    </el-form-item>
                    <el-form-item label="手机">
                        <el-input v-model="addUser.phone"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                   <el-button @click="addVisible = false">取 消</el-button>
                   <el-button type="primary" @click="handleAddUser">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                title="修改"
                :visible.sync="updateVisible"
                style="width: 60%;margin: auto"
                :before-close="handleClose">
                <el-form label-position="right" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="updateUser.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="updateUser.password"></el-input>
                    </el-form-item>
                    <el-form-item label="手机">
                        <el-input v-model="updateUser.phone"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                   <el-button @click="updateVisible = false">取 消</el-button>
                   <el-button type="primary" @click="handleUpdateUser">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                title="提示"
                :visible.sync="deleteVisible"
                width="30%"
                :before-close="handleClose">
                <span>你确定要删除用户:{{deleteUser.username}}吗</span>
                <span slot="footer" class="dialog-footer">
                <el-button @click="deleteVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDeleteUser">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getUserList, getUserCount} from '@/api/getData'
    import {deleteUserInfo, insertUserInfo, selectUserInfo, updateUserInfo} from "../api/getData";
    export default {
        data(){
            return {
                pagesize:15,
                deleteVisible:false,
                deleteUser:{

                },
                addUser:{
                  username:'',
                  password:'',
                  phone:''
                },
                updateUser:{

                },
                updateVisible:false,
                addVisible:false,
                tableData:[],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        computed:{
            table(){
                return this.tableData.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
            }
        },
        methods: {
            handleDeleteUser(){
                deleteUserInfo(this.deleteUser.id).then(res=>{
                    this.tableData = res.data
                })
                this.deleteVisible = false;
            },
            beforeDelete(user){
                this.deleteUser = user
                this.deleteVisible = true
            },
            handleUpdateUser(){
                updateUserInfo(this.updateUser).then(res=>{
                    this.tableData = res.data
                })
                this.updateVisible = false;
            },
            beforeUpdate(user){
                this.updateUser = user
                this.updateVisible = true
            },
            handleAddUser(){
                insertUserInfo(this.addUser).then(res=>{
                    this.tableData = res.data
                })
                this.addVisible = false;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            async initData(){
                selectUserInfo().then(res=>{
                    this.tableData = res.data
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
