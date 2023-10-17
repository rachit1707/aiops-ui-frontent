import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
// import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ViewListIcon from '@mui/icons-material/ViewList';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const SidebarData = [
    {
        title: "Upload CSV",
        icon: <UploadFileIcon/>,
        link: "/upload"
    },
    // {
    //     title: "Prediction",
    //     icon: <BatchPredictionIcon/>,
    //     link: "/prediction"
    // },
    {
        title: "Agent Pannel",
        icon: <SupportAgentIcon/>,
        link: "/agent"
    },
    {
        title: "Reporting Dashboard",
        icon: <DashboardIcon/>,
        link: "/dashboard"
    }
]