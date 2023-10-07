import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon/>,
        link: "/home"
    },
    {
        title: "Incident's List",
        icon: <SpaceDashboardIcon/>,
        link: "/incidents"
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
    }
]