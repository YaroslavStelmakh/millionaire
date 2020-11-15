import React from "react";

import data from "../config"


const ScoreBoard = ({gameScoreId, isMobileScoreBoardOpen, isGameMode}) => {
    const newdata = data.map((data, i) => (
        <div key={data.id} className={"price-data"} price = {data.price} style={{color: (gameScoreId === i) ? "Orange" : "black"}}>{data.price}</div>
     )).reverse();
    return (
        (isGameMode) ?
    <div className={!isMobileScoreBoardOpen ? "mobile-score-board" : "score"}>
        {newdata}
    </div> : <div className="absent" />
    )
};

export default ScoreBoard;
