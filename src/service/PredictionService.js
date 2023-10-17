import axios from "axios";

const PredictionService = {

    fetchPredictionData:function(){
        return axios.get("http://localhost:8081/prediction/getLatestOpenIncidents")
    },

    fetchPredictedDataForAgent:function(){
        return axios.get("http://localhost:8081/prediction/getLatestOpenIncidents")
    },

    updateTask:function(patchData,id){
        return axios.patch("http://localhost:8081/prediction/updatePrediction/"+id,patchData)
    },

    completedIncidents:function(){
        return axios.get("http://localhost:8081/prediction/getCompletedIncidents")
    }

}

export default PredictionService