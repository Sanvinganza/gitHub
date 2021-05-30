import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import RepositoriesNotFound from './RepositoriesNotFound';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { addRepositories } from '../../redux/actions';
const useStyle = makeStyles((theme) => ({
    root: {
        minHeight: '768px',
        marginLeft: '96px',
        width: '100%',
        maxWidth: '877px',
        paddingTop: '28px',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        fontSize: '32px',
        fontWeight: '600',
    },
    root_repos: {
        maxHeight: '112px',
        height: '100%',
        padding: '24px 32px',
        borderRadius: '6px',
        display: 'flex',
        flexDirection: 'column',
        margin: '24px 0',
        backgroundColor: '#ffffff',
    },
    name: {
        color: '#0064EB',
        fontWeight: '500',
        fontSize: '24px',
    },
    description: {
        paddingTop: '16px',
        textAlign: 'start',
        fontWeight: '400',
        fontSize: '16px',
        color: 'black',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    previousLabel: {
        width: '24px',
        height: '24px',
        backgroundImage: 'url(arrowLeft.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        '&::marker': {
            fontSize: '0'
        },
    },
    previous: {
        '&::marker': {
            fontSize: '0'
        },
    },
    page: {
        borderRadius: '3px',
        margin: '0 4px',
        '&::marker': {
            fontSize: '0'
        },
    },
    pageLink: {
        display: 'flex',
        alignItems: 'center',
        padding: '2px 6px',
        width: '21px',
        height: '25px',
        justifyContent: 'center',
    },
    next: {
        '&::marker': {
            fontSize: '0'
        },
    },
    nextLabel: {
        width: '24px',
        height: '24px',
        backgroundImage: 'url(arrowRight.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        '&::marker': {
            fontSize: '0'
        },
    },
    active: {
        backgroundColor: '#0064EB'
    },
    break: {
        alignSelf: 'center',
        margin: '0 4px',
        '&::marker': {
            fontSize: '0'
        },
    }
}));

export default function Repositories() {
    const classes = useStyle();
    let repositories = useSelector(state => state.repositories);
    const login = useSelector(state => state.user.login)
    const repositoriesValue = useSelector(state => state.user.public_repos);
    const dispatch = useDispatch();

    let [isLoading, setIsLoading] = useState(false);
    let [page, setPage] = useState(1);

    let loadRepositories = async (data) => {

        setIsLoading(true);
        let response_repos = await fetch('https://api.github.com/users/' + login + '/repos?per_page=4&page=' + (data.selected + 1));
        setIsLoading(false);

        if (response_repos.ok) {

            repositories = await response_repos.json();

            repositories = repositories.map((el) => {
                return {
                    'name': el["name"],
                    'url': el["html_url"],
                    'description': el["description"],
                }
            });

        } else {
            repositories = [];
        }
        setPage(data.selected)
        dispatch(addRepositories(repositories));
    };

    return (
        <>
            <div className={classes.root}>

                <div className={classes.container}>
                    {isLoading ? <div class="loader"></div> :

                        repositories.length !== 0 ?
                            <div>
                                <div className={classes.title}>Repositories({repositoriesValue})</div>
                                {
                                    repositories.map((el) => {
                                        return (
                                            <div key={el.url} className={classes.root_repos}>
                                                <a href={el.url} className={classes.name}>{el.name}</a>
                                                <div className={classes.description}>{el.description}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            :
                            <RepositoriesNotFound />
                    }
                    <ReactPaginate
                        pageCount={repositoriesValue / 4}
                        previousClassName={classes.previous}
                        pageRangeDisplayed={2}
                        pageClassName={classes.page}
                        pageLinkClassName={classes.pageLink}
                        marginPagesDisplayed={1}
                        nextClassName={classes.next}
                        breakLabel={'...'}
                        containerClassName={classes.pagination}
                        activeClassName={classes.active}
                        breakClassName={classes.break}
                        previousLabel={<div className={classes.previousLabel}></div>}
                        onPageChange={loadRepositories}
                        nextLabel={<div className={classes.nextLabel}></div>}
                        initialPage={page}
                    />
                </div>
            </div>
        </>
    );
} 