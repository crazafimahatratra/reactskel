import React from 'react';
import { FormControlLabel, Checkbox, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const styles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3),
    },
    fullWidth: {
        width: "100%",
    }
}))

/**
 * 
 * @param {{label: string, fullWidth: boolean}} props 
 */
export default function CCheckbox(props) {
    const classes = styles();
    return (
        <FormControlLabel className={clsx(classes.root, {[classes.fullWidth]: props.fullWidth})} label={props.label} control={<Checkbox/>}/>
    );
}