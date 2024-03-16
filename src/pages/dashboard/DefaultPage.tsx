import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowId, GridRowSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { ContentPasteSearchOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { serverActions } from '../../actions/ServerActions';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';

const pieParams = { height: 200, margin: { right: 5 } };
const palette = ['green', 'blue', 'red'];


export default function DataGridDemo() {
 const userId =  localStorage.getItem("userId");
 var [rows, setRows] = useState([]);
  useEffect(() => {
    const getServerDetails = async () => {
      var userId = localStorage.getItem("userId");
    console.log(userId);
  if (userId) {
    //this.setState({ submitted: true });           
    var response = await serverActions.getServers(userId);
    if(response.statusCode == 200){
      toast.success("Loaded Server Details", {
        position: "top-center"
      });
      setRows(response.data);
    }
    else{  
      toast.error("Server Error", {
        position: "top-center"
      });
    }
  } else {
    alert('Please upload the file');
  }
}
getServerDetails();
},[]);  
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 40 },
  {
    field: 'serverIp',
    headerName: 'Server IP',
    width: 160,
    editable: true,
  },
  {
    field: 'ServerStatus',
    headerName: 'Server Status',
    width: 150,
    editable: true,
  },
  {
    field: 'dbTableSpaceOccupyPerc',
    headerName: 'DB Table Space Occupy(%)',
    type: 'number',
    width: 200,
    editable: true,
  },
  {
    field: 'appSpaceUsedPerc',
    headerName: 'Disc Space Occupy(%)',
    type: 'number',
    width: 200,
    editable: true,
  },
  {
    field: 'serverCacheStatus',
    headerName: 'POC-AM Cache Status',
    type: 'number',
    width: 200,
    editable: true,
  },
  {
    field: 'liveBillingCatalog',
    headerName: 'Live Billing Catalog',
    type: 'number',
    width: 200,
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

const Referesh = async () => {    
  if (userId) {
    //this.setState({ submitted: true });           
    var response = await serverActions.getServers(userId);
    if(response.statusCode == 200){
      toast.success("Loaded Server Details", {
        position: "top-center"
      });
      setRows(response.data);
    }
    else{  
      toast.error("Server Error", {
        position: "top-center"
      });
    }
  } else {
    alert('Please upload the file');
  }

};

var datadbspace = [{ value: 10 ,label: 'Normal'}, { value: 5 ,label: 'Critical'},{ value: 3 ,label: 'Danger'}];
  return (

    <>
     <Stack direction="row" width="100%" textAlign="center" spacing={2}>
      <Box flexGrow={1}>
        <Typography variant="h2">DB Space</Typography>
        <PieChart
          //colors={palette}
          series={[{ data: datadbspace,
          highlightScope: { faded: 'global', highlighted: 'item' } ,
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },}]}
          {...pieParams}
        />
      </Box>
      <Box flexGrow={1}>
        <Typography variant="h2">Live Status</Typography>
        <PieChart
          //colors={palette}
          series={[{ data: [{ value: 3 ,label: 'Live Count'}, { value: 5 ,label: 'Down Count', color:"red"}],
          highlightScope: { faded: 'global', highlighted: 'item' } ,
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },}]}  
          {...pieParams}
        />
      </Box>
      <Box flexGrow={1}>
        <Typography variant="h2">Disc Space</Typography>
        <PieChart
        //colors={palette}
          series={[
            {
              data: [
                { value: 10, label: "Normal" },
                { value: 15 , label: "Critical"},
                { value: 20 , label: "Danger" },
              ],
              highlightScope: { faded: 'global', highlighted: 'item' } ,
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            },
          ]}
          {...pieParams}
        />
      </Box>
    </Stack>
    <br></br>  <br></br>  <br></br>  <br></br>  <br></br>
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
    </Box>
    <ToastContainer/></>
  );
}
