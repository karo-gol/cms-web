import React from 'react';
import {
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
}));

const TableHeader = (props) => {
    const classes = useStyles();
    const {columns, withActions, orderBy, order, handleRequestSort} = props;    

    return (
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
                                onClick={handleRequestSort(column.id)}>
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
    );
};

export default TableHeader;