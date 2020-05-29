import React from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    arrow: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2)      
    },
}));

const ScrollTop = (props) => {   
    const { children } = props;
    const classes = useStyles();
   
    const trigger = useScrollTrigger({   
      disableHysteresis: true,
      threshold: 100,
    });
  
    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
  
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
  
    return (
      <Zoom in={trigger}>
        <div onClick={handleClick} role='presentation' className={classes.arrow}>
          {children}
        </div>
      </Zoom>
    );
};

export default ScrollTop;