import React from 'react';
import Header from './Components/Header';
import Body from './Components/Body/Body';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    minHeight: '877px',
    backgroundColor: '#E5E5E5',
  },
  icon: {
    width: '64.17px',
    height: '64.17px',
  },
  text: {
    color: '#808080',
    fontWeight: '400',
    fontSize: '22px',
    textAlign: 'center',
    marginTop: '46.92px',
  }
}));

export default function App () {
  const classes = useStyle();

  const userFound = useSelector(state => state.user.userFound);
  return (
    <>
      <Header />
      { 
        userFound === null?
        <div className={classes.root}>
          <div className={classes.icon} style={{backgroundImage: 'url(search64.png)'}}></div>
          <div className={classes.text}>Start with searching <br/> a GitHub user</div>
        </div>
         : userFound?
        <Body />
        : 
        <div className={classes.root}>
          <div className={classes.icon} style={{backgroundImage: 'url(user.png)', height: '74px', width: '65px'}}></div>
          <div className={classes.text}>User not found</div>
        </div>
      }
    </>
  )
};
