import React, { Component, useMemo } from 'react'

import Table from '@mui/material/Table';

import TableBody from '@mui/material/TableBody';

import TableCell from '@mui/material/TableCell';

import TableContainer from '@mui/material/TableContainer';

import TableHead from '@mui/material/TableHead';

import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';





import { useCSVReader } from 'react-papaparse';



const styles = {

  csvReader: {

    display: 'block',

    flexDirection: 'row',

    marginBottom: 2,

  },

  browseFile: {

    width: '250px',

    height: 30

  },

  acceptedFile: {

    border: '1px solid #ccc',

    height: 30,

    lineHeight: 1.5,

    paddingLeft: 30,

    width: '80%',

  },

  remove: {

    borderRadius: 0,

    height: 30,

    padding: '0 50px',

  },

  progressBarBackgroundColor: {

    backgroundColor: 'red',

  },

};



export default function CSVReader1() {

  const { CSVReader } = useCSVReader();



  let data = [];



  return (

    <CSVReader

      onUploadAccepted={(results) => {



        console.log('---------------------------');

        console.log(results.data);

        data = results.data

        console.log('---------------------------');



      }}

    >

      {({

        getRootProps,

        acceptedFile,

        ProgressBar,

        getRemoveFileProps,

      }) => (

        <>

          <div>



            <div>



              <div style={{

                display: 'flex',

                flexDirection: 'row',

                marginBottom: 10,

              }}>

                <button type='button' {...getRootProps()} style={styles.browseFile}>

                  Browse file

                </button>

                <div style={styles.acceptedFile}>

                  {acceptedFile && acceptedFile.name}

                </div>

                <button {...getRemoveFileProps()} style={styles.remove}>

                  Remove

                </button>

              </div>

              <div>

              </div><br />

              <ProgressBar style={styles.progressBarBackgroundColor} />

            </div>





            <div>

              <div >

                <TableContainer component={Paper}>

                  <Table sx={{ minWidth: 650 }} aria-label="simple table">

                    <TableHead>

                      <TableRow>

                        <TableCell align="center">Incident</TableCell>

                        <TableCell align="center">Ban</TableCell>

                        <TableCell align="center">Description</TableCell>

                        <TableCell align="center">Source System</TableCell>

                        <TableCell align="center">Status</TableCell>

                        <TableCell align="center">Created At</TableCell>

                      </TableRow>

                    </TableHead>

                    <TableBody>

                      {data.slice(1).map((item, index) => (

                        <TableRow>

                          <TableCell align="center" key={index} >{item[0]}</TableCell>

                          <TableCell align="center" key={index} >{item[1]}</TableCell>

                          <TableCell align="center" key={index} >{item[2]}</TableCell>

                          <TableCell align="center" key={index} >{item[3]}</TableCell>

                          <TableCell align="center" key={index} >{item[5]}</TableCell>

                          <TableCell align="center" key={index} >{item[7]}</TableCell>



                        </TableRow>



                      ))}

                    </TableBody>

                  </Table>

                </TableContainer>

              </div>



            </div>

          </div>



        </>

      )}

    </CSVReader>



  );

}