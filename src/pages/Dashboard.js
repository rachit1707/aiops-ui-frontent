import React, { Component } from 'react'
import PredictionService from '../service/PredictionService'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

export class Dashboard extends Component {

  constructor(props){
    super(props)
    this.state = {
      openIncidents: []
    }
  }

  componentDidMount(){
    PredictionService.completedIncidents()
        .then((res)=>{
            this.setState({openIncidents : res.data})
            console.log(this.state.openIncidents)
    })
}

  render() {
    return (
      <div className='mainPannel' > 
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
              {this.state.openIncidents.map((row) =>(
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

export default Dashboard