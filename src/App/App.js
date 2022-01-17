
import './App.css';
import React, { useState, useEffect }  from 'react';
// eslint-disable-next-line 
//import { GridToolbar, GridRowParams, useGridApiRef, GridToolbarExport, GridToolbarContainer } from '@mui/x-data-grid-pro';
import { GridToolbarContainer, GridToolbarExport, GridToolbar, GridRowParams, GridColumnHeaderParams, GridActionsCellItem } from '@mui/x-data-grid-pro';


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

import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import Avatar from '@mui/material/Avatar';
//import Button from '@mui/material/Button';

import Checkbox from '@mui/material/Checkbox';
//import Radio from '@mui/material/Radio';
//import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
//import FormLabel from '@mui/material/FormLabel';


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

  const [newRows, setNewRows] = useState([])
 


// ____________________________________________ Columns _________________________________________________





  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      hideable: false,
      // flex: 1,
      width: 60,
      minWidth: 50,
      description:
        'The identification used by the person with access to the online service.',
    },
    {
      field: 'avatar',
      headerName: 'Avatar',
      hideable: false,
      // flex: 1,
      width: 90,
      minWidth: 50,
      renderCell: (params) => (
        <strong>
          <Avatar
            {...stringAvatar(params.row.name)}
          >
          </Avatar>
        </strong>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 190,
      minWidth: 100,
      resizable: false,
      editable: true,
      sortable: true    // Disable column sort
    },
    {
      field: 'username',
      headerName: 'Username',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      headerAlign: 'center',
      width: 210,
      editable: true,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      headerAlign: 'center',
      width: 200,
      editable: true,
    },
    {
      field: 'website',
      headerName: 'Website',
      headerAlign: 'center',
      width: 150,
      editable: true,
    },
    {
      field: 'street',
      headerName: 'Street',
      headerAlign: 'center',
      width: 150,
      editable: true,
      valueGetter: (params) =>
        params.row.address.street,
    },
    {
      field: 'geo',
      headerName: 'Geo',
      headerAlign: 'center',
      width: 210,
      editable: true,
      valueGetter: (params) =>
        `Lat:${params.row.address.geo.lat || ''} Lng:${params.row.address.geo.lng || ''}`,
    },
    {
      field: 'suite',
      headerName: 'Suite',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 120,
      valueGetter: (params) =>
        params.row.address.suite
    },
    {
      field: 'city',
      headerName: 'City',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 120,
      valueGetter: (params) =>
        params.row.address.city
    },
    {
      field: 'zipcode',
      headerName: 'Zipcode',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 90,
      valueGetter: (params) =>
        params.row.address.zipcode
    },
    {
      field: 'company',
      width: 150,
      editable: true,
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>
          {'Company '}
          <span role="img" aria-label="enjoy">
            🏦
          </span>

        </strong>
      ),
      valueGetter: (params) =>
        params.row.company.name
    },
    {
      field: 'bs',
      headerName: 'Slogan',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
      valueGetter: (params) =>
        params.row.company.bs
    },
    {
      field: 'catchPhrase',
      headerName: 'Phrase',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 250,
      valueGetter: (params) =>
        params.row.company.catchPhrase
    },
    // {
    //   field: 'date',
    //   width: 150,
    //   type: 'date',
    //   editable: true,
    //   renderHeader: (params: GridColumnHeaderParams) => (
    //     <strong>
    //       {'Birthday '}
    //       <span role="img" aria-label="enjoy">
    //         🎂
    //       </span>
    //     </strong>
    //   ),
    // },
    {
      field: 'country',
      type: 'singleSelect',
      width: 120,
      valueOptions: [
        'Bulgaria',
        'Netherlands',
        'France',
        'United Kingdom',
        'Spain',
        'Brazil',
      ],
      editable: true,
    },
    {
      field: 'discount',
      type: 'singleSelect',
      width: 120,
      editable: true,
      valueOptions: ({ row }) => {
        if (row === undefined) {
          return ['EU-resident', 'junior'];
        }
        const options = [];
        if (!['United Kingdom', 'Brazil'].includes(row.country)) {
          options.push('EU-resident');
        }
        if (['Bulgaria'].includes(row.country)) {
          options.push('Bulgary anniversary');
        }
        if (row.age < 27) {
          options.push('junior');
        }
        if (row.date === '10/10/2010') {
          options.push('Birth premium date')
        }
        return options;
      },
    },
    {
      field: 'lastLogin',
      type: 'dateTime',
      editable: true,
      width: 180,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: 'Account',
      cellClassName: 'super-app-theme--cell',
      width: 200,
      editable: true,
      hide: false,
      renderCell: (params) => (
        params.row.company.catchPhrase
      ),
    },
    {
      field: 'subTotal',
      ...usdPrice,
      width: 130,
      editable: true,
      resizable: true,

    },
    {
      field: 'total',
      ...usdPrice,
      width: 130,
      editable: true,
      resizable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => { console.log('Delete') }}
          showInMenu />,
        <GridActionsCellItem
          icon={<SecurityIcon />}
          label="Toggle Admin"
          onClick={() => console.log('security')}
          showInMenu
        />,
      ]
    },

  ];




