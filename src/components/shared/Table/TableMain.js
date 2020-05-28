import React from 'react';
import {
    TableBody,
    TableRow,
    TableCell,
    IconButton    
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    cell: {
        padding: theme.spacing(0, 2)
    },
}));

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}
  
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
  
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const ActionButtons = () => {
    return (
        <div>
            <IconButton color='inherit' aria-label='edit' edge='start'>
                <EditIcon />
            </IconButton>
            <IconButton color='inherit' aria-label='delete' edge='start'>
                <DeleteIcon />
            </IconButton>    
        </div>
    );
};

const TableMain = (props) => {
    const classes = useStyles();
    const {rows, columns, order, orderBy, page, rowsPerPage, withActions} = props;

    return (
        <TableBody>                  
            {stableSort(rows, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {withActions && (
                            <TableCell key='actions' align='center' className={classes.cell}>
                                <ActionButtons />                                       
                            </TableCell>
                        )}
                        {columns.map((column) => {
                            const value = row[column.id];
                            return (
                                <TableCell key={column.id} align={column.align} className={classes.cell}>
                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                );
            })}
        </TableBody>
    );
};

export default TableMain;