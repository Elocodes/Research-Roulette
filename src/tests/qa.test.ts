import { TriviaQuestionSchema } from '../lib/types/qa';
import { ZodError } from 'zod';

describe('TriviaQuestionSchema', () => {
  const validQuestion = {
    id: 'a1b2c3d4-e5f6-4890-a234-567890abcdef',
    category: 'Artificial Intelligence',
    question: 'What is the name of the AI that defeated a human world champion in the game of Go?',
    correct_answer: 'AlphaGo',
    incorrect_answers: ['Deep Blue', 'Watson', 'Libratus'],
    source_link: 'https://deepmind.google/discover/blog/alphago-zero-starting-from-scratch/',
  };

  test('should pass validation for a correctly formatted question object', () => {
    const result = TriviaQuestionSchema.safeParse(validQuestion);
    expect(result.success).toBe(true);
  });

  test('should fail validation if source_link is missing', () => {
    const { source_link, ...invalidQuestion } = validQuestion;
    const result = TriviaQuestionSchema.safeParse(invalidQuestion);
    expect(result.success).toBe(false);
  });

  test('should fail validation if a field has an incorrect data type', () => {
    const invalidQuestion = { ...validQuestion, question: 12345 };
    const result = TriviaQuestionSchema.safeParse(invalidQuestion);
    expect(result.success).toBe(false);
  });

  test('should fail validation if incorrect_answers does not have exactly three items', () => {
    const invalidQuestion = { ...validQuestion, incorrect_answers: ['Deep Blue', 'Watson'] };
    const result = TriviaQuestionSchema.safeParse(invalidQuestion);
    expect(result.success).toBe(false);
  });
});
