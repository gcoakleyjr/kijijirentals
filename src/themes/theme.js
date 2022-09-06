import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
    palette: {
        primary: {
            main: '#5c999b',
        },
        secondary: {
            main: '#f44336',
        },
    },
});

theme = responsiveFontSizes(theme)

theme.typography.h2 = {
    fontSize: '1.575rem',
    '@media (min-width:600px)': {
        fontSize: '50px',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '54px',
    },
};

export default theme
