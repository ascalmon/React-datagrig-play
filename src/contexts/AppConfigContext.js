import React, { useState, createContext, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { GridToolbarContainer, GridToolbarExport, GridToolbar, GridRowParams, GridColumnHeaderParams, GridActionsCellItem } from '@mui/x-data-grid-pro';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import * as utils from '../utils';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useGridApiRef } from '@mui/x-data-grid-pro';
import Checkbox from '@mui/material/Checkbox';

export const AppConfigContext = createContext();

const AppConfigContextProvider = (props) => {

    //console.log('AppConfigContext Props', props)

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const { newRows, setNewRows } = props.children.props

    const initialState = []
    const [removeRecords, setRemoveRecords] = useState(initialState)
    const [value, setValue] = useState();
    const [id, setId] = useState();
    const [field, setField] = useState();
    const [state, setState] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center'
    });

    const handleOnChange = (e, params) => {

        e.stopPropagation();
        console.log('Change checkbox', e, params, newRows)
        if (Object.keys(params).length > 0) {
            const rowId = params.id;
            const fieldName = params.field;
            const fieldValue = e.target.checked;
            const cerRowsTemp = [...newRows];

            console.log('Change', rowId, fieldName, fieldValue, cerRowsTemp)

            // Get the values of every field in the selected row - Identify the row index
            const rowIndex = newRows.findIndex(row => row.id === rowId);
            // rowFielgs has one entire row of the table cerRows
            let rowFields = newRows[rowIndex];
            // const rowFields = cerRows[details.api.getRowIndex(rowId)];

            if (typeof fieldValue !== 'boolean') {
                console.log('Not Boolean - ', typeof fieldValue)
            }

                setNewRows(cerRowsTemp);
                console.log('Cer Rows Updated', cerRowsTemp);


                if (params.field === 'check') {
                    // field is a boolena - cstExistingSpecBL
                    if (fieldValue === true) {
                        // Boolean value is true
                        if (rowFields.hasOwnProperty(fieldName)) {
                            console.log('Check True', rowFields)
                            // Boolean field is a valid field
                            //tririgaObj[fieldName] = fieldValue;
                            rowFields[fieldName] = fieldValue;
                            rowFields['subTotal'] = { 'id': '44400', 'value': 200 }.id;
                            cerRowsTemp.splice(rowIndex, 1);
                            console.log('Delete one', cerRowsTemp);
                            cerRowsTemp.splice(rowIndex, 0 , rowFields);
                            console.log('Boolean True - Cer Rows Updated', cerRowsTemp);
                            setNewRows(cerRowsTemp);
                            // All rows are updated

                        }
                    } else {
                        // Boolean value is false
                        if (rowFields.hasOwnProperty(fieldName)) {
                            console.log('Check False', rowFields)
                            // Boolean field is a valid field
                            //tririgaObj[fieldName] = fieldValue;
                            rowFields[fieldName] = fieldValue;
                            rowFields['total'] = { 'id': '1000', 'value': 155 }.value;
                            cerRowsTemp.splice(rowIndex, 1);
                            console.log('Delete one', cerRowsTemp);
                            cerRowsTemp.splice(rowIndex, 0, rowFields);
                            console.log('Boolean False - Cer Rows Updated', cerRowsTemp);
                            setNewRows(cerRowsTemp);

                            // All rows are updated

                        }
                    }
                }

        }

    }

    // useEffect(() => {
    //         console.log('NewRows Change Context', newRows)
    // },[newRows])

    const [msg, setMsg] = useState();
    const options = ['Option 1', 'Option 2','Option 3'];

    const handleDeleteRow = (e, params) => {
        console.log('Delete Row AppConfigContext')
        if (params === 'btn' && removeRecords.length > 0) {
            const selectedIDs = new Set(removeRecords);
            setNewRows((r) => r.filter((x) => !selectedIDs.has(x.id)));
            //console.log("Selected Ids", selectedIDs, newRows);
        } else {
            if (params && params.id) {
                const selectedIDs = new Set([params.id]);
                setNewRows((r) => r.filter((x) => !selectedIDs.has(x.id)));
                //console.log("Selected Ids", selectedIDs, newRows);
            }
        }
        setMsg('Rows Deleted!');
        setState({ ...state, 'open': true });
    };

    const handleSaveData = (e) => {
        console.log('Handle Save Data AppContext Context', state.open)
        e.preventDefault();
        console.log('Save Data', newRows);
        utils.saveDataToDb('user', newRows);
        setMsg('Rows Saved!');
        setState({...state, 'open': true});
    }

    const handleOnInputChange = (newValue, id, field) => {
        setId(id)
        setField(field)
        setValue(newValue)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setState({ ...state, 'open': false });
    };

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
        if(name) {
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


    function isValidSting(exposedName, options, property) {
        if (!options.hasOwnProperty(property)) {
            throw new Error(`Field: ${exposedName}, is missing property "${property}"`)
        }
        else if (typeof options[property] !== 'string') {
            throw new Error(`Field: ${exposedName},  options.${property} must be a string`)
        }
        else if (options[property].length === 0) {
            throw new Error(`Field: ${exposedName},  options.${property} must have length of 1 or greater`)
        }
        return true
    }

    function isValidOptions(options) {
        const validProperties = [
            'label',
            'required',
            'viewable',
            'field',
            'optionsApiExt',
            'wishlist',
            'checkout',
            'headerName',
            'headerAlign',
            'width',
            'editable',
            'hideable',
            'minWidth',
            'description',
            'renderCell',
            'headerClassName',
            'resizable',
            'sortable',
            'valueGetter',
            'renderHeader',
            'valueOptions',
            'getActions',
            'valueFormatter',
            'type',
            'cellClassName',
            'align',
            'disableReorder',
            'hide',
        ];
        for (let property of Object.keys(options)) {
            if (!validProperties.includes(property)) {
                throw new Error(`Options Property: "${property}" is not an accepted property`)
            }
        }
    }
    const defaultOptions = {
        optionsApiExt: null
    };

    const appConfig = {
        addField: function (exposedName, options) {
            isValidOptions(options)
            isValidSting(exposedName, options, 'label');
            // isValidSting(exposedName, options, 'field');
            this[exposedName] = { ...defaultOptions, ...options };
        }
    };

    // Form Fields

    appConfig.addField('_id', {
        label: 'Record Id',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('website', {
        label: 'Website',
        field: 'website',
        headerName: 'Website',
        headerAlign: 'center',
        width: 150,
        editable: true,
    })

    appConfig.addField('id', {
        label: 'Id',
        field: 'id',
        headerName: 'ID ',
        headerAlign: 'center',
        align: 'center',
        width: 90,
        editable: true,
        description: 'Id - Id of the record',
    })

    appConfig.addField('Avatar', {
        label: 'avatar',
        field: 'Avatar',
        headerName: 'Avatar',
        headerAlign: 'center',
        hideable: false,
        // flex: 1,
        width: 90,
        minWidth: 50,
        editable: true,
        description: 'Avatar - Initials of user name and lastname',
        renderCell: (params) => (
            <strong>
                <Avatar
                    {...stringAvatar(params.row.name)}
                >
                </Avatar>
            </strong>
        )
    })

    appConfig.addField('name', {
        label: 'Name',
        field: 'name',
        headerName: 'Name',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 190,
        minWidth: 100,
        //resizable: false,
        editable: true,
        sortable: true,    // Disable column sort
        description: 'Name of the User',
    })

    appConfig.addField('subTotal', {
        label: 'subTotal',
        field: 'subTotal',
        headerName: 'Subtotal',
        type: 'number',
        headerAlign: 'center',
        align: 'center',
        width: 130,
        valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
        cellClassName: 'font-tabular-nums',
        //...usdPrice,
        editable: true,
        //resizable: true,
        //disableReorder: true,
    })

    appConfig.addField('company_bs', {
        label: 'Slogan',
        field: 'bs',
        headerName: 'Slogan',
        headerAlign: 'center',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 200,
        valueGetter: (params) =>
            params.row.company.bs
    })

    appConfig.addField('username', {
        label: 'Username',
        field: 'username',
        headerName: 'Username',
        headerAlign: 'center',
        width: 150,
        editable: true,
    })

    appConfig.addField('autocomplete', {
        label: 'Autocomplete',
        field: 'autocomplete',
        cellClassName: 'super-app-theme--cell',
        headerName: 'Autocomplete',
        headerAlign: 'center',
        width: 200,
        editable: false,
        hide: false,
        renderCell: (row, ...params) => (
            <Autocomplete
                id="options-autocomplete"
                options={options}
                autoSelect={true}
                getOptionLabel={(option) => option}
                value={value}
                defaultValue={row.value}
                // onChange={(event, value) => {
                //     setValue(value)
                //     // row.value = value
                // }}
                onChange={(event, value) => {
                    console.log('Onchange ', row)
                    handleOnInputChange(value, row.id, row.field)}}
                sx={{ width: 300 }}
                renderInput={(params) => (
                    <TextField
                        {...params}

                    />
                )}
            />
        )
    })


    appConfig.addField('email', {
        label: 'Email',
        field: 'email',
        headerName: 'Email',
        headerAlign: 'center',
        width: 210,
        editable: true,
    })

    appConfig.addField('phone', {
        label: 'Phone',
        field: 'phone',
        headerName: 'Phone',
        headerAlign: 'center',
        width: 200,
        editable: true,
    })

    appConfig.addField('address_street', {
        label: 'Street',
        field: 'street',
        headerName: 'Street',
        headerAlign: 'center',
        width: 150,
        editable: true,
        valueGetter: (params) =>
            params.row.address.street,
    })

    appConfig.addField('address_geo', {
        label: 'Geo',
        field: 'geo',
        headerName: 'Geo',
        headerAlign: 'center',
        width: 210,
        editable: true,
        valueGetter: (params) =>
            `Lat:${params.row.address.geo.lat || ''} Lng:${params.row.address.geo.lng || ''}`,
    })

    appConfig.addField('address_suite', {
        label: 'Suite',
        field: 'suite',
        headerName: 'Suite',
        headerAlign: 'center',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 120,
        valueGetter: (params) =>
            params.row.address.suite
    })

    appConfig.addField('address_city', {
        label: 'City',
        field: 'city',
        headerName: 'City',
        headerAlign: 'center',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 120,
        valueGetter: (params) =>
            params.row.address.city
    })

    appConfig.addField('address_zipcode', {
        label: 'Zipcode',
        field: 'zipcode',
        headerName: 'Zipcode',
        headerAlign: 'center',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 90,
        valueGetter: (params) =>
            params.row.address.zipcode
    })

    appConfig.addField('company_name', {
        label: 'Company',
        field: 'company',
        headerName: 'Company',
        headerAlign: 'center',
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
    })

    appConfig.addField('company_bs', {
        label: 'Slogan',
        field: 'bs',
        headerName: 'Slogan',
        headerAlign: 'center',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 200,
        valueGetter: (params) =>
            params.row.company.bs
    })

    appConfig.addField('company_catchPhrase', {
        label: 'Phrase',
        field: 'catchPhrase',
        headerName: 'Phrase',
        headerAlign: 'center',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 250,
        valueGetter: (params) =>
            params.row.company.catchPhrase
    })

    appConfig.addField('country', {
        label: 'Country',
        field: 'country',
        type: 'singleSelect',
        headerAlign: 'center',
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
    })

    appConfig.addField('discount', {
        label: 'Discount',
        field: 'discount',
        type: 'singleSelect',
        headerAlign: 'center',
        width: 120,
        editable: true,
        valueOptions: ({ row }) => {
            if (row === undefined) {
                return ['EU-resident', 'junior'];
            }
            const options = [];
            console.log("Country - ", row.country, ['United Kingdom', 'Brazil'].includes(row.country))
            if (['United Kingdom', 'Brazil'].includes(row.country)) {

                options.push('EU-resident');
            }
            if (['Bulgaria'].includes(row.country)) {
                options.push('Bulgary anniversary');
            }
            if (row.subtotal > 2000) {
                options.push('junior');
            }
            if (row.date === '10/10/2010') {
                options.push('Birth premium date')
            }
            return options;
        },
    })

    appConfig.addField('lastLogin', {
        label: 'LastLogin',
        field: 'lastLogin',
        type: 'dateTime',
        headerAlign: 'center',
        editable: true,
        width: 180,
        valueGetter: ({ value }) => value && new Date(value),
    })

    appConfig.addField('Account', {
        label: 'Account',
        field: 'Account',
        cellClassName: 'super-app-theme--cell',
        headerAlign: 'center',
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
    })

    appConfig.addField('subTotal', {
        label: 'Subtotal',
        field: 'subTotal',
        headerAlign: 'center',
        align: 'center',
        type: 'number',
        width: 130,
        valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
        cellClassName: 'font-tabular-nums',
        editable: true,
        //resizable: true,
    })
    appConfig.addField('check', {
        label: 'Model Number Unknown ?',
        field: 'check',
        type: 'boolean',
        headerName: 'Model Number Unknown ?',
        headerAlign: 'center',
        align: 'center',
        editable: true,
        width: 250,
        minWidth: 250,
        description: 'Model Number Unknown ?'
    })


    // appConfig.addField('check', {
    //         label: 'Check',
    //         field: 'check',
    //         headerName: 'Check',
    //         headerAlign: 'center',
    //         align: 'center',
    //         type: 'boolean',
    //         width: 90,
    //         renderCell: (params) => (
    //             < Checkbox {...label}
    //             onClick={(e) => { handleOnChange(e, params) }}
    //         />
    //         ),
    //         editable: true,
    //         resizable: true,
    // })

    appConfig.addField('total', {
        label: 'Total',
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
    })

    appConfig.addField('actions', {
        label: 'actions',
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params: GridRowParams) => [
            <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={(e) => { console.log('actions', e, params) }}
                showInMenu />,
            <GridActionsCellItem
                icon={<SecurityIcon />}
                label="Toggle Admin"
                onClick={() => console.log('security')}
                showInMenu
            />,
        ]
    })


    delete appConfig.addField;



  return (
      <AppConfigContext.Provider value={{ appConfig, handleDeleteRow, removeRecords, setRemoveRecords, newRows, setNewRows, handleSaveData, handleClose, msg, state, setState, id, field, value }}>
          {props.children}
      </AppConfigContext.Provider>
  )
};
export default AppConfigContextProvider;