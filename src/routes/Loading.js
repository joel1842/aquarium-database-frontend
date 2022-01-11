import React from "react";
import { BouncingBalls } from "react-cssfx-loading/lib";
import "./Loading.css"

const Loading = () => {
    return(
        <div className="loadingContainer">
            <h1 className="catching">Catching fish</h1>
            <BouncingBalls className="loading" color="#FFFFFF" width="10px" height="10px" duration="1s" />
            <h2 className="subCatching">oops, we mean data!</h2>
        </div>
    )
}

export default Loading;