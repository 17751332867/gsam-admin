<template>
    <div>
        <head-top></head-top>
        <el-row>
            <el-col :span="1" :offset="1" style="font-size: 22px">
                名称:
            </el-col>
            <el-col :span="5" class="option">
                <el-input placeholder="请输入名称" prefix-icon="el-icon-search" v-model="name"></el-input>
            </el-col>
            <el-col :span="1" :offset="1" style="font-size: 22px">
                描述:
            </el-col>
            <el-col :span="5">
                <el-input placeholder="请输入描述关键字" prefix-icon="el-icon-search" v-model="description"></el-input>
            </el-col>
<!--            <el-col :span="3" :offset="2">-->
<!--                <el-button type="primary" @click="beforeAdd">添加</el-button>-->
<!--            </el-col>-->
        </el-row>
        <el-row>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    type="index"
                    label="id"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="description"
                    label="描述">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="200"
                >
                <template slot-scope="scope">
                    <el-button type="info" @click="beforeUpdate(scope.row)">修改</el-button>
                    <el-button type="danger" @click="beforeDelete(scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </el-row>

<!--        <el-dialog-->
<!--            title="提示"-->
<!--            :visible.sync="addVisible"-->
<!--            width="30%"-->
<!--            :before-close="handleClose">-->
<!--            <el-form :model="addData">-->
<!--                <el-form-item label="名称" label-width="180">-->
<!--                    <el-input v-model="addData.name"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="描述" label-width="180">-->
<!--                    <el-input v-model="addData.description" type="textarea"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                    <el-upload-->
<!--                        class="upload-demo"-->
<!--                        action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                        :on-preview="handlePreview"-->
<!--                        :on-remove="handleRemove"-->
<!--                        :before-remove="beforeRemove"-->
<!--                        drag-->
<!--                        multiple-->
<!--                        :limit="3"-->
<!--                        :on-exceed="handleExceed"-->
<!--                        :file-list="addData.fileList">-->
<!--                        <i class="el-icon-upload"></i>-->
<!--                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
<!--                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--                    </el-upload>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="addVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="addVisible = false">确 定</el-button>-->
<!--      </span>-->
<!--        </el-dialog>-->
        <el-dialog
            title="提示"
            :visible.sync="updateVisible"
            width="30%"
            :before-close="handleClose">
            <el-form label-position="right" label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="updateData.name"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="updateData.description" type="textArea"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="deleteVisible"
            width="30%"
            :before-close="handleClose">
            <span>你确定要删除可视化:{{deleteData.name}}吗</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDeleteData">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import HeadTop from "../components/headTop";
import {deleteVisualization, selectVisualization, updateVisualization} from "../api/getData";

export default {
    name: "visualization",
    components:{
        HeadTop
    },data(){
        return{
            // addData:{
            //     name:'',
            //     description:'',
            //     fileList:[]
            // },
            // addVisible:false,
            updateVisible:false,
            updateData:{
              name:'',
              description:''
            },
            deleteVisible:false,
            deleteData:{
              name:''
            },
            name:'',
            description:'',
            tableData:[],
            tempData:[]
        }
    },
    watch: {
        name (newName, oldName) {
            this.tableData = []
            this.tempData.forEach(res => {
                if (res.name.indexOf(newName) !== -1 && res.description.indexOf(this.description) !== -1) {
                    this.tableData.push(res)
                }
            })
        },
        description (newName, oldName) {
            this.tableData = []
            this.tempData.forEach(res => {
                if (res.name.indexOf(this.name) !== -1 && res.description.indexOf(newName) !== -1) {
                    this.tableData.push(res)
                }
            })
        }
    },methods:{
        // handleRemove(file, fileList) {
        //     console.log(file, fileList);
        // },
        // handlePreview(file) {
        //     console.log(file);
        // },
        // handleExceed(files, fileList) {
        //     this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        // },
        // beforeRemove(file, fileList) {
        //     return this.$confirm(`确定移除 ${ file.name }？`);
        // },
        handleUpdate(){
            updateVisualization(this.updateData).then(res=>{
                this.tableData = res.data
                this.tempData = res.data
                this.$notify.success('修改成功')
            })
            this.deleteVisible = false

        },
        beforeUpdate(data){
            this.updateData = data
            this.updateVisible = true
        },
        handleDeleteData(){
            deleteVisualization(this.deleteData.id).then(res=>{
                this.tableData = res.data
                this.tempData = res.data
            })
            this.deleteVisible = false
            this.$notify.success('删除成功')
        },
        beforeDelete(data){
            this.deleteData = data
            this.deleteVisible = true
        },
        beforeAdd(){
          this.addVisible = true
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        init(){
            selectVisualization().then(res=>{
                this.tableData = res.data
                this.tempData = res.data
            })
        }
    },created() {
        this.init()
    }
}
</script>

<style scoped>
el-upload-dragger .el-upload__text {
    color: #606266;
    font-size: 14px;
    text-align: center;
}
</style>
