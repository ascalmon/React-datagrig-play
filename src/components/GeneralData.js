import React, { useState, useContext, useEffect, useRef, useCallback} from 'react';
import * as localForage from 'localforage';
import {
    useGridApiRef,
    DataGrid,
    //useGridRootProps,
 } from '@mui/x-data-grid';
//import KeyboardNavigation from '@mui/x-data-grid-pro';
import PageHeader from '../components/PageHeader';
import { CssBaseline, makeStyles } from "@material-ui/core";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import {
    gridVisibleRowCountSelector,
    gridVisibleColumnDefinitionsSelector,
    gridVisibleSortedRowIdsSelector,
} from '@mui/x-data-grid'

import {
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbar,
    GridRowParams,
    GridColumnHeaderParams,
    GridActionsCellItem,
    getGridStringOperators,
    getGridDateOperators,
    GridEvents,
} from '@mui/x-data-grid';

import PropTypes from "prop-types";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
//import { GridColDef } from '@mui/x-data-grid-pro';

import PeopleIcon from '@mui/icons-material/People';
import { TableContext } from '../contexts/TableContext';
import { UserContext } from '../contexts/UserContext';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import * as utils from '../utils';
import { NearMe } from '@mui/icons-material';


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

    console.log('General Data Props', props)

    // Enable Single Click Editing
    //console.log('Teste App Config', CerAppConfig('Caraca', { label: 'Vanessa' }, { label: 'Vanessa' }));

    const apiRef = useGridApiRef()
    const [selectedCellParams, setSelectedCellParams] = useState();

    const [coordinates, setCoordinates] = React.useState({
        rowIndex: 0,
        colIndex: 0,
    });
    //const [column, setColumn] = useState()


    useEffect(() => {

        const {rowIndex, colIndex } = coordinates;
        if (rowIndex === 0 && colIndex === 0) {
            //console.log( 'Start');
        } else {
            const id = gridVisibleSortedRowIdsSelector(apiRef)[rowIndex];
            if (id) {
                apiRef.current.scrollToIndexes(coordinates);
                //console.log('UseEffectCoordinates column')
                //const column = gridVisibleColumnDefinitionsSelector(apiRef)[colIndex];
                const column = apiRef.current.getVisibleColumns()[colIndex];
                apiRef.current.setCellFocus(id, column.field);
                //console.log('Coordinate', rowIndex, colIndex, 'Id', id, 'Column', column.field)
            }
        }
    },[apiRef, coordinates])


    const handleCellClick = async (param, event) => {
        console.log('handle cell click ', event, param.field )

        const { id, field, cellMode } = param;
        if (cellMode === 'edit') {
            // Wait for the validation to run
            const isValid = await apiRef.current.commitCellChange({ id, field });
            console.log('Edit Mode', cellMode)
            if (isValid) {
                apiRef.current.setCellMode(id, field, 'view');
                setSelectedCellParams({ ...selectedCellParams, cellMode: 'view' });
            }
        }  else {
            console.log('View Mode', cellMode)
            apiRef.current.setCellMode(id, field, 'edit');
            setSelectedCellParams({ ...selectedCellParams, cellMode: 'edit' });
        }

        const rowIndex = gridVisibleSortedRowIdsSelector(apiRef).findIndex(
            (id) => id === param.id,
        );
        const colIndex = apiRef.current.state.columns.all.findIndex(
            (column) => column === param.field,
        );
        setCoordinates({ rowIndex, colIndex });
    };


    const SUBMIT_FILTER_STROKE_TIME = 500;

    function InputStringData(props) {
        const { item, applyValue, focusElementRef = null } = props;

        const filterTimeout = useRef();
        const [filterValueState, setFilterValueState] = useState(item.value ?? '');
        const [applying, setIsApplying] = useState(false);

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
        } else if (search) {
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

    const handleKeyboardAction = async (params, event) => {

        const { id, field, cellMode, isEditable, colDef } = params

        console.log('Event Code', event.code, params)
        if (event.code === 'Enter' && cellMode === "edit") {
            console.log('Entered')

            const maxColIndex = apiRef.current.state.columns.all.length - 1;
            setCoordinates((coords) => {
                console.log('Max Col', Math.min(maxColIndex, coords.colIndex + 1))
                return {...coords, colIndex: Math.min(maxColIndex, coords.colIndex + 1)};
            })

            const isValid = await apiRef.current.commitCellChange({ id, field });
            if (isValid) {
                apiRef.current.setCellMode(id, field, 'view');
                setSelectedCellParams({ ...selectedCellParams, cellMode: 'view' });
            }
        } else {
            if (cellMode === 'view') {
                if (colDef.type !== 'singleSelect' || colDef.type !== 'multSelect') {
                    apiRef.current.setCellMode(params.id, params.field, 'edit');
                }
            }
        }
    }

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
        //onCellClick={handleCellClick}
        //onCellKeyDown={handleKeyboardAction}
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
        isCellEditable={(params) => params.row.id % 2 === 0 }   // Só edita idades pares de caracters
        pagination
        pageSize={10}
        rowsPerPageOptions={[10, 50, 100]}
        onCellEditCommit={(params,event) => handleCellEditCommit(params, event)}
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

        // componentsProps={{
        //     toolbar: {
        //         selectedCellParams,
        //         apiRef,
        //         setSelectedCellParams,
        //     },
        // }}

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
