<template>
    <div>
        <head-top></head-top>
        <div>
            <el-row>
                <el-col :span="2" :offset="2">
                    <el-button type="info" @click="addVisible=true">添加</el-button>
                </el-col>
                <el-col :span="1" :offset="1" style="font-size: 22px">
                    名称:
                </el-col>
                <el-col :span="5" >
                    <el-input placeholder="请输入名称" prefix-icon="el-icon-search" v-model="name"></el-input>
                </el-col>
                <el-col :span="1" :offset="1" style="font-size: 22px">
                    描述:
                </el-col>
                <el-col :span="5">
                    <el-input placeholder="请输入描述关键字" prefix-icon="el-icon-search" v-model="description"></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="23">
                    <el-table :data="table">
                        <el-table-column
                            prop="id"
                            label="id"
                            width="50">
                        </el-table-column>
                        <el-table-column prop="type" label="文件类型" width="150">
                            <template slot-scope="scope">
                                <el-select :value="scope.row.type">
                                    <el-option value="*.fa">

                                    </el-option>
                                    <el-option value="*.gfa">

                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="file" label="文件" width="220">
                            <template slot-scope="scope">
                                <el-upload
                                    ref="upload"
                                    multiple
                                    :limit="1"
                                    class="upload-demo"
                                    :action="uploadUrl(scope.row.id,scope.row.fileList)"
                                    :on-success="handleUpload"
                                    :file-list="scope.row.fileList"
                                    :auto-upload="false"
                                    >
                                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload(scope.row.fileList)">上传到服务器</el-button>
                                    <div slot="tip" class="el-upload__tip">实验室内部服务器，请不要虐待他</div>
                                </el-upload>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="名称" width="100"></el-table-column>
                        <el-table-column prop="description" label="描述" width="300">

                        </el-table-column>
                        <el-table-column prop="size" label="文件大小" width="200">

                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                               <el-button type="danger" @click="beforeDelete(scope.row)">删除</el-button>
                               <el-button type="info" @click="beforeUpdate(scope.row)">修改</el-button>
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
        <div>
            <el-dialog
                title="添加"
                :visible.sync="addVisible"
                style="width: 60%;margin: auto"
                :before-close="handleClose">
                <el-form label-position="right" label-width="80px">
                    <el-form-item label="名称">
                        <el-input name="name" v-model=addData.name></el-input>
                    </el-form-item>
                    <el-form-item label="描述" >
                        <el-input name="description" v-model="addData.description" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select  v-model="addData.type">
                            <el-option value="*.fa">

                            </el-option>
                            <el-option value="*.gfa">

                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                   <el-button @click="addVisible = false">取 消</el-button>
                   <el-button type="primary" @click="handleAddData">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                title="修改"
                :visible.sync="updateVisible"
                style="width: 60%;margin: auto"
                :before-close="handleClose">
                <el-form label-position="right" label-width="80px">
                    <el-form-item label="名称">
                        <el-input name="name" v-model=updateData.name></el-input>
                    </el-form-item>
                    <el-form-item label="描述" >
                        <el-input name="description" v-model="updateData.description" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select  v-model="updateData.type">
                            <el-option value="*.fa">

                            </el-option>
                            <el-option value="*.gfa">

                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                   <el-button @click="updateVisible = false">取 消</el-button>
                   <el-button type="primary" @click="handleUpdateData">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                title="提示"
                :visible.sync="deleteVisible"
                width="30%"
                :before-close="handleClose">
                <span>你确定要删除DNA:{{deleteData.name}}吗</span>
                <span slot="footer" class="dialog-footer">
                <el-button @click="deleteVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDeleteData">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import HeadTop from "../components/headTop";
import {baseUrl} from "../config/env";
import {deleteData, getAllDNAData, insertData} from "../api/getData";

export default {
    name: "data",
    components:{
        HeadTop
    },data(){
        return{
            name:'',
            description:'',
            currentPage:1,
            pagesize:10,
            deleteVisible: false,
            updateVisible: false,
            deleteData:{
            },
            updateData:{
                name: '',
                description: '',
                type: ''
            },
            addData:{
                name:'',
                description:'',
                type:''
            },
            addVisible: false,
            baseUrl:'',
            tempData:[],
            tableData:[{
                id:1,
                type:'*.fa',
                fileList:[],
                size:3*1024*1024*1024,
                description:'这是一个人类花了大价钱搞出来的DNA序列,这是一个人类花了大价钱搞出来的DNA序列,这是一个人类花了大价钱搞出来的DNA序列,这是一个人类花了大价钱搞出来的DNA序列'
            }]
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
    },
    computed:{
        table(){
            return this.tableData.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        }
    },methods:{
        size_change(newSize){
            this.pagesize = newSize
        },
        current_change(newPage){
            this.currentPage = newPage
        },
        beforeDelete(row){
            this.deleteData = row
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
        handleDeleteData(){
            console.log(this.deleteData)
            this.deleteVisible = false
            deleteData(this.deleteData.id).then(res=>{
                this.tableData = res.data
                this.tempData = res.data
                for(let i=0;i<this.tableData.length;i++){
                    if(this.tableData[i].fileList!==null){
                        this.tableData[i].fileList=[this.tableData[i].fileList]
                    }else{
                        this.tableData[i].fileList=[]
                    }
                }
            })
        },
        handleUpdateData(){
            this.updateVisible = false;
            updateData(this.updateData).then(res=>{
                this.tableData = res.data
                this.tableData = res.data
                for(let i=0;i<this.tableData.length;i++){
                    if(this.tableData[i].fileList!==null){
                        this.tableData[i].fileList=[this.tableData[i].fileList]
                    }else{
                        this.tableData[i].fileList=[]
                    }
                }
            })
        },
        handleAddData(){
            this.addVisible = false;
            insertData(this.addData).then(res=>{
                this.tableData = res.data
                this.tempData = res.data
                for(let i=0;i<this.tableData.length;i++){
                    if(this.tableData[i].fileList!==null){
                        this.tableData[i].fileList=[this.tableData[i].fileList]
                    }else{
                        this.tableData[i].fileList=[]
                    }
                }
            })
            this.addData.name=''
            this.addData.description=''
            this.addData.type=''
        },
        beforeUpdate(row){
            this.updateVisible = true;
            this.updateData = row
        },
        beforeUpload(fileList){
            if(fileList==null){
                fileList=[]
            }
            console.log(fileList)
        },
        submitUpload(fileList){
            console.log(fileList.length)
            if(fileList.length>=1){
                this.$notify({
                    title: '最多上传一个',
                    type: 'error'
                })
            }else{
                this.$refs.upload.submit()
            }
        },
        uploadUrl(id,fileList){
            return baseUrl+"/data/upload?id="+id
        },
        handleUpload(res,file,fileList){
            console.log(res)
            this.$notify({
                title: '上传成功',
                type: 'success'
            })
        },getData(){
            this.baseUrl = baseUrl
            getAllDNAData().then(res=>{
                console.log(res.data)
                this.tableData = res.data
                this.tempData = res.data
                for(let i=0;i<this.tableData.length;i++){
                    if(this.tableData[i].fileList!==null){
                        this.tableData[i].fileList=[this.tableData[i].fileList]
                    }else{
                        this.tableData[i].fileList=[]
                    }
                }
            })
            console.log(this.tableData)
        }
    },mounted() {
        this.getData()
    }
}
</script>

<style lang="less" scoped>
@import '../style/mixin';
.manage_page{

}
.option {
    height: 100px;
    line-height: 100px;
}
.table{
    position: absolute;
    background: #1c8de0;
}
</style>
