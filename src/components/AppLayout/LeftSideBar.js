import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton 
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import PhotoIcon from '@material-ui/icons/Photo';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import InfoIcon from '@material-ui/icons/Info';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({    
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
    listItem: {
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: theme.spacing(1) + 2,
      paddingRight: theme.spacing(1) + 2,
    },
    listItemIcon: {
      minWidth: theme.spacing(5),
    },
  })
);

const LeftSideBar = (props) => {
    const classes = useStyles();    
    const { open, handleDrawerClose } = props;
    
    return ( 
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
    );    
};

export default LeftSideBar;
