import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <h2>404 Error page</h2>
            <p>
                Please return to the <Link to="/">home page</Link>
            </p>
        </div>
    );
};

export default ErrorPage;
