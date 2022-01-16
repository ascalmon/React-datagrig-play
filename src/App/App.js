
import './App.css';
import React, { useState, useEffect }  from 'react';
// eslint-disable-next-line 
import { GridToolbar, GridRowParams, useGridApiRef, GridToolbarExport, GridToolbarContainer } from '@mui/x-data-grid-pro';

import { randomInt, randomUserName } from '@mui/x-data-grid-generator';
//import AccessibilityIcon from '@mui/icons-material/Accessibility'; // install

import PeopleIcon from '@mui/icons-material/People';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

import { DataGridPro } from '@mui/x-data-grid-pro';
//import { DataGrid } from '@mui/x-data-grid';

import SideMenu from '../components/SideMenu'
import Header from '../components/Header'
import PageHeader from '../components/PageHeader'
import Employees from '../Pages/Employees/Employees'
import * as utils from '../utils'


import { CssBaseline, makeStyles} from "@material-ui/core"
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';


import Typography from '@mui/material/Typography';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box vomponent="div" sx={{ p: 3 }}>
          <div>
          <Typography component="div">{children}</Typography>
          </div>
        </Box>
       
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const theme = createTheme({
  palette: {
    primary:{
      main: "#333996",
      light: "#3C44B126"
    },
    secondary: {
      main: "#F83245",
      light: "#F8324526"
    },
    default: {
      main: "#9E9E9E",
      light: "#0E0E0E"
    },
    background: {
      default: "#F4F5FD"
    }
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)',
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    }
  }
});


const useStyles = makeStyles(theme => ({
  appMain: {
    paddingLeft: '250px',
    width: '100%'
  },
  root: {
    backgroundColor: '#fafafa',
  },
  btn: {
    padding: theme.spacing(1)
  }
}))


