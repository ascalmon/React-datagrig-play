import React, { useContext, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from "@material-ui/core";
import Grid from '@mui/material/Grid';
import { Badge, IconButton, InputBase } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SearchIcon from '@mui/icons-material/Search';
import { UserContext } from '../contexts/UserContext';





// withStyles & makeStyles



const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fff !important',
        transform: 'translateZ(0)'
    },
    searchInput: {
        opacity: '0.6',
        padding: '0px 8px',
        fontSize: '0.8rem',
        '&:hover': {
            backgroundColor: '#f2f2f2'
        },
        '& .MuiSvgIcon-root': { // If there is an icon (copied from the search icon), please apply margin 8px
            marginRight: theme.spacing(1)   // spacing(1) = '8px'
        }
    }
}))

export default function Header(props) {

    //console.log('Header - Props', props)

    const classes = useStyles();

    const { search, setSearch } = useContext(UserContext)

    const handleSearchChange = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }
    // console.log('Teste', teste, newValue)
    return (
        <>
        {/* <div style={{color: theme.syntax, background: theme.bg}} >
                <p>Antonio Calmon </p>
        </div> */}
       
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container 
                    alignItems='center'>
                    <Grid item>
                        <InputBase 
                            className={classes.searchInput}
                            placeholder='Search topics' 
                            startAdornment = {<SearchIcon fontSize='small'/> }
                            value = { search }
                            onChange={handleSearchChange}  />
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item >
                        <IconButton>
                            <Badge badgeContent = {4} color="secondary">
                                <NotificationsNoneIcon fontSize='small'/>
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Badge badgeContent={3} color="primary">
                                <ChatBubbleOutlineIcon fontSize='small'/>
                            </Badge>
                        </IconButton>
                            
                        <IconButton>
                            <PowerSettingsNewIcon fontSize='small'/>
                        </IconButton>
                    </Grid>

                </Grid>
            </Toolbar>
        </AppBar>
        
    </>
    )
}
