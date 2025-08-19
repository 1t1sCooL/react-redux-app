import React, {useEffect} from 'react';
import './main.less'
import {useDispatch, useSelector} from "react-redux";
import {getRepos} from '../actions/repos';
import Repo from "./repo/Repo.jsx";

const Main = () => {
    const dispatch = useDispatch();
    const repos = useSelector((state) => state.repos.items);
    useEffect(() => {
        dispatch(getRepos());
    }, [dispatch]);
    return (
        <div>
            {repos.map(repo =>
                <Repo key={repo.id} repo={repo} {...repo} />
            )}
        </div>
    )
}
export default Main;