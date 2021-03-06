import React, { useState } from 'react';
import {    
    Table,    
    TableContainer, 
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel,
    Typography,
    TableBody,
    IconButton   
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

import { getComparator, stableSort } from '#root/helpers/sorting';
import SearchField from './SearchField';


const useStyles = makeStyles((theme) => ({   
    container: {
        maxHeight: 400,
    },
    header: {
        backgroundColor: 'white'
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },      
    cell: {
        padding: theme.spacing(0, 2)
    },
    actionsButton: {
        color: theme.palette.secondary.dark
    },
    root: {
        '&$selected': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    selected: {},    
}));


const CustomTable = (props) => {
    const classes = useStyles();   
    const [selectedId, setSelectedId] = useState();
    
    const { 
        columns, 
        rows, 
        withActions,         
        page,        
        rowsPerPage,  
        order,
        orderBy,     
        onSort,
        searchText,
        onSearch,
        onEdit,
        onDelete,
        disabled
    } = props;  
    
    //console.log('CustomTable render');
    
    return (

        <div>                     
            <SearchField searchText={searchText} onChange={onSearch} /> 

            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">                   
                    
                    <TableHead>
                        <TableRow>
                            {withActions && (
                                <TableCell className={classes.header}
                                    key='actions' align='center' style={{ minWidth: 100 }}>
                                        <Typography color='primary' variant='button'><strong>Actions</strong></Typography>
                                </TableCell>
                            )}
                            {columns.map((column) => (
                                <TableCell className={classes.header}
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    sortDirection={orderBy === column.id ? order : false}>                                     
                                        <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={orderBy === column.id ? order : 'asc'}
                                            onClick={onSort(column.id)}>
                                                <Typography color='primary' variant='button'><strong>{column.label}</strong></Typography>
                                                {orderBy === column.id ? (
                                                    <span className={classes.visuallyHidden}>
                                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                    </span>
                                                ) : null}
                                        </TableSortLabel>                                      
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>      

                    <TableBody>                  
                        {stableSort(rows, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return (
                                <TableRow hover                                    
                                    role="checkbox" 
                                    tabIndex={-1} 
                                    key={row.id} 
                                    selected={(selectedId === row.id && disabled) ? true : false}
                                    classes={{
                                        root: classes.root,
                                        selected: classes.selected
                                    }} 
                                >
                                    {withActions && (
                                        <TableCell key='actions' align='center' className={classes.cell}>
                                            <div className={classes.actionsButton}>
                                                <IconButton 
                                                    color='inherit' 
                                                    aria-label='edit' 
                                                    edge='start'                                                     
                                                    onClick={(event) => { setSelectedId(row.id); onEdit(event, row.id); }}>
                                                        <EditIcon />
                                                </IconButton>
                                                <IconButton 
                                                    color='inherit' 
                                                    aria-label='delete' 
                                                    edge='start'
                                                    onClick={(event) => onDelete(event, row.id)}>
                                                        <DeleteIcon />
                                                </IconButton>    
                                            </div>                           
                                        </TableCell>
                                    )}
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align} className={classes.cell}>
                                                {column.format ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    
                </Table>
            </TableContainer>         
        </div> 

    );
};

export default CustomTable;