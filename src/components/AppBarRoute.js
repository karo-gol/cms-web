import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import { Link, Route } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import PhotoIcon from '@material-ui/icons/Photo';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import InfoIcon from '@material-ui/icons/Info';
import FaceIcon from '@material-ui/icons/Face';

import { setAccessToken } from '#root/helpers/accessToken';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    arrow: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2)      
    },
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
    root: {
        display: 'flex',
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
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',       
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(6) + 1,       
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
    content: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    listItem: {
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: theme.spacing(1) + 2,
      paddingRight: theme.spacing(1) + 2,
    },
    listItemIcon: {
      minWidth: theme.spacing(5),
    },
    backToTopAnchor: {
      width: 1,
      height: 1
    },
    loginIcon: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    loginPopoverText: {
      padding: 4,
      fontSize: 12
    },
    loginPopover: {
      marginTop: -8
    }
  })
);
  
const ScrollTop = (props) => {   
    const { children } = props;
    const classes = useStyles();
   
    const trigger = useScrollTrigger({   
      disableHysteresis: true,
      threshold: 100,
    });
  
    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
  
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
  
    return (
      <Zoom in={trigger}>
        <div onClick={handleClick} role='presentation' className={classes.arrow}>
          {children}
        </div>
      </Zoom>
    );
};

const mutation = gql`
  mutation {
    logoutUser
  }
`;

const query = gql`
  {
    me {
      login
    }
  }
`;

const AppBarRoute = (props) => {
    const classes = useStyles();  
    const [logoutUser, { client }] = useMutation(mutation);
    const [open, setOpen] = useState(false);
    const { data, loading, error } = useQuery(query);
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();

    if (error) {
      throw new Error(error);
    }

    if(loading) {
      return <div>loading...</div>
    }

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const onLogoutClick = async () => {
      await logoutUser();
      setAccessToken('');
      history.push('/');
      await client.resetStore();      
    };    

    const handleLoginClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleLoginClose = () => {
      setAnchorEl(null);
    };

    const openLoginIcon = Boolean(anchorEl);
    const id = openLoginIcon ? 'simple-popover' : undefined;
        
    return (
        <div className={classes.root}>            
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
                      <Button to='/' color='inherit' component={Link} onClick={onLogoutClick}>Sign out</Button>                    
                      {data && data.me ? (                        
                        <div>
                          <IconButton 
                            aria-describedby={id} 
                            color='inherit' 
                            aria-label='you are signed in' 
                            onClick={handleLoginClick}>
                              <FaceIcon />
                          </IconButton>
                          <Popover 
                            className={classes.loginPopover}                           
                            id={id}
                            open={openLoginIcon}
                            anchorEl={anchorEl}
                            onClose={handleLoginClose}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'center',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'center',
                            }}>
                                <Typography className={classes.loginPopoverText}>
                                  You are signed in as <strong>{data.me.login}</strong>.
                                </Typography>
                            </Popover>
                        </div>
                       ) : undefined} 
                    </div>

                </Toolbar>
            </AppBar>   
            <Toolbar disableGutters id='back-to-top-anchor' className={classes.backToTopAnchor}/>       

            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {[classes.drawerOpen]: open, [classes.drawerClose]: !open })}
                classes={{ paper: clsx({[classes.drawerOpen]: open, [classes.drawerClose]: !open })}} >
                  
                  <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                      <ChevronLeftIcon />
                    </IconButton>
                  </div>

                <Divider />

                <List>
                  
                    <ListItem disableGutters className={classes.listItem} button key='Users'>
                      <ListItemIcon className={classes.listItemIcon}><PeopleIcon /></ListItemIcon>
                      <ListItemText primary='Users' />
                    </ListItem>

                    <ListItem disableGutters className={classes.listItem} button key='Home page'>
                      <ListItemIcon className={classes.listItemIcon}><HomeIcon /></ListItemIcon>
                      <ListItemText primary='Home page' />
                    </ListItem>

                    <ListItem disableGutters className={classes.listItem} button key='Album names'>
                      <ListItemIcon className={classes.listItemIcon}><PhotoAlbumIcon /></ListItemIcon>
                      <ListItemText primary='Album names' />
                    </ListItem>

                    <ListItem disableGutters className={classes.listItem} button key='Photos'>
                      <ListItemIcon className={classes.listItemIcon}><PhotoIcon /></ListItemIcon>
                      <ListItemText primary='Photos' />
                    </ListItem>

                    <ListItem disableGutters className={classes.listItem} button key='News'>
                      <ListItemIcon className={classes.listItemIcon}><InboxIcon /></ListItemIcon>
                      <ListItemText primary='News' />
                    </ListItem>

                    <ListItem disableGutters className={classes.listItem} button key='Info page'>
                      <ListItemIcon className={classes.listItemIcon}><InfoIcon /></ListItemIcon>
                      <ListItemText primary='Info page' />
                    </ListItem>
                
                </List>

                <Divider />
               
            </Drawer>              
           
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

export default AppBarRoute;
