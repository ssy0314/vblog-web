<template>
    <div>
                <el-input class="input" placeholder="请输入栏目名称" v-model="addCol.colname"></el-input>
                <el-button type="primary" @click="addColumn">新增栏目</el-button>
        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                v-loading="loading"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                   >
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="编号"
                   >
                <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column
                    prop="colname"
                    label="栏目名称"
                    >
            </el-table-column>
            <el-table-column
                    prop="enabletime"
                    label="启用时间"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
            <el-button @click="toggleSelection()" type="danger" :disabled="disabled">批量删除</el-button>
        </div>
        <div>
            <el-dialog
                    title="系统提示"
                    :visible.sync="dialogVisible"
                    width="30%">
                <el-tag type="info">更改后栏目名称</el-tag>
                <el-input size="small" style="padding-left: 10px;width: 65%" v-model="addCol.colname"></el-input>
                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="small">取 消</el-button>
    <el-button type="primary" size="small" @click="updateBtn">确 定</el-button>
  </span>
            </el-dialog>
        </div>
    </div>

</template>

<script>

    export default {
        name: "ColnameManages",
        data() {
            return {
                loading:true,
                ids:[],
                disabled:true,
                tableData: [],
                multipleSelection:[],
                addCol:{
                    id: '',
                    colname:''
                },
                dialogVisible:false

            }
        },

        methods: {
            addColumn(){
                this.postRequest('/column/addColumn',this.addCol).then(resp =>{
                    if(resp){
                        this.infoColumn();
                    }
                })

            },
            infoColumn(){
              this.getRequest('/system/getColumn/').then(resp =>{

                  this.tableData=resp;
                  this.loading=false;
              })
            },
            toggleSelection() {
                this.ids=[]
                for(let i in this.multipleSelection){
                    this.ids.push(this.multipleSelection[i].id)
                }
                this.$confirm('此操作将永久删除该栏目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delManyRequest('/column/delManyColumn',this.ids).then(resp =>{
                        if(resp){
                            this.infoColumn();
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            handleSelectionChange(val) {
                if(val.length>0){this.disabled=false}
                else{this.disabled=true}
                this.multipleSelection = val;
            },
            updateBtn(){
                if(this.addCol.colname=='' || this.addCol.colname.trim()==''){
                    this.$message.warning("请正确填写修改后栏目名称");
                    return;
                }else{
                    this.$confirm('此操作将永久修改该栏目名为【'+this.addCol.colname+'】, 是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                this.putRequest('/column/putColumn',this.addCol).then(resp =>{
                                    if(resp){
                                        this.infoColumn();
                                        this.dialogVisible = false
                                    }

                                })
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消删除'
                                });
                            });

                }

            },
            handleEdit(row) {
                this.dialogVisible=true;
                this.addCol.colname=row.colname;
                this.addCol.id=row.id;
                // this.$prompt("修改后栏目名称", '系统提示', {
                //     confirmButtonText: '更新',
                //     cancelButtonText: '取消',
                //     inputValue:row.colname
                // }).then(({ value }) => {
                //     let column = {
                //         id:row.id,
                //         colname:value
                //     }
                //     if(value=='' || value.trim()==''){
                //         this.$message.warning("请正确填写修改后栏目名称")
                //         return;
                //     }else{
                //     this.$confirm('此操作将永久修改该栏目名为【'+value+'】, 是否继续?', '提示', {
                //         confirmButtonText: '确定',
                //         cancelButtonText: '取消',
                //         type: 'warning'
                //     }).then(() => {
                //         this.putRequest('/column/putColumn',column).then(resp =>{
                //             if(resp){
                //                 this.infoColumn();
                //             }
                //         })
                //     }).catch(() => {
                //         this.$message({
                //             type: 'info',
                //             message: '已取消删除'
                //         });
                //     });
                //
                //     }
                // }).catch(() => {
                //     this.$message({
                //         type: 'info',
                //         message: '取消输入'
                //     });
                // });
                // console.log(index, row.colname);
            },
            handleDelete(row) {
                this.$confirm('此操作将永久删除['+row.colname+']栏目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.addCol.id=row.id;
                    this.delRequest('/column/delColumn',this.addCol).then(resp =>{
                        if(resp){
                            this.infoColumn();
                        }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            }

        },
        mounted() {
            this.infoColumn();
        }
    }
</script>

<style scoped>
    .header{
        font-size: 14px;
    }
    .header .first{
        font-size: 14px;
    }
    .input{
        display: inline-block;
        width: 200px;
        padding-right:15px ;
        padding-top: 10px;
    }
</style>