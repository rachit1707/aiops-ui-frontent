import { FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { Component } from 'react'
import Button from '@mui/material/Button';
import PredictionService from '../service/PredictionService';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

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
            currentSelectedModal:{}
        }
    }

    handleAccept(data){
      console.log("Handle Accept "+JSON.stringify(data))
      this.setState({taskData:{"op":"update","key":"taskFlowId",value:true}})
      PredictionService.updateTask(this.state.taskData,data.taskFlowId)
      console.log("Task Data Accept:"+this.state.taskData)
    }
    handleReject(data){
      console.log("Handle Reject "+JSON.stringify(data))
      this.setState({taskData:{"op":"update","key":"taskFlowId",value:false}})
      PredictionService.updateTask(this.state.taskData,data.taskFlowId)
      console.log("Task Data Accept:"+this.state.taskData)
    }
    handleOpen(row){
      console.log("Handle Open")
      this.setState({open : true})
      this.setState({currentSelectedModal:row})
    }
    handleClose(){
      this.setState({open : false})
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
                  <TableCell align="center"><Button onClick={()=>this.handleOpen(row)}>{row.id}</Button></TableCell>
                  <TableCell align="center">{row.ban}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
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
                  <Button variant="contained" color="error" onClick={()=>this.handleReject(row)}>
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
                    <div>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Incident Id"
                  sx={{ m: 0.5, width: '22ch' }} 
                  variant="outlined"
                  value={this.state.currentSelectedModal.id}
                />
                <TextField
                  id="outlined-textarea"
                  label="BAN"
                  sx={{ m: 0.5, width: '22ch' }} 
                  variant="outlined"
                  value={this.state.currentSelectedModal.ban}
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  fullWidth sx={{ m: 0.5 }}
                  value={this.state.currentSelectedModal.description}
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Comments"
                  fullWidth sx={{ m: 0.5 }}
                  multiline
                  rows={4}
                  defaultValue="Default Comment"
                />
                <TextField
                  id="outlined-textarea"
                  label="Solution"
                  fullWidth sx={{m: 1}}
                  variant="outlined"
                  value={this.state.currentSelectedModal.recoveryActions}
                />
                <TextField
                  id="outlined-textarea"
                  label="Status"
                  sx={{ m: 1, width: '22ch' }} 
                  variant="outlined"
                  value={this.state.currentSelectedModal.status}
                />
                <TextField
                  id="standard-select-currency-native"
                  select
                  label={this.state.currentSelectedModal.workgroup}
                  defaultValue="EUR"
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select your workgroup"
                  variant="filled"
                >
                  {/* {currencies.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))} */}
                </TextField>
              </div>
            </Box>
          </Modal>
      </div>
    )
  }
}

export default Agent