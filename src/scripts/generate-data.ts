// /**
//  * @file This script generates trivia questions using the Gemini API and saves them to a JSON file.
//  * @module src/scripts/generate-data
//  * @author Code <your-ai-collaborator>
//  */

// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { z } from 'zod';
// import { promises as fs } from 'fs';
// import path from 'path';
// import { TriviaQuestionSchema } from '../lib/types/qa';

// // Zod schema for an array of trivia questions
// const QuestionsSchema = z.array(TriviaQuestionSchema);

// /**
//  * @description Generates a prompt for the Gemini API to create a trivia question.
//  * @param {string} category - The category of the trivia question.
//  * @returns {string} The formatted prompt.
//  */
// const createPrompt = (category: string): string => {
//   return `
//     Generate a single, unique trivia question for the category "${category}".
//     The question must be in the following JSON format:
//     {
//       "id": "a valid UUID",
//       "category": "${category}",
//       "question": "Your question here",
//       "correct_answer": "The correct answer here",
//       "incorrect_answers": ["Incorrect answer 1", "Incorrect answer 2", "Incorrect answer 3"],
//       "source_link": "A valid URL to a source that verifies the answer"
//     }
//     Ensure the JSON is valid and all fields are populated correctly. Do not include any markdown formatting.
//   `;
// };

// /**
//  * @description Main function to generate, validate, and save trivia data.
//  */
// const main = async (): Promise<void> => {
//   console.log('Starting data generation process...');

//   // Ensure the API key is set
//   const apiKey = process.env.GEMINI_API_KEY;
//   if (!apiKey) {
//     console.error('Error: GEMINI_API_KEY environment variable is not set.');
//     process.exit(1);
//   }

//   const genAI = new GoogleGenerativeAI(apiKey);
//   const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

//   const categories = [
//     'AI & Machine Learning',
//     'Quantum Computing',
//     'Laser Technology',
//     'Animation & Graphics',
//   ];

//   const prompts = categories.map(createPrompt);

//   try {
//     // Perform a batch API call
//     const result = await model.generateContentBatch(prompts);
//     const responses = result.responses;

//     const questions = responses.map(response => {
//       const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
//       if (!text) {
//         throw new Error('Received an empty response from the API.');
//       }
//       try {
//         return JSON.parse(text);
//       } catch (error) {
//         console.error('Failed to parse JSON from API response:', text);
//         throw new Error('Invalid JSON format in API response.');
//       }
//     });

//     // Validate the entire array of questions against the schema
//     const validationResult = QuestionsSchema.safeParse(questions);

//     if (!validationResult.success) {
//       console.error('Data validation failed:', validationResult.error.flatten());
//       process.exit(1);
//     }

//     // Write the validated data to a file
//     const outputPath = path.join(__dirname, '..', 'data', 'questions.json');
//     await fs.writeFile(outputPath, JSON.stringify(validationResult.data, null, 2));

//     console.log(`Successfully generated and saved ${validationResult.data.length} questions to ${outputPath}`);

//   } catch (error) {
//     console.error('An error occurred during data generation:', error);
//     process.exit(1);
//   }
// };

// // Execute the script
// main();

// /**
//  * @file This script generates trivia questions using the Gemini API and saves them to a JSON file.
//  * @module src/scripts/generate-data
//  * @author Code <your-ai-collaborator>
//  */

// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { promises as fs } from 'fs';
// import path from 'path';
// import { z } from 'zod';
// import { TriviaQuestionSchema } from '../lib/types/qa';

// // Zod schema for an array of trivia questions
// const QuestionsSchema = z.array(TriviaQuestionSchema);

// /**
//  * @description Generates a comprehensive prompt for the Gemini API to create a batch of trivia questions.
//  * @param {string[]} categories - The categories for the trivia questions.
//  * @returns {string} The formatted prompt.
//  */
// const createPrompt = (categories: string[]): string => {
//   const categoryList = categories.map(c => `"${c}"`).join(', ');
//   return `
//     You are an expert academic trivia curator and a research journalist. Your task is to generate a batch of high-quality, verifiable trivia questions about recent scientific and technological breakthroughs and patents.

