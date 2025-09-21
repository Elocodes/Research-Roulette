"use client";

/**
 * @file src/components/ui/App.jsx
 * @description Main application component for Research-Roulette.
 * @author Code <your-ai-collaborator>
 */

import React, { useState } from 'react';

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

  const handleSpin = () => {
    // Disable spin if already spinning or if there are no questions
    if (isSpinning || !questions || questions.length === 0) return;

    // Filter out questions that have been recently shown
    const availableQuestions = questions.filter(q => !recentlyShown.includes(q.id));

    // If we've shown all questions recently, reset the pool to the full list.
    // This is a fallback to ensure we never run out of questions to show.
    const questionsToSpinFrom = availableQuestions.length > 0 ? availableQuestions : questions;

    setIsSpinning(true);
    // Add a large rotation base plus a random amount for a variable landing spot
    const newRotation = rotation + 360 * 10 + Math.floor(Math.random() * 360);
    setRotation(newRotation);

    const spinDuration = 4000; // This must match the CSS transition duration

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * questionsToSpinFrom.length);
      const question = questionsToSpinFrom[randomIndex];
      setSelectedQuestion(question);

      // Update the list of recently shown questions
      const updatedRecentlyShown = [question.id, ...recentlyShown];

      // Keep the list at a max size of 3 to prevent running out of options
      if (updatedRecentlyShown.length > 3) {
        updatedRecentlyShown.pop();
      }
      setRecentlyShown(updatedRecentlyShown);

      setIsSpinning(false);
    }, spinDuration);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-cyan-400">Research-Roulette</h1>
        <p className="text-gray-400 mb-8">Spin the wheel to test your knowledge!</p>

        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-8 flex items-center justify-center">
          <div
            className="absolute w-full h-full rounded-full border-4 border-dashed border-gray-600 transition-transform duration-[4000ms] ease-out"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {/* Use the questions from props to render the wheel segments */}
            {questions && questions.map((q, i) => (
              <div
                key={q.id}
                className="absolute w-1/2 h-1/2 text-xs font-semibold flex items-center justify-center origin-bottom-right"
                style={{
                  transform: `rotate(${ (360 / questions.length) * i }deg) translate(-50%, -50%)`,
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  top: '50%',
                  left: '50%',
                  transformOrigin: '0% 0%',
                  width: '50%',
                  height: '50%',
                }}
              >
                <span style={{ transform: 'rotate(25deg)'}} className="truncate p-1">{q.category}</span>
              </div>
            ))}
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-16 border-t-cyan-400"></div>
        </div>

        <button
          onClick={handleSpin}
          disabled={isSpinning || !questions || questions.length === 0}
          className="w-full px-8 py-4 bg-cyan-500 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 transition-all disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
          {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
        </button>

        {/* Handle case where questions might fail to load */}
        {(!questions || questions.length === 0) && !isSpinning && (
            <p className="text-red-500 mt-4">Could not load questions. Please try again later.</p>
        )}

        {selectedQuestion && (
          <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-xl text-left animate-fade-in">
            <h2 className="text-xl font-bold text-cyan-400 mb-2">{selectedQuestion.category}</h2>
            <p className="mb-4">{selectedQuestion.question}</p>
            <ul className="space-y-2">
              <li className="bg-green-500 bg-opacity-20 p-2 rounded">
                <strong>Correct:</strong> {selectedQuestion.correct_answer}
              </li>
              {selectedQuestion.incorrect_answers.map((answer, index) => (
                <li key={index} className="bg-red-500 bg-opacity-20 p-2 rounded">
                  {answer}
                </li>
              ))}
            </ul>
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