// ______________________________________________________ End Columns _________________________________________________________

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 , date: '10/10/2010', country: 'Brazil', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 100, total: 300},
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, date: '10/10/2010', country: 'France', discount: 'EU-residente', lastLogin: '10/12/2021', status: 'Filled', subTotal: 200, total: 800},
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, date: '10/10/2010', country: 'Brazil', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 150, total: 600 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, date: '10/10/2010', country: 'Netherlands', discount: 'Junior', lastlogin: '10/12/2021', status: 'Filled', subTotal: 100, total: 300 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, date: '10/10/2010', country: 'Brazil', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 400, total: 1200 },
//   { id: 6, lastName: 'Melisandre', firstName: 'Atenas', age: 150, date: '10/10/2010', country: 'France', discount: '', lastLogin: '10/12/2021', status: 'Open', subTotal: 500, total: 1500 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, date: '10/10/2010', country: 'Brazil', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 100, total: 300 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, date: '10/10/2010', country: 'Netherlands', discount: '', lastLogin: '10/12/2021', status: 'Open', subTotal: 100, total: 300 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, date: '10/10/2010', country: 'France', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 100, total: 300 },
//   { id: 10, lastName: 'Snow', firstName: 'Jon', age: 35, date: '10/10/2010', country: 'Brazil', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 100, total: 300},
//   { id: 11, lastName: 'Snow', firstName: 'Jon', age: 35, date: '10/10/2010', country: 'Netherlands', discount: '', lastLogin: '10/12/2021', status: 'Open', subTotal: 100, total: 300 },
//   { id: 12, lastName: 'Lannister', firstName: 'Cersei', age: 42, date: '10/10/2010', country: 'Brazil', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 100, total: 300 },
//   { id: 13, lastName: 'Lannister', firstName: 'Jaime', age: 45, date: '10/10/2010', country: 'Netherlands', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 100, total: 300},
//   { id: 14, lastName: 'Stark', firstName: 'Arya', age: 16, date: '10/10/2010', country: 'Brazil', discount: 'Junior', lastLogin: '10/12/2021', status: 'Open', subTotal: 100, total: 300 },
//   { id: 15, lastName: 'Targaryen', firstName: 'Daenerys', age: null, date: '10/10/2010', country: 'France', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 100, total: 300},
//   { id: 16, lastName: 'Melisandre', firstName: 'Atenas', age: 150, date: '10/10/2010', country: 'Brazil', discount: '', lastLogin: '10/12/2021', status: 'Open', subTotal: 100, total: 300},
//   { id: 17, lastName: 'Clifford', firstName: 'Ferrara', age: 44, date: '10/10/2010', country: 'United Kingdom', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 100, total: 300},
//   { id: 18, lastName: 'Frances', firstName: 'Rossini', age: 36, date: '10/10/2010', country: 'France', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 100, total: 300},
//   { id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65, date: '10/10/2010', country: 'Netherlands', discount: '', lastLogin: '10/12/2021', status: 'Open', subTotal: 100, total: 300},
// ];




 



  useEffect(() => {
    const ok = false
    if (!newRows || ok) {
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
        numberCol={columns.length}
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
                columns={columns}
                // loading={rows.length }
                rowHeight={42}
                checkboxSelection={true}
                disableSelectionOnClick={true}
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
                    columns={columns}
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
