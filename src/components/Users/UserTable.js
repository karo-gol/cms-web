import React, { useState, memo } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import {
    Paper,        
    TablePagination,      
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import CustomTable from '../shared/Table';
import { ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from './constants';
import { formatDate } from '#root/helpers/formatDateTime';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    disabled: {
        pointerEvents: 'none', 
        opacity: '0.4'
    }    
}));

const columns = [
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'login', label: 'Login', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 250 },
    {
      id: 'createdAt',
      label: 'Creation date',
      minWidth: 170,
      align: 'right',
      format: (value) => formatDate(value),
    },  
];  


const GET_USERS = gql`
    query($offset: Int!, $limit: Int!, $order: String!, $orderBy: String!, $searchText: String!) {
        users(offset: $offset, limit: $limit, order: $order, orderBy: $orderBy, searchText: $searchText) 
        @connection(key: "users", filter: ["orderBy"])
        {         
            rows {
                id
                login
                email
                createdAt                
            }
            count          
        }
    }
`;

const areEqual = (prevProps, nextProps) => {    
    console.log('in memo');
    if(prevProps.disabled !== nextProps.disabled) {
        return false;
    }
    return true;
};

let renderCount = 0;

const UserTable = ({ onEdit, onDelete, disabled, passRefetch }) => {
    const classes = useStyles();        

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE); 

    const handleChangePage = (event, newPage) => {
        setPage(newPage);        
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);    
    }; 

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');   

    const handleRequestSort = (property) => (event) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const [searchText, setSearchText] = useState('');

    const handleSearchOnChange = (event) => {
        setSearchText(event.target.value);         
    };

    const { data, fetchMore, error, refetch } = useQuery(GET_USERS, 
        { 
            variables: {
                offset: 0, 
                limit: rowsPerPage,
                order: order,
                orderBy: orderBy,
                searchText: searchText               
            },
            fetchPolicy: 'cache-and-network',
            notifyOnNetworkStatusChange: false            
        }
    );    
  
    if(error) throw new Error(error);
    //if(loading) return <Loading />; 
    
    let users = [];
    let count = 0;
    
    if (data && data.users) {       
        users = data.users.rows;
        count = data.users.count;
        passRefetch(refetch);
    }   

    

    renderCount++;
    console.log('UserTable render = ' + renderCount); 
     
    return (
        <Paper className={clsx(classes.root, {[classes.disabled]: disabled})} elevation={3}>
            {/* <button hidden ref={ref} onClick={(e) => refetch()}  /> */}
            <CustomTable 
                columns={columns}
                rows={users}
                withActions={true}
                page={page}        
                rowsPerPage={rowsPerPage}  
                order={order}
                orderBy={orderBy}     
                onSort={handleRequestSort}
                searchText={searchText}
                onSearch={handleSearchOnChange}
                onEdit={onEdit}
                onDelete={onDelete}
                disabled={disabled}              
            />
           
            <TablePagination
                rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                component="div"
                count={count}              
                rowsPerPage={rowsPerPage}
                page={page}    
                //onChangePage={handleChangePage}                       
                onChangePage={async (event, newPage) => {
                    await fetchMore({
                        variables: {
                            offset: users.length                              
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            handleChangePage(event, newPage);

                            if (!fetchMoreResult) { console.log('uwaga'); return prev; }                   
                           
                            const result = Object.assign({}, prev, {
                                users: {
                                    ...prev.users,
                                    rows: [...prev.users.rows, ...fetchMoreResult.users.rows]
                                }
                            });

                            return result;
                        }                    
                    })                  
                }}
                onChangeRowsPerPage={handleChangeRowsPerPage}                
            />
        </Paper>
    );
};

//export default UserTable;
export default memo(UserTable, areEqual);