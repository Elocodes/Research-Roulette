// "use client";

// /**
//  * @file src/components/ui/App.jsx
//  * @description Main application component for Research-Roulette.
//  * @author Code <your-ai-collaborator>
//  */

// import React, { useState, useMemo } from 'react';

// /**
//  * @description The main application component.
//  * @param {{ questions: Array<import('../../lib/types/qa').TriviaQuestion> }} props - The component props.
//  * @returns {JSX.Element} The rendered App component.
//  */
// const App = ({ questions }) => {
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [selectedQuestion, setSelectedQuestion] = useState(null);
//   const [rotation, setRotation] = useState(0);
//   const [recentlyShown, setRecentlyShown] = useState([]);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [isAnswered, setIsAnswered] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(false);

//   const handleAnswerClick = (answer) => {
//     if (isAnswered) return;

//     const correctAnswer = selectedQuestion.correct_answer;
//     setSelectedAnswer(answer);
//     setIsAnswered(true);
//     if (answer === correctAnswer) {
//       setIsCorrect(true);
//     } else {
//       setIsCorrect(false);
//     }
//   };

//   const handleNextQuestion = () => {
//     setSelectedQuestion(null);
//     setSelectedAnswer(null);
//     setIsAnswered(false);
//     setIsCorrect(false);
//     handleSpin();
//   };

//   const handleSpin = () => {
//     if (isSpinning || !questions || questions.length === 0) return;

//     const availableQuestions = questions.filter(q => !recentlyShown.includes(q.id));
//     const questionsToSpinFrom = availableQuestions.length > 0 ? availableQuestions : questions;

//     setIsSpinning(true);
//     const newRotation = rotation + 360 * 10 + Math.floor(Math.random() * 360);
//     setRotation(newRotation);

//     const spinDuration = 4000;

//     setTimeout(() => {
//       const randomIndex = Math.floor(Math.random() * questionsToSpinFrom.length);
//       const question = questionsToSpinFrom[randomIndex];
//       setSelectedQuestion(question);

//       const updatedRecentlyShown = [question.id, ...recentlyShown];
//       if (updatedRecentlyShown.length > 3) {
//         updatedRecentlyShown.pop();
//       }
//       setRecentlyShown(updatedRecentlyShown);

//       setIsSpinning(false);
//     }, spinDuration);
//   };

//   const shuffledAnswers = useMemo(() => {
//     if (!selectedQuestion) return [];
//     const answers = [...selectedQuestion.incorrect_answers, selectedQuestion.correct_answer];
//     return answers.sort(() => Math.random() - 0.5);
//   }, [selectedQuestion]);

//   return (
//     <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4 font-sans">
//       <div className="w-full max-w-md mx-auto text-center">
//         <h1 className="text-4xl md:text-5xl font-bold mb-2 text-cyan-400">Research-Roulette</h1>
//         <p className="text-gray-400 mb-8">Spin the wheel to test your knowledge!</p>

//         <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-8 flex items-center justify-center">
//           <div
//             className="absolute w-full h-full rounded-full border-4 border-dashed border-gray-600 transition-transform duration-[4000ms] ease-out"
//             style={{ transform: `rotate(${rotation}deg)` }}
//           >
//             {questions && questions.map((q, i) => (
//               <div
//                 key={q.id}
//                 className="absolute w-1/2 h-1/2 text-xs font-semibold flex items-center justify-center origin-bottom-right"
//                 style={{
//                   transform: `rotate(${ (360 / questions.length) * i }deg) translate(-50%, -50%)`,
//                   clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
//                   top: '50%',
//                   left: '50%',
//                   transformOrigin: '0% 0%',
//                   width: '50%',
//                   height: '50%',
//                 }}
//               >
//                 <span style={{ transform: 'rotate(25deg)'}} className="truncate p-1">{q.category}</span>
//               </div>
//             ))}
//           </div>
//           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-16 border-t-cyan-400"></div>
//         </div>

//         <button
//           onClick={handleSpin}
//           disabled={isSpinning || !questions || questions.length === 0}
//           className="w-full px-8 py-4 bg-cyan-500 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 transition-all disabled:bg-gray-700 disabled:cursor-not-allowed"
//         >
//           {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
//         </button>

