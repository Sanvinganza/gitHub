import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import User from './User';
import Repositories from './Repositories';
import useMediaQuery from '../../useMediaQuery';

const useStyle = makeStyles((theme) => ({
    root: {
        padding: '0 56px',
        backgroundColor: '#E5E5E5',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    containerMin: {
        flexDirection: 'column',
    }
}));

export default function Body() {
    const classes = useStyle();
    const matches = useMediaQuery('(min-width: 1000px)');

    return (
        <>
            <div className={classes.root}>
                <div className={matches? classes.container: classes.containerMin}>
                    <User />
                    <Repositories />
                </div>
            </div>
        </>
    );
}
