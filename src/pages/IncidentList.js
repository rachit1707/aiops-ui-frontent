import React, { Component } from 'react'
import PredictionService from '../service/PredictionService'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

export class Prediction extends Component {
    constructor(props){
        super(props)
        this.state = {
            predictions: [],
            recoveryActions: [],
            age: ""
        }
    }


    componentDidMount(){
        PredictionService.fetchPredictionData()
            .then((res)=>{
                this.setState({predictions : res.data})
                console.log(this.state.predictions)
            })
    }
    render() {
        return (
          <div className="mainPannel">
            <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="center"><b>Incident</b></TableCell>
              <TableCell align="center"><b>Ban</b></TableCell>
               
                <TableCell align="center"><b>Description</b></TableCell>
                <TableCell align="center"><b>Source System</b></TableCell>
                {/* <TableCell align="center">Error Code</TableCell> */}
                <TableCell align="center"><b>Status</b></TableCell>
                {/* <TableCell align="center">Problem Area/Workgroup</TableCell> */}
                <TableCell align="center"><b>Created At</b></TableCell>
                {/* <TableCell align="center">Recovery Actions</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.predictions.map((row) =>(
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.ban}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  {/* <TableCell align="center">{row.errorCode}</TableCell> */}
                  <TableCell align="center">{row.status}</TableCell>
                  {/* <TableCell align="center">
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
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>
                  </TableCell> */}
                  <TableCell align="center">{row.createdAt}</TableCell>
                  {/* <TableCell align="center">{row.recoveryActions}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>      
          </div>
        )
      }
}

export default Prediction