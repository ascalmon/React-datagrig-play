import React, { useState } from 'react'
import { Grid, TextField} from '@mui/material';
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
    }

    const [values, setValues] = useState(initialFValues);

    const classes = useStyles();

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
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup row
                            aria-label="gender"
                            defaultValue={values.gender}
                            name="gender"
                            value={values.gender}
                            onChange={handleInputChange}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </form>
  
    )
}
