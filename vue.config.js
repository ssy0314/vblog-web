let proxyObj = {}

proxyObj['/']={
    target:'http://localhost:8080/',
    changeOrigin: true
}
module.exports={
    devServer:{
        host:'localhost',
        port:8081,
        proxy:proxyObj
    }
}