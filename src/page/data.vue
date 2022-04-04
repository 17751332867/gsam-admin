<template>
    <div>
        <head-top></head-top>
        <div>
            <el-row>
                <el-col :span="24" class="option">头部</el-col>
            </el-row>
            <el-row>
                <el-col :span="23" class="table">
                    <el-table :data="tableData">
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
                        <el-table-column prop="description" label="描述" width="400">

                        </el-table-column>
                        <el-table-column prop="size" label="文件大小" width="200">

                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import HeadTop from "../components/headTop";
import {baseUrl} from "../config/env";
import {getAllDNAData} from "../api/getData";

export default {
    name: "data",
    components:{
        HeadTop
    },data(){
        return{
            baseUrl:'',
            tableData:[{
                id:1,
                type:'*.fa',
                fileList:[],
                size:3*1024*1024*1024,
                description:'这是一个人类花了大价钱搞出来的DNA序列,这是一个人类花了大价钱搞出来的DNA序列,这是一个人类花了大价钱搞出来的DNA序列,这是一个人类花了大价钱搞出来的DNA序列'
            }]
        }
    },methods:{
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
            fileList.add(file)
        },getData(){
            this.baseUrl = baseUrl
            getAllDNAData().then(res=>{
                this.tableData = res.data
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
.option{
    height: 100px;
    background: wheat;
}
.table{

    position: absolute;
    top: 100px;
    background: #1c8de0;
}
</style>
