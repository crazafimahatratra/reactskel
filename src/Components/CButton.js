import { withStyles, Button } from '@material-ui/core';

const CButton = withStyles(theme => ({
    root: {
        marginTop: theme.spacing(3),
        borderRadius: 20,
        boxShadow: "none",
        textTransform: "none",
        "& svg": {
            fontSize: 18,
            marginRight: theme.spacing(1),
        }
    },
    containedPrimary: {
        color: "white",
        "&:hover": {
            boxShadow: "none",
        }
    },
    contained: {
        "&:hover": {
            boxShadow: "none",
        }
    }
}))(Button);

export default CButton;