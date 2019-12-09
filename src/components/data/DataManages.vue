<template>
    <div>
        <div id="main" style="width: 600px;height:400px;margin: 50px auto;"></div>
    </div>
</template>

<script>


    export default {
        name: "DataManages",
        data(){
            return{
                colname:[],
                counts:[]
            }
        },
        methods:{
            initDate(){
                this.getRequest('/column/getColumnDate').then(resp =>{
                    if(resp){
                        let colname = [];
                        let counts =[];
                        for (let i in resp) {
                            colname.push(resp[i].colname);
                            counts.push(resp[i].counts)
                        }
                        var myChart = this.$echarts.init(document.getElementById('main'));
                        myChart.setOption({
                            title: {
                                text: '文章分类统计表'
                            },
                            tooltip: {},
                            xAxis: {
                                data:colname
                            },
                            yAxis: {},
                            series: [{
                                name: '数量',
                                type: 'bar',
                                data:counts
                            }]
                        });
                    }
                })


            },

        },
        mounted() {
            this.initDate();

        },



    }
</script>

<style scoped>

</style>