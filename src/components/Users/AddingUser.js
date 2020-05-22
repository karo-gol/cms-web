import React from 'react';
import Paper from '@material-ui/core/Paper';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';

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


const AddingUser = () => {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = handleSubmit( async ({login, email, password}) => {

    });

    return (
        <Paper className={classes.main} elevation={3}>
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

export default AddingUser;