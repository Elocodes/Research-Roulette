// /**
//  * @file src/tests/App.test.jsx
//  * @description Test suite for the App component.
//  * @author Code <your-ai-collaborator>
//  */

// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import App from '../components/ui/App';

// // Mock the placeholder data to have a predictable question for testing
// const placeholderQuestions = [
//     {
//       id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
//       category: 'AI & Machine Learning',
//       question: 'What does the term "overfitting" refer to in machine learning?',
//       correct_answer: 'A model that performs well on training data but poorly on unseen data.',
//       incorrect_answers: [
//         'A model that is too simple to capture the underlying pattern of the data.',
//         'The process of increasing the number of features in a dataset.',
//         'A technique for speeding up the training of a neural network.',
//       ],
//       source_link: 'https://en.wikipedia.org/wiki/Overfitting',
//     },
// ];


// describe('App Component', () => {
//   // Use fake timers to control setTimeout
//   beforeEach(() => {
//     jest.useFakeTimers();
//     // Mock Math.random to make the question selection deterministic
//     jest.spyOn(Math, 'random').mockReturnValue(0);
//   });

//   afterEach(() => {
//     jest.useRealTimers();
//     jest.spyOn(Math, 'random').mockRestore();
//   });

//   test('should render the initial state correctly', () => {
//     render(<App />);
//     // Check for the main heading
//     expect(screen.getByText('Research-Roulette')).toBeInTheDocument();
//     // Check for the spin button
//     expect(screen.getByRole('button', { name: /Spin the Wheel/i })).toBeInTheDocument();
//     // Ensure the results section is not visible initially
//     expect(screen.queryByText(placeholderQuestions[0].category)).not.toBeInTheDocument();
//   });

//   test('should handle the spinning logic correctly', async () => {
//     render(<App />);
//     const spinButton = screen.getByRole('button', { name: /Spin the Wheel/i });

//     // 1. Click the spin button
//     fireEvent.click(spinButton);

//     // 2. Assert the button is disabled and text changes
//     expect(spinButton).toBeDisabled();
//     expect(screen.getByText('Spinning...')).toBeInTheDocument();

//     // 3. Fast-forward timers
//     jest.runAllTimers();

//     // 4. Assert the button is re-enabled and the results are shown
//     await waitFor(() => {
//         expect(spinButton).not.toBeDisabled();
//         expect(screen.getByText('Spin the Wheel')).toBeInTheDocument();
//         expect(screen.getByText(placeholderQuestions[0].category)).toBeInTheDocument();
//     });
//   });

//   test('should display the selected question after the spin', async () => {
//     render(<App />);
//     const spinButton = screen.getByRole('button', { name: /Spin the Wheel/i });

//     // Click the button and wait for the spin to finish
//     fireEvent.click(spinButton);
//     jest.runAllTimers();

//     // Wait for the component to re-render with the new state
//     await waitFor(() => {
//       // Check if the question details are displayed
//       expect(screen.getByText(placeholderQuestions[0].category)).toBeInTheDocument();
//       expect(screen.getByText(placeholderQuestions[0].question)).toBeInTheDocument();
//       expect(screen.getByText(placeholderQuestions[0].correct_answer)).toBeInTheDocument();
//       expect(screen.getByText(placeholderQuestions[0].incorrect_answers[0])).toBeInTheDocument();
//       expect(screen.getByText(placeholderQuestions[0].incorrect_answers[1])).toBeInTheDocument();
//       expect(screen.getByText(placeholderQuestions[0].incorrect_answers[2])).toBeInTheDocument();
//       expect(screen.getByRole('link', { name: /Learn more/i })).toHaveAttribute('href', placeholderQuestions[0].source_link);
//     });
//   });

//   test('should not show the results section on initial render', () => {
//     render(<App />);
//     expect(screen.queryByText(placeholderQuestions[0].category)).not.toBeInTheDocument();
//     expect(screen.queryByText(placeholderQuestions[0].question)).not.toBeInTheDocument();
//   });
// });

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