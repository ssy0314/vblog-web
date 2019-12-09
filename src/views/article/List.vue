<template>
    <div>
        <el-tabs v-model="activeName" type="card" >
            <el-tab-pane label="全部文章" name="first">全部文章
                <BlogList status="0" :showEdit=false :showDel=false :showTurn=false :activeName="activeName"></BlogList>
            </el-tab-pane>
            <el-tab-pane label="已发表" name="second">已发表
                <BlogList status="1" :showEdit=true :showDel=true :showTurn=false :activeName="activeName"></BlogList>
            </el-tab-pane>
            <el-tab-pane label="草稿箱" name="third">草稿箱
                <BlogList status="2" :showEdit=true :showDel=true :showTurn=false :activeName="activeName"></BlogList>
            </el-tab-pane>
            <el-tab-pane label="回收站" name="fourth">回收站
                <BlogList status="3" :showEdit=false :showDel=true :showTurn=true :activeName="activeName"></BlogList>
            </el-tab-pane>
            <el-tab-pane label="博客管理" name="fivth">博客管理
                <BlogList status="-1" :showEdit=false :showDel=true :showTurn=false :activeName="activeName"></BlogList>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import BlogList from "../../components/article/BlogList";
    export default {
        name: "List",
        data(){
            return{
                activeName: 'first'
            }
        },
        components:{
            BlogList,
        }
    }
</script>

<style scoped>

</style>