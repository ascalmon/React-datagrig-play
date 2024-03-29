import React, { useState, useContext, useEffect } from 'react';
import * as utils from '../utils';
import * as localForage from 'localforage';
import { useGridApiRef, DataGrid } from '@mui/x-data-grid';
import PageHeader from '../components/PageHeader';
import { CssBaseline, makeStyles } from "@material-ui/core";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GridToolbarContainer, GridToolbarExport, GridToolbar, GridRowParams, GridColumnHeaderParams, GridActionsCellItem } from '@mui/x-data-grid';

import { AppConfigContext } from '../contexts/AppConfigContext';
import { UserContext } from '../contexts/UserContext';

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

    // console.log('Money Props', props)
    const apiRef = useGridApiRef();

    const [ selectedCellParams, setSelectedCellParams] = useState('edit')

    const { handleCellEditCommit, columns, newRows, setNewRows, keysInUse, setKeysInUse, change } = props



    const handleCellClick = async (params, event) => {
        console.log('handle cell click',  event, params )
        const { id, field, cellMode, value } = params;
        if (!selectedCellParams || params.colDef.field === 'autocomplete') {
            console.log('handle cell click - Return')
             return;
        }

        console.log('Cell Mode', cellMode)

        if (cellMode === 'edit') {
            // Wait for the validation to run
            const isValid = await apiRef.current.commitCellChange({ id, field, value: value });
            if (isValid) {
                apiRef.current.setCellMode(id, field, 'view');
                setSelectedCellParams({ ...selectedCellParams, cellMode: 'view' });
            }
        } else {
            apiRef.current.setCellMode(id, field, 'edit');
            setSelectedCellParams({ ...selectedCellParams, cellMode: 'edit' });
        }
    };

    const classes = useStyles();


   //console.log('Context', AppConfigContext._currentValue )
   const { appConfig, contextColumns, setContextColumns, handleDeleteRow, removeRecords, setRemoveRecords, handleSaveData, msg, state, setState, handleClose, value, id, field } = useContext(AppConfigContext)

   const { open, vertical, horizontal} = state

   //console.log('Vertical & Horizontal', vertical, horizontal, open)

    const [newColumns, setNewColumns] = useState([])

    const { row, dispatch, search, setSearch } = useContext(UserContext);

    const [filteredRows, setFilteredRows] = useState(newRows && newRows.length > 0 ? newRows : [])

    //const caraca = dispatch({ type: 'SAVE_DATA', row: 'Caraca' })

    useEffect(() => {
        console.log('Use Effect NewRows', newRows)
        setFilteredRows(newRows)
        localForage.keys().then(function (keys) {
            setKeysInUse(keys)
        }).catch(function (err) {
            console.log(err);
        });
    }, [newRows])



    useEffect(() => {
        handleCellEditCommit({id: id, field: field, value: value})
        console.log('Effect Input Change', value, id, field)
    }, [id, field, value])

    useEffect(() => {

        if (search && search !== '') {
            //console.log('Search Value General Data', search)
            const values = Object.values(newRows)
            let valueObjects = []
            let querySearch = []
            let filteredArray = []
            values.map((value) => {
                valueObjects = Object.values(value)
                querySearch = valueObjects.filter((item) => {
                    return typeof item === 'string' ? item.toLocaleLowerCase().includes(search.toLocaleLowerCase()) : false
                })
                if (querySearch.length > 0) {
                    filteredArray.push(value)
                }

            })
            //console.log('FilteredArray', filteredArray)
            setFilteredRows(filteredArray);
        } else {
            setFilteredRows(newRows)
        }


    }, [search])

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
        //console.log('Money mounting')
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

                const columnsOrder = { 'id': 0, 'name': 2, 'username': 3, 'email': 4, 'address_street': 7, 'address_suite': 9, 'address_city': 10, 'address_zipcode': 11, 'address_geo': 8, 'phone': 5, 'website': 6, 'company_name': 12, 'company_catchPhrase': 14, 'company_bs': 13, 'Avatar': 1, 'country': 15, 'discount': 16, 'lastLogin': 17, 'Account': 19, 'subTotal': 20, 'check': 21, 'total': 22, 'actions': 23, 'autocomplete':24 }

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
                //console.log('Column Money', columnsAppConfig);
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

            <DataGrid
                // sortModel={sortModel}
                // onSortModelChange={(model) => setSortModel(model)}
                className={classes.root}
                autoHeight
                onCellClick={handleCellClick}
                onCellEditCommit={handleCellEditCommit}
                apiRef={apiRef}
                rows={ filteredRows }
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
                // componentsProps={{
                //     toolbar: {
                //         selectedCellParams,
                //         apiRef,
                //         setSelectedCellParams,
                //     },
                // }}
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
                    autoHideDuration={2000}
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
