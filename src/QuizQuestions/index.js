import React from "react";


const QuizQuestion = ({question, shuffleAnswer, selectedAnswer, handleSelectedAnswer, nextQuestion ,currentIndex,totalQuestions, CountDown}) =>{
    return(
    <div className='App'>
        <header className="App-header">
          <div className='main-container'>
            <div className='col-1'>
              <h2>Quiz App</h2>
            </div>
            <div className='col-2'>
              <p>Good Luck !</p>
              <p>{CountDown}</p>
            </div>
            <hr />
            <div className='col-1'>
              <h3>{currentIndex + 1}. {question}</h3>
              <ul style={{ listStyle: 'none' }}>
                {shuffleAnswer && shuffleAnswer.map(function (answers) {
                  return <li style={{ borderColor: selectedAnswer === answers ? '#c40094' : '#fff', color: selectedAnswer === answers ? '#c40094' : '#fff' }}>
                    <input type="radio"
                      name="answers"
                      value={answers}
                      checked={selectedAnswer === answers}
                      onChange={() => handleSelectedAnswer(answers)}
                    />
                    {answers}
                  </li>
                })}
              </ul>
            </div>
            <hr />
            <div className='col-2'>
              <p>{currentIndex + 1} of {totalQuestions} Questions</p>
              <button className='btn' onClick={nextQuestion} disabled={selectedAnswer === null}>Next</button>
            </div>
          </div>
        </header>
      </div>
      )
}


export default QuizQuestion