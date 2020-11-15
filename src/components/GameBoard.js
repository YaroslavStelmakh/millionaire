import React, {Fragment}  from "react";
import {Component} from "react/cjs/react.production.min";

import data from "../config";
import ScoreBoard from "./ScoreBoard";
import EndGameWindow from "./EndGameWindow"

const initialGameState =  {
    currentQuestionId: 0,
    correctAnswer: null,
    isSuccessAlertVisible: false,
    isErrorAlertVisible: false,
    isGameMode: true,
    isMobileScoreBoardOpen: false,
    correctButtonIndex: null,
    answeredButtonIndex: null,
};

export class GameBoard extends Component {
    state = {...initialGameState};

    handleAnswer = (answer, answerButtonIndex) => {
        let correctButtonIndex = 0;
        data[this.state.currentQuestionId].answers.forEach((a, i) => {
           if(a ===  data[this.state.currentQuestionId].correctAnswer) {
               correctButtonIndex = i
           }
        });
        this.setState({
            answeredButtonIndex: answerButtonIndex,
            correctButtonIndex,
        });

        if (answer === data[this.state.currentQuestionId].correctAnswer) {
            this.setState({
                isSuccessAlertVisible: true,
            });
            setTimeout(() => {
                this.setState({
                    currentQuestionId: this.state.currentQuestionId + 1,
                    isSuccessAlertVisible: false,
                })
            }, 2000);
        } else {
            this.setState({
                isErrorAlertVisible: true,
            });
            setTimeout(() => {
                this.setState({
                    isErrorAlertVisible: false,
                    isGameMode: false,
                });
            }, 2000);
        }
    };

    render() {
        const questions = data.map((data) => (
            <div key={data.id}>
                {data.question}
            </div>
        ));

        const answers = data.map((item) => (
            item.answers.map((answer, i) => (
                <button
                    key={i}
                    type="submit"
                    onClick={this.handleAnswer.bind(this, answer, i)}
                    disabled={(this.state.isErrorAlertVisible || this.state.isSuccessAlertVisible)}
                    className={((this.state.isSuccessAlertVisible || this.state.isErrorAlertVisible) && (i === this.state.answeredButtonIndex || i === this.state.correctButtonIndex) ? ((i === this.state.answeredButtonIndex && i !== this.state.correctButtonIndex) ? "wrong-answer" : "success-answer" ) : "") + " question-button " }
                >
                    {answer}
                </button>
            ))
        ));

        const isMobile = window.screen.width < 420;
        const {setShowBoard} = this.props;
        const {isMobileScoreBoardOpen} = this.state;

        return (
            <Fragment>
                {isMobileScoreBoardOpen
                    ? <button className="mobile-close-window" onClick={() => this.setState({isMobileScoreBoardOpen: !this.state.isMobileScoreBoardOpen})} />
                    : <button className="mobile-open-window" onClick={() => this.setState({isMobileScoreBoardOpen: !this.state.isMobileScoreBoardOpen})} />
                }
                {/*<button className="mobile-open-window" onClick={() => this.setState({isMobileScoreBoardOpen: !this.state.isMobileScoreBoardOpen})} />*/}
                {isMobile ?
                    (isMobileScoreBoardOpen
                        ? <ScoreBoard isMobileScoreBoardOpen={isMobileScoreBoardOpen} isGameMode={this.state.isGameMode}/>
                        : <div className="gameBoard">
                            {this.state.isGameMode ?
                                <div className="gameBoardWrapper">
                                    <div className="question-block-button">
                                        {questions[this.state.currentQuestionId]}
                                    </div>
                                    <div className="answers-block">
                                        {answers[this.state.currentQuestionId]}
                                    </div>
                                    {/*{this.state.isSuccessAlertVisible && <div className="correctMessage"></div>}
                                    {this.state.isErrorAlertVisible && <div className="wrongMessage">Wrong!</div>}*/}
                                </div> : <div className="end-game">
                                <EndGameWindow
                                    gameScoreId={this.state.currentQuestionId}
                                    setShowBoard={setShowBoard}
                                    finallyPrice={data[this.state.currentQuestionId].price}
                                />
                                </div>}
                            </div>)
                        :
                    (<div className="gameBoard">
                        <ScoreBoard gameScoreId={this.state.currentQuestionId} isGameMode={this.state.isGameMode}/>
                        {this.state.isGameMode ?
                            <div className="gameBoardWrapper">
                                <div className="question-block-button">
                                    {questions[this.state.currentQuestionId]}
                                </div>
                                <div className="answers-block">
                                    {answers[this.state.currentQuestionId]}
                                </div>
                                {/*{this.state.isSuccessAlertVisible && <div className="correctMessage">Correct!</div>}
                                {this.state.isErrorAlertVisible && <div className="wrongMessage">Wrong!</div>}*/}
                            </div> : <div className="end-game">
                                <EndGameWindow
                                    gameScoreId={this.state.currentQuestionId}
                                    setShowBoard={setShowBoard}
                                    finallyPrice={data[this.state.currentQuestionId].price}
                                />
                            </div>}
                    </div>)
                    }
            </Fragment>

        )
    }
}
