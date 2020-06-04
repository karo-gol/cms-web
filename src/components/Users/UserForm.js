import React, { useState, useEffect } from 'react';
import { 
    Paper, 
    FormHelperText, 
    TextField, 
    Button,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/react-hooks';
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
    center: {
        display: 'flex',
        justifyContent: 'space-around'
    }
}));

const ADD_USER = gql`
    mutation($login: String!, $email: String!, $password: String!) {
        createUser(login: $login, email: $email, password: $password) {
            ok
            error
        }
    }
`;

const EDIT_USER = gql`
    mutation($id: ID!, $login: String!, $email: String!, $password: String!) {
        updateUser(id: $id, login: $login, email: $email, password: $password) {
            ok
            error
        }
    }
`;

let renderCount = 0;

const UserForm = (props) => {
    const classes = useStyles();   
    const { selectedUser, onReset, title, onRefresh } = props;   

    const [createUser] = useMutation(ADD_USER);
    const [editUser] = useMutation(EDIT_USER);
    
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

    const { handleSubmit, errors, reset, setValue, control } = useForm({
        defaultValues: {
            login: '',
            email: '',
            password: ''
        }
    });       

    const [successInfo, setSuccessInfo] = useState('');   

    const onSubmit = handleSubmit( async ({login, email, password}) => {
        try {            
            let response;                   

            if(selectedUser) {
                console.log('edit');
                response = await editUser({
                    variables: {
                        id: selectedUser.id,
                        login: login,
                        email: email,
                        password: password
                    }
                });                
            } else {
                console.log('create');
                response = await createUser({
                    variables: {
                        login: login,
                        email: email,
                        password: password
                    }
                }); 
            }           

            if(!response || !response.data) {
                setOpenErrorInfo(true);
            }

            let ok;
            let errorMessage;

            if(response.data.createUser) {
                ok = response.data.createUser.ok;
                errorMessage = response.data.createUser.error;
                setSuccessInfo('You have added new user successfully.');               
                //setTitle('Add user');
            } else {
                ok = response.data.updateUser.ok;
                errorMessage = response.data.updateUser.error;
                setSuccessInfo('The user has been edited successfully.');              
                //setTitle('Edit user');
            }

            if(ok) {
                setOpenSuccessInfo(true);
                onRefresh();
            } else {
                setOpenErrorInfo(true);
                setErrorInfo(errorMessage);               
            }

            onResetForm();         
        } catch (err) {
            setOpenErrorInfo(true);
            console.log(err);
            setErrorInfo(err.message);
        }
    });       

    const onResetForm = () => {
        reset();
        onReset();
    };

    useEffect(() => {     
        if(selectedUser) {
            console.log('in effect');
            setValue('login', selectedUser.login, true);
            setValue('email', selectedUser.email, true);
            setValue('password', '1234', true);
        }
    }, [selectedUser]);

    renderCount++;
    console.log('UserForm render = ' + renderCount);

    return (
        <Paper className={classes.main} elevation={3}>

            <SimpleSnackbar open={openSuccessInfo} action='success' onClose={handleCloseInfo}>
                {successInfo}
            </SimpleSnackbar>
            <SimpleSnackbar open={openErrorInfo} action='error' onClose={handleCloseInfo}>
                {errorInfo ? errorInfo : 'The error has occured while editing the user.'}
            </SimpleSnackbar>

            <Typography variant='h5'>{title}</Typography>

            <form onSubmit={onSubmit} noValidate>
                <div className={classes.formInput}>
                    <div>
                        <Controller 
                            as={
                                <TextField
                                    margin='normal'
                                    required
                                    width='250'
                                    id='login'
                                    label='Login'
                                    name='login'
                                    autoComplete='new-login'
                                    autoFocus
                                />
                            }                                             
                            control={control}                            
                            name='login'
                            rules={{ required: 'Login is required!' }}                            
                        />
                        {/* <TextField
                            defaultValue=''
                            margin='normal'
                            required
                            width='250'
                            id='login'
                            label='Login'
                            name='login'
                            autoComplete='new-login'
                            autoFocus
                            inputRef={register({ required: 'Login is required!' })}                            
                        /> */}
                        <FormHelperText error={Boolean(errors.login)}>{errors.login?.message}</FormHelperText>
                    </div> 
                    <div>
                        <Controller 
                            as={
                                <TextField
                                    margin='normal'
                                    required
                                    width='250'
                                    id='email'
                                    label='Email'
                                    name='email'
                                    autoComplete='new-email'                  
                                />
                            }                                                 
                            control={control}                            
                            name='email'
                            rules={{ required: 'Email is required!', pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: 'Invalid email address!' }}}                            
                        />
                        {/* <TextField
                            margin='normal'
                            required
                            width='250'
                            id='email'
                            label='Email'
                            name='email'
                            autoComplete='email'                           
                            inputRef={register({ required: 'Email is required!', pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Invalid email address!'
                                }})                            
                            } 
                            //InputLabelProps={{ shrink }}
                        /> */}
                        <FormHelperText error={Boolean(errors.email)}>{errors.email?.message}</FormHelperText>
                    </div> 
                    <div>
                        <Controller 
                            as={
                                <TextField            
                                    margin='normal'
                                    required
                                    width='250'
                                    name='password'
                                    label='Password'
                                    type='password'
                                    id='password'
                                    autoComplete='current-password'                                                       
                                />
                            }                                                   
                            control={control}                            
                            name='password'
                            rules={{ required: 'Password is required!' }}                            
                        />
                        {/*  <TextField            
                             margin='normal'
                             required
                             width='250'
                             name='password'
                             label='Password'
                             type='password'
                             id='password'
                             autoComplete='current-password'                           
                             inputRef={register({ required: 'Password is required!' })}
                             //InputLabelProps={{ shrink }}                      
                         />      */}
                        <FormHelperText error={Boolean(errors.password)}>{errors.password?.message}</FormHelperText>
                    </div> 
                </div>
                <div className={classes.center}>
                    <Button
                        type='submit'                    
                        variant='contained'
                        color='primary' 
                        className={classes.submit}                   
                    >
                        Save 
                    </Button> 
                    <Button
                        type='reset'                                           
                        variant='contained'
                        color='primary' 
                        className={classes.submit}     
                        onClick={(event) => onResetForm()}              
                    >
                        Cancel
                    </Button>                   
                </div>
            </form>

        </Paper>
    );
};

export default UserForm;
//export default React.memo(UserForm, areEqual);