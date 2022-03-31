<template>
    <div>
        <head-top></head-top>
        <div>
            <el-row>
                <el-col :span="24" class="option">头部</el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="table">
                    <el-table>

                    </el-table>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import headTop from "../components/headTop";
export default {
    name: "assemble",
    components: {
        headTop,
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
    height: 100%;
    background: #1c8de0;
}
</style>
