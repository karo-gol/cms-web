import React from 'react';
import {
    AppBar,
    Button,    
    Toolbar,
    Tooltip,
    IconButton
 } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import FaceIcon from '@material-ui/icons/Face';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import clsx from 'clsx';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { setAccessToken } from '#root/helpers/accessToken';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    header: {        
        display: 'flex',
        padding: theme.spacing(0, 2)       
    },
    headerIcon: {
      justifyContent: 'space-between'
    },
    headerLinks: {      
      justifyContent: 'flex-end'
    },
    appBar: {        
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    loginIcon: {
        display: 'flex',
        justifyContent: 'flex-end'
    },      
}));

const query = gql`
  {
    me {
      login
    }
  }
`;

const mutation = gql`
  mutation {
    logoutUser
  }
`;

const TopAppBar = (props) => {
    const classes = useStyles();
    const { open, handleDrawerOpen } = props;
    const history = useHistory();
    const [logoutUser, { client }] = useMutation(mutation);
    const onLogoutClick = async () => {
        await logoutUser();
        setAccessToken('');
        history.push('/');
        await client.resetStore();      
    };    

    const { data, loading, error } = useQuery(query);

    if (error) throw new Error(error);  
    if(loading) return null;      

    return (
        <AppBar 
            position="fixed"
            className={clsx(classes.appBar, {[classes.appBarShift]: open })} >
            
            <Toolbar 
                disableGutters
                variant='dense' 
                className={clsx(classes.header, {[classes.headerIcon]: !open, [classes.headerLinks]: open })} >

                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx({[classes.hide]: open })} >
                    <MenuIcon />
                </IconButton>

                <div className={classes.loginIcon}>

                    {data && data.me ? (                        
                        <div>
                            <Tooltip title={`You are signed in as ${data.me.login}.`} arrow>
                                <IconButton                                     
                                    color='inherit' 
                                    aria-label='you are signed in'>                                 
                                    <FaceIcon />
                                </IconButton>
                            </Tooltip>                            
                        </div>
                        ) : null} 
                    <Button to='/' color='inherit' component={Link} onClick={onLogoutClick}>Sign out</Button>                    
                    
                </div>

            </Toolbar>
        </AppBar>  
    );
};

export default TopAppBar;