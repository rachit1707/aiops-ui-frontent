
import React, { Component, useMemo } from 'react'


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

  return (
    <CSVReader
      onUploadAccepted={(results) => {
    
        console.log('---------------------------');
        console.log(results);
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
            <table><tr>getRootProps</tr></table>
          </div>
          <ProgressBar style={styles.progressBarBackgroundColor} />
        </>
      )}
    </CSVReader>
    
  );
}