// Show currently active question to the user:
// we can make a Question component that holds a form
// and, when the question was answered by the user then i want to switch to the next question:
// we can use useEffect with empty dependency [] so that this useEffect function
// will not be executed upon rendering the component

import { useState } from "react";
import QUESTIONS from "../questions.js";
// It is the Quiz component that is responsible for switching questions and registering user answers
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  console.log(userAnswers);
  function handleSelectAnswer(selectedAnswer) {
    console.log(selectedAnswer);

    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }

  // outputting dynamic list for answers using js map
  const questionList = QUESTIONS[activeQuestionIndex].answers.map(
    (answer, index) => {
      return (
        <li key={answer} className="answer">
          <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
        </li>
      );
    }
  );
  return (
    <div id="quiz">
      <section id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">{questionList}</ul>
      </section>
    </div>
  );
}
