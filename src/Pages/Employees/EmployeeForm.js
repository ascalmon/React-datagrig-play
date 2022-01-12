import React, { useState } from 'react'
import * as employeeService  from '../../services/employeeService'
import { Grid, TextField, Select, InputLabel, MenuItem} from '@mui/material';
import { makeStyles } from "@material-ui/core";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const initialFValues = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    gender: 'male',
    departmentId: '',
    hireDate: new Date(),
    isPermanent: false,
}

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        },
    }
}))


export default function EmployeeForm() {
   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
        console.log('Name & Value', name, value)
    }

    const [values, setValues] = useState(initialFValues);

    const classes = useStyles();

    const optionsAdm = employeeService.getDepartmentCollection();
    const optionsGen = employeeService.getGenderCollection();

    console.log('Options', optionsAdm, optionsGen)
    return (

        <form class={classes.root}>
            <Grid container>
                <Grid item xs={6} >
                    <TextField 
                        variant="outlined"
                        label="Full Name"
                        name="fullName"
                        value={values.fullName}
                        onChange = {handleInputChange}
                        autoComplete='off'
                    />
                    <TextField
                        variant="outlined"
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        autoComplete='off'
                    />
                    <TextField
                        variant="outlined"
                        label="Mobile"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        autoComplete='off'
                    />
                    <TextField
                        variant="outlined"
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                        autoComplete='off'
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl  variant="outlined">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup row
                            aria-label="gender"
                            defaultValue={values.gender}
                            name="gender"
                            value={values.gender}
                            onChange={handleInputChange}
                        >
                            {optionsGen.map((item) => {
                                return <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title} />
                            })}   
                        </RadioGroup>
                    </FormControl>

                    <FormControl variant="outlined">
                        <InputLabel id="departmentId">Department Id</InputLabel>
                        <Select
                            labelId="departmentId"
                            id="departmentId"
                            name="departmentId"
                            value={values.departmentId}
                            label="Department Id"
                            onChange={handleInputChange}
                            options={employeeService.getDepartmentCollection()}
                        >
                            <MenuItem value="">None</MenuItem>
                            {optionsAdm.map( (item ) => {
                                return <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
                            })}
                            
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </form>
  
    )
}
