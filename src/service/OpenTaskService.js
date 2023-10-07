import axios from "axios"

const OpenTaskService = {

    fetchOpenTasks:function(){
        return axios.get("http://localhost:8081/task/getOpenTask")
    },
    acceptTask:function(patchData,id){
        return axios.patch("http://localhost:8081/task/"+id,patchData)
    }

}

export default OpenTaskService