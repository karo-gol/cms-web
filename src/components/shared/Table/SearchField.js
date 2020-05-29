import React, { useEffect, useRef } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
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
        color: theme.palette.secondary.main
    },
    inputRoot: {       
        backgroundColor: fade(theme.palette.primary.light, 0.15), '&:hover': {
            backgroundColor: fade(theme.palette.primary.light, 0.25),
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

const SearchField = (props) => {
    const classes = useStyles();
    const { searchText, onChange } = props;
    const searchInput = useRef(null);
    
    useEffect(() => {
        if(searchText !== '') {
            searchInput.current.focus();                  
        }
    }, [searchText]);

    return (
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
                    value={searchText}
                    onChange={onChange}
                    inputRef={searchInput}
                />
            </div>
        </div>
    );
};

export default SearchField;