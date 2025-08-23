import axios from 'axios';
import {setIsFetching, setRepos, setFetchError} from '../../reducers/reposReducer.js';

export const getRepos = (searchQuery = "stars:>1", currentPage, perPage) => {
    return async (dispatch) => {
        if (!searchQuery) {
            searchQuery = "stars:>1";
        }
        try {
            dispatch(setIsFetching(true))
            const encodedQuery = encodeURIComponent(searchQuery);
            const response = await axios.get(`https://api.github.com/search/repositories?q=${encodedQuery}&sort=stars&per_page=${perPage}&page=${currentPage}`);
            if (response.data.total_count === 0) {
                throw new Error("Error fetching repos.");
            }
            dispatch(setRepos(response.data));
        } catch (error) {
            dispatch(setFetchError(true));
            dispatch(setIsFetching(false));
            setTimeout(()=>{
                dispatch(setFetchError(false));
            }, 10000)
        }
    };
};
const apiClient = axios.create({
    timeout: 10000, // 10 секунд вместо стандартных 0 (без таймаута)
});

export const getCurrentRepos = async (username, reponame, setRepo) => {
    try {
        const response = await apiClient.get(
            `https://api.github.com/repos/${username}/${reponame}`
        );
        setRepo(response.data);
    } catch (error) {
        dispatch(setFetchError(true));
        dispatch(setIsFetching(false));
        setTimeout(()=>{
            dispatch(setFetchError(false));
        }, 10000)
    }
};

export const getContributors = async (username, reponame, setContributors) => {
    try {
        const response = await apiClient.get(
            `https://api.github.com/repos/${username}/${reponame}/contributors?page=1&per_page=10`
        );
        setContributors(response.data);
    } catch (error) {
        dispatch(setFetchError(true));
        dispatch(setIsFetching(false));
        setTimeout(()=>{
            dispatch(setFetchError(false));
        }, 10000)
    }
};