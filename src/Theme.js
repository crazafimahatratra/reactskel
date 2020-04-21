import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#0077B3",
        },
        secondary: {
            main: "#FF8900",
        },
        text: {
            primary: "#4D4D4D",
        }
    },
    typography: {
        fontSize: 14
    }
});

export default theme;