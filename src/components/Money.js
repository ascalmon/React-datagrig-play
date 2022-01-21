import React, { useState, useContext, useEffect } from 'react';
import * as utils from '../utils';
import * as localForage from 'localforage';
import { DataGridPro } from '@mui/x-data-grid-pro';
import PageHeader from '../components/PageHeader';
import { CssBaseline, makeStyles } from "@material-ui/core";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GridToolbarContainer, GridToolbarExport, GridToolbar, GridRowParams, GridColumnHeaderParams, GridActionsCellItem } from '@mui/x-data-grid-pro';

import { AppConfigContext } from '../contexts/AppConfigContext';
import Button from '@mui/material/Button';

import PeopleIcon from '@mui/icons-material/People';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


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

function Money(props) {

    const classes = useStyles();

    const { handleCellEditCommit, columns, newRows, setNewRows, keysInUse, setKeysInUse } = props

   const { appConfig, contextColumns, setContextColumns, handleDeleteRow, removeRecords, setRemoveRecords, handleSaveData, msg, state, setState, handleClose } = useContext(AppConfigContext)
   
   const { open, vertical, horizontal} = state

   console.log('Vertical & Horizontal', vertical, horizontal, open)

    const [newColumns, setNewColumns] = useState([])

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

    useEffect(() => {
        console.log('Money mounting')
        // utils.getDataFromDb('user').then((response) => {
        //     console.log('here', response)
        //     setNewRows(response);
        if (newRows) {
            const response = newRows
            //if (appConfig) {
                let array = []
                Object.keys(response[0]).map((item) => {
                    if (typeof response[0][item] === 'object' & Object.keys(response[0][item]).length > 0) {
                        Object.keys(response[0][item]).map((media) => {
                            return (array.push(item + '_' + media))
                        })
                    } else {
                        array.push(item)
                    }
                    return true
                })
                //console.log('Array of Headers', array)

                localForage.keys().then(function (keys) {
                    setKeysInUse(keys)
                }).catch(function (err) {
                    console.log(err);
                });

                const columnsOrder = { 'id': 0, 'name': 2, 'username': 3, 'email': 4, 'address_street': 7, 'address_suite': 9, 'address_city': 10, 'address_zipcode': 11, 'address_geo': 8, 'phone': 5, 'website': 6, 'company_name': 12, 'company_catchPhrase': 14, 'company_bs': 13, 'Avatar': 1, 'country': 15, 'discount': 16, 'lastLogin': 17, 'Account': 19, 'subTotal': 20, 'total': 21, 'actions': 22 }

                // Reorder all columns according to columnOrder objects

                let columnsReordered = []
                Object.keys(columnsOrder).map((key) => {
                    //console.log('Item order', key, columnsOrder[key])
                    return (columnsReordered[columnsOrder[key]] = key)
                })
                //console.log('Columns Reordered', columnsReordered)


                let columnsAppConfig = [] // Store the column configuration
                let obj = {}
                if (columnsReordered.length > 0) {
                    columnsReordered.map((item) => {
                        //console.log('Item', item)
                        if (appConfig[item]) {

                            //console.log('Column Object', Object.keys(appConfig[item]))
                            Object.keys(appConfig[item]).map((param) => {

                                if (param !== 'optionsApiExt') {
                                    //console.log('Param', param, appConfig[item][param], obj)
                                    obj[param] = appConfig[item][param]
                                }
                            })
                            columnsAppConfig.push(obj);
                            obj = {}
                            //console.log('Item found', item)
                        }
                    })
                }

                setNewColumns(columnsAppConfig)
                console.log('Column Money', columnsAppConfig);
            //}
        }

        // eslint-disable-next-line 
    }, []);

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
                columns={ newColumns }
                loading={newRows.length === 0 }
                rowHeight={42}
                checkboxSelection={true}
                disableSelectionOnClick={true}
                isRowSelectable={(params: GridRowParams) => params.row.id % 2 === 0}
                // isRowSelectable={(params: GridRowParams) => params.row.firstName != 'Atenas'}
                isCellEditable={(params) => params.row.id % 2 === 0}   // Só edita idades pares de caracters
                pagination
                pageSize={10}
                rowsPerPageOptions={[10, 50, 100]}
                onCellEditCommit={handleCellEditCommit}
                onSelectionModelChange={(newSelectionModel, detail) => {
                    if (newSelectionModel.length > 0) {
                        console.log('Checkbox Money', newSelectionModel, detail.api.state)
                        setRemoveRecords(newSelectionModel);
                    } else {
                        //setRemoveRecords([]);
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
                <Button size="small" onClick={(e) => { handleDeleteRow(e, 'btn') }}>
                    Delete rows
                </Button>
                <Snackbar
                    open={state.open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={msg}
                    action={action}
                    anchorOrigin={{vertical, horizontal }}
                    key={vertical + horizontal}
                />
            </div>
        </div>
    )
}

export default Money;
