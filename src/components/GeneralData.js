import React, { useState, useContext, useEffect, useRef } from 'react';
import * as localForage from 'localforage';
import { useGridApiRef, DataGridPro, useGridRootProps } from '@mui/x-data-grid-pro';
import PageHeader from '../components/PageHeader';
import { CssBaseline, makeStyles } from "@material-ui/core";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GridToolbarContainer, GridToolbarExport, GridToolbar, GridRowParams, GridColumnHeaderParams, GridActionsCellItem, getGridStringOperators, getGridDateOperators, } from '@mui/x-data-grid-pro';
import PropTypes from "prop-types";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { GridColDef } from '@mui/x-data-grid-pro';

import PeopleIcon from '@mui/icons-material/People';
import { TableContext } from '../contexts/TableContext';
import { UserContext } from '../contexts/UserContext';
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

    // Enable Single Click Editing

    
    const apiRef = useGridApiRef();
    const { selectedCellParams, setSelectedCellParams } = props;

    const handleCellClick = async () => {
        console.log('handle cell click')
        if (!selectedCellParams) {
            return;
        }
        const { id, field, cellMode } = selectedCellParams;
        if (cellMode === 'edit') {
            // Wait for the validation to run
            const isValid = await apiRef.current.commitCellChange({ id, field });
            if (isValid) {
                apiRef.current.setCellMode(id, field, 'view');
                setSelectedCellParams({ ...selectedCellParams, cellMode: 'view' });
            }
        } else {
            apiRef.current.setCellMode(id, field, 'edit');
            setSelectedCellParams({ ...selectedCellParams, cellMode: 'edit' });
        }
    };

  
    const SUBMIT_FILTER_STROKE_TIME = 500;

    function InputStringData(props) {
        const { item, applyValue, focusElementRef = null } = props;

        const filterTimeout = useRef();
        const [filterValueState, setFilterValueState] = useState(item.value ?? '');
        const [applying, setIsApplying] = useState(false);

        useEffect(() => {
            return () => {
                clearTimeout(filterTimeout.current);
            };
        }, []);

        useEffect(() => {
            const itemValue = item.value ?? '';
            setFilterValueState(itemValue);
        }, [item.value]);

        const updateFilterValue = (selData) => {
            clearTimeout(filterTimeout.current);
            setFilterValueState(selData);

            setIsApplying(true);
            filterTimeout.current = setTimeout(() => {
                setIsApplying(false);
                applyValue({ ...item, value: selData });
            }, SUBMIT_FILTER_STROKE_TIME);
        };

        const handleFilterChange = (event) => {
            const newData = event.target.value;
            updateFilterValue(newData, filterValueState);
        };

        return (
            <Box
                sx={{
                    display: 'inline-flex',
                    flexDirection: 'row',
                    alignItems: 'end',
                    height: 48,
                    pl: '20px',
                }}
            >
                <TextField
                    name="filter-input"
                    placeholder={item.columnField.charAt(0).toUpperCase() + item.columnField.slice(1)}
                    label={item.columnField.charAt(0).toUpperCase() + item.columnField.slice(1)}
                    variant="standard"
                    value={filterValueState ? filterValueState : ''}
                    onChange={handleFilterChange}
                    type="text"
                    inputRef={focusElementRef}
                    sx={{ mr: 2 }}
                />
            </Box>
        );
    }

    // InputStringData.propTypes = {
    //     applyValue: PropTypes.func.isRequired,
    //     focusElementRef: PropTypes.oneOfType([
    //         PropTypes.func,
    //         PropTypes.shape({
    //             current: PropTypes.any.isRequired,
    //         }),
    //     ]),
    //     item: PropTypes.shape({
    //         /**
    //          * The column from which we want to filter the rows.
    //          */
    //         columnField: PropTypes.string.isRequired,
    //         /**
    //          * Must be unique.
    //          * Only useful when the model contains several items.
    //          */
    //         id: PropTypes.oneOfType([ PropTypes.string]),
    //         /**
    //          * The name of the operator we want to apply.
    //          */
    //         operatorValue: PropTypes.string,
    //         /**
    //          * The filtering value.
    //          * The operator filtering function will decide for each row if the row values is correct compared to this value.
    //          */
    //         value: PropTypes.any,
    //     }).isRequired,
    // };

    const stringOnlyOperators = [
        {
            label: 'not equals to',
            value: 'notEqualsTo',
            getApplyFilterFn: (filterItem) => {
                if (
                    !filterItem.columnField ||
                    !filterItem.value ||
                    !filterItem.operatorValue
                ) {
                    return null;
                }

                return ({ value }) => {
                    return (
                        value !== null &&
                        value.toLowerCase() !== filterItem.value.toLowerCase()
                    );
                };
            },
            InputComponent: InputStringData,
        },
        {
            label: 'no contains',
            value: 'no_contains',
            getApplyFilterFn: (filterItem) => {
                if (
                    !filterItem.columnField ||
                    !filterItem.value ||
                    !filterItem.operatorValue
                ) {
                    return null;
                }

                return ({ value }) => {
                    return (
                        value !== null &&
                        !value.toLowerCase().includes(filterItem.value.toLowerCase())
                    );
                };
            },
            InputComponent: InputStringData,
        }
       
    ];

    const { keyInUse, setKeysInUse} = props;

    // const [ filterModel, setFilterModel] = useState(
    //     {
    //     items: [
    //         {
    //             id: '1',
    //             columnField: "name",
    //             value: "",
    //             operatorValue: "No Contains"
    //         },
    //     ]
    // })

    const { contextColumns, setContextColumns, handleDeleteRow, removeRecords, setRemoveRecords, handleSaveData, msg, state, setState, handleClose } = useContext(TableContext)

    const { open, vertical, horizontal } = state;

    const { row, dispatch, search, setSearch } = useContext(UserContext);

    const { handleCellEditCommit, columns, newRows, setNewRows } = props;

    const [filteredRows, setFilteredRows] = useState(newRows && newRows.length > 0 ? newRows : [])


 
    // Imports the default String operators
    const filterOperators = getGridStringOperators()
        .filter(
            (operator) =>
                //operator.value === "after" || operator.value === "before" || operator.value === "is"
                operator.value !== null
        )
        .map((operator) => {
            return {
                ...operator
            };
        });
    
    const allOperators = stringOnlyOperators.concat(filterOperators)

    // Insert filterOperators in the selected columns
    contextColumns.map((value, index) => {
        if (value.field === 'name') {
            value['filterOperators'] = allOperators
        }
        if (value.field === 'username') {
            value['filterOperators'] = allOperators
        }
        if (value.field === 'email') {
            value['filterOperators'] = allOperators
        }
    })


    useEffect(() => {
        setFilteredRows(newRows)
        localForage.keys().then(function (keys) {
            setKeysInUse(keys)
        }).catch(function (err) {
            console.log(err);
        });
    },[])

    useEffect(() => {

        if (search && search !== '') {
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

    const classes = useStyles();

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
        onCellClick={handleCellClick}
        apiRef={apiRef}
        className={classes.root}
        autoHeight
        rows={ filteredRows && filteredRows.length > 0 ? filteredRows : newRows }
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
                setRemoveRecords(newSelectionModel);
            } else {
                //setRemoveRecords([])
            }
        }}
        
        components={{
            Toolbar: GridToolbar,
        }}

        componentsProps={{
            toolbar: {
                selectedCellParams,
                apiRef,
                setSelectedCellParams,
            },
        }}

        // initialState={{
        //     filter: {
        //         filterModel: {
        //             items: [
        //                 {
        //                     id: '1',
        //                     columnField: "name",
        //                     value: "",
        //                     operatorValue: "caraca"
        //                 },
        //             ]
        //         },
        //     },
        // }}
   
                
        //filterModel={filterModel}
       // onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}  

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
