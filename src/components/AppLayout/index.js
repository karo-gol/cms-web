import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
     Toolbar,
     Container,
     Fab
} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Route } from 'react-router-dom';

import TopAppBar from './TopAppBar';
import LeftSideBar from './LeftSideBar';
import ScrollTop from './ScrollTop';

const useStyles = makeStyles((theme) => ({  
    root: {
        display: 'flex',
    },
    backToTopAnchor: {
        width: 1,
        height: 1
    },
    content: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    toolbar: {        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        [theme.breakpoints.up('xs')]: {
          minHeight: theme.spacing(6)
        }
    },
}));

const AppLayout = (props) => {
    const classes = useStyles();    
    const [open, setOpen] = useState(false);
    
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
    
    return (
        <div className={classes.root}>  

            <TopAppBar open={open} handleDrawerOpen={handleDrawerOpen} />           
            <Toolbar disableGutters id='back-to-top-anchor' className={classes.backToTopAnchor} /> 

            <LeftSideBar open={open} handleDrawerClose={handleDrawerClose} />

            <Container>
                <main className={classes.content}>
                  <div className={classes.toolbar} />
                                      
                    <Route {...props} />

                </main>
            </Container>

            <ScrollTop {...props}>
                <Fab color='primary' size='small' aria-label='scroll back to top'>
                  <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>  

        </div>
    );
};

export default AppLayout;