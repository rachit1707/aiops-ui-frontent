import axios from "axios"

const AiopsService = {
    runBulkProcess: function(){
        return axios.get("http://localhost:8080/aiops/bulkRunProcess")
    }
}

export default AiopsService;