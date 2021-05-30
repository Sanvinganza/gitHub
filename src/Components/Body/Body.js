import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import User from './User';
import Repositories from './Repositories';

const useStyle = makeStyles((theme) => ({
    root: {
        padding: '0 56px',
        backgroundColor: '#E5E5E5',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
    }
}));

export default function Body() {
    const classes = useStyle();

    return (
        <>
            <div className={classes.root}>
                <div className={classes.container}>
                    <User />
                    <Repositories />
                </div>
            </div>
        </>
    );
}
