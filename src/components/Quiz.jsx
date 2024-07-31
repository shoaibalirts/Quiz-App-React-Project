// Show currently active question to the user:
// we can make a Question component that holds a form
// and, when the question was answered by the user then i want to switch to the next question:
// we can use useEffect with empty dependency [] so that this useEffect function
// will not be executed upon rendering the component

import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import quizCompleteImg from "../assets/quiz-complete.png";
// It is the Quiz component that is responsible for switching questions and registering user answers
export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  //   console.log(userAnswers);
  ///////////////////////////////
  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      //   console.log(selectedAnswer);
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

  return (
    <div id="quiz">
      <section id="question">
        <Question
          key={activeQuestionIndex}
          questionText={QUESTIONS[activeQuestionIndex].text}
          answers={QUESTIONS[activeQuestionIndex].answers}
          answerState={answerState}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          onSelectAnswer={handleSelectAnswer}
          onSkipAnswer={handleSkipAnswer}
        />
      </section>
    </div>
  );
}
