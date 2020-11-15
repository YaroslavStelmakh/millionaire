import React, {Fragment, useState} from "react";

import hand from "../images/hand 1.png";
import {GameBoard} from "./GameBoard";

export function StartGameWindow() {
    const [showBoard, setShowBoard] = useState(false);

    function startGameHandler () {
       setShowBoard(true);
    }

    return (
        <Fragment>
           { (showBoard === false)
           ?   <div className="main">
                    <div className="img-hand"><img src={hand} alt="hand" /></div>
                    <div className="right-side">
                        <h1>Who wants to be<br/> a millionaire?</h1>
                        <button className="start-game" onClick={startGameHandler}>Start</button>
                    </div>
                </div>
           :  <GameBoard
                   setShowBoard={setShowBoard}
               />
           }
        </Fragment>
        )
}