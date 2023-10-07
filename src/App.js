import React from "react";
import Sidebar from "./components/Sidebar";
import "./App.css"
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import HomePage from "./pages/HomePage";
import Agent from "./pages/Agent";
import CSVReader1 from "./pages/UploadIncidents";


const App = () =>{
  
  return (
      <div className="App">
          <Sidebar/>
          <Routes>
            <Route path="/" exact element={<HomePage/>}/>
            <Route path="/home" exact element={<HomePage/>}/>
            <Route path="/incidents" exact element={<Dashboard/>}/>
            <Route path="/prediction" exact element={<Prediction/>}/>
            <Route path="/agent" exact element={<Agent/>}/>
            <Route path="/uploadIncidents" exact element={<CSVReader1/>}/>
          </Routes>
      </div>
  )
}

export default App;