//         {(!questions || questions.length === 0) && !isSpinning && (
//             <p className="text-red-500 mt-4">Could not load questions. Please try again later.</p>
//         )}

//         {selectedQuestion && (
//           <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-xl text-left animate-fade-in">
//             <h2 className="text-xl font-bold text-cyan-400 mb-2">{selectedQuestion.category}</h2>
//             <p className="mb-4">{selectedQuestion.question}</p>
//             <div className="space-y-2">
//               {shuffledAnswers.map((answer, index) => {
//                 const isSelected = selectedAnswer === answer;
//                 const isCorrectAnswer = answer === selectedQuestion.correct_answer;

//                 let buttonClass = "w-full p-2 rounded text-left transition-all duration-300 ease-in-out ";
//                 if (isAnswered) {
//                   if (isCorrectAnswer) {
//                     buttonClass += "bg-green-500 bg-opacity-50";
//                   } else if (isSelected) {
//                     buttonClass += "bg-red-500 bg-opacity-50";
//                   } else {
//                     buttonClass += "bg-gray-700";
//                   }
//                 } else {
//                   buttonClass += "bg-gray-700 hover:bg-gray-600";
//                 }

//                 return (
//                   <button
//                     key={index}
//                     onClick={() => handleAnswerClick(answer)}
//                     disabled={isAnswered}
//                     className={buttonClass}
//                   >
//                     {answer}
//                   </button>
//                 );
//               })}
//             </div>
//             {isAnswered && (
//               <div className="mt-4">
//                 <p className={`font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
//                   {isCorrect ? 'Correct!' : 'Incorrect!'}
//                 </p>
//                 <button
//                   onClick={handleNextQuestion}
//                   className="mt-4 w-full px-6 py-2 bg-cyan-600 text-white font-bold rounded-lg shadow-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-75 transition-all"
//                 >
//                   Next Question
//                 </button>
//               </div>
//             )}
//             <a
//               href={selectedQuestion.source_link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="block mt-4 text-cyan-400 hover:underline"
//             >
//               Learn more
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

"use client";

/**
 * @file src/components/ui/App.jsx
 * @description Main application component for Research-Roulette with a casino-themed UI.
 * @author Code <your-ai-collaborator>
 */

import React, { useState, useMemo } from 'react';

/**
 * @description The main application component.
 * @param {{ questions: Array<import('../../lib/types/qa').TriviaQuestion> }} props - The component props.
 * @returns {JSX.Element} The rendered App component.
 */
