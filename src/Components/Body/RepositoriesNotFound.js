import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        minHeight: '662px',
        width: '100%',
    },
    icon: {
        width: '76px',
        height: '62px',
    },
    text: {
        color: '#808080',
        fontWeight: '400',
        fontSize: '22px',
        textAlign: 'center',
        marginTop: '46.92px',
    },
}));

export default function RepositoriesNotFound(){
    const classes = useStyle();
    return(
        <>
            <div className={classes.root}>
                <div className={classes.icon} style={{backgroundImage: 'url(notFound.png)'}}></div>
                <div className={classes.text}>Repository list is empty</div>
            </div>
        </>
    )
} 