<template>
岗位发布者ID{{ posted_by }}
<br>
岗位ID{{ id }}
<br>
<div v-for="item in Jobs" :key="item.Id">
    <p v-if="item.Id==this.id">岗位描述：{{ item.Description}}</p>
</div>
<div v-for="item in users" :key="item.Id">
    <br>
    用户ID:{{ item.Id }}
    <br>
    用户邮箱:{{ item.Email }}
    <br>
    <button @click="CheckResume(item.Id)">查看候选人简历</button>
    <button @click="EmployeeApplyer(item.Id)">录取候选人</button>
    <button @click="DeleteApplyer(item.Id)">淘汰候选人</button>
</div>
<div v-if="pdfData">
      <embed :src="pdfData" type="application/pdf" width="100%" height="600px" />
</div>
</template>

<script>
import axios from 'axios'

export default{
    data(){
        return{
            id:'',
            posted_by:'',
            users:[],
            Jobs:[],
            pdfData:null
        }
    },
    mounted(){
        this.id=this.$route.query.data
        this.posted_by=this.$route.query.posted_by
        axios.post("http://localhost:8080/HRService/GetPostedJobs",{"id":parseInt(this.posted_by,10)}).then((Response=>{
            this.Jobs=Response.data.data
        }))
        axios.post("http://localhost:8080/HRService/GetUsersById",{"id":parseInt(this.id,10)}).then((Response=>{
            this.users=Response.data.data
        }))
    },
    methods:{
        CheckResume(UserId){
            axios.post("http://localhost:8080/HRService/GetResumeById",{"id":parseInt(UserId,10)},{ responseType: 'blob'}).then((Response=>{
                const blob = new Blob([Response.data], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                this.pdfData = url;
            }))
        },
        EmployeeApplyer(UserId){
            axios.post("http://localhost:8080/HRService/SelectUser",{"id":parseInt(UserId,10)}).then((Response=>{
                alert(Response.data.data)
            }))
        },
        DeleteApplyer(UserId){
            axios.post("http://localhost:8080/HRService/DeleteUser",{"id":parseInt(UserId,10)}).then((Response=>{
                alert(Response.data.data)
            }))
        }
    }
}
</script>