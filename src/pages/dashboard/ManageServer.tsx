
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { serverActions } from '../../actions/ServerActions';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
type Props = {};
export default function ManageServerPage() {
      const [rows, setRows] = useState([]);
      const navigate = useNavigate();
      var userId = localStorage.getItem("userId");
      useEffect(() => {
        const getUsers = async () => {
        
        console.log(userId);
        if (userId) {
          const getAllServers = await serverActions.getManageServer(userId);
          console.log(getAllServers.length);
          if(getAllServers){
            let forEachServers: any = [];
            if(getAllServers.length>0){
            getAllServers.forEach((server: { serverId: any; serverIp: any ; dbUserName: any ;dbUserPassword:any; }) => {

              var iterate_server= {id: server.serverId,
              serverIp: server.serverIp,
              serverUserName:server.dbUserName,
              serverPassword: server.dbUserPassword
              }

              forEachServers.push(iterate_server);

              
            });
          }
            console.log("get servers by uses")
            setRows(forEachServers);
            console.log(forEachServers)
          }

          else{
            alert('Server Error');
          }
        } else {
          alert('Please Login to the Application');
        }
        }
        getUsers(); 
      },[]); 
     // 
         
      
  const [clickedRow, setClickedRow] = React.useState();
  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: React.SetStateAction<undefined>) => {
    e.stopPropagation();
    console.log(row);
    setClickedRow(row);
  };
 
  const [file, setFile] = useState();

  function fileOnchange(event:any) {
    console.log(event);
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  }
  const uploadBulkServer = async () => {
    console.log(file);
    if (file) {
    const formData = new FormData();
    formData.append('file', file);
    var response = await serverActions.bulkUploadServer(formData,userId);
      if(response.statusCode == 200){
        toast.success("Bulk upload Server Successfully", {
          position: "top-center"
        });
        //navigate('/dashboard/manageserver', { state: { reg: "manageserver" } });
      }
      else{
        toast.error("Server Error", {
          position: "top-center"
        });
      }
    } else {
      toast.error("Please upload file", {
        position: "top-center"
      });
    }
  
  };
  const applyCellColour = (value: number) => (value >10 ? 'notApprovedCell' : 'approvedCell'); 
  const columns : GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 150, headerClassName: 'super-app-theme--header' }, 
    { field: 'serverIp', headerName: 'Server IP', width: 350 ,  headerClassName: 'super-app-theme--header'},
    {
      field: 'serverUserName',
      headerName: 'Server User Name',
      width: 350,headerClassName: 'super-app-theme--header',
      editable: false
    },
    {
      field: 'serverPassword',
      headerName: 'server Password',
      width: 150,headerClassName: 'super-app-theme--header',
      editable: false
    },
    {
      field: 'deleteButton',
      headerName: 'Actions',headerClassName: 'super-app-theme--header',
      description: 'Actions column.',
      sortable: false,
      width: 160,
      renderCell: (params: { row: React.SetStateAction<undefined>; }) => {
        return (
          <Button
            onClick={(e) => onButtonClick(e, params.row)}
            variant="contained">
            Delete
          </Button>
        );
      },
    },
  ];
  return (
    <> <ToastContainer/><h1>
    <span style={{ textAlign: 'center' }}>Manage Server</span>
     
  </h1><br></br><div>

      <Box sx={{ justifyContent: 'center',height: 650, width: '55%',boxShadow: 2,
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
           />
      </Box>
      {/*  clickedRow: {clickedRow ? `${clickedRow.firstName}` : null} */}
<br></br><br></br>
      <h1>Bulk Upload Servers</h1>
      <br></br><br></br>
          <input name="file" type="file" onChange={fileOnchange} />
          <button type="submit" onClick={uploadBulkServer}>Upload</button>
         
    </div></>
  );
}

  




