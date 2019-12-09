import Axios from "axios";
import {Message} from "element-ui";

Axios.interceptors.response.use(resp =>{
    if(resp.data && resp.status==200 && resp.data.status==500){
        Message.error({message:resp.data.msg});
        return;
    }
    if(resp.data.msg){
        Message.success({message:resp.data.msg})
    }
    return resp.data;
},error => {
    if(error.response.status==504 ||error.response.status==404){
        Message.error('服务器走丢了o(╯□╰)o');
    }else if(error.response.status==403){
        Message.error('权限不足，请联系管理员');
    }else if(error.response.status==401){
        Message.error('用户未登录，请先登录');
    }else{
        if(error.response.data.msg){
            Message.error({message:error.response.data.msg});
        }else{Message.error({message:'未知错误'});}
    }

})

export const getRequest=(url,params) =>{
    return Axios({
        method:'get',
        url:url,
        params:params
    })
}

export const postRequest=(url,params) =>{
    return Axios({
        method:'post',
        url:url,
        data:params
    })
}
export const putRequest=(url,params) =>{
    return Axios({
        method:'put',
        url:url,
        data:params
    })
}
export const delRequest=(url,params) =>{
    return Axios({
        method:'delete',
        url:url,
        data:params
    })
}
export const postKeyValueRequest=(url,params) =>{
    return Axios({
        method:'post',
        url:url,
        data:params,
        transformRequest:[function (data) {
            let ret = ''
            for(let i in data){
                ret+=encodeURIComponent(i)+'='+encodeURIComponent(data[i])+'&'
            }
            return ret;
        }],
        header:{
            'Content-type':'application/x-www-form-urlencoded'
        }

    })
}
export const delManyRequest=(url,params) =>{
    return Axios({
        method:'post',
        url:url,
        data:params,
        transformRequest:[function (data) {
            let ret = ''
            for(let i in data){
                ret+='ids='+encodeURIComponent(data[i])+'&'
            }
            return ret;
        }],
        header:{
            'Content-type':'application/x-www-form-urlencoded'
        }
    })
}