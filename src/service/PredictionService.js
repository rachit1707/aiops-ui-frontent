import axios from "axios";

const PredictionService = {

    fetchPredictionData:function(){
        return axios.get("http://localhost:8081/prediction/getLatestOpenIncidents")
    },

    fetchPredictedDataForAgent:function(){
        return axios.get("http://localhost:8081/prediction/getLatestData")
    },

    updateTask:function(patchData,id){
        return axios.patch("http://localhost:8081/prediction/updatePrediction/"+id,patchData)
    }

}

export default PredictionService