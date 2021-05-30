import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import millify from "millify";

const useStyle = makeStyles((theme) => ({
    root: {
        maxWidth: '377px',
        paddingTop: '39px'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        width: '280px',
        height: '280px',
        borderRadius: '140px',
        backgroundSize: 'contain',
    },
    userName: {
        marginTop: '29px',
        fontSize: '26px',
        fontWeight: '600',
    },
    login: {
        fontSize: '18px',
        fontWeight: '400',
        color: '#0064EB',
        marginTop: '12px',
    },
    info: {
        display: 'flex',
        marginTop: '30px',
    },
    infoContainer: {
        display: 'flex',
        fontSize: '16px',
        margin: '0 10px',
        lineHeight: '1',
    },
    icon: {
        width: '24px',
        height: '24px',
        backgroundRepeat: 'no-repeat',
    },
}));

export default function User() {
    const classes = useStyle();
    const { 
        login,  
        name,
        followers,
        following,
        html_url,
        avatar_url } = useSelector(state => state.user);
    
    return (
        <>
            <div className={classes.root}>
                <div className={classes.container}>
                    
                    <div className={classes.logo} style={{backgroundImage:`url(${avatar_url})`}}></div>
                    
                    <div className={classes.userName}>{name}</div>
                    
                    <div className={classes.login}>
                        <a href={html_url}>{login}</a>
                    </div>

                    <div className={classes.info}>
                        <div className={classes.infoContainer}>
                            <div className={classes.icon} style={{backgroundImage: 'url(./followers.png)'}}></div>
                            <div>&nbsp;{millify(followers)}</div>
                            <div>&nbsp;followers</div>
                        </div>
                        <div className={classes.infoContainer}>
                            <div className={classes.icon} style={{backgroundImage: 'url(./followings.png)'}}></div>
                            <div>&nbsp;{millify(following)}</div>
                            <div>&nbsp;following</div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
} 