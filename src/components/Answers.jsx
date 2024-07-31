import { useRef } from "react";
export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();

  // outputting dynamic list for answers using js map
  /*
  const answersList = shuffledAnswers.current.map((answer) => {
    const isSelected = selectedAnswer === answer;
    let cssClass = "";
    if (answerState === "answered" && isSelected) {
      cssClass = "selcted";
    }
    if ((answerState === "correct" || answerState === "wrong") && isSelected) {
      cssClass = answerState; // corrct or wrong
    }
    return (
      <li key={answer} className="answer">
        <button onClick={() => onSelect(answer)} className={cssClass}>
          {answer}
        </button>
      </li>
    );
  });
*/
  if (!shuffledAnswers.current) {
    // undefined as its initial value.
    // If it is undefined then shuffled answers.
    // But, if it is defined then do not shuffle even the component executes again
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  // jsx
  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = "";
        if (answerState === "answered" && isSelected) {
          cssClass = "selcted";
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState; // corrct or wrong
        }
        return (
          <li key={answer} className="answer">
            <button onClick={() => onSelect(answer)} className={cssClass}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
