import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "../views/Login";
import Home from "../views/Home";
import Publish from "../views/article/Publish";
import List from "../views/article/List";
import Colmanage from "../views/column/Colmanage";
import Datamanage from "../views/data/Datamanage";
import Usermanage from "../views/user/Usermanage";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden:true,
    meta:{
      roles:['ROLE_dba','ROLE_admin','ROLE_user',]
    }

  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    hidden:true,
    meta:{
      roles:['ROLE_dba','ROLE_admin','ROLE_user',]
    }
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta:{
      isFirst:false,
      title:'文章管理',
      icon:'el-icon-document',
      roles:['ROLE_dba','ROLE_admin','ROLE_user',]
    },
    children: [
      {
        path: '/articlePublish',
        name: 'Publish',
        component: Publish,
        meta:{
          title:'发布文章',
          roles:['ROLE_dba','ROLE_admin','ROLE_user',]
        },
      },
      {
        path: '/articleList',
        name: 'List',
        component: List,
        meta:{
          title:'文章列表',
          roles:['ROLE_dba','ROLE_admin','ROLE_user',]
        },
      },
      {
        path: '/articleEditor',
        name: 'Publish',
        component: Publish,
        hidden:true,
        meta:{
          title:'编辑文章',
          roles:['ROLE_dba','ROLE_admin','ROLE_user',]
        },
      }]
  },

  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta:{
      isFirst:true
    },
    children:[
      {
        path: '/Colmanage',
        name: 'Colmanage',
        component: Colmanage,
        meta:{
          title:'栏目管理',
          icon:'el-icon-menu',
          roles:['ROLE_dba','ROLE_admin']
        },
      },
      {
        path: '/Datamanage',
        name: 'Datamanage',
        component: Datamanage,
        meta:{
          title:'数据分析',
          icon:'el-icon-s-data',
          roles:['ROLE_dba','ROLE_admin']
        },
      },
      {
        path: '/Usermanage',
        name: 'Usermanage',
        component: Usermanage,
        meta:{
          title:'用户管理',
          icon:'el-icon-user-solid',
          roles:['ROLE_dba','ROLE_admin']
        },
      },
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
