<template>
    <div class="box">
        <el-form :model="LoginInfo" :rules="rules" status-icon class="loginForm" ref="loginForm">
            <h2>系统登录</h2>
            <el-form-item prop="username">
                <el-input prefix-icon="el-icon-user-solid" placeholder="用户名" v-model="LoginInfo.username" ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input prefix-icon="el-icon-lock" type="password" placeholder="密码" v-model="LoginInfo.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox :checked="checked">记住密码</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="btnLogin" @click="btnLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>


    export default {
        name: "Login",
        data(){
            return{
                rules:{
                    username:[
                        {required:true,message:'用户名不能为空',trigger:'blur'}
                    ],
                    password:[
                        {required:true,message:'用户密码不能为空',trigger:'blur'}
                    ]
                },
                LoginInfo:{
                    username:'',
                    password:''
                },
                checked:true
            }
        },
        methods:{
            btnLogin(){
                this.$refs['loginForm'].validate((valid) =>{
                    if(valid){
                        this.postKeyValueRequest('/doLogin',this.LoginInfo).then(resp =>{
                            window.sessionStorage.setItem('user',JSON.stringify(resp.obj));
                            this.$router.replace('/Home');
                        })

                    }else{
                        this.$message.error('请输入用户名和密码');
                        return false;
                    }
                    }
                )


            }
        }


    }
</script>

<style scoped>
    .box{
        width: 500px;
        margin: 200px auto;
        background: aquamarine;
        border-radius: 20px;
        box-shadow: 0px 0px 20px cornflowerblue;
    }
.loginForm{
    width: 450px;
    margin: 0 auto;
    padding: 10px 0;
}
    .btnLogin{
        width: 100%;
    }
    .loginForm h2{
        text-align: center;
    }
</style>