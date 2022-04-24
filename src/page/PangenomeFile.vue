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
                    <el-table :data="tableData" border>
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
    </div>
</template>

<script>
import {getAllPangenomeFile, redoPangenomeFile} from "../api/getData";
import HeadTop from "../components/headTop";

export default {
    name: "PangenomeFile",
    components:{
        HeadTop
    },
    data(){
        return{
            addVisible:false,
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
    },methods:{
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
