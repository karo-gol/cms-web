import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom';

import { setAccessToken, getAccessToken } from '#root/helpers/accessToken';
import SimpleDialog from '../shared/SimpleDialog';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const Copyright = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='/'>
        CMS Project
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const mutation = gql`
    mutation($login: String!, $password: String!) {
        loginUser(login: $login, password: $password) {
            accessToken,
            user {
                userId,
                login
            }
        }
    }
`;

const SignUp = () => {
  const classes = useStyles();
  const [loginUser] = useMutation(mutation); 
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const token = getAccessToken(); 
  if(token) {
    history.push('/users');
  }

  const { register, handleSubmit, errors } = useForm(); 
  const onSubmit = handleSubmit( async ({login, password}) => {
    
      try {
        const response = await loginUser({
          variables: {
            login: login,
            password: password
          }
        });

        if(response && response.data) {
          setAccessToken(response.data.loginUser.accessToken);        
        }      
        
        history.push('/users'); 

      } catch (err) {
        setOpen(true);  
        //console.log(err);     
      }    
      
  });
  
  const handleClickOnClose = () => {
    setOpen(false);
  };
 
  return (    
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onSubmit} noValidate>
          <TextField            
            margin='normal'
            required
            fullWidth
            id='login'
            label='Login'
            name='login'
            autoComplete='login'
            autoFocus
            inputRef={register({ required: 'Login is required!' })}                 
          /> 
          <FormHelperText error={Boolean(errors.login)}>{errors.login?.message}</FormHelperText>     
          <TextField            
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            inputRef={register({ required: 'Password is required!' })}                      
          />     
          <FormHelperText error={Boolean(errors.password)}>{errors.password?.message}</FormHelperText>             
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='secondary'
            className={classes.submit}
          >
            Sign In
          </Button>        
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <SimpleDialog 
        open={open} 
        onClose={handleClickOnClose} 
        title='Error!' 
        info='Sorry, but your login or password is not correct.' />
    </Container>
  );
};

export default SignUp;