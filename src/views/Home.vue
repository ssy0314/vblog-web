<template>
    <el-container>
        <el-header class="header">
            <h2>V博客登录系统</h2>
            <el-dropdown @command="handleCommand" >
                      <span class="el-dropdown-link">
                        {{user.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="message">系统消息</el-dropdown-item>
                    <el-dropdown-item command="article">我的文章</el-dropdown-item>
                    <el-dropdown-item command="home">个人主页</el-dropdown-item>
                    <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-container>
            <el-aside width="200px" style="height:calc(100vh - 60px)">
                    <el-menu
                            default-active="2"
                            class="el-menu-vertical-demo"
                            style="height: 100%"
                            router
                            >
                        <div :key="index" v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden && !item.meta.isFirst && handleRole(item.meta.roles)">
                            <el-submenu :index="index+''">
                                <template slot="title">
                                    <i :class="item.meta.icon"></i>
                                    <span>{{item.meta.title}}</span>
                                </template>
                                <div v-for="(chirld,index) in item.children" :key="index" v-if="handleRole(chirld.meta.roles) && !chirld.hidden">
                                    <el-menu-item :index="chirld.path">{{chirld.meta.title}}</el-menu-item>
<!--                                    <el-menu-item :index="/articlePublish">发布文章</el-menu-item>-->
                                </div>
                            </el-submenu>
                        </div>

                        <div v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden && item.meta.isFirst" :key="index">
                            <div v-for="(chirld,index) in item.children" :key="index" v-if="handleRole(chirld.meta.roles)">
                                <el-menu-item :index="chirld.path">
                                    <i :class="chirld.meta.icon"></i>
                                    <span slot="title">{{chirld.meta.title}}</span>
                                </el-menu-item>
                            </div>

                        </div>

<!--                        <el-menu-item index="/Colmanage">-->
<!--                            <i class="el-icon-menu"></i>-->
<!--                            <span slot="title">栏目管理</span>-->
<!--                        </el-menu-item>-->
<!--                        <el-menu-item index="/Datamanage">-->
<!--                            <i class="el-icon-s-data"></i>-->
<!--                            <span slot="title">数据管理</span>-->
<!--                        </el-menu-item>-->
           </el-menu>

            </el-aside>
            <el-main>
                <el-breadcrumb separator-class="el-icon-arrow-right" class="head">
                    <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-if="this.$route.path !='/Home'" v-text="this.$router.currentRoute.meta.title"></el-breadcrumb-item>
                </el-breadcrumb>
                <div class="home" v-if="this.$route.path =='/Home'">
                    <h1>个人文章博客系统</h1>
                </div>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Home",
        data(){
            return{
                user:JSON.parse(window.sessionStorage.getItem('user'))
            }
        },
        methods: {
            handleRole(roles){
                let userRoles = JSON.parse(window.sessionStorage.getItem('user')).authorities
                for(let i in roles){
                    for(let j in userRoles){
                        if(userRoles[j].authority==roles[i]){
                            return true;
                        }
                    }
                }
                return false;
            },
            handleCommand(command) {
                if(command=='logout'){
                    this.$confirm('是否退出登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest('/logout');
                        window.sessionStorage.removeItem('user');
                        this.$router.replace('/');
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }
                console.log(command);
            }
        }
    }
</script>

<style scoped>
    .header{
        background: #409EFF;
        color: white;
        display:flex;
        align-items: center;
        justify-content:space-between;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: white;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }

    .head{
        padding-bottom: 8px;
    }
    .home{
        text-align: center;
        color: blue;
    }


</style>