import React from 'react'
import { makeStyles } from "@material-ui/core";
// import TableRowsIcon from '@mui/icons-material/TableRows';
import { Card } from '@mui/material'
import Typography from '@mui/material/Typography';
// withStyles & makeStyles

const useStyles= makeStyles(theme => ({
    root: {
        backgroundColor: '#fff !important',
        transform: 'translateZ(0)',
        width: '80%',
        // display: 'flex',
        alignItems: 'center'
    },
    sideMenu:{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '250px',
        height: '100%',
        backgroundColor: '#253053'
    },
    sideHeader:{
        textAlign: 'center',
        color: 'white'
    },
    pageIcon: {
        display: 'flex',
        flexDirection: 'inherit',
        padding: theme.spacing(1),
        color: '#3c44b1',
        margin: theme.spacing(1),
    },
    pageTitle: {
        paddingLeft: theme.spacing(4),
        '& .MuiTypography-subtitle2': {
            opacity: '0.6'
        }
    }
}))

export default function SideMenu(props) {

    const { titleRow, subtitleRow, numberRow, iconRow, titleCol, subtitleCol, numberCol, iconCol, titleForage, status, subtitle3, keysInUse, iconStorage  } = props;
    const classes = useStyles();
 
    return (
        <div className={classes.sideMenu}>
            <h1 className={ classes.sideHeader }>Datagrid Data</h1>
          
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>
                    {iconRow}
                    <div className={classes.pageTitle}>
                        <Typography
                            variant="h6"
                            component="div">
                            {titleRow}
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            component="div">
                            {subtitleRow}-{numberRow}
                        </Typography>
                    </div>
                </Card>
            </div>
            <hr />
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>
                    {iconCol}
                    <div className={classes.pageTitle}>
                        <Typography
                            variant="h6"
                            component="div">
                            {titleCol}
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            component="div">
                            {subtitleCol}-{numberCol}
                        </Typography>
                    </div>
                </Card>
            </div>
            <hr />
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>
                    {iconStorage}
                    <div className={classes.pageTitle}>
                        <Typography
                            variant="h6"
                            component="div">
                            {titleForage}
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            component="div">
                            {subtitle3}-{status === true? "Inactive": "Active"}
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            component="div">
                            {'Keys in use: '}{keysInUse}
                        </Typography>
                    </div>
                </Card>
            </div>

        </div>
    )
}


