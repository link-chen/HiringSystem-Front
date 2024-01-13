<template>
    <div>
      岗位名称：<input type="text" v-model="Title">
      <br>
      岗位描述：<textarea v-model="Description"></textarea>
      <br>
      <button @click="CommitMessage">提交岗位信息</button>
      <br>
      <button @click="BackToHRSpace">返回工作界面</button>
    </div>
  </template>
  
<script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        Title: '',
        Description: '',
        HRId: ''
      };
    },
    mounted() {
      this.HRId = this.$route.query.data;
    },
    methods: {
      CommitMessage() {
        if (this.Title === '') {
          alert('请添加岗位名称');
          return;
        } else if (this.Description === '') {
          alert('请添加岗位描述信息');
          return;
        }
        axios.post("http://localhost:8080/HRService/AddJob", {
          "title": this.Title,
          "Description": this.Description,
          "postedby": parseInt(this.HRId, 10),
          "status": "on"
        }).then((Response=>{
          if(Response.data.data==="UnAuthorization"){
                    alert("No token")
          }
          alert(Response.data.data)
        }));
      },
      BackToHRSpace() {
        this.$router.push({
          path: '/HRSpace',
          query: {
            data: this.HRId
          }
        });
      }
    }
  };
</script>
  