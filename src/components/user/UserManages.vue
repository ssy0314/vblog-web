<template>
    <div>
        <div class="box">
            <el-input class="input" v-model="nicknameValue.name" placeholder="可以通过用户昵称搜索用户" prefix-icon="el-icon-search" size="small"></el-input>
            <el-button type="primary" @click="searchUser" class="el-icon-search" size="small" >搜索</el-button>
        </div>
        <el-row :gutter="20">
            <el-col :span="8" v-for="(item,index) in this.userData" :key="index">
                <el-card class="box-card" >
                    <div slot="header" class="clearfix">
                        <span>{{item.nickname}}</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="delBtn(item.id)">删除</el-button>
                    </div>
                    <div style="width: 100px;height: 100px;margin: 0 auto;margin-bottom: 20px">
                        <img :src="url" style="width: 100px;height: 100px;">
                    </div>

                    <div class="text item">用户名称：{{item.username}}</div>
                    <div class="text item">电子邮箱：{{item.email}}</div>
                    <div class="text item">注册时间：{{item.regtime}}</div>
                    <div class="text item">用户状态：禁用<el-switch
                            v-model="item.enabled"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="change(item.id,item.enabled)"
                    ></el-switch>启用</div>
                    <div class="text item" >用户角色：
                        <el-tag
                                v-for="(auth,i) in item.authorities"
                                :key="i"
                                type="success"
                                size="mini"
                                class="tag">
                            {{auth.authority}}
                        </el-tag>
                        <el-popover
                                placement="right"
                                width="200px"
                                trigger="click">
                            <div class="block">
                                <div class="demonstration">角色列表</div>
                                <el-select v-model="item.rolesId" multiple placeholder="请选择" @change="changeRoleBtn($event,item.id)" >
                                    <el-option
                                            v-for="role in options"
                                            :key="role.id"
                                            :label="role.name"
                                            :value="role.id">
                                    </el-option>
                                </el-select>
                            </div>
                            <el-button slot="reference" type="text" class="el-icon-more"></el-button>
                        </el-popover>
                    </div>
                </el-card>
            </el-col>


        </el-row>



    </div>
</template>

<script>
    export default {
        name: "UserManages",
        data(){
            return{
                nicknameValue:{
                    name:''
                },
                userData:[],
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                delivery: true,
                props: { multiple: true },
                options: [],
                value1:[1,2],
                user:{
                    id:'',
                    roleId:[]
                }
            }
            },
        methods:{

            changeRoleBtn(row,date){
                this.user.id=date;
                this.user.roleId=row;
                console.log(this.user);

            },
            delBtn(data){
                let user ={
                    id:data
                }
                this.$confirm('此操作将永久删除该用户, 是否继续?', '系统提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delRequest('/userDom/delUser',user).then(resp =>{
                        if(resp){
                            this.initUser();
                        }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

                })

            },
            change(id,enabled){
                let user ={
                    id:id,
                    enabled:enabled
                }
                this.putRequest('/userDom/putUser',user).then(resp =>{
                    if(resp){
                        this.initUser();
                    }
                })
            },
            searchUser(){
                this.getRequest('/userDom/searchUsers',this.nicknameValue).then(resp =>{
                    if(resp){
                        this.userData=resp
                    }

                })
            },
            initUser(){
                this.getRequest('/userDom/getUsers').then(resp =>{
                    if(resp){
                        this.userData=resp;

                    }
                })
            },
            initRole(){
                this.getRequest('/userDom/getRoles').then(resp =>{
                    if(resp){
                        this.options=resp;

                    }
                })
            }
        },
        mounted() {
            this.initUser();
            this.initRole();
        }
    }
</script>

<style scoped>
    .input{
        width: 240px;
        margin-right:15px ;
        margin-top: 10px;
    }
    .box{
        margin: 0 auto;
        width: 400px;
    }
    .text{
        color: deepskyblue;
        font-size: 12px;
        margin: 15px 0;
    }
    .box-card{
        margin-top:8px;
        width: 320px;
    }
    .tag{
    margin-right:5px ;
    }
    .demo-image{
        width: 300px;
    }


</style>