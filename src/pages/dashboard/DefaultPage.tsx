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
       if(response.data){
        var filtered = response.data.filter(function (el: any) {
          return el != null;
        });
        
        console.log(filtered);
       }
        setRows(filtered);
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

/* var dataDBSpace = [{ value: 10 ,label: 'Normal'}, { value: 5 ,label: 'Critical'},{ value: 3 ,label: 'Danger'}];
var dataLiveStatus = [{ value: 3 ,label: 'Live Server'}, { value: 5 ,label: 'Down Server', color:"red"}];
var dataDiscSpace = [  { value: 10, label: "Normal" },  { value: 15 , label: "Critical"},  { value: 20 , label: "Danger" }];
 */
//
const getDataDBSpace = async () => {
  if (userId) {
  var response = await serverActions.getDataDBSpaceChart(userId);
  if(response.status == 200){
    for (let [key, value] of Object.entries(response.data)) {
      console.log(key + ": " + value); // Output: name: John, age: 30, city: New York
      dataDBSpace.push({"value":value,label:key});
      }
      setDataDBSpace([]);
      console.log(dataDBSpace);
      console.log("**************")
      console.log(dataDBSpace);
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
    if(response.status == 200){
      for (let [key, value] of Object.entries(response.data)) {
        console.log(key + ": " + value); // Output: name: John, age: 30, city: New York
        dataLiveStatus.push({"value":value,label:key});
        }
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
      if(response.status == 200){
        setDataDiscSpace([]);
        for (let [key, value] of Object.entries(response.data)) {
          console.log(key + ": " + value); // Output: name: John, age: 30, city: New York
          dataDiscSpace.push({"value":value,label:key});
          }
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
  { field: 'id', headerName: 'ID', headerClassName: 'super-app-theme--header',width: 40},
  { field: 'serverIp', headerName: 'Server IP', width: 160, headerClassName: 'super-app-theme--header',editable: false },

  { field: 'appServerStatus', 
  headerName: 'Server Status',headerClassName: 'super-app-theme--header',
   width: 150, 
   editable: false,
   renderCell: (params) => {
    const value = params.value as string; 
    let color = ''; // Default font color
    let displayValue='';
    switch (value) {
      case 'Available':
       color='#81C784';
        displayValue = value;
        break;
      case 'Not Available':
        color = '#EF9A9A';
        displayValue = value;
        break;
            }
    // Check the value of 'Server Status' and set color accordingly
    
    return (
      <div style={{ color, fontSize: '20px' }}>{params.value}</div>
    );
  },
},
  {
    field: 'dbTableSpaceOccupyPerc',
    headerName: 'DB Table Space Occupy(%)',
    type: 'number',headerClassName: 'super-app-theme--header',
    width: 200,
    renderCell: (params) => {
      const value = params.value as number;
           let color = ''; // Default font color
    let displayValue='';
      if (value < 50) {
        color = '#81C784';
      } else if (value < 80) {
        color = '#81C784';
      } else {
        color = '#EF9A9A';
      }
      return (
        <div style={{color, fontSize: '25px', fontWeight: 'bold' }}>
          {params.value}
        </div>
      );
    },
  },
  {
    field: 'appSpaceUsedPerc',
    headerName: 'Disc Space Occupy(%)',
    type: 'number',headerClassName: 'super-app-theme--header',
    width: 200,
    editable: false,
    renderCell: (params) => {
      const value = params.value as number;
      let color = ''; // Default font color
      let displayValue=Number;
      if (value < 50) {
        color = '#81C784';
        displayValue = Number;
      } else if (value < 80) {
        color = '#FFF59D';
        displayValue = Number;
      } else {
        color = '#EF9A9A';
        displayValue = Number;
      }
      return (
        <div  style={{ color, fontSize: '25px', fontWeight: 'bold' }}>
          {params.value}
        </div>
      );
    },
      },
  {
    field: 'serverCacheStatus',
    headerName: 'POC-AM Cache Status',
    type: 'number',headerClassName: 'super-app-theme--header',
    width: 200,
    editable: false,
    renderCell: (params) => {
      const value = params.value as string; // Assuming the value is a string
      let color = ''; // Default font color
      let displayValue='';
      switch (value) {
        case 'Live':
          color = '#81C784';
          displayValue = value;
          break;
        case 'Superseded':
          color = '#808080';
          displayValue = value;
          break;
        case 'Error':
          color = '#EF9A9A';
          displayValue = value;
          break;
              }
      return (
        <div style={{ color, fontSize: '25px', fontWeight: 'bold' }}>
          {displayValue}
        </div>
      );
    },

  },
  {
    field: 'liveBillingCatalog',
    headerName: 'Live Billing Catalog',
    type: 'number',headerClassName: 'super-app-theme--header',
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
    type: 'number',headerClassName: 'super-app-theme--header',
    width: 200,
    editable: false,
  },
  {
    field: 'dateTime',
    headerName: 'Last Updated',headerClassName: 'super-app-theme--header',
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

    <Box sx={{ justifyContent: 'center',height: 650, width: '100%',boxShadow: 2,
    border: 2,
    borderColor: 'primary.light',
    '& .super-app-theme--header': {
      backgroundColor: 'RGBA(65,169,159,0.56)',
    } }}>
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
