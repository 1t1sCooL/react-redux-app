import React from "react";
import {useNavigate} from "react-router-dom";

export const Error = (props) => {
    return (
        <div className="alert alert-danger" role="alert">
            Произошла ошибка! Пожайлуста обновите страницу.
        </div>
    )
}

export default Error;