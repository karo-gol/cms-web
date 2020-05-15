import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
        minWidth: '400px'     
      }
}));

const SimpleDialog = (props) => {  
    const classes = useStyles();
    const { 
        title, 
        info,
        onClose,
        open 
    } = props;    
  
    return (           
        <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open} >
            <Alert severity="error" className={classes.root}>
                <AlertTitle><strong>{title}</strong></AlertTitle>
                {info}
            </Alert>          
            <DialogActions>
                <Button autoFocus onClick={onClose} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>      
    );
};

export default SimpleDialog;