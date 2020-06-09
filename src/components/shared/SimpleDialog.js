import React from 'react';
import {
    Button,
    Dialog,
    DialogActions
} from '@material-ui/core';
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
        children,
        title,        
        onClose,
        open,
        action,
        question,
        onConfirm
    } = props;    
  
    return (           
        <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open} >
            <Alert severity={action} className={classes.root}>
                <AlertTitle><strong>{title}</strong></AlertTitle>
                {children}
            </Alert>          
            <DialogActions>
                {question ? 
                    (<div>
                        <Button autoFocus onClick={() => onConfirm(true)} color="primary">
                            Yes
                        </Button>
                        <Button onClick={onClose} color="primary">
                            No
                        </Button>
                    </div>)
                    :
                    <Button autoFocus onClick={onClose} color="primary">
                        OK
                    </Button>
                }
            </DialogActions>
        </Dialog>      
    );
};

export default SimpleDialog;