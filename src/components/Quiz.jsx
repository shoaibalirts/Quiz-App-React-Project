// Show currently active question to the user:
// we can make a Question component that holds a form
// and, when the question was answered by the user then i want to switch to the next question:
// we can use useEffect with empty dependency [] so that this useEffect function
// will not be executed upon rendering the component

import { useCallback, useRef, useState } from "react";
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import quizCompleteImg from "../assets/quiz-complete.png";
// It is the Quiz component that is responsible for switching questions and registering user answers
export default function Quiz() {
  const shuffledAnswers = useRef();
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  console.log(userAnswers);
  ///////////////////////////////
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      console.log(selectedAnswer);
      setAnswerState("answered");
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });
      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy Icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.current.sort(() => Math.random() - 0.5);
  // outputting dynamic list for answers using js map
  const questionList = shuffledAnswers.map((answer, index) => {
    const isSelected = userAnswers[userAnswers.length - 1] === answer;
    let cssClass = "";
    if (answerState === "answered" && isSelected) {
      cssClass = "selcted";
    }
    if ((answerState === "correct" || answerState === "wrong") && isSelected) {
      cssClass = answerState; // corrct or wrong
    }
    return (
      <li key={answer} className="answer">
        <button onClick={() => handleSelectAnswer(answer)} className={cssClass}>
          {answer}
        </button>
      </li>
    );
  });
  return (
    <div id="quiz">
      <section id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />

        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">{questionList}</ul>
      </section>
    </div>
  );
}
