

// npm install localforage
import * as localForage from 'localforage';
import { GridToolbarContainer, GridToolbarExport, GridToolbar, GridRowParams, GridColumnHeaderParams, GridActionsCellItem } from '@mui/x-data-grid-pro';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

    export const getDataFromApi = async() =>  {
        const data = await fetch('https://jsonplaceholder.typicode.com/users')
        return data
    }

    export const saveDataToDb = (key, data) => {
        localForage.setItem(key, data).then(() => {
            console.log('User has been saved',     data);
        })
    }

    export const getDataFromDb = async (key) => {
        if (!localForage.getItem(key)) return;
        console.log('Key', key, 'Data', await localForage.getItem(key))
        return await localForage.getItem(key);
    }



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
    export const columns = [
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


   


