import React, { useState, useEffect } from 'react';
import './App.css'
import QuizStart from './QuizStart'
import QuizQuestion from './QuizQuestions'
import QuizResult from './QuizResult'


function QuizApp() {
  const [data, setData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [shuffleAnswer, setShuffleAnswer] = useState([])
  const [quizEnded, setQuizEnded] = useState(false)
  const [timer, setTimer] = useState(480)
  const [progressValue, setProgressValue] = useState(0)
  const [quizStart, setQuizStart] = useState(true)
  const [rendering, setrendering] = useState(false)


  //for one time fetching 
  useEffect(() => {
    fetchQuestions()
  }, [])

  // --------set countDown for ending quiz  --------
  useEffect(() => {
    let countDown;
    if (rendering) {
      countDown = setInterval(() => {
        setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : prevTimer))
      }, 1000);
    }
    return () => clearInterval(countDown)
  }, [rendering, data])

  // console.log(timer)

  //---------- when timer === 0 quiz ended true----------
  useEffect(() => {
    if (timer === 0) {
      setQuizEnded(true)
      setrendering(false)

    }
  }, [data, timer])

  //-----------time Format in HH:MM:SS------------

  function formattedTime(seconds) {
    const Hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    const formattedHours = Hours.toString().padStart(2, '0')
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0')

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  }

  const timeFormat = formattedTime(timer)
  //1) ----------------- Api Resolving -----------------

  function fetchQuestions() {
    fetch('https://the-trivia-api.com/v2/questions?limit=10')
      .then(res => res.json())
      .then(res => {
        setData(res)
      }).catch(error => { 
        console.log(error)
      })
  };

  //------------ one time of each question shuffling ---------------------
  const shuffle = (array) => [...array].sort(() => Math.random() - 0.5)

  useEffect(() => {
    const currentData = data[currentIndex]
    if (data.length > 0) {
      const renderAnswer = shuffle([...currentData.incorrectAnswers, currentData.correctAnswer])
      setShuffleAnswer(renderAnswer)
    }
  }, [currentIndex, data])

  useEffect(() => {
    
    console.log("Shuffle Answer:", shuffleAnswer);
    console.log('currentIndex' ,currentIndex)
    console.log('Data: ' ,data)
  }, [shuffleAnswer]);
  

  function next() {
    const currentData = data[currentIndex]
    if (selectedAnswer !== null) {
      if (selectedAnswer === currentData.correctAnswer) {
        setScore(score + 1)
      }

      if (currentIndex < data.length - 1) { //current index  data ki length se kam ha tw true
        setCurrentIndex(currentIndex + 1)
        setSelectedAnswer(null)
      } else {
        setQuizEnded(true)
        setrendering(false)
      }
    }
  }


  function restart() {
    setrendering(true)
    setQuizEnded(false)
    setScore(0)
    setSelectedAnswer(null)
    setCurrentIndex(0)
    setTimer(480)
    setProgressValue(0)
    fetchQuestions()

  }

  function handleSelectedAnswer(answer) {
    setSelectedAnswer(answer)
  }

  useEffect(() => {
    if (quizEnded) {
      // Score aur total questions ke basis par end value ko dynamic taur par calculate karo
      const progessEndValue = (score / data.length) * 100;

      // progressValue ko update karne ke liye interval set karo
      const progress = setInterval(() => {
        setProgressValue((prevValue) => {
          const newValue = prevValue + 1;

          // Naya value progessEndValue ko exceed to nahi kar raha, isko check karo
          if (newValue >= progessEndValue) {
            clearInterval(progress); // Interval ko clear karo
            return progessEndValue; // progressValue ko final value par set karo
          }

          return newValue; // Naye value se progressValue ko update karo
        });
      }, 20);

      // Component unmount hone par ya quizEnded false hone par interval ko clean up karo
      return () => clearInterval(progress);
    }
  }, [quizEnded, score, data.length]);


  const circularProgessStyle = (progressValue) => ({
    background: `conic-gradient(#c40094, ${progressValue * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`
  })

  function goHome() {
    setQuizStart(true)
    setrendering(false)
    setQuizEnded(false)
    setScore(0)
    setSelectedAnswer(null)
    setCurrentIndex(0)
    setTimer(480)
    setProgressValue(0)
    fetchQuestions()
  }

 

  function start() {
    const main = document.querySelector('.main')
    const guiderBox = document.querySelector('.guider-box')
    guiderBox.classList.add('active')
    main.classList.add('active')
  }

  function exit() {
    const main = document.querySelector('.main')
    const guiderBox = document.querySelector('.guider-box')
    guiderBox.classList.remove('active')
    main.classList.remove('active')
  }
  function renderStart() {
    setrendering(true)
    setQuizStart(false)
  }


  if(data.length === 0){
    return <div>loading..</div>
  }


  const currentData = data[currentIndex]

  return (
    <div>
      {quizStart && <QuizStart startQuiz={start} exit={exit} renderStart={renderStart} />}
      {rendering && <QuizQuestion question={currentData.question.text}
        shuffleAnswer={shuffleAnswer}
        selectedAnswer={selectedAnswer}
        handleSelectedAnswer={handleSelectedAnswer}
        nextQuestion={next}
        totalQuestions={data.length}
        currentIndex={currentIndex}
        CountDown={timeFormat} />}
      {quizEnded && <QuizResult 
      score={score}
      totalQuestions={data.length}
      restartQuiz={restart}
      goHome={goHome}
      circularProgessStyle={circularProgessStyle}
      progressValue={progressValue}/>}
    </div>
  )

}

export default QuizApp;


