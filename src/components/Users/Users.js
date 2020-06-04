import React, { useState, createRef } from 'react';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';

import UserForm from './UserForm';
import UserTable from './UserTable';

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
        console.log('delete button');
       
    };      

    const handleTableRefresh = () => {       
        if(refetchMethod) refetchMethod();
    };    

    const handlePassRefetch = (refetch) => {
        refetchMethod = refetch;        
    };
    
    console.log('Users render');    

    return (
        <div>            
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
        </div>
    );
};

export default Users;