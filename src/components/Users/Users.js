import React, { useState, createRef } from 'react';
import gql from 'graphql-tag';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';

import UserForm from './UserForm';
import UserTable from './UserTable';
import SimpleDialog from '../shared/SimpleDialog';
import SimpleSnackbar from '../shared/SimpleSnackbar';

const DELETE_USER = gql`
    mutation($id: ID!) {
        deleteUser(id: $id) {
            ok
            error
        }
    }
`;

const GET_USER = gql`
    query($id: ID!) {
        user(id: $id) {
            id
            login
            email           
        }
    }
`;

const Users = (props) => { 
    const [editableUser, setEditableUser] = useState(null);    
    //const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [disabled, setDisabled] = useState(false); 
    const [title, setTitle] = useState('Add user'); 
    const [questionOpen, setQuestionOpen] = useState({id: 0, open: false});
    //const [deleted, setDeleted] = useState(false);
    const [deleteUser] = useMutation(DELETE_USER);
    const [openSuccessInfo, setOpenSuccessInfo] = useState(false);    
    const [openErrorInfo, setOpenErrorInfo] = useState(false);
    const [errorInfo, setErrorInfo] = useState('');
    const [successInfo, setSuccessInfo] = useState('');
   
    let refetchMethod = null;   
   
    const [getUser, { error }] = useLazyQuery(GET_USER, {
        fetchPolicy: 'network-only',
        onCompleted: (d) => { 
            setEditableUser(d.user);
            setDisabled(true);
            setTitle('Edit user');
            //forceUpdate();          
        }
    });
   
    if(error) throw new Error(error);  
    //if(loading) return <div>loading...</div>;    

    const handleResetForm = () => {
        setEditableUser(null);       
        setDisabled(false);
        setTitle('Add user');
    };    

    const handleEditButton = (event, id) => {     
        getUser({ variables: { id: id } });       
    };

    const handleDeleteButton = (event, id) => {
        setQuestionOpen({id: id, open: true});     
        setDisabled(true);
    };      

    const handleTableRefresh = () => {          
        if(refetchMethod) refetchMethod();
    };    

    const handlePassRefetch = (refetch) => {
        refetchMethod = refetch;        
    };

    const handleClickOnClose = () => {
        setQuestionOpen({id: 0, open: false});  
        setDisabled(false);     
    };

    const handleClickOnConfirm = async () => {       

        if(questionOpen.id === 0) {
            setOpenErrorInfo(true);
            setErrorInfo('There is a problem with the selected user.'); 
            return;
        }
        setDisabled(false);

        try {
            const response = await deleteUser({
                variables: {
                    id: questionOpen.id
                }
            });
    
            if(!response || !response.data) {
                setOpenErrorInfo(true);               
            }      

            if(response.data.deleteUser.ok) {
                setOpenSuccessInfo(true);
                setSuccessInfo('The user has been deleted succesfully.');
               
                handleTableRefresh();
            } else {
                setOpenErrorInfo(true);
                setErrorInfo(response.data.deleteUser.error);               
            }
    
        } catch (err) {
            setOpenErrorInfo(true);
            setErrorInfo(err.message);  
            //console.log(err);     
        }

        setQuestionOpen({id: 0, open: false});
    };    

    const handleCloseInfo = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        if(openSuccessInfo) setOpenSuccessInfo(false);
        if(openErrorInfo) setOpenErrorInfo(false);
    }; 

      
    
    console.log('Users render');    

    return (
        <div>     
            <SimpleSnackbar open={openSuccessInfo} action='success' onClose={handleCloseInfo}>
                {successInfo}
            </SimpleSnackbar>
            <SimpleSnackbar open={openErrorInfo} action='error' onClose={handleCloseInfo}>
                {errorInfo ? errorInfo : 'The error has occured while deleting the user.'}
            </SimpleSnackbar>

            <UserForm 
                selectedUser={editableUser}
                onReset={handleResetForm}
                title={title}
                onRefresh={handleTableRefresh}               
            />         
            <UserTable                            
                onEdit={handleEditButton} 
                onDelete={handleDeleteButton}                
                disabled={disabled}  
                passRefetch={handlePassRefetch}              
            />
            <SimpleDialog 
                open={questionOpen.open} 
                onClose={handleClickOnClose}
                onConfirm={handleClickOnConfirm}
                question={true}
                action='warning' 
                title='Question!'> 
                Do you really want to delete the selected user?
            </SimpleDialog>                 
        </div>
    );
};

export default Users;