<template>
    我发布的岗位
    <div v-for="(item,index) in Jobs" :key="item.Id">
        序列号:{{ index }}
        <br>
        岗位ID:{{ item.Id }}
        <br>
        岗位名称:{{ item.Title }}
        <br>
        岗位描述:{{ item.Description }}
        <br>
        岗位提交者工号:{{ item.PostedBy }}
        <br>
        岗位状态:{{ item.Status }}
        <br>
        <button @click="FindApplyerDetail(item.PostedBy,item.Id)">查看岗位申请者</button>
        <br>
        <button @click="DeleteJob(item.Id,index)">删除岗位</button>
    </div>
    <br>
    <button @click="AddJobs">发布岗位</button>
    
</template>


<script>
import axios from 'axios';
export default{
    data(){
        return{
            id:'',
            Jobs:[],
            nextRoute:'/JobEditor'
        }
    },
    mounted(){
        this.id=this.$route.query.data
        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('jwtToken');
        this.id=this.$route.query.data
        axios.post("http://localhost:8080/HRService/GetPostedJobs",{"hid":parseInt(this.id,10)}).then((Response=>{
            this.Jobs=Response.data.data
        }))
    },
    methods:{
        AddJobs(){
            this.$router.push({
                    path: this.nextRoute,
                    query: {
                    data:this.id
                }
            });
        },
        FindApplyerDetail(postedby,JobId){
            this.$router.push({
                    path:'/ApplyerList',
                    query: {
                    data:JobId,
                    posted_by:postedby
                }
            });
        },
        DeleteJob(JobId,index){
            axios.post("http://localhost:8080/HRService/DeleteJob",{"id":JobId}).then((Response=>{
                if(Response.data.data[0]==="UnAuthorization"){
                    alert("No token")
                }
                sessionStorage.setItem('jwtToken',Response.data.data[0]);
                axios.defaults.headers.common['Authorization'] = Response.data.data[0];
                if(Response.data.data[1]==="DeleteJob Success"){
                    this.Jobs.splice(index,1);
                }
            }))
        }
    }
}
</script>