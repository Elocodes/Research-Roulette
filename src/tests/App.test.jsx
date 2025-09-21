/**
 * @file src/tests/App.test.jsx
 * @description Test suite for the App component.
 * @author Code <your-ai-collaborator>
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/ui/App';

// Mock the placeholder data to have a predictable question for testing
const placeholderQuestions = [
    {
      id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
      category: 'AI & Machine Learning',
      question: 'What does the term "overfitting" refer to in machine learning?',
      correct_answer: 'A model that performs well on training data but poorly on unseen data.',
      incorrect_answers: [
        'A model that is too simple to capture the underlying pattern of the data.',
        'The process of increasing the number of features in a dataset.',
        'A technique for speeding up the training of a neural network.',
      ],
      source_link: 'https://en.wikipedia.org/wiki/Overfitting',
    },
];


describe('App Component', () => {
  // Use fake timers to control setTimeout
  beforeEach(() => {
    jest.useFakeTimers();
    // Mock Math.random to make the question selection deterministic
    jest.spyOn(Math, 'random').mockReturnValue(0);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.spyOn(Math, 'random').mockRestore();
  });

  test('should render the initial state correctly', () => {
    render(<App />);
    // Check for the main heading
    expect(screen.getByText('Research-Roulette')).toBeInTheDocument();
    // Check for the spin button
    expect(screen.getByRole('button', { name: /Spin the Wheel/i })).toBeInTheDocument();
    // Ensure the results section is not visible initially
    expect(screen.queryByText(placeholderQuestions[0].category)).not.toBeInTheDocument();
  });

  test('should handle the spinning logic correctly', async () => {
    render(<App />);
    const spinButton = screen.getByRole('button', { name: /Spin the Wheel/i });

    // 1. Click the spin button
    fireEvent.click(spinButton);

    // 2. Assert the button is disabled and text changes
    expect(spinButton).toBeDisabled();
    expect(screen.getByText('Spinning...')).toBeInTheDocument();

    // 3. Fast-forward timers
    jest.runAllTimers();

    // 4. Assert the button is re-enabled and the results are shown
    await waitFor(() => {
        expect(spinButton).not.toBeDisabled();
        expect(screen.getByText('Spin the Wheel')).toBeInTheDocument();
        expect(screen.getByText(placeholderQuestions[0].category)).toBeInTheDocument();
    });
  });

  test('should display the selected question after the spin', async () => {
    render(<App />);
    const spinButton = screen.getByRole('button', { name: /Spin the Wheel/i });

    // Click the button and wait for the spin to finish
    fireEvent.click(spinButton);
    jest.runAllTimers();

    // Wait for the component to re-render with the new state
    await waitFor(() => {
      // Check if the question details are displayed
      expect(screen.getByText(placeholderQuestions[0].category)).toBeInTheDocument();
      expect(screen.getByText(placeholderQuestions[0].question)).toBeInTheDocument();
      expect(screen.getByText(placeholderQuestions[0].correct_answer)).toBeInTheDocument();
      expect(screen.getByText(placeholderQuestions[0].incorrect_answers[0])).toBeInTheDocument();
      expect(screen.getByText(placeholderQuestions[0].incorrect_answers[1])).toBeInTheDocument();
      expect(screen.getByText(placeholderQuestions[0].incorrect_answers[2])).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Learn more/i })).toHaveAttribute('href', placeholderQuestions[0].source_link);
    });
  });

  test('should not show the results section on initial render', () => {
    render(<App />);
    expect(screen.queryByText(placeholderQuestions[0].category)).not.toBeInTheDocument();
    expect(screen.queryByText(placeholderQuestions[0].question)).not.toBeInTheDocument();
  });
});
