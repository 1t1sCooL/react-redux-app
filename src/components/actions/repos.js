import axios from 'axios';
import {setIsFetching, setRepos} from '../../reducers/reposReducer.js';

export const getRepos = (searchQuery = "stars:>1", currentPage, perPage) => {
    return async (dispatch) => {
        if (!searchQuery) {
            searchQuery = "stars:>1";
        }
        try {
            dispatch(setIsFetching(true))
            const encodedQuery = encodeURIComponent(searchQuery);
            const response = await axios.get(`https://api.github.com/search/repositories?q=${encodedQuery}&sort=stars&per_page=${perPage}&page=${currentPage}`);
            dispatch(setRepos(response.data));
        } catch (error) {
            dispatch(setRepos([]));
        }
    };
};