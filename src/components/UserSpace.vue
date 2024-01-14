<template>
    UserID:{{ this.id }}
    <br>
    <button @click="SearchJobs">检索岗位</button>
    <br>
    <br>
    <button @click="openFilePicker">打开文件选择器</button>
    <input type="file" ref="fileInput" style="display: none" @change="handleFileChange" />
    <br>
    <br>
    <div v-if="selectedFile">
      <p>已选择文件: {{ selectedFile.name }}</p>
    </div>
    <br>
    <div v-if="job[0]!== null ">
    我申请的岗位:{{ job[2] }}
    <br>
    岗位描述:{{ job[3] }}
    </div>
    <br>
    <button @click="uploadFile">提交/更新简历</button>

</template>

<script>
import axios from 'axios';
export default{
    data(){
        return{
            id:'',
            selectedFile: null,
            job:[]
        }
    },
    mounted(){
        this.id=this.$route.query.data
        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('jwtToken');
        axios.post('http://localhost:8080/UserService/SearchApplyedJob',{"uid":parseInt(this.id)}).then((Response=>{
            if(Response.data.data==="UnAuthorization"){
                    alert("No Token")
                    return
            }
            sessionStorage.setItem('jwtToken',Response.data.data[0]);
            axios.defaults.headers.common['Authorization'] = Response.data.data[0];
            this.job=Response.data.data[1]
        }))
    },
    methods:{
        SearchJobs(){
            this.$router.push({
            path:'/SearchJobs',
            query: {
                data: this.id
                }
            });
        },
        openFilePicker() {
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            this.selectedFile = event.target.files[0];
        },
        uploadFile() {
            if (!this.selectedFile) {
                alert('请先选择文件');
                return;
            }

            const formData = new FormData();
            formData.append('file', this.selectedFile);
            formData.append('uid',this.id)


            // Replace the URL with your backend API endpoint
            axios.post('http://localhost:8080/UserService/AddResume', formData)
            .then(response => {
                if(response.data.data==="UnAuthorization"){
                    alert("No Token")
                }

                if(response.data.data[1]==="AddResumeSuccess"){
                    sessionStorage.setItem('jwtToken',response.data.data[0]);
                    axios.defaults.headers.common['Authorization'] = response.data.data[0];
                    alert("简历提交成功")
                }else if(response.data.data[1]==="AddResumeFailed"){
                    sessionStorage.setItem('jwtToken',response.data.data[0]);
                    axios.defaults.headers.common['Authorization'] = response.data.data[0];
                    alert("未能提交成功，请重试")
                }
            })
        }
    }
}
</script>