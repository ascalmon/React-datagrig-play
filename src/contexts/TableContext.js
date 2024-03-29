import React, { useState, createContext, useEffect} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import Avatar from '@mui/material/Avatar';
import { GridToolbarContainer, GridToolbarExport, GridToolbar, GridRowParams, GridColumnHeaderParams, GridActionsCellItem } from '@mui/x-data-grid-pro';
import * as utils from '../utils';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';


export const TableContext = createContext();

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const TableContextProvider = (props) => {

    //console.log('Table Context Props', props.children.props)
    //const { newRows, setNewRows } = props.children.props
    const [newRows, setNewRows] = useState()

    useEffect(() => {
        setNewRows(props.children.props.newRows);
    },[])

    const initialState = []
    const [removeRecords, setRemoveRecords] = useState(initialState)
    const [state, setState] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center'
    });
    const [msg, setMsg] = useState();


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
        if (name) {
            return {
                sx: {
                    bgcolor: stringToColor(name),
                },
                children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
            };
        }
    }

    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });


    // const handleOnChange = (e, params) => {
    //     console.log('Change checkbox', e, params, newRows)
    //     if (Object.keys(params).length > 0) {
    //         const rowId = params.id;
    //         const fieldName = params.field;
    //         const fieldValue = e.target.checked;
    //         const cerRowsTemp = newRows;
    //         console.log('Change', rowId, fieldName, fieldValue, newRows)

    //         // Get the values of every field in the selected row - Identify the row index
    //         const rowIndex = newRows.findIndex(row => row.id === rowId);
    //         // rowFielgs has one entire row of the table cerRows
    //         const rowFields = newRows[rowIndex];
    //         // const rowFields = cerRows[details.api.getRowIndex(rowId)];

    //         if (typeof fieldValue !== 'boolean') {
    //             console.log('Not Boolean - ', typeof fieldValue)
    //         }

    //         if (cerRowsTemp.length > 0) {
    //             setNewRows(cerRowsTemp);
    //             console.log('Cer Rows Updated', cerRowsTemp[rowIndex]);


    //         if (params.field === 'caraca') {
    //             // field is a boolena - cstExistingSpecBL
    //             if (fieldValue === true) {
    //                 // Boolean value is true
    //                 if (rowFields.hasOwnProperty(fieldName)) {
    //                     // Boolean field is a valid field
    //                     //tririgaObj[fieldName] = fieldValue;
    //                     rowFields[fieldName] = fieldValue;
    //                     rowFields['subTotal'] = { value: null};
    //                     cerRowsTemp[rowIndex] = rowFields;
    //                     setNewRows(cerRowsTemp);
    //                     // All rows are updated
    //                     console.log('Boolean True - Cer Rows Updated', cerRowsTemp);
    //                 }
    //             } else {
    //                 // Boolean value is false
    //                 if (rowFields.hasOwnProperty(fieldName)) {
    //                     // Boolean field is a valid field
    //                     //tririgaObj[fieldName] = fieldValue;
    //                     rowFields[fieldName] = fieldValue;
    //                     rowFields['Total'] = { value: null };
    //                     cerRowsTemp[rowIndex] = rowFields;
    //                     setNewRows(cerRowsTemp);
    //                     // All rows are updated
    //                     console.log('Boolean False - Cer Rows Updated', cerRowsTemp);
    //                 }
    //             }
    //         }
    //     }
    //     }

    // }

    const handleDeleteRow = (e, params) => {
        console.log('Delete Row Table Context')
        if (params === 'btn' && removeRecords.length > 0) {
            const selectedIDs = new Set(removeRecords);
            setNewRows((r) => r.filter((x) => !selectedIDs.has(x.id)));
            //console.log("Selected Ids", selectedIDs, newRows);
        } else {
            if (params && params.id ) {
                const selectedIDs = new Set([params.id]);
                setNewRows((r) => r.filter((x) => !selectedIDs.has(x.id)));
            //console.log("Selected Ids", selectedIDs, newRows);
            }
        }
        setMsg('Rows Deleted!');
        setState({ ...state, 'open': true });
    };


    const handleSaveData = (e) => {
        console.log('Handle Save Data Table Context')
        e.preventDefault();
        console.log('Save Data', newRows);
        utils.saveDataToDb('user', newRows);
        setMsg('Rows Saved!');
        setState({ ...state, 'open': true });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setState({ ...state, 'open': false });
    };

    const options = ['Option 1', 'Option 2', 'Option 3'];
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState(options[0]);
    const [ contextColumns, setContextColumns ] = useState(
        [
            {
                field: 'id',
                headerName: 'ID',
                hideable: false,
                // flex: 1,
                width: 60,
                minWidth: 50,
                description:
                    'If field generated by the system',
            },
            {
                field: 'avatar',
                headerName: 'Avatar',
                hideable: false,
                // flex: 1,
                width: 90,
                minWidth: 50,
                description:
                    'Avatar - the 2 initials of user name and lastname',
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
                //resizable: false,
                editable: true,
                sortable: true,    // Disable column sort
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
                headerName: 'Company',
                width: 150,
                editable: true,
                renderHeader: (params) => (
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
                    console.log('Discount', row)
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
                width: 90,
                editable: true,
                hide: false,
                renderCell: (params) => (
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label='Del'
                        onClick={(e) => { handleDeleteRow(e, params) }}
                        showInMenu />
                ),
            },

            {
                field: 'subTotal',
                headerName: 'Subtotal',
                headerAlign: 'center',
                align: 'center',
                type: 'number',
                width: 130,
                valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
                cellClassName: 'font-tabular-nums',
                //...usdPrice,
                editable: true,
                //resizable: true,
            },
            {
                field: 'total',
                headerName: 'Total',
                headerAlign: 'center',
                align: 'center',
                type: 'number',
                width: 130,
                valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
                cellClassName: 'font-tabular-nums',
                //...usdPrice,
                editable: true,
                //resizable: true,
            },
            {
                field: 'actions',
                type: 'actions',
                width: 80,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={(e) => { handleDeleteRow(e, params) }}
                        showInMenu />,
                    <GridActionsCellItem
                        icon={<SecurityIcon />}
                        label="Toggle Admin"
                        onClick={() => console.log('security')}
                        showInMenu
                    />,
                ]
            },

        ])


  return (

      <TableContext.Provider value={{ contextColumns, setContextColumns, handleDeleteRow, removeRecords, setRemoveRecords, newRows, setNewRows, handleSaveData, handleClose, msg, state, setState  }}>
          {props.children}
      </TableContext.Provider>

  )
}

export default TableContextProvider;
