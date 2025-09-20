import { z } from 'zod';

/**
 * @description Zod schema for a single trivia question.
 */
export const TriviaQuestionSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID" }),
  category: z.string(),
  question: z.string().min(1, { message: "Question cannot be empty" }),
  correct_answer: z.string().min(1, { message: "Correct answer cannot be empty" }),
  incorrect_answers: z.array(z.string().min(1, { message: "Incorrect answer cannot be empty" })).length(3, { message: "There must be exactly three incorrect answers" }),
  source_link: z.string().url({ message: "Invalid URL" }),
});

/**
 * @description TypeScript type inferred from the TriviaQuestionSchema.
 */
export type TriviaQuestion = z.infer<typeof TriviaQuestionSchema>;
