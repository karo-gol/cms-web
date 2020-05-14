import React from "react";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    errorMessage: {
      marginTop: theme.spacing(8),
      display: 'flex',
      justifyContent: 'center' 
    }
});


class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, message: '' };      
    }
  
    componentDidCatch(error, info) {
      // Display fallback UI
      this.setState({ hasError: true }); 
      if(error.message.includes("not authenticated")) {
          this.setState({ message: 'You are not authorized to view this page.'})
      }
    }
  
    render() {
      const { classes } = this.props;

      if (this.state.hasError) {       
        return <p className={classes.errorMessage}>{this.state.message ? this.state.message : 'Something went wrong.'}</p>;
      }
      return this.props.children;
    }
  }

  export default withStyles(styles, { withTheme: true })(ErrorBoundary);