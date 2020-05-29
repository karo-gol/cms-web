import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
    //fontSize: 40,
    //fontFamily: 'Raleway, Arial',
    palette: {
        primary: {
            light: '#e33371',
            main: '#dc004e',
            dark: '#9a0036',           
        },
        secondary: {
            light: '#e0e0e0',
            main: '#9e9e9e',
            dark: '#424242',           
        },        
    },
    // typography: {
    //     fontFamily: 'Raleway, Arial',
    //     fontSize: 14
    // }
});

export default theme;