//     The questions must be based on developments from the last 7 years. Each question must be tied to a specific, credible, and publicly accessible source like a noteworthy research paper, a patent filing, or a report from a reputable institution (e.g., a university, a major tech company's research blog, or a government agency). Do not use popular science articles or news sites as the primary source.

//     The trivia questions must cover the following research fields: ${categoryList}.

//     Generate exactly 100 questions, with a mix of difficulty levels.

//     The trivia questions must be returned as a single JSON array, where each element is an object conforming to the following structure:
//     {
//       "id": "A valid UUID string",
//       "category": "The research field (e.g., 'Quantum Computing', 'AI', 'Animation & Graphics')",
//       "question": "A concise question about a recent breakthrough or patent",
//       "correct_answer": "The correct answer",
//       "incorrect_answers": ["Incorrect answer 1", "Incorrect answer 2", "Incorrect answer 3"],
//       "source_link": "A direct URL to a credible source (e.g., a paper on arXiv, a patent on Google Patents)"
//     }

//     Do not include any additional text, markdown, or commentary outside of the JSON array. The response must be a valid, parsable JSON.
//   `;
// };

// /**
//  * @description Main function to generate, validate, and save trivia data.
//  */
// const main = async (): Promise<void> => {
//   console.log('Starting data generation process...');

//   // Ensure the API key is set
//   const apiKey = process.env.GEMINI_API_KEY;
//   if (!apiKey) {
//     console.error('Error: GEMINI_API_KEY environment variable is not set.');
//     process.exit(1);
//   }

//   const genAI = new GoogleGenerativeAI(apiKey);
//   // Use a model capable of generating structured JSON and following complex instructions
//   const model = genAI.getGenerativeModel({
//     model: 'gemini-1.5-pro-latest',
//     generationConfig: { responseMimeType: 'application/json' },
//   });

//   const categories = [
//     'AI & Machine Learning',
//     'Quantum Computing',
//     'Laser Technology',
//     'Animation & Graphics',
//   ];

//   const fullPrompt = createPrompt(categories);

//   try {
//     // Perform a single API call for the entire batch
//     const result = await model.generateContent(fullPrompt);
//     const text = result.response.text();

//     if (!text) {
//       throw new Error('Received an empty response from the API.');
//     }

//     let parsedData;
//     try {
//       parsedData = JSON.parse(text);
//     } catch (error) {
//       console.error('Failed to parse JSON from API response:', text);
//       throw new Error('Invalid JSON format in API response.');
//     }

//     // Validate the entire array of questions against the schema
//     const validationResult = QuestionsSchema.safeParse(parsedData);

//     if (!validationResult.success) {
//       console.error('Data validation failed:', validationResult.error.flatten());
//       process.exit(1);
//     }

//     // Write the validated data to a file
//     const outputPath = path.join(__dirname, '..', 'data', 'questions.json');
//     await fs.writeFile(outputPath, JSON.stringify(validationResult.data, null, 2));

//     console.log(`Successfully generated and saved ${validationResult.data.length} questions to ${outputPath}`);
//   } catch (error) {
//     console.error('An error occurred during data generation:', error);
//     process.exit(1);
//   }
// };

// // Execute the script
// main();


/**
 * @file This script generates research questions using the Gemini API and saves them to a JSON file.
 * @module src/scripts/generate-data
 * @author Code <your-ai-collaborator>
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';
import { TriviaQuestionSchema } from '../lib/types/qa';
import crypto from 'crypto';

// Zod schema for an array of trivia questions
const QuestionsSchema = z.array(TriviaQuestionSchema);

// Schema for the raw API response (without the UUID)
const RawQuestionSchema = z.object({
  category: z.string(),
  question: z.string(),
  correct_answer: z.string(),
  incorrect_answers: z.array(z.string()),
  source_link: z.string().url(),
});

const RawQuestionsSchema = z.array(RawQuestionSchema);

// Constants for controlled generation
const TARGET_QUESTION_COUNT = 50;
const BATCH_SIZE = 10;
const BATCH_DELAY_MS = 2500; // 2.5 seconds delay to prevent rate-limiting

/**
 * @description Generates a comprehensive prompt for the Gemini API to create a batch of trivia questions.
 * @param {number} count - The number of questions to generate in this batch.
 * @param {string[]} categories - The categories for the trivia questions.
 * @returns {string} The formatted prompt.
 */
