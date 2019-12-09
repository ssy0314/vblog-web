<template>
    <div>
        <el-switch v-model="a" @change="change1(this.$event,1)"></el-switch>
        <el-switch v-model="b" @change="change1(this.$event,2)"></el-switch>
        <el-switch v-model="c" @change="change1(this.$event,3)"></el-switch>
    </div>
</template>

<script>
    export default {
        name: "DataManages",
        data(){
            return{
            a:true,
            b:true,
            c:true,

            }
        },
        methods:{
            change1($event,num){
                console.log($event)
                console.log(num)
            },

        }
    }
</script>

<style scoped>

</style>