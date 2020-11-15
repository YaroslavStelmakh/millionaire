import React from "react";

import hand from "../images/hand 1.png";


const EndGameWindow = ({setShowBoard, finallyPrice}) => {

     const endGameHandler = () =>  {
         setShowBoard(false);
        };

    return (
            <div className="end-window-main">
                <div className="img-hand"><img src={hand} alt="hand" /></div>
                <div className="right-side">
                    <h2><span className="total-score">Total score:</span><br/> {finallyPrice} earned</h2>
                    <button className="start-game" onClick={endGameHandler}>Try again</button>
                </div>
            </div>
    )
};

export default EndGameWindow;