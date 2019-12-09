<template>
    <div>
    <el-input prefix-icon="el-icon-search" style="width: 260px;margin-right:5px;margin-bottom:5px " size="mini" placeholder="通过标题搜索该分类下的博客文章..." v-model="keyword"></el-input>
    <el-button type="primary" class="el-icon-search" size="mini"  @click="initArticle">搜索</el-button>

        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                >
            <el-table-column
                    type="selection"
                    v-if="status!=0"
                    >
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="标题"
                    >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">{{scope.row.title}}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="updatetime"
                    label="最近编辑时间"
                    >
            </el-table-column>
            <el-table-column
                    prop="user.nickname"
                    label="作者"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="column.colname"
                    label="所属分类"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" v-if="showDel || showEdit">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            v-if="showEdit"
                            @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            v-if="showTurn"
                            @click="handleTurn(scope.row)">还原</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            v-if="showDel"
                            @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button type="danger" size="mini" style="margin-top: 5px" :disabled="disabled" v-if="status!=0" @click="delManyBtn">批量删除</el-button>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "BlogList",
        props:['status','showEdit','showDel','showTurn','activeName'],
        data(){
            return{
                keyword:'',
                pageNum:1,
                pageSize:5,
                total:5,
                tableData: [],
                arr: [],
                disabled:true

            }
        },
        mounted(){
            this.initArticle();
        },

        methods:{
            handleClick(row){
                this.$router.push({path:"/articleDetail",query:{aid:row.id}});
            },
            //更改文章
            handleEdit(data){
                this.$router.push({ path: '/articleEditor', query: { from: this.activeName,aid:data.id }})
                console.log(data.id)
            },
            //还原文章
            handleTurn(data){
                let article={
                    id:data.id,
                    status:1
                }
                this.$confirm('此操作将把该文章恢复到发布列表, 是否继续?', '系统提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.putRequest('article/putArticle',article).then(resp =>{
                        if(resp){
                            this.initArticle();
                            window.location.reload();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            //删除文章
            handleDelete(data){
               if(this.status==3){
                   this.$confirm('此操作将永久删除该文章, 是否继续?', '系统提示', {
                   confirmButtonText: '确定',
                   cancelButtonText: '取消',
                   type: 'warning'
               }).then(() => {
                   let user = {
                       id:data.id
                   }
                   this.delRequest('/article/delArticle',user).then(resp =>{
                       if(resp){
                           this.initArticle();
                       }
                   })

               }).catch(() => {
                   this.$message({
                       type: 'info',
                       message: '已取消删除'
                   });
               });}else{
                   this.$confirm('此操作会暂时将文章存入回收站，您可到回收站找回文章, 是否继续?', '系统提示', {
                       confirmButtonText: '确定',
                       cancelButtonText: '取消',
                       type: 'warning'
                   }).then(() => {
                       let article ={
                           id:data.id,
                           status:3
                       }
                       this.putRequest('article/putArticle',article).then(resp =>{
                           if(resp){
                               this.initArticle();
                               window.location.reload();
                           }
                       })
                   }).catch(() => {
                       this.$message({
                           type: 'info',
                           message: '已取消删除'
                       });
                   });
               }


            },
            //批量删除
            delManyBtn(){
                if(this.status==3){
                    this.$confirm('此操作将永久删除该文章, 是否继续?', '系统提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.delManyRequest('/article/delManyArticle',this.arr).then(resp =>{
                            if(resp){
                                this.initArticle();
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });}else{
                    this.$confirm('此操作会暂时将文章存入回收站，您可到回收站找回文章, 是否继续?', '系统提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.updateManyRequest('/article/updateManyArticle',this.arr).then(resp =>{
                            if(resp){
                                this.initArticle();
                                window.location.reload();
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }

            },
            handleSelectionChange(val){
                if(val.length>0){
                    this.arr=[];
                    this.disabled=false;
                    for(let i in val){
                        this.arr.push(val[i].id)
                    }
                }else{this.arr=[];
                this.disabled=true;}
            },
            handleSizeChange(val) {
                this.pageNum=val
                this.initArticle();
            },
            handleCurrentChange(val) {
                this.pageNum=val
                this.initArticle();
            },
            initArticle(){

                let url = '/article/getAllArticles?status='+this.status+'&keyword='+this.keyword+'&pageNum='+this.pageNum+'&pageSize='+this.pageSize
                this.getRequest(url).then(resp =>{
                    if(resp){
                        this.tableData=resp.list;
                        this.total=resp.total;
                    }
                })

            }
        }
    }
</script>

<style scoped>

</style>