import React, { Component } from 'react'
import PredictionService from '../service/PredictionService'
import { Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

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
                <TableCell align="center"><b>Linked Jira</b></TableCell>
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
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">{row.createdAt}</TableCell>
                  <TableCell align="center"><Link rel="noreferrer noopener" 
                    target="_blank" href={"https://gno-poc.atlassian.net/browse/"+row.jiraTicketNumber}
                    display={row.status == "Rejected" ? "block" : "none"} 
                    >
                      {row.jiraTicketNumber}</Link></TableCell>

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