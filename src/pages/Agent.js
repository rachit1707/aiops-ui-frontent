import { FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { Component } from 'react'
import Button from '@mui/material/Button';
import PredictionService from '../service/PredictionService';
import AiopsService from '../service/AiopsService';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup,NativeSelect, Stack } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DeleteIcon from '@mui/icons-material/Delete';

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

    handleAccept = (data) => {
      console.log("Handle Accept "+JSON.stringify(data))
      this.setState(
        {taskData:{"op":"update","key":"taskFlowId",value:true,"workflowSteps":"","isWorkflowRequired":false}}, ()=>{
          PredictionService.updateTask(this.state.taskData,data.taskFlowId)
          console.log("Task Data Accept:"+JSON.stringify(this.state.taskData))
        }
      )
    }

    handleReject = (data)=>{
      console.log("Handle Reject "+JSON.stringify(data))
      console.log(this.state.workflowSteps)
      console.log(this.state.isWorkFlowRequired)
      this.setState(
        {taskData:{"op":"update","key":"taskFlowId","value":"false",
        "workflowSteps":this.state.workflowSteps,"isWorkflowRequired":this.state.isWorkFlowRequired}},()=>{
          PredictionService.updateTask(this.state.taskData,data.taskFlowId)
          console.log("Task Data Rejected:"+this.state.taskData)
        })
    }
    handleOpen = (row)=>{
      console.log("Handle Open")
      this.setState({open : true})
      this.setState({currentSelectedModal:row})
    }
    handleClose = ()=>{
      this.setState({open : false})
    }
    handleWorkflowSteps = (event) => {
      this.setState({workflowSteps:event.target.value})
    }
    handleIsWorkflowRequired = (event)=>{
      this.setState({isWorkFlowRequired:event.target.value})
    }
    runBulkProcess = (event)=>{
      event.preventDefault()
      AiopsService.runBulkProcess()
    }
    clearDB = (event)=>{
      event.preventDefault()
      AiopsService.clearDB().then((res)=>{
        console.log(res)
      })
    }

    componentDidMount(){
        PredictionService.fetchPredictedDataForAgent()
            .then((res)=>{
                console.log("RES :"+ JSON.stringify(res))
                this.setState({openTask : res.data})
                console.log(this.state.openTask)
            })
    }

     componentDidUpdate(){
       PredictionService.fetchPredictedDataForAgent()
          .then((res)=>{
            this.setState({openTask : res.data})
          })
    }
  
  render() {
    return (
      <div className='mainPannel'>
        <Stack spacing={2} sx={{marginTop:'20px'}}>
          <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap" justifyContent="center">
            <Button variant="contained" onClick={this.runBulkProcess}><ScheduleIcon/>&nbsp;&nbsp; Run Scheduler</Button>
            <Button variant="contained" onClick={this.clearDB}><DeleteIcon/>&nbsp;&nbsp; Clear Database</Button>
          </Stack>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{backgroundColor:'#FAF0E6'}}>
              <TableRow>
                <TableCell padding="checkbox"><Checkbox color="primary"/></TableCell>
                <TableCell align="center"><b>Incident Id</b></TableCell>
                <TableCell align="center"><b>BAN</b></TableCell>
                <TableCell align="center"><b>Description</b></TableCell>
                <TableCell align="center"><b>Status</b></TableCell>
                <TableCell align="center"><b>Source System</b></TableCell>
                <TableCell align="center"><b>RCA</b></TableCell>
                <TableCell align="center" style={{width:'100px'}}><b>Problem Area/Workgroup</b></TableCell>
                <TableCell align="center"><b>Soultion</b></TableCell>
                <TableCell align="center"><b>Created At</b></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {this.state.openTask.map((row) =>(
                <TableRow key={row.id}>
                  <TableCell padding="checkbox"><Checkbox color="primary"/></TableCell>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.ban}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">{row.rca}</TableCell>

                  <TableCell align="center">
                  <FormControl fullWidth>
                    <NativeSelect
                      defaultValue={row.workgroup}
                      inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                      }} style={{width:'150px'}}
                    >
                      <option value={"orderWorkgroup"}>orderWorkgroup</option>
                      <option value={"networkWorkgroup"}>networkWorkgroup</option>
                      <option value={"productWorkgroup"}>productWorkgroup</option>
                      <option value={"orderCancelWorkgroup"}>orderCancelWorkgroup</option>
                      <option value={"FinX-L1-OPS-ACC"}>FinX-L1-OPS-ACC</option>
                      <option value={"FinX-L1-OPS-DEP"}>FinX-L1-OPS-DEP</option>
                      <option value={"FIN-X-Performance"}>FIN-X-Performance</option>
                    </NativeSelect>
                  </FormControl>
                  </TableCell>
                  <TableCell align="center">{row.recoveryActions  }</TableCell>
                  <TableCell align="center">{row.createdAt }</TableCell>
                  <TableCell align="center">
                  <Button variant="contained" color="success" onClick={()=>this.handleAccept(row)}>
                    Accept
                  </Button>
                  <hr/>
                  <Button variant="outlined" color="error" onClick={()=>this.handleOpen(row)}>
                    Reject
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>  
            </Table>
          </TableContainer>
        </Stack>
         
              <Modal
                open={this.state.open}
                onClose={()=>this.handleClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <form autoComplete='off' onSubmit={()=>{this.handleReject(this.state.currentSelectedModal)}}>
                      <TextField
                        id="outlined-multiline-static"
                        label="Workflow Steps"
                        multiline
                        fullWidth
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
                        <FormControlLabel value="true" control={<Radio />} label="Do you want to create automated workflow with predefined steps?" />
                        <FormControlLabel value="false" control={<Radio />} label="Do you want to create automated workflow without predefined steps?"/>
                      </RadioGroup>
                    <Button type='submit' variant="contained">Submit</Button>
                  </form>
                </Box>
              </Modal>
      </div>
    )
  }
}

export default Agent