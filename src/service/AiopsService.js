import axios from "axios"

const AiopsService = {
    runBulkProcess: function(){
        return axios.get("http://localhost:8080/aiops/bulkRunProcess")
    },
    clearDB: function(){
        return axios.get("http://localhost:8081/prediction/clearDB")
    }
}

export default AiopsService;