
import './App.css';
import React, { useState }  from 'react';

// import { GridToolbarContainer, GridToolbarExport, GridToolbar, GridRowParams, GridColumnHeaderParams, GridActionsCellItem } from '@mui/x-data-grid';
import { GridToolbarContainer, GridToolbarExport, GridToolbar, GridRowParams, GridColumnHeaderParams, GridActionsCellItem } from '@mui/x-data-grid-pro';
//import AccessibilityIcon from '@mui/icons-material/Accessibility'; // install
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import PeopleIcon from '@mui/icons-material/People';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

import { DataGridPro } from '@mui/x-data-grid-pro';
//import { DataGrid } from '@mui/x-data-grid';

import SideMenu from '../components/SideMenu'
import Header from '../components/Header'
import PageHeader from '../components/PageHeader'
import Employees from '../Pages/Employees/Employees'


import { CssBaseline, makeStyles} from "@material-ui/core"
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import Typography from '@mui/material/Typography';




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



const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 , date: '10/10/2010', country: 'Brazil', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 100, total: 300},
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, date: '10/10/2010', country: 'France', discount: 'EU-residente', lastLogin: '10/12/2021', status: 'Filled', subTotal: 200, total: 800},
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, date: '10/10/2010', country: 'Brazil', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 150, total: 600 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, date: '10/10/2010', country: 'Netherlands', discount: 'Junior', lastlogin: '10/12/2021', status: 'Filled', subTotal: 100, total: 300 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, date: '10/10/2010', country: 'Brazil', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 400, total: 1200 },
  { id: 6, lastName: 'Melisandre', firstName: 'Atenas', age: 150, date: '10/10/2010', country: 'France', discount: '', lastLogin: '10/12/2021', status: 'Open', subTotal: 500, total: 1500 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, date: '10/10/2010', country: 'Brazil', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 100, total: 300 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, date: '10/10/2010', country: 'Netherlands', discount: '', lastLogin: '10/12/2021', status: 'Open', subTotal: 100, total: 300 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, date: '10/10/2010', country: 'France', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 100, total: 300 },
  { id: 10, lastName: 'Snow', firstName: 'Jon', age: 35, date: '10/10/2010', country: 'Brazil', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 100, total: 300},
  { id: 11, lastName: 'Snow', firstName: 'Jon', age: 35, date: '10/10/2010', country: 'Netherlands', discount: '', lastLogin: '10/12/2021', status: 'Open', subTotal: 100, total: 300 },
  { id: 12, lastName: 'Lannister', firstName: 'Cersei', age: 42, date: '10/10/2010', country: 'Brazil', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 100, total: 300 },
  { id: 13, lastName: 'Lannister', firstName: 'Jaime', age: 45, date: '10/10/2010', country: 'Netherlands', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 100, total: 300},
  { id: 14, lastName: 'Stark', firstName: 'Arya', age: 16, date: '10/10/2010', country: 'Brazil', discount: 'Junior', lastLogin: '10/12/2021', status: 'Open', subTotal: 100, total: 300 },
  { id: 15, lastName: 'Targaryen', firstName: 'Daenerys', age: null, date: '10/10/2010', country: 'France', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 100, total: 300},
  { id: 16, lastName: 'Melisandre', firstName: 'Atenas', age: 150, date: '10/10/2010', country: 'Brazil', discount: '', lastLogin: '10/12/2021', status: 'Open', subTotal: 100, total: 300},
  { id: 17, lastName: 'Clifford', firstName: 'Ferrara', age: 44, date: '10/10/2010', country: 'United Kingdom', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 100, total: 300},
  { id: 18, lastName: 'Frances', firstName: 'Rossini', age: 36, date: '10/10/2010', country: 'France', discount: '', lastLogin: '10/12/2021', status: 'Filled', subTotal: 100, total: 300},
  { id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65, date: '10/10/2010', country: 'Netherlands', discount: '', lastLogin: '10/12/2021', status: 'Open', subTotal: 100, total: 300},
];

const columns = [
  { field: 'id', 
  headerName: 'ID', 
  hideable: false,
  flex: 1,
  minWidth: 150,
  description:
      'The identification used by the person with access to the online service.',
  },
  {
    field: 'firstName',
    headerName: 'First name',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    width: 150,
    minWidth: 100,
    resizable: false,
    editable: true,
    sortable: true    // Disable column sort
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'date',
    width: 150,
    type: 'date',
    editable: true,
    renderHeader: (params: GridColumnHeaderParams) => (
      <strong>
        {'Birthday '}
        <span role="img" aria-label="enjoy">
          🎂
        </span>
      </strong>
    ),
  },
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
    field: 'status',
    width: 90,
    editable: true,
    hide: true,
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
        onClick={() => console.log('delete')}
        showInMenu />,
      <GridActionsCellItem
        icon={<SecurityIcon />}
        label="Toggle Admin"
        onClick={() => console.log('security')}
        showInMenu
      />,
      <GridActionsCellItem
        icon={<SecurityIcon />}
        label="Toggle Admin"
        onClick={() => console.log('security')}
        showInMenu
      />,
    ]
  },
  
];


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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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


const useStyles = makeStyles({
  appMain: {
    paddingLeft: '250px',
    width: '100%'
  },
  root: {
    backgroundColor: '#fff !important',
  }
})


function App() {

  const classes = useStyles()

  const initialState = []
  const [removeRecords, setRemoveRecords] = useState(initialState)
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        numberRow={rows.length}
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


            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <PageHeader
                  title="Datagrid Pro Playground"
                  subtitle="DataGrid functionalities"
                  icon={<PeopleIcon fontSize='large' />}
                />
              <DataGridPro
                // sortModel={sortModel}
                // onSortModelChange={(model) => setSortModel(model)}
                // className={''}
                autoHeight
                rows={rows}
                columns={columns}
                // loading={rows.length }
                rowHeight={38}
                checkboxSelection={true}
                // disableSelectionOnClick={false}
                isRowSelectable={(params: GridRowParams) => params.row.age > 16}
                // isRowSelectable={(params: GridRowParams) => params.row.firstName != 'Atenas'}
                isCellEditable={(params) => params.row.age % 2 === 0}   // Só edita idades pares de caracters
                pagination
                pageSize={10}
                rowsPerPageOptions={[10, 50, 100]}
                onSelectionModelChange={(newSelectionModel) => {
                  setRemoveRecords(newSelectionModel);
                  console.log('Checkbox', removeRecords)
                }}
                removeRecords={removeRecords}
                components={{
                  Toolbar: GridToolbar,
                }}
                componentsProps={{
                  columnMenu: { background: 'red', counter: rows.length },
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
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Employees />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Employees />
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
