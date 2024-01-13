<template>
    <div v-for="item in Jobs" :key="item.Id">
        岗位ID:{{ item.Id }}
        <br>
        岗位名称:{{ item.Title }}
        <br>
        岗位描述:{{ item.Description }}
        <br>
        岗位状态:{{ item.Status }}
        <br>
        <button @click="ApplyJob(item.Id)">申请该岗位</button>
    </div>
    <br>
    <button @click="BackToUser">返回用户界面</button>
</template>


<script>
import axios from 'axios';

export default{
    data(){
        return{
            id:'',
            Jobs:[]
        }
    },
    mounted(){
        this.id=this.$route.query.data
        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('jwtToken');
        axios.post("http://localhost:8080/UserService/FindAllJobs",{"id":parseInt(this.id)}).then((Response=>{
            this.Jobs=Response.data.data[1];
            sessionStorage.setItem('jwtToken',Response.data.data[0]);
        }))
    },
    methods:{
        BackToUser(){
            this.$router.push({
            path:'/UserSpace',
            query: {
                data: this.id
                }
            });
        },
        ApplyJob(JobId){
            axios.post("http://localhost:8080/UserService/ApplyJob",{"id":parseInt(this.id),"jobid":parseInt(JobId)}).then((Response=>{
                if(Response.data.data==="UnAuthorization"){
                    alert("No token")
                }
                if(Response.data.data==="NeedResume"){
                    alert("申请工作前请先提交简历")
                }else if(Response.data.data==="ApplySuccess"){
                    alert("申请成功，期待你的加入")
                }
            }))
        }
    }
}

</script>