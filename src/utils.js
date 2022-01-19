

// npm install localforage
import localforage, * as localForage from 'localforage';
import { GridToolbarContainer, GridToolbarExport, GridToolbar, GridRowParams, GridColumnHeaderParams, GridActionsCellItem } from '@mui/x-data-grid-pro';



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

    export const deleteFromDb = async (key) => {
        localforage.removeItem(key).then(() => {
            console.log(`Key ${key} is cleared`)
        }).catch((err) => {
            console.log(err)
        })
    }


   


