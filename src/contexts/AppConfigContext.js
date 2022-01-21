import React, { useState, createContext } from 'react';
import Avatar from '@mui/material/Avatar';
import { GridToolbarContainer, GridToolbarExport, GridToolbar, GridRowParams, GridColumnHeaderParams, GridActionsCellItem } from '@mui/x-data-grid-pro';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import * as utils from '../utils';

export const AppConfigContext = createContext();



const AppConfigContextProvider = (props) => {

    console.log('AppConfigContext Props', props)

    const { newRows, setNewRows } = props.children.props

    const initialState = []
    const [removeRecords, setRemoveRecords] = useState(initialState)
    const [state, setState] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center'
    });

    const [msg, setMsg] = useState();


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

    appConfig.addField('cstAssetNameTX', {
        label: 'Asset Name',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstAssetSpecBI', {
        label: 'Asset Spec Form [Optional]',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstBidExceptionBI', {
        label: 'Bid Exception [Optional]',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstCompetitiveBid2BI', {
        label: 'Competitive Bid 2 [Optional]',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstCompetitiveBid3BI', {
        label: 'Competitive Bid 3 [Optional}',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstCostCenterTX', {
        label: 'Cost Center',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstEHSBiohazardousAgentsLI', {
        label: 'Will biohazardous/potentially infectious agents be used within the equipment',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstGeneralEhsResponses',
    })

    appConfig.addField('cstEHSSpecialtyExhaustLI', {
        label: 'Will there be any specialty exhaust requirements for the equipment?',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstGeneralEhsResponses',
    })

    appConfig.addField('cstEHSSterileEnvironmentLI', {
        label: 'Will you require a sterile working environment?',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstGeneralEhsResponses',
    })

    appConfig.addField('cstEHSStoredEnergyLI', {
        label: 'Will the instrument contain any potentially hazardous stored energy?',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstGeneralEhsResponses',
    })

    appConfig.addField('cstEquipmentDetailsTX', {
        label: 'Please Provide Details',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstEquipmentSpecTX', {
        label: 'Please Specify Equipment',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstEquipmentTX', {
        label: 'Equipment Type',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstEquipmentTradeInBL', {
        label: 'Equipment Trade In',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstEquipmentTradeInTX', {
        label: 'Please Specify Equipment',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstExistingSpecBL', {
        label: 'Model Number Unknown',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    // add on Tririga
    appConfig.addField('cstExistingSpecTX', {
        label: 'Model Number',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstExpectedPurchaseMonthLI', {
        label: 'Expected Purchase Month',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstExpectedPurchaseMonthLI',
    })

    appConfig.addField('cstFunctionLI', {
        label: 'Purpose',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstFunctionLI'
    })

    appConfig.addField('cstFunctionSpecifyTX', {
        label: 'Please Specify Equipment',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstITComponentBL', {
        label: 'IT Component',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstITComputerLI', {
        label: 'Will this request require a computer?',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstITComputerLI',
    })

    appConfig.addField('cstITSoftwareLI', {
        label: 'Does this Capital Expense Request include software',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstITSoftwareLI',
    })

    appConfig.addField('cstITValidatedEnvironmentLI', {
        label: 'Will the instrument be in Validated (GXP, GLP, and GMP) environment',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstITValidatedEnvironmentLI',
    })

    appConfig.addField('cstJustificationTX', {
        label: 'Justification (Max. 1000 Characters)',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstNetworkConnectionLI', {
        label: 'Is there an active network connection port ready for this computer',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstNetworkConnectionLI',
    })

    appConfig.addField('cstProjectRelatedLI', {
        label: 'Project Related',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstProjectRelatedLI'
    })

    appConfig.addField('cstProjectedAmountNU', {
        label: 'Projected Equipment Cost',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstProposedBenchLocationTX', {
        label: 'Proposed Bench [Optional]',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstProposedBuildingTX', {
        label: 'Proposed Building',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstProposedFloorTX', {
        label: 'Proposed Floor',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstProposedSpaceTX', {
        label: 'Proposed Space',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstPurchaseYearLI', {
        label: 'Expected Purchase Year',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstPurchaseYearLI',
    })

    appConfig.addField('cstQuantityNU', {
        label: 'Quantity',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstRDProjectNameTX', {
        label: 'R&D Project Name',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstRequestPriorityLI', {
        label: 'Priority [Optional]',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstRequestPriorityLI',
    })

    appConfig.addField('cstSPAntibodyDrugsLI', {
        label: 'Will antibody drug conjugates or potent compounds be used?',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstGeneralEhsResponses',
    })

    appConfig.addField('cstSPBiologicalMaterialLI', {
        label: 'Will gases be used?',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstGeneralEhsResponses',
    })

    appConfig.addField('cstSPChemicalsToBeUsedLI', {
        label: 'Will hazardous chemicals be used?',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstGeneralEhsResponses',
    })

    appConfig.addField('cstSPFullyGuardedLI', {
        label: 'Will the equipment have unguarded moving parts?',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstGeneralEhsResponses',
    })

    appConfig.addField('cstSPGenerateWasteLI', {
        label: 'Will it generate waste - hazardous or non-hazardous?',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstGeneralEhsResponses',
    })

    appConfig.addField('cstSPLaserLI', {
        label: 'Does the instrument contain Class 3B or 4 laser(s)?',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstSPLaserLI',
    })

    appConfig.addField('cstSPRadioactiveSourceLI', {
        label: 'Will the use of the instrument involve radioactive material?',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstGeneralEhsResponses',
    })

    appConfig.addField('cstSPXrayGeneratingLI', {
        label: 'X-Ray generating equipment?',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstGeneralEhsResponses',
    })

    appConfig.addField('cstSpecGroupNameTX', {
        label: 'Equipment Group',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstSpecGroupTX', {
        label: 'Model Number [Optional]',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstSpecialtyFurnitureBO', {
        label: 'Specialty Furniture',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstSpecialtyFurnitureCommentTX', {
        label: 'Please provide details',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstSystemLI', {
        label: 'Is this CER a System that requires purchases from multiple vendors?',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true,
        optionsApiExt: 'cstSystemLI',
    })

    appConfig.addField('cstTargetOperationalDateDA', {
        label: 'Target Operational Date',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstVendorExternalCompanyTX', {
        label: 'Supplier/Vendor',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstVendorNotFoundBL', {
        label: 'Vendor Unknown',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    // Add on Tririga
    appConfig.addField('cstVendorNotFoundTX', {
        label: 'Vendor [Optional]',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('cstVendorQuoteBI', {
        label: 'Selected Vendor Quote [Optional]',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('triDescriptionTX', {
        label: 'Additional Details/Explanation',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('triRequestForLI', {
        label: 'Request is for',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('triRequestedByEmailTX', {
        label: 'Email',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('triRequestedByTX', {
        label: 'Requested By	',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('triRequestedByWorkPhoneTX', {
        label: 'Work Phone',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('triRequestedForEmailTX', {
        label: 'Email',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('triRequestedForTX', {
        label: 'Requested For',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('triRequestedForWorkPhoneTX', {
        label: 'Work Phone',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

    appConfig.addField('triSpecClassCL', {
        label: 'Equipment Category',
        required: true,
        viewable: true,
        wishlist: true,
        checkout: true
    })

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
        resizable: false,
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
        resizable: true,
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
        resizable: true,
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
      <AppConfigContext.Provider value={{ appConfig, handleDeleteRow, removeRecords, setRemoveRecords, newRows, setNewRows, handleSaveData, handleClose, msg, state, setState }}>
          {props.children}
      </AppConfigContext.Provider>
  )
};
export default AppConfigContextProvider;