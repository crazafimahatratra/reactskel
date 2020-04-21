import React, { useContext } from 'react';
import { AppBar, Toolbar, IconButton, makeStyles, Popover, List, Button, useTheme, ListItem, ListItemText } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Menu, KeyboardArrowDown } from '@material-ui/icons';
import { UserContext } from '../../AppContext';
import { useHistory } from 'react-router-dom';
import Session from '../../Auth/Session';
import clsx from 'clsx';

const session = new Session();
const drawerWidth = 240;

const styles = makeStyles((theme) => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        textTransform: "none",
    },
    menuItem: {
        color: theme.palette.text.primary,
    },
    hide: {
        display: 'none',
    },
}));

const MenuUser = () => {
    const classes = styles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const theme = useTheme();
    const userContext = useContext(UserContext);
    const history = useHistory();

    /**
     * 
     * @param {Event} evt 
     */
    const handleClick = (evt) => {
        setAnchorEl(evt.target);
    };

    const handleDisconnect = () => {
        session.clear();
        history.replace("/auth");
    };
    return (
        <>
            <Button onClick={handleClick} className={classes.menuButton}>
                <AccountCircle style={{ marginRight: theme.spacing(1) }} />
                {userContext.user.firstname}
                <KeyboardArrowDown />
            </Button>
            <Popover anchorEl={anchorEl} open={Boolean(anchorEl)} 
            onClose={() => setAnchorEl(null)} anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <List>
                    <ListItem button onClick={() => setAnchorEl(null)}>
                        <ListItemText className={classes.menuItem} primary="Mon Compte" />
                    </ListItem>
                    <ListItem button onClick={handleDisconnect}>
                        <ListItemText className={classes.menuItem} primary="Deconnexion" />
                    </ListItem>
                </List>
            </Popover>
        </>
    );
};

/**
 * 
 * @param {{onToggleMenu: () => {}, openDrawer: boolean}} props 
 */
export default function CAppBar(props) {
    const classes = styles();
    return (
        <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: props.openDrawer, })}>
            <Toolbar>
                <IconButton onClick={props.onToggleMenu} className={clsx(classes.menuButton, props.openDrawer && classes.hide)}>
                    <Menu className={classes.menuButton} />
                </IconButton>
                <div style={{ flexGrow: 1 }}></div>
                <MenuUser />
            </Toolbar>
        </AppBar>
    );
};