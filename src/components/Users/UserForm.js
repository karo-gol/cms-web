import React, { useState } from 'react';
import { 
    Paper, 
    FormHelperText, 
    TextField, 
    Button,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import SimpleSnackbar from '../shared/SimpleSnackbar';

const useStyles = makeStyles((theme) => ({
    main: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column'
    },
    formInput: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    submit: {
        margin: theme.spacing(5, 0, 2),
        width: 250
    },
    right: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

const mutation = gql`
    mutation($login: String!, $email: String!, $password: String!) {
        createUser(login: $login, email: $email, password: $password) {
            ok
            error
        }
    }
`;

const UserForm = () => {
    const classes = useStyles();
    
    const [createUser] = useMutation(mutation);
    
    const [openSuccessInfo, setOpenSuccessInfo] = useState(false);    
    const [openErrorInfo, setOpenErrorInfo] = useState(false);
    const [errorInfo, setErrorInfo] = useState('');

    const handleCloseInfo = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        if(openSuccessInfo) setOpenSuccessInfo(false);
        if(openErrorInfo) setOpenErrorInfo(false);
    };

    const { register, handleSubmit, errors, reset } = useForm();    

    const onSubmit = handleSubmit( async ({login, email, password}) => {
        try {
            const response = await createUser({
                variables: {
                    login: login,
                    email: email,
                    password: password
                }
            });           

            if(!response || !response.data) {
                setOpenErrorInfo(true);
            }

            if(response.data.createUser.ok) {
                setOpenSuccessInfo(true);
            } else {
                setOpenErrorInfo(true);
                setErrorInfo(response.data.createUser.error);               
            }

            reset();
        } catch (err) {
            setOpenErrorInfo(true);
            //console.log(err);
            setErrorInfo(err.message);
        }
    });    

    return (
        <Paper className={classes.main} elevation={3}>

            <SimpleSnackbar open={openSuccessInfo} action='success' onClose={handleCloseInfo}>
                You have added new user successfully.
            </SimpleSnackbar>
            <SimpleSnackbar open={openErrorInfo} action='error' onClose={handleCloseInfo}>
                {errorInfo ? errorInfo : 'The error has occured while editing the user.'}
            </SimpleSnackbar>

            <Typography variant='h5'>Add user</Typography>

            <form onSubmit={onSubmit} noValidate>
                <div className={classes.formInput}>
                    <div>
                        <TextField
                            margin='normal'
                            required
                            width='250'
                            id='login'
                            label='Login'
                            name='login'
                            autoComplete='login'
                            autoFocus
                            inputRef={register({ required: 'Login is required!' })} 
                        />
                        <FormHelperText error={Boolean(errors.login)}>{errors.login?.message}</FormHelperText>
                    </div> 
                    <div>
                        <TextField
                            margin='normal'
                            required
                            width='250'
                            id='email'
                            label='Email'
                            name='email'
                            autoComplete='email'
                            autoFocus
                            inputRef={register({ required: 'Email is required!', pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Invalid email address!'
                                } 
                            })} 
                        />
                        <FormHelperText error={Boolean(errors.email)}>{errors.email?.message}</FormHelperText>
                    </div> 
                    <div>
                        <TextField            
                            margin='normal'
                            required
                            width='250'
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            inputRef={register({ required: 'Password is required!' })}                      
                        />     
                        <FormHelperText error={Boolean(errors.password)}>{errors.password?.message}</FormHelperText>
                    </div> 
                </div>
                <div className={classes.right}>
                    <Button
                        type='submit'                    
                        variant='contained'
                        color='secondary' 
                        className={classes.submit}                   
                    >
                        Save 
                    </Button>                    
                </div>
            </form>

        </Paper>
    );
};

export default UserForm;