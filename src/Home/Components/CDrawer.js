import React from 'react';
import { Drawer, makeStyles, IconButton } from "@material-ui/core";
import { ChevronLeft } from '@material-ui/icons';

const drawerWidth = 240;

const styles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
}))

/**
 * 
 * @param {{open: boolean, onClose: () => {}}} props 
 */
export default function CDrawer(props) {
    const classes = styles();
    return (
        <Drawer className={classes.drawer} classes={{ paper: classes.drawerPaper }} open={props.open} variant="persistent">
            <div className={classes.drawerHeader}>
                <IconButton onClick={props.onClose}>
                    <ChevronLeft />
                </IconButton>
            </div>
        </Drawer>
    );
}