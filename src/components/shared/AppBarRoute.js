import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import { Link, Route } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { setAccessToken } from '#root/helpers/accessToken';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2)      
    },
    header: {
        display: 'flex',
        justifyContent: 'flex-end'
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
        <div onClick={handleClick} role='presentation' className={classes.root}>
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

const AppBarRoute = (props) => {
    const classes = useStyles();  
    const [logoutUser, { client }] = useMutation(mutation);

    const onLogoutClick = async () => {
      await logoutUser();
      setAccessToken('');
      await client.resetStore();
    };
        
    return (
        <div>            
            <AppBar>
                <Toolbar className={classes.header}>
                    <Button to='/' color='inherit' component={Link} onClick={onLogoutClick}>Sign out</Button>
                    <Button to='/test' color='inherit' component={Link}>Test</Button>
                    <Button to='/home' color='inherit' component={Link}>Home</Button>
                </Toolbar>
            </AppBar>             
            <Toolbar id='back-to-top-anchor' />
            <Container>
                    
                <Route {...props} />
    
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
