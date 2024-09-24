import React from "react";

const QuizStart = ({ startQuiz, exit, renderStart }) => {
  return (
    <div>
      <div className="main">
        <div>
          <h1>Quiz Website</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit
            sapiente eos quaerat sequi est blanditiis aliquam autem quisquam
            odio! Lorem ipsum dolor sit.
          </p>
          <br />
          <div>
            <button className="start-Btn" onClick={startQuiz}>
              Start Quiz
            </button>
          </div>
        </div>
      </div>
      <div className="guider-box">
        <h2>Quiz Guid</h2>
        <ol>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, ea?
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
            veniam.
          </li>
          <li>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex,
            possimus.
          </li>
          <li>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
            facilis!
          </li>
        </ol>
        <div className="flex">
          <button className="btn" onClick={exit}>
            Exit
          </button>
          <button className="btn" onClick={renderStart}>
            continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizStart;
