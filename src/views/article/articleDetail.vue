<template>
    <div>
        <el-button type="text" class="el-icon-back" @click="back">返回</el-button>
        <div>
            <h2 style="text-align: center">{{article.title}}</h2>
            <div style="text-align: right">
                <span class="item">{{article.nickname}}</span>
                <span class="item">浏览量：{{article.views}}</span>
                <span class="item">{{article.updatetime}}</span>
            </div>
            <p v-html="article.hmcontent"></p>

        </div>
    </div>
</template>

<script>
    export default {
        name: "articleDetail",
        data(){
            return{
                article:{
                    title:'',
                    nickname:'',
                    views:0,
                    updatetime:'',
                    hmcontent:'',
                },
            }
        },
        methods:{
            back(){
                this.$router.go(-1)
            },
            initArticle(){

                let article ={
                    id:this.$route.query.aid
                }
                this.getRequest('/article/getArticleDetail',article).then(resp =>{
                    if(resp){
                        this.article.title=resp.title
                        this.article.nickname=resp.user.nickname
                        this.article.views=resp.views
                        this.article.updatetime=resp.updatetime
                        this.article.hmcontent=resp.hmcontent
                    }
                })
            }
        },
        mounted() {
            this.initArticle();
        }
    }
</script>

<style scoped>
.item{
    margin-right: 5px;
    color: #409EFF;
    font-size: 12px;
    text-align: right;
}
</style>