import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowId, GridRowSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { ContentPasteSearchOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { Button } from '@mui/material';
import { serverActions } from '../../actions/ServerActions';

export default function DataGridDemo() {
 const userId =  localStorage.getItem("userId")
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 30 },
  {
    field: 'serverIp',
    headerName: 'Server IP',
    width: 100,
    editable: true,
  },
  {
    field: 'ServerStatus',
    headerName: 'Server Status',
    width: 100,
    editable: true,
  },
  {
    field: 'dbTableSpaceOccupyPerc',
    headerName: 'DB Table Space Occupy(%)',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'appSpaceUsedPerc',
    headerName: 'Disc Space Occupy(%)',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'serverCacheStatus',
    headerName: 'POC-AM Cache Status',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'liveBillingCatalog',
    headerName: 'Live Billing Catalog',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'team',
    headerName: 'Notification Team',
    type: 'number',
    width: 150,
    editable: true,
  }
];
const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', tableSpace: 14 , discSpace: 'Snow', pocAM: 'Jon', liveCatalog: 14 , team:"Jon"},
  { id: 2, lastName: 'Snow', firstName: 'Jon', tableSpace: 14 , discSpace: 'Snow', pocAM: 'Jon', liveCatalog: 14 , team:"Jon"},
  { id: 3, lastName: 'Snow', firstName: 'Jon', tableSpace: 14 , discSpace: 'Snow', pocAM: 'Jon', liveCatalog: 14 , team:"Jon"},
  { id: 4, lastName: 'Snow', firstName: 'Jon', tableSpace: 14 , discSpace: 'Snow', pocAM: 'Jon', liveCatalog: 14 , team:"Jon"},
  { id: 5, lastName: 'Snow', firstName: 'Jon', tableSpace: 14 , discSpace: 'Snow', pocAM: 'Jon', liveCatalog: 14 , team:"Jon"},
  { id: 6, lastName: 'Snow', firstName: 'Jon', tableSpace: 14 , discSpace: 'Snow', pocAM: 'Jon', liveCatalog: 14 , team:"Jon"},
  { id: 7, lastName: 'Snow', firstName: 'Jon', tableSpace: 14 , discSpace: 'Snow', pocAM: 'Jon', liveCatalog: 14 , team:"Jon"},
  { id: 8, lastName: 'Snow', firstName: 'Jon', tableSpace: 14 , discSpace: 'Snow', pocAM: 'Jon', liveCatalog: 14 , team:"Jon"},
];
console.log(rowSelectionModel);

const Referesh = async () => {
    
  if (userId) {
    //this.setState({ submitted: true });           
    var response = await serverActions.getServers(userId);
    if(response.statusCode == 200){
      alert('Servers Uploaded successfully');
    }
    else{
      alert('Server Error');
    }
  } else {
    alert('Please upload the file');
  }

};


  return (

    <>
    <Button sx={{ marginLeft: "auto" }}
                style={{ height: "fit-content" }}
                color="primary"
                variant="contained"
                onClick={Referesh}
              >
                Refresh  
              </Button> &nbsp;&nbsp;&nbsp;

              <Button sx={{ marginLeft: "auto" }}
                style={{ height: "fit-content" }}
                color="primary"
                variant="contained"
                onClick={Referesh}
              >
                Notify
              </Button>

    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        /* onRowSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          var selectedRows = rows.filter((row: { id: GridRowId; }) =>
            selectedIDs.has(row.id),
          );
       
       
        setRowSelectionModel(selectedRows);
        }} */
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        } }
        rowSelectionModel={rowSelectionModel}
        disableRowSelectionOnClick />
    </Box></>
  );
}
