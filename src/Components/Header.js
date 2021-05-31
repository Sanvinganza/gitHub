import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addRepositories, addUser, userNotFound } from '../redux/actions';

const useStyle = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '72px',
  },
  icon: {
    width: '41px',
    height: '40px',
    backgroundImage: 'url(gitHubLogo.png)',
    backgroundSize: 'contain',
    marginLeft: '41px',
  },
  search: {
    height: '40px',
    borderRadius: '6px',
    border: '0',
    marginLeft: '22px',
    width: '500px',
    marginRight: '56px',
    backgroundImage: 'url(search24.png)',
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: 'center',
    backgroundPositionX: '19px',
    textIndent: '44px',
    fontSize: '14px',
    fontWeight: '400',
  },
}));

export default function Header() {
  const classes = useStyle();
  const dispatch = useDispatch();

  async function handleChange(event) {
    const inputUser = event.target.value;

    if (event.key === 'Enter' && inputUser) {
      let response_user = await fetch('https://api.github.com/users/' + inputUser);
      let response_repos = await fetch('https://api.github.com/users/' + inputUser + '/repos?per_page=4');
      let repositories;

      if (!response_user.ok) {dispatch(userNotFound()); return}
      else {
        dispatch(addUser(await response_user.json()));
      }

      if (response_repos.ok) {
        repositories = await response_repos.json();
        repositories = repositories.map((el) => {
          return {
            'name': el["name"],
            'url': el["html_url"],
            'description': el["description"],
          }
        });
        dispatch(addRepositories(repositories));
      } else {
        repositories = [];
      }
    }
  }

  return (
    <>
      <AppBar position="static">
        <div className={classes.title}>
          <img alt='' className={classes.icon} />
          <input type="text" name='input' className={classes.search} onKeyPress={handleChange} placeholder='Enter GitHub username' />
        </div>
      </AppBar>
    </>
  );
}