function App() {
  const apiRef = useGridApiRef();
  const [newRows, setNewRows] = useState([])


  useEffect(() => {
    if (!newRows ) {
    utils.getDataFromApi()
      .then((resp) => {
        resp.json().then(
          (response) => {
            // response.map((item) => {
            utils.saveDataToDb('user', response)
            // })

          }
        )
      })
      .catch((err) => console.log(err))
    }
    
    utils.getDataFromDb('user').then((response) => {
      console.log('here', response)
      setNewRows(response);
    })
    // eslint-disable-next-line 
  }, []);
 


  const classes = useStyles();
  

  const initialState = []
  const [removeRecords, setRemoveRecords] = useState(initialState)
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSaveData = (e) => {
    e.preventDefault();
    console.log('Save Data', newRows)
    utils.saveDataToDb('user', newRows)
  }

  const handleDeleteRow = (e) => {
    const selectedIDs = new Set(removeRecords);
    setNewRows((r) => r.filter((x) => !selectedIDs.has(x.id)));
    console.log("Selected Ids", selectedIDs);
  };

  const handleRemovedRecords = (e) => {
    e.preventDefault();
    console.log('Removed Records', e, removeRecords)
  }

  const handleCellEditCommit = (e:GridCellEditCommitParams) => {
    const array = newRows.map((selRow) => {
      if (selRow.id === e.id) {
        return {...selRow, [ e.field]: e.value}
      } else {
        return {...selRow}
      }
    })
    setNewRows(array);
  }




  // const CustomToolbar = () => {
  //   return (
  //     <GridToolbarContainer>
  //       <GridToolbarExport />
  //     </GridToolbarContainer>
  //   );
  // }

  // const CustomToolbarFilter = () => {
  //   return (
  //     <GridToolbarContainer>
  //       <GridToolbar />
  //     </GridToolbarContainer>
  //   );
  // }

 

  return (
    <>
    <ThemeProvider theme={theme}>
    <div className={ classes.appMain }>
      <SideMenu 
        titleRow="Row Data"
        subtitleRow="Rows"
        numberRow={newRows.length}
        iconRow={<TableRowsIcon fontSize="small"/>}
        titleCol="Columns Data"
        subtitleCol="Columns"
        numberCol={utils.columns.length}
        iconCol={<ViewColumnIcon fontSize="small" />}
      />
      <Header className={ classes.root }/>
      <CssBaseline />
      
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>

            <Box component="div" sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="General Data" {...a11yProps(0)} />
                <Tab label="People" {...a11yProps(1)} />
                <Tab label="Money" {...a11yProps(2)} />
              </Tabs>
            </Box>
             
            <TabPanel value={value} index={0}>
              <div>
                {/* <div>
                  {JSON.stringify(newRows)}
                </div> */}
                <PageHeader
                  title="Datagrid Pro Playground"
                  subtitle="DataGrid functionalities"
                  icon={<PeopleIcon fontSize='large' />}
                />
                </div>
              <DataGridPro
                // sortModel={sortModel}
                // onSortModelChange={(model) => setSortModel(model)}
                className={classes.root}
                autoHeight
                rows={newRows}
                columns={utils.columns}
                // loading={rows.length }
                rowHeight={42}
                checkboxSelection={true}
                // disableSelectionOnClick={false}
                //isRowSelectable={(params: GridRowParams) => params.row.id % 2 === 0}
                // isRowSelectable={(params: GridRowParams) => params.row.firstName != 'Atenas'}
                isCellEditable={(params) => params.row.id % 2 === 0}   // Só edita idades pares de caracters
                pagination
                pageSize={10}
                rowsPerPageOptions={[10, 50, 100]}
                onCellEditCommit={handleCellEditCommit}
                onSelectionModelChange={(newSelectionModel, detail) => {
                  console.log('Checkbox', newSelectionModel, detail.api.state)
                  setRemoveRecords(newSelectionModel);
                  
                }}
                removeRecords={removeRecords}
                components={{
                  Toolbar: GridToolbar,
                }}
                 
                sx={{
                  boxShadow: 2,
                  border: 2,
                  borderColor: 'primary.light',
                  '& .MuiDataGrid-cell:hover': {
                    color: 'primary.main', // hover cells blue
                  },
                }}
                
              />
                  <div className={classes.btn}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSaveData}
                  >Save Data
                  </Button>
                    <Button size="small" onClick={handleDeleteRow}>
                      Delete rows
                    </Button>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Employees />
            </TabPanel>
            <TabPanel value={value} index={2}>
                  <div>

                    <PageHeader
                      title="Datagrid Pro Playground"
                      subtitle="DataGrid functionalities"
                      icon={<PeopleIcon fontSize='large' />}
                    />
                  </div>
                  <DataGridPro
                    // sortModel={sortModel}
                    // onSortModelChange={(model) => setSortModel(model)}
                    className={classes.root}
                    autoHeight
                    rows={newRows}
                    columns={utils.columns}
                    loading={newRows.length === 0}
                    rowHeight={42}
                    checkboxSelection={true}
                    disableSelectionOnClick={false}
                    isRowSelectable={(params: GridRowParams) => params.row.id % 3 !== 0 && params.row.name !== 'Clementina DuBuque'}
                    //isRowSelectable={(params: GridRowParams) => params.row.name != 'Clementina DuBuque'}
                    isCellEditable={(params) => params.row.id % 2 === 0}   // Só edita idades pares de caracters
                    pagination
                    pageSize={10}
                    rowsPerPageOptions={[10, 50, 100]}
                    onSelectionModelChange={(newSelectionModel, detail) => {
                      console.log('Checkbox', newSelectionModel, detail);
                      setRemoveRecords(newSelectionModel)
                      
                    }}
                    removeRecords={removeRecords}
                    components={{
                      Toolbar: GridToolbar,
                    }}

                    sx={{
                      boxShadow: 2,
                      border: 2,
                      borderColor: 'primary.light',
                      '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main', // hover cells blue
                      },
                    }}

                  />
                  <div className={classes.btn}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleSaveData}
                    >Save Data
                    </Button>
                  </div>
            </TabPanel>

        </div>
      </div>
    </div>

    </div>
      </ThemeProvider>
    </>

    
  
  );
}

export default App;
