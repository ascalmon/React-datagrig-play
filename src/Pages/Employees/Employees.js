import React from 'react'
import { makeStyles } from "@material-ui/core";
import EmployeeForm from "./EmployeeForm";
import PeopleIcon from '@mui/icons-material/People';
import PageHeader from '../../components/PageHeader';
import { Paper } from '@mui/material';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    }
}))

export default function Employees() {

    const classes = useStyles();

    return (
        <>
        <div>
        <PageHeader
            title="New Employee"
            subtitle="Form design with validation"
            icon={<PeopleIcon fontSize='large'/>}
      />
        </div>
        <div>
        <Paper className={ classes.pageContent }>
            <EmployeeForm  />
        </Paper>
        </div>
          
        </>
    )
}
