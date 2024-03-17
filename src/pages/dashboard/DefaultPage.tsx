import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridCellParams, GridColDef, GridRowId, GridRowSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
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
export default function DataGridDemo() {
 const userId =  localStorage.getItem("userId");
 var [rows, setRows] = useState([]);

 var [dataDBSpace, setDataDBSpace] = useState([] as any);
 var [dataLiveStatus, setDataLiveStatus] = useState([] as any);
 var [dataDiscSpace, setDataDiscSpace] = useState([] as any);
  useEffect(() => {
    const getServerDetails = async () => {
    var userId = localStorage.getItem("userId");
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
      toast.error("Server Error", {
        position: "top-center"
      });
    }
  }

var dataDBSpace = [{ value: 10 ,label: 'Normal'}, { value: 5 ,label: 'Critical'},{ value: 3 ,label: 'Danger'}];
var dataLiveStatus = [{ value: 3 ,label: 'Live Server'}, { value: 5 ,label: 'Down Server', color:"red"}];
var dataDiscSpace = [  { value: 10, label: "Normal" },  { value: 15 , label: "Critical"},  { value: 20 , label: "Danger" }];

//
const getDataDBSpace = async () => {
  if (userId) {
  var response = await serverActions.getDataDBSpaceChart(userId);
  if(response.statusCode == 200){
    setDataDBSpace(dataDBSpace);
  }
  else{  
    toast.error("Server Error", {
      position: "top-center"
    });
  }
  } else {
  toast.error("Server Error", {
    position: "top-center"
  });
  }
  }

  const getDataLiveStatus = async () => {
    if (userId) {
    var response = await serverActions.getDataLiveStatusChart(userId);
    if(response.statusCode == 200){
      setDataLiveStatus(dataLiveStatus);
    }
    else{  
      toast.error("Server Error", {
        position: "top-center"
      });
    }
    } else {
    toast.error("Server Error", {
      position: "top-center"
    });
    }
    }

    const getDataDiscSpace = async () => {
      if (userId) {
      var response = await serverActions.getDataDiscSpaceChart(userId);
      if(response.statusCode == 200){
        setDataDiscSpace(dataDiscSpace);
      }
      else{  
        toast.error("Server Error", {
          position: "top-center"
        });
      }
      } else {
      toast.error("Server Error", {
        position: "top-center"
      });
      }
      }
getDataDiscSpace();
getDataLiveStatus();
getDataDBSpace();
getServerDetails();
},[]);  
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 40 },
  { field: 'serverIp', headerName: 'Server IP', width: 160, editable: false },
  { field: 'ServerStatus', headerName: 'Server Status', width: 150, editable: false },
  {
    field: 'dbTableSpaceOccupyPerc',
    headerName: 'DB Table Space Occupy(%)',
    type: 'number',
    width: 200,
    renderCell: (params) => {
      const value = params.value as number;
      let backgroundColor = '';
      if (value < 50) {
        backgroundColor = '#81C784';
      } else if (value < 80) {
        backgroundColor = '#FFF59D';
      } else {
        backgroundColor = '#EF9A9A';
      }
      return (
        <div style={{ backgroundColor, fontSize: '25px', fontWeight: 'bold' }}>
          {params.value}
        </div>
      );
    },
  },
  {
    field: 'appSpaceUsedPerc',
    headerName: 'Disc Space Occupy(%)',
    type: 'number',
    width: 200,
    editable: false,
    renderCell: (params) => {
      const value = params.value as number;
      let backgroundColor = '';
      if (value < 50) {
        backgroundColor = '#81C784';
      } else if (value < 80) {
        backgroundColor = '#FFF59D';
      } else {
        backgroundColor = '#EF9A9A';
      }
      return (
        <div  style={{ backgroundColor, fontSize: '25px', fontWeight: 'bold' }}>
          {params.value}
        </div>
      );
    },
      },
  {
    field: 'serverCacheStatus',
    headerName: 'POC-AM Cache Status',
    type: 'number',
    width: 200,
    editable: false,
    renderCell: (params) => {
      const value = params.value as string; // Assuming the value is a string
      let backgroundColor = '';
      let displayValue = '';
      switch (value) {
        case 'Live':
          backgroundColor = '#81C784';
          displayValue = value;
          break;
        case 'Superseded':
          backgroundColor = '#808080';
          displayValue = value;
          break;
        case 'Error':
          backgroundColor = '#EF9A9A';
          displayValue = value;
          break;
              }
      return (
        <div style={{ backgroundColor, fontSize: '25px', fontWeight: 'bold' }}>
          {displayValue}
        </div>
      );
    },

  },
  {
    field: 'liveBillingCatalog',
    headerName: 'Live Billing Catalog',
    type: 'number',
    width: 200,
    editable: false,
    renderCell: (params) => {
      return (
        <div style={{ fontSize: '20px', fontWeight: 'normal' }}>
          {params.value}
        </div>
      );
    },
  },
  {
    field: 'team',
    headerName: 'Notification Team',
    type: 'number',
    width: 200,
    editable: false,
  },
  {
    field: 'dateTime',
    headerName: 'Last Updated',
    type: 'dateTime',
    width: 200,
    editable: false,
  }
];
const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);

const Referesh = async () => {    
  if (userId) {     
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



return (

    <>
     <Stack direction="row" width="100%" textAlign="center" spacing={2}>
      <Box flexGrow={1}>
        <Typography variant="h2">DB Space</Typography>
        <PieChart
          //colors={palette}
          series={[{ data: dataDBSpace,
          highlightScope: { faded: 'global', highlighted: 'item' } ,
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },}]}
          {...pieParams}
        />
      </Box>
      <Box flexGrow={1}>
        <Typography variant="h2">Live Status</Typography>
        <PieChart
          //colors={palette}
          series={[{ data: dataLiveStatus,
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
              data: dataDiscSpace,
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

    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        } }
        rowSelectionModel={rowSelectionModel}
        disableRowSelectionOnClick />
    </Box>
    <ToastContainer/></>
  );
}
