import { FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { Component } from 'react'
import Button from '@mui/material/Button';
import PredictionService from '../service/PredictionService';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { FormControlLabel, FormGroup, Radio, RadioGroup } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export class Agent extends Component {
    constructor(props){
        super(props)
        this.state = {
            openTask: [],
            taskData: {},
            age: "",
            open:false,
            currentSelectedModal:{},
            workflowSteps:"",
            isWorkFlowRequired:""
        }
    }

    handleAccept(data){
      console.log("Handle Accept "+JSON.stringify(data))
      this.setState({taskData:{"op":"update","key":"taskFlowId",value:true}})
      PredictionService.updateTask(this.state.taskData,data.taskFlowId)
      console.log("Task Data Accept:"+this.state.taskData)
    }
    handleReject = (data)=>{
      console.log("Handle Reject "+JSON.stringify(data))
      console.log(this.state.workflowSteps)
      console.log(this.state.isWorkFlowRequired)
      this.setState(
        {taskData:{"op":"update","key":"taskFlowId","value":"false",
        "workflowSteps":this.state.workflowSteps,"isWorkflowRequired":this.state.isWorkFlowRequired}})
      PredictionService.updateTask(this.state.taskData,data.taskFlowId)
      console.log("Task Data Rejected:"+this.state.taskData)
    }
    handleOpen(row){
      console.log("Handle Open")
      this.setState({open : true})
      this.setState({currentSelectedModal:row})
    }
    handleClose(){
      this.setState({open : false})
    }
    handleWorkflowSteps(event){
      this.setState({workflowSteps:event.target.value})
    }
    handleIsWorkflowRequired(event){
      this.setState({isWorkFlowRequired:event.target.value})
    }


    componentDidMount(){
        PredictionService.fetchPredictedDataForAgent()
            .then((res)=>{
                this.setState({openTask : res.data})
                console.log(this.state.openTask)
            })
    }

    // componentDidUpdate(){
    //   PredictionService.fetchPredictedDataForAgent()
    //   .then((res)=>{
    //       this.setState({openTask : res.data})
    //       console.log(this.state.openTask)
    //   })
    // }
  
  render() {
    return (
      <div className='mainPannel'>
         <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center"><b>Incident Id</b></TableCell>
                <TableCell align="center"><b>BAN</b></TableCell>
                <TableCell align="center"><b>Description</b></TableCell>
                <TableCell align="center"><b>Status</b></TableCell>
                <TableCell align="center"><b>RCA</b></TableCell>
                <TableCell align="center"><b>Problem Area/Workgroup</b></TableCell>
                <TableCell align="center"><b>Soultion</b></TableCell>
                <TableCell align="center"><b>createdAt</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {this.state.openTask.map((row) =>(
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.ban}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">{row.rca}</TableCell>

                  <TableCell align="center">
                    <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{row.workgroup}</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.age}
                        label="Age"
                        onChange="#"
                        >
                            <MenuItem value={10}>networkWorkgroup</MenuItem>
                            <MenuItem value={20}>productWorkgroup</MenuItem>
                            <MenuItem value={30}>orderCancelWorkgroup</MenuItem>
                            <MenuItem value={20}>FinX-L1-OPS-ACC</MenuItem>
                            <MenuItem value={30}>FinX-L1-OPS-DEP</MenuItem>
                            <MenuItem value={30}>FIN-X-Performance</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>
                  </TableCell>
                  <TableCell align="center">{row.recoveryActions  }</TableCell>
                  <TableCell align="center">{row.createdAt }</TableCell>
                  <TableCell align="center">
                  <Button variant="outlined" color="success" onClick={()=>this.handleAccept(row)}>
                    Accept
                  </Button>
                  <Button variant="contained" color="error" onClick={()=>this.handleOpen(row)}>
                    Reject
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>  
            </Table>
          </TableContainer>
              <Modal
                open={this.state.open}
                onClose={()=>this.handleClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <form autoComplete='off'>
                      <TextField
                        id="outlined-multiline-static"
                        label="Workflow Steps"
                        multiline
                        rows={4}
                        value={this.state.workflowSteps}
                        onChange={this.handleWorkflowSteps.bind(this)}
                      />
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={this.state.isWorkFlowRequired}
                        onChange={this.handleIsWorkflowRequired.bind(this)}
                      >
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                      </RadioGroup>
                    <Button type='button' onClick={()=>{this.handleReject(this.state.currentSelectedModal)}}>Submit</Button>
                  </form>
                </Box>
              </Modal>
      </div>
    )
  }
}

export default Agent