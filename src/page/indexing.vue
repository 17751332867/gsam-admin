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
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="id" width="80" label="id"></el-table-column>
                        <el-table-column prop="name" width="150" label="算法名"></el-table-column>
                        <el-table-column prop="command" width="300" label="算法指令"></el-table-column>
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
                                    :on-exceed="handleExceed"
                                >
                                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                    <el-button style="margin-left: 10px;" size="small" type="success"
                                               @click="submitUpload(scope.row.fileList)">上传到服务器
                                    </el-button>
                                    <div slot="tip" class="el-upload__tip">实验室内部服务器，请不要虐待他</div>
                                </el-upload>
                            </template>
                        </el-table-column>
                        <el-table-column prop="description" label="描述"></el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="200">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="setUpdateInfo(scope.row)">修改</el-button>
                                <el-button type="danger" size="small" @click="setDeleteInfo(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
        <el-dialog
            title="添加"
            :visible.sync="addVisible"
            width="30%"
            :before-close="handleClose">
            <el-form label-position="right" label-width="80px" :model="addIndexing">
                <el-form-item label="算法名">
                    <el-input v-model="addIndexing.name"></el-input>
                </el-form-item>
                <el-form-item label="命令">
                    <el-input v-model="addIndexing.command"></el-input>
                </el-form-item>
                <el-form-item label="算法描述">
                    <el-input v-model="addIndexing.description" type="textarea" :rows="3"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleAddIndexing">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog
            title="添加"
            :visible.sync="updateVisible"
            width="30%"
            :before-close="handleClose">
            <el-form label-position="right" label-width="80px" :model="updateIndexing">
                <el-form-item label="算法名">
                    <el-input v-model="updateIndexing.name"></el-input>
                </el-form-item>
                <el-form-item label="命令">
                    <el-input v-model="updateIndexing.command"></el-input>
                </el-form-item>
                <el-form-item label="算法描述">
                    <el-input v-model="updateIndexing.description" type="textarea" :rows="3"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="updateIndexing = false">取 消</el-button>
            <el-button type="primary" @click="handleUpdateIndexing">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="deleteVisible"
            width="30%"
            :before-close="handleClose">
            <span>你确定要删除算法{{deleteIndexing.name}}吗</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteVisible = false">取 消</el-button>
                <el-button type="primary" @click="doDeleteIndexing">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import headTop from "../components/headTop";
import {getAllIndexing, insertIndexing, doUpdateIndexing, doDeleteIndexing} from "../api/getData";
import {baseUrl} from "../config/env";

export default {
    name: "index",
    components: {
        headTop
    }, data() {
        return {
            deleteIndexing:{},
            deleteVisible:false,
            updateIndexing: {
                name: '',
                command: '',
                description: ''
            },
            addIndexing: {
                name: '',
                command: '',
                description: ''
            },
            addVisible: false,
            updateVisible: false,
            tableData: [
                {
                    id: 1,
                    command: '${algorithm} ${gfa} ${fa} > ${gaf}',
                    fileList: [],
                    name: 'minigraph',
                    description: '这是一个人类花了大价钱搞出来的DNA序列,这是一个人类花了大价钱搞出来的DNA序列,这是一个人类花了大价钱搞出来的DNA序列,这是一个人类花了大价钱搞出来的DNA序列'
                }
            ]
        }
    }, methods: {
        doDeleteIndexing(){
            doDeleteIndexing(this.deleteIndexing.id).then(res=>{
                this.tableData = res.data
                this.deleteVisible = false
            })
        },
        setDeleteInfo(indexing){
            this.deleteIndexing = indexing
            this.deleteVisible = true
        },
        init() {
            getAllIndexing().then(res => {
                this.tableData = res.data
                console.log(this.tableData)
            })
        },
        handleUpdateIndexing() {
            console.log(this.updateIndexing)
            doUpdateIndexing(this.updateIndexing).then(res => {
                this.updateVisible = false
                this.tableData = res.data
            })
        },
        beforeUpload(fileList) {
            console.log(fileList)
        },
        submitUpload(fileList) {
            console.log("aaa" + fileList.length)
            if (fileList.length >= 1) {
                this.$notify({
                    title: '最多上传一个',
                    type: 'error'
                })
            } else {
                console.log(this.$refs.upload)
                this.$refs.upload.submit()
            }
        },
        setUpdateInfo(indexing) {
            this.updateIndexing = indexing
            this.updateVisible = true
        },
        handleExceed() {
            this.$notify({
                title: '超出',
                type: 'error'
            })
        },
        uploadUrl(id, fileList) {
            return baseUrl + "/indexing/upload?id=" + id
        },
        handleUpload(res, fileList, file) {
            console.log(file)
            this.$notify({
                title: '上传成功',
                type: 'success'
            })
            fileList.push(file)
            this.init()
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {
                });
        }, handleAddIndexing() {
            console.log(this.addIndexing)
            insertIndexing(this.addIndexing).then(res => {
                if (res.msg === 'success') {
                    this.$notify({
                        title: '添加成功',
                        type: 'success'
                    })
                }
                this.addVisible = false
                this.tableData = res.data
            })

        }
    }, mounted() {
        this.init()
    }
}
</script>

<style lang="less" scoped>
@import '../style/mixin';

.manage_page {

}

.option {
    height: 100px;
    line-height: 100px;
}

.table {

    position: absolute;
    top: 0px;
    background: #1c8de0;
}
</style>
