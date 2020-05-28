import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const SimpleSnackbar = (props) => {
    const { open, action, onClose, children } = props;    

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity={action}>
                {children}
            </Alert>
        </Snackbar>
    );
};

export default SimpleSnackbar;