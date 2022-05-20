<template>
    <div>
        <head-top></head-top>
        <div>
            <el-row>
                <el-col :span="6" :offset="2" class="option">
                    <el-button type="info" @click="addVisible=true">添加</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="23" class="table">
                    <el-table :data="table" border>
                        <el-table-column
                            type="index"
                            label="id"
                            width="100">
                        </el-table-column>
                        <el-table-column prop="name" label="名称" width="200"></el-table-column>
                        <el-table-column prop="size" label="读取条数" width="100">
                        </el-table-column>
                        <el-table-column prop="num" label="每条长度" width="100"></el-table-column>
                        <el-table-column label="核心DNA范围" width="200">
                            <template slot-scope="scope">
                                {{scope.row.maxLengthLowerBound}}-{{scope.row.maxLengthUpperBound}}
                            </template>
                        </el-table-column>
                        <el-table-column label="附属DNA范围">
                            <template slot-scope="scope">
                                {{scope.row.minLengthLowerBound}}-{{scope.row.minLengthUpperBound}}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="danger" @click="beforeDelete(scope.row)">删除</el-button>
                                <el-button type="info" @click="beforeUpdate(scope.row)">重新实验</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-row>
                <el-pagination
                    @size-change="size_change"
                    @current-change="current_change"
                    :current-page="currentPage"
                    :page-sizes="[10,20,30]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.length">
                </el-pagination>
            </el-row>
        </div>
        <el-dialog
            title="修改"
            :visible.sync="updateVisible"
            style="width: 100%;margin: auto"
            :before-close="handleClose">
            <el-form label-position="right" label-width="180px">
                <el-form-item label="名称">
                    <el-input v-model=updateData.name></el-input>
                </el-form-item>
                <el-form-item label="核心DNA范围" >
                    <el-input-number v-model="updateData.maxLengthLowerBound" :step="1000" step-strictly></el-input-number>
                    到<el-input-number v-model="updateData.maxLengthUpperBound" :step="1000" step-strictly></el-input-number>
                </el-form-item>
                <el-form-item label="核心DNA范围" >
                    <el-input-number v-model="updateData.minLengthLowerBound" :step="1000" step-strictly></el-input-number>
                    到<el-input-number v-model="updateData.minLengthUpperBound" :step="1000" step-strictly></el-input-number>
                </el-form-item>
                <el-form-item label="读取长度" >
                    <el-input-number v-model="updateData.size" :step="1000" step-strictly></el-input-number>条长度
                    <el-input-number v-model="updateData.num" :step="100" step-strictly></el-input-number>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                   <el-button @click="updateData = false">取 消</el-button>
                   <el-button type="primary" @click="handleUpdateData">确 定</el-button>
                </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="deleteVisible"
            width="30%"
            :before-close="handleClose">
            <span>你确定要删除模拟数据:{{deleteData.name}}吗</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDeleteData">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {deletePangenomeFile, getAllPangenomeFile, redoPangenomeFile} from "../api/getData";
import HeadTop from "../components/headTop";

export default {
    name: "PangenomeFile",
    components:{
        HeadTop
    },
    data(){
        return{
            currentPage:1,
            pagesize:10,
            addVisible:false,
            deleteVisible:false,
            deleteData:{

            },
            tableData:[],
            updateData:{
                maxLengthLowerBound:-1,
                maxLengthUpperBound:-1,
                minLengthLowerBound:-1,
                minLengthUpperBound:-1,
                num:-1,
                name:"aa"
            },
            updateVisible:false
        }
    },
    computed:{
        table(){
            return this.tableData.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        }
    },
    methods:{
        size_change(newSize){
            this.pagesize = newSize
        },
        //监听 页码值 改变的事件
        current_change(newPage){
            this.currentPage = newPage
        },
        beforeDelete(data){
            this.deleteData = data
            this.deleteVisible = true
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
            getAllPangenomeFile().then(res=>{
                this.tableData = res.data
            })
        },beforeUpdate(data){
            this.updateVisible = true
            this.updateData = data
        },handleUpdateData(){
            console.log(this.updateData)
            redoPangenomeFile(this.updateData).then(res=>{
                this.tableData = res.data
            })
            this.updateVisible = false
            this.$notify({
                title: '重新生成成功',
                type: 'success'
            })
        },handleDeleteData(){
            deletePangenomeFile(this.deleteData.id).then(res=>{
                this.tableData = res.data
            })
            this.deleteVisible = false
            this.$notify({
                title: '删除成功',
                type: 'success'
            })
        }
    },created() {
        this.init()
    }
}
</script>

<style scoped>
.option {
    height: 100px;
    line-height: 100px;
}
</style>
