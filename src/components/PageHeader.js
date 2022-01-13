import React from 'react'
import { Paper, Card }  from '@mui/material'
import Typography from '@mui/material/Typography';
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fdfdff !important'
    },
    pageHeader: {
        padding: theme.spacing(4),
        display: 'flex',
        marginBottom: theme.spacing(1),
    },
    pageIcon: {
        display: 'inline-block',
        padding: theme.spacing(1),
        color: '#3c44b1'
    },
    pageTitle:{
        paddingLeft: theme.spacing(4),
        '& .MuiTypography-subtitle2': {
            opacity: '0.6'
        }
    }
    
}))

export default function PageHeader(props) {

    const { title, subtitle, icon } = props
    const classes = useStyles();

    return (
        <div>
        <Paper elevation={0} square className={ classes.root }>
            <div className={ classes.pageHeader}>
                <Card className={classes.pageIcon}>
                    {icon}
                </Card>
                <div className={classes.pageTitle}>
                    <Typography 
                        variant="h6"
                        component="div">
                        {title}
                    </Typography>

                    <Typography 
                        variant="subtitle2"
                        component="div">
                        {subtitle}
                    </Typography>
                </div>
            </div>
        </Paper>
        </div>
    )
}
