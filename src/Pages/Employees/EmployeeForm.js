import React, { useState } from 'react'
import * as employeeService  from '../../services/employeeService'
import { Grid, TextField, Select, InputLabel, MenuItem, FormHelperText} from '@mui/material';
import { makeStyles } from "@material-ui/core";

import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

// date-fns - npm install @date-io/date-fns
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';



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
    },
    btn: {
        '& .MuiButton-root': {
        margin: theme.spacing(0.5),
        textTransform: 'none'
        }
    },
   
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

    const handleChange = (e) => {
        const { name, checked } = e.target;
        setValues({
            ...values,
            [name]: checked
        })
        console.log('Name & Value', name, checked)
    }
    
    const handleInputDate = (e) => {
        setValues({
            ...values,
            ['hireDate']: e
        })
    }

    const validate = () => {
        let temp = {};
        temp.fullName = values.fullName?"":"This field is required."
        temp.email = (/$ˆ|.+@.+..+/).test(values.email)?"": "Email is not valid."
        temp.mobile = values.mobile.length>9? "":"Minimum 10 numbers required."
        temp.city = values.city ? "" : "This field is required."
        temp.departmentId = values.departmentId.length!==0?"":"This field is required"
        setErrors({...temp})

        return Object.values(temp).every(x => x == "")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate() ) {
            console.log('Validate True')
        }
    }

    const handleReset = (e) => {
        setValues(initialFValues);
        setErrors({});
    }


    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const classes = useStyles();

    const optionsAdm = employeeService.getDepartmentCollection();
    const optionsGen = employeeService.getGenderCollection();

   
    return (

        <form className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6} >
                    <TextField 
                        variant="outlined"
                        label="Full Name"
                        name="fullName"
                        value={values.fullName}
                        onChange = {handleInputChange}
                        autoComplete='off'
                        error={errors.fullName}
                        helperText={errors.fullName && "This field is required"}
                    />
                    <TextField
                        variant="outlined"
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        autoComplete='off'
                        error={errors.email}
                        helperText={errors.email && "Email format is not valid"}
                    />
                    <TextField
                        variant="outlined"
                        label="Mobile"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        autoComplete='off'
                        error={errors.mobile}
                        helperText={errors.mobile && "This field is required"}
                    />
                    <TextField
                        variant="outlined"
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                        autoComplete='off'
                        error={errors.city}
                        helperText={errors.city && "This field is required"}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl  variant="outlined">
                        <FormLabel>Gender</FormLabel>
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

                    <FormControl variant="outlined" error={errors.departmentId}>
                        <InputLabel id="departmentId">Department Id</InputLabel>
                        <Select
                            labelId="departmentId"
                            id="departmentId"
                            name="departmentId"
                            defaultValue={values.departmentId}
                            value={values.departmentId}
                            label="Department Id"
                            onChange={handleInputChange}
                            options={employeeService.getDepartmentCollection()}
                            
                        >
                            <MenuItem key={0} value="">None</MenuItem>
                            {optionsAdm.map( (item ) => {
                                return <MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>
                            })}
                        </Select>
                        <FormHelperText>{errors && errors.departmentId && "This field is required"}</FormHelperText>
                    </FormControl>
                    

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker disableToolbar variant='inline' inputVariant='outlined'
                            label='Hire Date'
                            //format="MMM/dd/yyyy"
                            name='hireDate'
                            value={values.hireDate}
                            onChange={handleInputDate} >
                        </KeyboardDatePicker>
                    </MuiPickersUtilsProvider>

                    <FormControl>
                        <FormControlLabel 
                        control={<Checkbox defaultChecked />} 
                        label="Permanent Employee" 
                        name="isPermanent"
                        color="primary"
                        checked={values.isPermanent}
                        value={values.isPermanent}
                        onChange={handleChange}
                        />
                    </FormControl>
                   
                    <div className={classes.btn}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit">
                            Submit
                        </Button>
                    
                        <Button 
                            variant="contained"
                            color="default"
                            size="large"
                            onClick={handleReset}>
                            Reset
                        </Button>
                    </div>
                
                </Grid>
               
            </Grid>
        </form>
  
    )
}
