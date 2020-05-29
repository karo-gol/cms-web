import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import {
    Paper,        
    TablePagination,      
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CustomTable from '../shared/Table';
import { ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from './constants';
import Loading from '../shared/Loading';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3)
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
      format: (value) => value.toLocaleString('en-US'),
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


let renderCount = 0;

const UserTable = () => {
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

    const { data, fetchMore, loading, error } = useQuery(GET_USERS, 
        { 
            variables: { 
                offset: 0, 
                limit: rowsPerPage,
                order: order,
                orderBy: orderBy,
                searchText: searchText
            },
            fetchPolicy: 'cache-and-network',
            notifyOnNetworkStatusChange: true          
        }
    );    
  
    if (error) throw new Error(error);
    if (loading) return <Loading />;

    renderCount++;
    console.log(renderCount);
    //console.log(data.users);        

    return (
        <Paper className={classes.root} elevation={3}>
            <CustomTable 
                columns={columns}
                rows={data.users.rows}
                withActions={true}
                page={page}        
                rowsPerPage={rowsPerPage}  
                order={order}
                orderBy={orderBy}     
                onSort={handleRequestSort}
                searchText={searchText}
                onSearch={handleSearchOnChange}
            />
           
            <TablePagination
                rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                component="div"
                count={data.users.count}              
                rowsPerPage={rowsPerPage}
                page={page}                           
                onChangePage={async (event, newPage) => {
                    await fetchMore({
                        variables: {
                            offset: data.users.rows.length                              
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            handleChangePage(event, newPage);

                            if (!fetchMoreResult) return prev;                   
                           
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

export default UserTable;