const createPrompt = (count: number, categories: string[]): string => {
  const categoryList = categories.map(c => `"${c}"`).join(', ');
  return `
    You are an expert academic trivia curator and a research journalist. Your task is to generate a batch of high-quality, verifiable trivia questions about recent scientific and technological breakthroughs and patents.

    The questions must be based on developments from the last 7 years. Each question must be tied to a specific, credible, and publicly accessible source like a noteworthy research paper, a patent filing, or a report from a reputable institution (e.g., a university, a major tech company's research blog, or a government agency). Do not use popular science articles or news sites as the primary source.

    The trivia questions must cover the following research fields: ${categoryList}.

    Generate exactly ${count} questions, with a mix of difficulty levels.

    The trivia questions must be returned as a single JSON array, where each element is an object conforming to the following structure. Do not include an "id" field in the JSON response:
    {
      "category": "The research field (e.g., 'Quantum Computing', 'AI', 'Animation & Graphics')",
      "question": "A concise question about a recent breakthrough or patent",
      "correct_answer": "The correct answer",
      "incorrect_answers": ["Incorrect answer 1", "Incorrect answer 2", "Incorrect answer 3"],
      "source_link": "A direct URL to a credible source (e.g., a paper on arXiv, a patent on Google Patents)"
    }

    Do not include any additional text, markdown, or commentary outside of the JSON array. The response must be a valid, parsable JSON.
  `;
};

/**
 * @description Helper function to create a delay.
 * @param {number} ms - The number of milliseconds to wait.
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * @description Main function to generate, validate, and save trivia data.
 */
const main = async (): Promise<void> => {
  console.log('Starting data generation process...');

  // Ensure the API key is set
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Error: GEMINI_API_KEY environment variable is not set.');
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: { responseMimeType: 'application/json' },
  });

  const categories = [
    'AI & Machine Learning',
    'Quantum Computing',
    'Laser Technology',
    'Animation & Graphics',
  ];

  const masterQuestions = [];
  const questionSet = new Set(); // Use a Set for efficient uniqueness checking

  try {
    while (masterQuestions.length < TARGET_QUESTION_COUNT) {
      const questionsToFetch = Math.min(BATCH_SIZE, TARGET_QUESTION_COUNT - masterQuestions.length);
      const fullPrompt = createPrompt(questionsToFetch, categories);

      console.log(`Fetching batch of ${questionsToFetch} questions...`);

      const result = await model.generateContent(fullPrompt);
      const text = result.response.text();

      if (!text) {
        console.warn('Received an empty response from the API. Retrying...');
        await delay(BATCH_DELAY_MS);
        continue;
      }

      let parsedData;
      try {
        parsedData = JSON.parse(text);
      } catch (error) {
        console.error('Failed to parse JSON from API response:', text);
        console.log('Retrying...');
        await delay(BATCH_DELAY_MS);
        continue;
      }

      // Validate the raw data without the 'id' field
      const validationResult = RawQuestionsSchema.safeParse(parsedData);
      if (!validationResult.success) {
        console.error('Data validation failed for batch:', validationResult.error.flatten());
        console.log('Retrying...');
        await delay(BATCH_DELAY_MS);
        continue;
      }

      const newQuestions = validationResult.data;
      let uniqueCount = 0;

      for (const question of newQuestions) {
        // Use the question text for uniqueness check
        if (!questionSet.has(question.question)) {
          // Add a valid UUID on our end
          const questionWithId = { ...question, id: crypto.randomUUID() };
          masterQuestions.push(questionWithId);
          questionSet.add(question.question);
          uniqueCount++;
        }
      }

      console.log(`Added ${uniqueCount} unique questions. Total questions so far: ${masterQuestions.length}`);

      // Pause before the next API call to prevent rate-limiting
      if (masterQuestions.length < TARGET_QUESTION_COUNT) {
        await delay(BATCH_DELAY_MS);
      }
    }

    // Write the final validated data to a file
    const outputPath = path.join(__dirname, '..', 'data', 'questions.json');
    await fs.writeFile(outputPath, JSON.stringify(masterQuestions, null, 2));

    console.log(`Successfully generated and saved ${masterQuestions.length} questions to ${outputPath}`);
  } catch (error) {
    console.error('An error occurred during data generation:', error);
    process.exit(1);
  }
};

// Execute the script
main();