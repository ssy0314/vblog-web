<template>
    <div >
        <el-select v-model="article.cid" placeholder="请选择文章栏目">
            <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.colname"
                    :value="item.id">
            </el-option>
        </el-select>
        <el-input style="width:300px;margin-left:5px;margin-bottom: 8px " placeholder="请输入标题..." v-model="article.title"></el-input>
        <div id="main" class="mavonEditor">
            <mavon-editor  style="height:480px;width: 98%;margin:0 auto" v-model="value" @change="editorChange"/>
        </div>
        <el-button v-if="from"  type="primary" style="float: right;margin-top: 8px" @click="publishBtn">发表文章</el-button>
        <el-button v-if="!from"  type="primary" style="float: right;margin-top: 8px" @click="saveBtn">保存修改</el-button>
        <el-button v-if="!from" style="float: right;margin-top: 8px;margin-right: 8px" @click="falseBtn">放弃修改</el-button>

    </div>
</template>

<script>
    export default {
        name: "Publish",
        data(){
            return{
                value:'',
                options: [],
                colname:'',
                article:{
                        title:'',
                        mdcontent:'',
                        hmcontent:'',
                        cid:'',
                        uid:JSON.parse(window.sessionStorage.getItem('user')).id,
                        status:1
                },
                from:true
            }
        },
        methods:{
            publishBtn(){
                this.postRequest('/article/addArticle',this.article).then(resp =>{
                    if (resp){
                        setTimeout(function () {
                            window.location.reload();
                        },2000)

                    }
                })
            },
            editorChange(value,render){
                this.article.mdcontent=value;
                this.article.hmcontent=render;
            },
            infoColumn(){
                this.getRequest('/system/getColumn/').then(resp =>{
                    this.options=resp;
                })
            },
        },
        mounted() {
            let from = this.$route.query.from
            if(from!=null && from!='' && from!=undefined){
                this.from=false;
            }
            this.infoColumn()
        }
    }
</script>

<style scoped>
    .mavonEditor{
        width: 100%;
        height: 530px;
        box-shadow: 10px 10px 10px slategray;
        background: darkgrey;
        padding-top: 8px;

    }


</style>