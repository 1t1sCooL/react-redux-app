import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getContributors, getCurrentRepos } from "../actions/repos.js";
import "./card.less";
import Loader from "../main/Loader.jsx";
import { useDispatch } from "react-redux";

const Card = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { username, reponame } = useParams();
    const [repo, setRepo] = useState({ owner: {} });
    const [contributors, setContributors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const repoData = await getCurrentRepos(username, reponame, setRepo);
                const contribData = await getContributors(username, reponame, setContributors);
                setIsLoaded(true);
            } catch (err) {
                setIsLoaded(true);
            }
        };

        fetchData();
    }, [username, reponame]);

    if (!isLoaded) {
        return <Loader />;
    }

    return (
        <div className="container">
            <button className="back-btn" onClick={() => navigate(-1)}>← BACK</button>

            <div className="card">
                <img src={repo.owner.avatar_url} alt={`${repo.owner.login}'s avatar`} />
                <div className="name">{repo.name}</div>
                <div className="stars">{repo.stargazers_count}</div>
            </div>

            <div className="contributors">
                <h3>Top Contributors</h3>
                <ul>
                    {contributors.slice(0, 10).map((contributor) => (
                        <li key={contributor.id}>
                            <img src={contributor.avatar_url} alt={contributor.login} />
                            {contributor.login}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Card;