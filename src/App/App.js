
import './App.css';
import React, { useState, useEffect, useContext }  from 'react';
import * as localForage from 'localforage';
// eslint-disable-next-line 
//import { GridToolbar, GridRowParams, useGridApiRef, GridToolbarExport, GridToolbarContainer } from '@mui/x-data-grid-pro';
import { GridToolbarContainer, GridToolbarExport, GridToolbar, GridRowParams, GridColumnHeaderParams, GridActionsCellItem, GridCellParams} from '@mui/x-data-grid-pro';


import PeopleIcon from '@mui/icons-material/People';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

import { DataGridPro } from '@mui/x-data-grid-pro';
//import { DataGrid } from '@mui/x-data-grid';

import SideMenu from '../components/SideMenu'
import Header from '../components/Header'
import PageHeader from '../components/PageHeader'
import Employees from '../Pages/Employees/Employees'
import GeneralData from '../components/GeneralData'
import Money from '../components/Money'
import * as utils from '../utils';
import appConfig from '../appConfig';

import { CssBaseline, makeStyles} from "@material-ui/core"
import { ThemeProvider, createTheme } from '@mui/material/styles';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';

import DeleteIcon from '@mui/icons-material/Delete';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SecurityIcon from '@mui/icons-material/Security';
import Avatar from '@mui/material/Avatar';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';

import Typography from '@mui/material/Typography';

import TableContextProvider, { TableContext } from '../contexts/TableContext';
import AppConfigContextProvider from '../contexts/AppConfigContext';
import UserContextProvider from '../contexts/UserContext';


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
        <Box component="div" sx={{ p: 3 }}>
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

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const usdPrice = {
    type: 'number',
    width: 130,
    valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
    cellClassName: 'font-tabular-nums',
  };


const initialState = []
const [newRows, setNewRows] = useState(initialState);



const [ok, setOk] = useState(false)

// Keys for localForage
const [keysInUse, setKeysInUse] = useState([]);
const [newColumns, setNewColumns] = useState([])


  useEffect(() => {
    
    if (!newRows || ok) {
    utils.getDataFromApi()
      .then((resp) => {
        resp.json().then(
          (response) => {
          response.map((item) => {
            //console.log('Item', item)
            item['Avatar'] = {}
            item['country'] = 'Brazil'
            item['discount'] = ''
            item['lastLogin'] = Date.now()
            item['Account'] = 'Delete'
            item['subTotal'] = 0
            item['total'] = 0
            item['actions'] = ''
            return true
          })
            setNewRows(response);
            utils.saveDataToDb('user', response)
          }
        )
      })
      .catch((err) => console.log(err))
    }
    
    utils.getDataFromDb('user').then((response) => {
      console.log('Use Effect App', response)
      setNewRows(response);
    })

    
  
    // eslint-disable-next-line 
  }, []);
 
  const classes = useStyles();
  
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };


  const handleCellEditCommit = (e:GridCellEditCommitParams) => {
    console.log('Cell Edit')
    const array = newRows.map((selRow) => {
      if (selRow.id === e.id) {
        return {...selRow, [ e.field]: e.value}
      } else {
        return {...selRow}
      }
    })
    setNewRows(array);
  }

 

  // utils.saveDataToDb('temp', 'Daniel');

  // utils.deleteFromDb('temp');

  // utils.deleteFromDb('newUser');


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
   
    <div className={ classes.appMain }>
      <TableContextProvider>
      <SideMenu 
        titleRow="Row Data"
        subtitleRow="Rows"
        numberRow= { newRows.length }
        iconRow={<TableRowsIcon fontSize="small"/>}
        titleCol="Columns Data"
        subtitleCol="Columns"
        //numberCol={columns.length}
        titleForage="Local Forage"
        status={ok}
        subtitle3="Status"
        keysInUse={keysInUse}
        iconStorage={<Inventory2Icon fontSize="small" />}
        iconCol={<ViewColumnIcon fontSize="small" />}
      />
      </TableContextProvider>
        <UserContextProvider>
        <Header 
          className={ classes.root }
        />
        
      
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
              <TableContextProvider>
               
                  <GeneralData 
                    handleCellEditCommit = {handleCellEditCommit}
                    newRows = { newRows.length > 0 ? newRows : []}
                    keysInUse={keysInUse}
                    setKeysInUse={setKeysInUse}
                    setNewRows = { setNewRows }
                  
                  />
                  
              </TableContextProvider>
            </TabPanel>
            
            <TabPanel value={value} index={1}>
              <Employees 
                theme = {theme}
              />
            </TabPanel>

            <TabPanel value={value} index={2}>
              <AppConfigContextProvider>
              <Money 
                handleCellEditCommit={handleCellEditCommit}
                columns={ newColumns }
                newRows={newRows.length > 0 ? newRows : []}
                keysInUse={keysInUse}
                setKeysInUse={setKeysInUse}
                setNewRows={setNewRows}
              />
                </AppConfigContextProvider>
            </TabPanel>

        </div>
      </div>
    </div>
    </UserContextProvider>

    </div>
    
    </>
   


    
  
  );
}

export default App;