const App = ({ questions }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [recentlyShown, setRecentlyShown] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerClick = (answer) => {
    if (isAnswered) return;

    const correctAnswer = selectedQuestion.correct_answer;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNextQuestion = () => {
    setSelectedQuestion(null);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);
    handleSpin();
  };

  const handleSpin = () => {
    if (isSpinning || !questions || questions.length === 0) return;

    const availableQuestions = questions.filter(q => !recentlyShown.includes(q.id));
    const questionsToSpinFrom = availableQuestions.length > 0 ? availableQuestions : questions;

    setIsSpinning(true);
    const newRotation = rotation + 360 * 10 + Math.floor(Math.random() * 360);
    setRotation(newRotation);

    const spinDuration = 4000;

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * questionsToSpinFrom.length);
      const question = questionsToSpinFrom[randomIndex];
      setSelectedQuestion(question);

      const updatedRecentlyShown = [question.id, ...recentlyShown];
      if (updatedRecentlyShown.length > 3) {
        updatedRecentlyShown.pop();
      }
      setRecentlyShown(updatedRecentlyShown);

      setIsSpinning(false);
    }, spinDuration);
  };

  const shuffledAnswers = useMemo(() => {
    if (!selectedQuestion) return [];
    const answers = [...selectedQuestion.incorrect_answers, selectedQuestion.correct_answer];
    return answers.sort(() => Math.random() - 0.5);
  }, [selectedQuestion]);

  return (
    // Updated background to a deep casino-style black
    <div className="bg-gray-950 text-white min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md mx-auto text-center">
        {/* Updated title with a neon glow effect */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-cyan-400 [text-shadow:0_0_2px_#fff,0_0_10px_#0ff,0_0_15px_#0ff,0_0_20px_#0ff,0_0_30px_#0ff,0_0_40px_#0ff,0_0_55px_#0ff] transition-all duration-300">Research-Roulette</h1>
        <p className="text-gray-400 mb-8">Spin the wheel to test your knowledge!</p>

        {/* Updated roulette wheel design */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-8 flex items-center justify-center rounded-full bg-gray-800 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
          <div
            className="absolute w-full h-full rounded-full border-4 border-gray-700 transition-transform duration-[4000ms] ease-out"
            style={{ transform: `rotate(${rotation}deg)`,
                     backgroundImage: 'conic-gradient(from 0deg, #FF69B4 0%, #FF69B4 12.5%, #4B0082 12.5%, #4B0082 25%, #00FFFF 25%, #00FFFF 37.5%, #4B0082 37.5%, #4B0082 50%, #FF69B4 50%, #FF69B4 62.5%, #4B0082 62.5%, #4B0082 75%, #00FFFF 75%, #00FFFF 87.5%, #4B0082 87.5%, #4B0082 100%)'
                   }}
          >
          </div>
          {/* Central circle of the roulette wheel */}
          <div className="absolute w-20 h-20 md:w-24 md:h-24 bg-gray-950 rounded-full border-4 border-gray-700 shadow-xl flex items-center justify-center">
            <span className="text-lg md:text-xl font-bold text-gray-400">Spin</span>
          </div>
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-16 border-t-yellow-400 z-10"></div>
        </div>

        {/* Updated Spin Button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning || !questions || questions.length === 0}
          className="w-full px-8 py-4 bg-lime-500 text-gray-950 font-extrabold text-lg rounded-full shadow-[0_0_15px_rgba(0,255,0,0.5)] transition-all duration-300 ease-in-out hover:bg-lime-400 hover:shadow-[0_0_25px_rgba(0,255,0,0.8)] active:scale-95 disabled:bg-gray-700 disabled:shadow-none disabled:cursor-not-allowed"
        >
          {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
        </button>

        {(!questions || questions.length === 0) && !isSpinning && (
            <p className="text-red-500 mt-4">Could not load questions. Please try again later.</p>
        )}

        {selectedQuestion && (
          // Themed game screen section
          <div className="mt-8 p-6 bg-gray-900 rounded-lg shadow-xl text-left animate-fade-in border-4 border-transparent shadow-[0_0_15px_#FF69B4,0_0_20px_#4B0082,0_0_25px_#00FFFF]">
            <h2 className="text-xl font-bold text-cyan-400 mb-2">{selectedQuestion.category}</h2>
            <p className="mb-4">{selectedQuestion.question}</p>
            <div className="space-y-2">
              {shuffledAnswers.map((answer, index) => {
                const isSelected = selectedAnswer === answer;
                const isCorrectAnswer = answer === selectedQuestion.correct_answer;

                let buttonClass = "w-full p-2 rounded text-left transition-all duration-300 ease-in-out ";
                if (isAnswered) {
                  if (isCorrectAnswer) {
                    buttonClass += "bg-green-500 bg-opacity-50";
                  } else if (isSelected) {
                    buttonClass += "bg-red-500 bg-opacity-50";
                  } else {
                    buttonClass += "bg-gray-700";
                  }
                } else {
                  buttonClass += "bg-gray-700 hover:bg-gray-600";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(answer)}
                    disabled={isAnswered}
                    className={buttonClass}
                  >
                    {answer}
                  </button>
                );
              })}
            </div>
            {isAnswered && (
              <div className="mt-4">
                <p className={`font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect!'}
                </p>
                <button
                  onClick={handleNextQuestion}
                  className="mt-4 w-full px-6 py-2 bg-cyan-600 text-white font-bold rounded-lg shadow-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-75 transition-all"
                >
                  Next Question
                </button>
              </div>
            )}
            <a
              href={selectedQuestion.source_link}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-cyan-400 hover:underline"
            >
              Learn more
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

