<template>
    <div>
        <el-row style="height: 100px;line-height: 100px">
            <el-col :span="2" :offset="1" style="font-size: 22px">
                提取名称:
            </el-col>
            <el-col :span="5">
                <el-input placeholder="请输入名称" prefix-icon="el-icon-search" v-model="name"></el-input>
            </el-col>
            <el-col :span="2" :offset="1" style="font-size: 22px">
                是否有环:
            </el-col>
            <el-col :span="5">
                <el-select v-model="cycle" placeholder="请选择">
                    <el-option value="" label="有环&无环" key="">
                    </el-option>
                    <el-option
                        label="无环"
                        value="acycliced">
                    </el-option>
                    <el-option value="Looped" label="有环" key="Looped">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-col>
            <el-table
                :data="table"
                border
                style="width: 100%"
                :row-class-name="tableRowClassName"
            >
                <el-table-column
                    type="index"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="染色体名称"
                    width="250">
                </el-table-column>
                <el-table-column
                    prop="originName"
                    label="源文件名"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="是否有环"
                    width="100"
                >
                    <template slot-scope="scope">
                        <el-tag type="primary" v-if="scope.row.cycle==='Looped'">有环</el-tag>
                        <el-tag type="success" v-else>无环</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    label="节点总数"
                    prop="tot"
                    width="100"
                >
                </el-table-column>
                <el-table-column
                    label="文件大小(byte)"
                    prop="fileSize"
                    width="120"
                >
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    prop="createTime"
                    width="200"
                >
                </el-table-column>
                <el-table-column
                    label="状态"
                    property="status"
                    fixed="right"
                    width="120"
                >
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status==='未生成序列'" type="info">{{scope.row.status}}</el-tag>
                        <el-tag v-if="scope.row.status==='生成中'" type="danger">{{scope.row.status}}</el-tag>
                        <el-tag v-if="scope.row.status==='完成'" type="success">{{scope.row.status}}</el-tag>
                        <el-tag v-if="scope.row.status==='排队中'" type="text">{{scope.row.status}}</el-tag>
                    </template>
                    <el-tag></el-tag>
                </el-table-column>
                <el-table-column label="序列长度" width="150">
                    <template slot-scope="scope">
                <span v-if="scope.row.length===null">
                    尚未生成
                </span>
                        <span v-else>{{ scope.row.length }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="序列个数" width="150">
                    <template slot-scope="scope">
                  <span v-if="scope.row.size===null">
                    尚未生成
                  </span>
                        <span v-else>{{ scope.row.size }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    fixed="right"
                    width="300px"
                >
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status==='未生成序列'" type="info">
                            生成
                        </el-button>
                        <el-button v-if="scope.row.status==='完成'" type="primary" @click="download(scope.row)">下载数据
                        </el-button>
                        <el-button @click="beforeDelete(scope.row)">删除</el-button>
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
            <el-dialog
            title="提示"
            :visible.sync="deleteVisible"
            width="30%"
            :before-close="handleClose">
            <span>你确定要删除用户:{{deleteChromosome.name}}吗</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDeleteChromosome">确 定</el-button>
            </span>
        </el-dialog>

        </el-col>
    </div>
</template>

<script>
import {deleteChromosomeById, getAllChromosome} from "../api/getData";
import {baseURL} from "../api/http";

export default {
    name: "Chromosome",
    data() {
        return {
            deleteVisible: false,
            deleteChromosome: {

            },
            name:'',
            cycle:'',
            pagesize: 15,
            offset: 0,
            limit: 20,
            count: 0,
            currentPage: 1,
            tableData: [],
            tempData: []
        }
    }, methods: {
        beforeDelete (data) {
            this.deleteChromosome = data
            this.deleteVisible = true
        },
        handleDeleteChromosome () {
            deleteChromosomeById(this.deleteChromosome.id).then(res => {
                this.tempData =res.data
                this.tableData = res.data
                this.$notify.success('删除成功')
                this.deleteVisible = false
            })
        },
        handleClose (done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done()
                })
                .catch(_ => {
                })
        },
        downFile (fileName, url) {
            const el = document.createElement('a')
            el.style.display = 'none'
            el.setAttribute('target', '_blank')
            fileName && el.setAttribute('download', fileName)
            el.href = url
            document.body.appendChild(el)
            el.click()
            document.body.removeChild(el)
        },
        download (row) {
            this.downFile(row.name, baseURL+row.chromosomeUrl)
            this.downFile('read' + row.length + '.fa', baseURL+row.faUrl)
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        tableRowClassName ({row, rowIndex}) {
            if (rowIndex % 2 === 1) {
                return 'warning-row'
            } else {
                return ''
            }
        },
        init() {
            getAllChromosome().then(res => {
                this.tableData = res.data
                this.tempData = res.data
            })
        }
    },watch:{
        name(newName, oldName){
            this.tableData = []
            this.tempData.forEach(res=>{
                if(res.name.indexOf(newName)!==-1&&(res.cycle===this.cycle||this.cycle.length===0)){
                    this.tableData.push(res)
                }
            })
        },
        cycle(newName, oldName){
            this.tableData = []
            this.tempData.forEach(res=>{
                if(res.name.indexOf(this.name)!==-1&&res.cycle===newName||newName.length===0){
                    this.tableData.push(res)
                }
            })
        }
    }, created() {
        this.init()
    }, computed:{
        table(){
            return this.tableData.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        }
    },
}
</script>

<style>
.warning-row {
    background: oldlace;
}
.success-row {
    background: #f0f9eb;
}
</style>
