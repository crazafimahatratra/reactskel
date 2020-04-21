import { TextField, withStyles } from '@material-ui/core';

const CTextField = withStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        "& svg": {
            color: theme.palette.text.primary,
            marginRight: theme.spacing(1),
        },
        "& fieldset": {
            borderColor: "#A7BBC4",
        },
        "& .MuiOutlinedInput-root:hover fieldset": {
            borderColor: "#A7BBC483",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: 1,
        }
    },
}))(TextField);

export default CTextField;