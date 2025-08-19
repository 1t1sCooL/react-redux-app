import axios from 'axios';
import { setRepos } from '../../reducers/reposReducer.js';

export const getRepos = (searchQuery = "stars:>1") => {
    return async (dispatch) => {
        try {
            console.log('✅ Начинаем загрузку...', searchQuery);
            const encodedQuery = encodeURIComponent(searchQuery);
            const response = await axios.get(`https://api.github.com/search/repositories?q=${encodedQuery}&sort=stars`);

            // ✅ Передаём только массив репозиториев
            dispatch(setRepos(response.data.items));
        } catch (error) {
            console.error('Ошибка при загрузке репозиториев:', error);
            // Опционально: dispatch(setRepos([])) при ошибке
            dispatch(setRepos([]));
        }
    };
};