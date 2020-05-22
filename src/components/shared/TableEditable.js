import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, fade } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    container: {
        maxHeight: 400,
    },
    columnHeader: {
        backgroundColor: 'white'
    },
    actions: {
        display: 'flex',
        alignItems: 'center'
    },
    cell: {
        padding: theme.spacing(0, 2)
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
    search: { 
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',           
        marginRight: theme.spacing(2),        
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 3),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {       
        backgroundColor: fade(theme.palette.secondary.light, 0.15), '&:hover': {
            backgroundColor: fade(theme.palette.secondary.light, 0.25),
        },
        margin: theme.spacing(2),
        borderRadius: 5,
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),        
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,        
        transition: theme.transitions.create('width'),
        width: '20%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
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

function search(rows, searchedText) {    
    let filteredRows = [];
    for(let item of rows) {
        let rowValues = Object.values(item);
        let foundedText = rowValues.filter(r => String(r).includes(searchedText));
        if(foundedText && foundedText.length > 0) {
            filteredRows.push(item);
        } 
    }
    
    return filteredRows;
}

const TableEditable = (props) => {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);        

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const { columns, rows, withActions, sortable, searchable } = props;   

    const handleRequestSort = (property) => (event) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const [currentRows, setCurrentRows] = useState(rows);
    const [searchedText, setSearchedText] = useState('');

    const handleSearchOnChange = (event) => {
        setSearchedText(event.target.value);       
        const data = search(rows, event.target.value);
        setCurrentRows(data);
    };
    
    return (

        <Paper className={classes.root} elevation={3}>
            {searchable ? (
            <div className={classes.search}>                
                <div>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase                        
                        placeholder="Search..."
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchedText}
                        onChange={handleSearchOnChange}
                    />
                </div>
            </div>) : null}
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow >
                        {withActions ? (
                            <TableCell className={classes.columnHeader}
                                key='actions' align='center' style={{ minWidth: 100 }}>
                                    <Typography color='primary' variant='button'><strong>Actions</strong></Typography>
                            </TableCell>
                        ) : null}
                        {columns.map((column) => (
                            <TableCell className={classes.columnHeader}
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                {sortable ? (
                                <TableSortLabel
                                    active={orderBy === column.id}
                                    direction={orderBy === column.id ? order : 'asc'}
                                    onClick={handleRequestSort(column.id)}
                                >
                                    <Typography color='primary' variant='button'><strong>{column.label}</strong></Typography>
                                    {orderBy === column.id ? (
                                        <span className={classes.visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                    ) : null}
                                </TableSortLabel>
                                ) : (
                                    <Typography color='primary' variant='button'><strong>{column.label}</strong></Typography>
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>                  
                        {stableSort(currentRows, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {withActions ? (
                                        <TableCell key='actions' align='center' className={classes.cell}>
                                            <IconButton color='inherit' aria-label='edit' edge='start'>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color='inherit' aria-label='delete' edge='start'>
                                                <DeleteIcon />
                                            </IconButton>                               
                                        </TableCell>
                                    ) : null}
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
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={currentRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper> 

    );
};

export default TableEditable;