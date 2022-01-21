import React, { useState, useContext, useEffect } from 'react';
import { useGridApiRef, DataGridPro } from '@mui/x-data-grid-pro';
import PageHeader from '../components/PageHeader';
import { CssBaseline, makeStyles } from "@material-ui/core";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GridToolbarContainer, GridToolbarExport, GridToolbar, GridRowParams, GridColumnHeaderParams, GridActionsCellItem } from '@mui/x-data-grid-pro';

import Button from '@mui/material/Button';

import PeopleIcon from '@mui/icons-material/People';
import { TableContext } from '../contexts/TableContext';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import * as utils from '../utils';


const theme = createTheme({
    palette: {
        primary: {
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

function GeneralData(props) {

    

    const { contextColumns, setContextColumns, handleDeleteRow, removeRecords, setRemoveRecords, handleSaveData, msg, state, setState, handleClose } = useContext(TableContext)

    const { open, vertical, horizontal } = state;

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    //console.log('General Data Props', props)

    const classes = useStyles();

    const { handleCellEditCommit, columns, newRows, setNewRows } = props;

    console.log('General Data Props', newRows);

  return (

    <div>
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
        rows={ newRows }
        columns={contextColumns}
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
            if (newSelectionModel.length > 0) {
                console.log('Checkbox General Data', newSelectionModel, detail.api.state)
                setRemoveRecords(newSelectionModel);
            } else {
                //setRemoveRecords([])
            }
        }}
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
              
       
            <Button size="small" onClick={(e) => {handleDeleteRow(e, 'btn')}}>
                Delete rows
            </Button>
              <Snackbar
                  open={state.open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  message={msg}
                  action={action}
                  anchorOrigin={{ vertical, horizontal }}
                  key={vertical + horizontal}
              />

        </div>
    </div>
  )}

export default GeneralData;
