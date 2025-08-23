import React, {useEffect, useState} from 'react';
import './main.less'
import {useDispatch, useSelector} from "react-redux";
import {getRepos} from '../actions/repos';
import Repo from "./repo/Repo.jsx";
import {setCurrentPage} from "../../reducers/reposReducer.js";
import {createPages} from "../../utils/pagesCreator.js";
import Loader from "./Loader.jsx";
import Error from "./Error.jsx";
import {useNavigate} from "react-router-dom";

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const repos = useSelector((state) => state.repos.items);
    const isFetching = useSelector((state) => state.repos.isFetching);
    const currentPage = useSelector((state) => state.repos.currentPage);
    const perPage = useSelector((state) => state.repos.perPage);
    const isFetchError = useSelector((state) => state.repos.isFetchError)
    const totalCount = useSelector(state => state.repos.totalCount);
    const pagesCount = Math.ceil(totalCount/perPage)
    const pages = []
    createPages(pages, pagesCount, currentPage)
    const [searchValue, setSearchValue] = useState('');
    useEffect(() => {
        dispatch(getRepos(searchValue, currentPage, perPage));
    }, [searchValue, currentPage, perPage, dispatch]);

    function searchHandler(){
        dispatch(setCurrentPage(1));
    }

    // Main.jsx
    return (
        <div className="container">
            {isFetchError && <Error />}

            <div className='search'>
                <input
                    onChange={(e) => setSearchValue(e.target.value)}
                    type="text"
                    className="search-input"
                    value={searchValue}
                    placeholder='Find a repository...'
                />
                <button className="search-btn">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>

            {!isFetching ? (
                repos?.map(repo => <Repo key={repo.id} repo={repo} />)
            ) : (
                <Loader />
            )}

            <div className="pages">
                {pages.map((page, index) => (
                    <span
                        key={index}
                        className={currentPage === page ? "current-page" : "page"}
                        onClick={() => dispatch(setCurrentPage(page))}
                    >
          {page}
        </span>
                ))}
            </div>
        </div>
    );
}
export default Main;