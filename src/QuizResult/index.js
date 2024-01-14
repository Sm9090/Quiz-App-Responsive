import React from "react";


const QuizResult =({ score, totalQuestions, restartQuiz, goHome, circularProgessStyle, progressValue}) =>{
    return(
    <header className='App-header'>
      <div className='result-container' >
        <div className='col-4'>
          <h2>Quiz Ended!</h2>
          <div className={'circular-progress'} style={circularProgessStyle(progressValue)} >
            <h3>{progressValue}%</h3>
          </div>
          <p>Your Score {score} of {totalQuestions}</p>
          <div className='flexy'>
            <button className='btn' onClick={restartQuiz} >Try Again</button>
            <button className='start-Btn' onClick={goHome} >Go To Home</button>
          </div>
        </div>
      </div>
    </header>
    )
}

export default QuizResult