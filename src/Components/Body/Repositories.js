import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import RepositoriesNotFound from './RepositoriesNotFound';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { addRepositories } from '../../redux/actions';
import useMediaQuery from '../../useMediaQuery';

const useStyle = makeStyles((theme) => ({
    root: {
        minHeight: '568px',
        marginLeft: '96px',
        width: '100%',
        maxWidth: '877px',
        paddingTop: '28px',
    },
    rootMin: {
        marginLeft: '96px',
        width: '100%',
        maxWidth: '877px',
        paddingTop: '28px',
        marginLeft: '0',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        // height: '877px',
    },
    container_repos: {
        // height: '577px',
    },
    title: {
        fontSize: '32px',
        fontWeight: '600',
    },
    titleMin: {
        fontSize: '24px',
        fontWeight: '600',
        textAlign: 'center',
    },
    root_repos: {
        maxHeight: '112px',
        padding: '24px 32px',
        borderRadius: '6px',
        display: 'flex',
        flexDirection: 'column',
        margin: '24px 0',
        backgroundColor: '#ffffff',
    },
    root_reposMin: {
        padding: '18px 24px',
        borderRadius: '6px',
        display: 'flex',
        flexDirection: 'column',
        margin: '16px 0',
        backgroundColor: '#ffffff',
    },
    name: {
        color: '#0064EB',
        fontWeight: '500',
        fontSize: '24px',
    },
    nameMin: {
        color: '#0064EB',
        fontWeight: '500',
        fontSize: '18px',   
    },
    description: {
        paddingTop: '16px',
        textAlign: 'start',
        fontWeight: '400',
        fontSize: '16px',
        color: 'black',
    },
    descriptionMin: {
        fontSize: '14px',
        paddingTop: '16px',
        textAlign: 'start',
        fontWeight: '400',
        color: 'black',
    },
    pagination_container: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    pagination_description: {
        fontSize: '14px',
        fontWeight: '400',
        color: '#808080',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    paginationMin: {
        display: 'flex',
        justifyContent: 'center',
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
    const matches = useMediaQuery('(min-width: 1000px)');
    const classes = useStyle();
    const dispatch = useDispatch();
    const login = useSelector(state => state.user.login)
    const repositoriesValue = useSelector(state => state.user.public_repos);

    let repositories = useSelector(state => state.repositories);
    let [isLoading, setIsLoading] = useState(false);
    let [page, setPage] = useState(0);

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
            <div className={matches? classes.root: classes.rootMin}>

                <div className={classes.container}>
                    {isLoading ? <div class="loader"></div> :

                        repositories.length !== 0 ?
                            <div className={classes.container_repos}>
                                <div className={matches? classes.title: classes.titleMin}>Repositories({repositoriesValue})</div>
                                {
                                    repositories.map((el) => {
                                        return (
                                            <div key={el.url} className={matches? classes.root_repos: classes.root_reposMin}>
                                                <a href={el.url} className={matches? classes.name: classes.nameMin}>{el.name}</a>
                                                <div className={matches? classes.description: classes.descriptionMin}>{el.description}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            :
                            <RepositoriesNotFound />
                    }
                    {repositories.length !== 0 ?
                        <div className={classes.pagination_container}>
                            <div className={classes.pagination_description}>
                                {(page*4 + 1) + ' - ' +((page*4 + 4 > repositoriesValue? repositoriesValue : page*4 + 4))+ ' of ' + repositoriesValue + ' items'}
                            </div>
                            <ReactPaginate
                                pageCount={repositoriesValue / 4}
                                previousClassName={classes.previous}
                                pageRangeDisplayed={matches? 2 : 1}
                                pageClassName={classes.page}
                                pageLinkClassName={classes.pageLink}
                                marginPagesDisplayed={1}
                                nextClassName={classes.next}
                                breakLabel={'...'}
                                containerClassName={matches? classes.pagination : classes.paginationMin}
                                activeClassName={classes.active}
                                breakClassName={classes.break}
                                previousLabel={<div className={classes.previousLabel}></div>}
                                onPageChange={loadRepositories}
                                nextLabel={<div className={classes.nextLabel}></div>}
                                initialPage={page}
                            />
                        </div>
                        :
                        false
                    }
                </div>
            </div>
        </>
    );
} 