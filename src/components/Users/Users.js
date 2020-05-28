import React from 'react';

import UserForm from './UserForm';
import UserTable from './UserTable';


const Users = (props) => { 
  
    return (
        <div>              
            <UserForm />
            <UserTable />           
        </div>
    );
};

export default Users;