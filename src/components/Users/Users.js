import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';

import TableEditable from '../shared/TableEditable';
import AddingUser from './AddingUser';


const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'login', label: 'Login', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 250 },
  {
    id: 'creationDate',
    label: 'Creation date',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },  
];

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing(3)
//   },
//   container: {
//     maxHeight: 440,
//   },
//   columnHeader: {
//     backgroundColor: 'white'
//   },
//   actions: {
//     display: 'flex',
//     alignItems: 'center'
//   }
// }));

const rows = [
  { id: 1, login: 'karolina', email: 'golba@gmail.com', creationDate: '2020-05-01 15:00' },
  { id: 2, login: 'alek', email: 'aleksandergolba@gmail.com', creationDate: '2020-03-23 12:34' },
  { id: 3, login: 'karolina', email: 'golba@gmail.com', creationDate: '2020-05-01 15:00' },
  { id: 4, login: 'alek', email: 'aleksandergolba@gmail.com', creationDate: '2020-03-23 12:34' },
  { id: 5, login: 'karolina', email: 'golba@gmail.com', creationDate: '2020-05-01 15:00' },
  { id: 6, login: 'alek', email: 'aleksandergolba@gmail.com', creationDate: '2020-03-23 12:34' },
  { id: 7, login: 'karolina', email: 'golba@gmail.com', creationDate: '2020-05-01 15:00' },
  { id: 8, login: 'alek', email: 'aleksandergolba@gmail.com', creationDate: '2020-03-23 12:34' }
];


const Users = (props) => {
  
  return (
      <div>   
          <AddingUser />
          <TableEditable columns={columns} rows={rows} withActions={true} sortable={true} searchable={true} />
      </div>
    );
};

export default Users;