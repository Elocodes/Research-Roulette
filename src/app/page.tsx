import { promises as fs } from 'fs';
import path from 'path';
import App from '../components/ui/App';
import { TriviaQuestion } from '../lib/types/qa';

/**
 * @description The home page of the application, which loads question data on the server.
 * @returns {Promise<JSX.Element>} The rendered home page with data passed to the App component.
 */
export default async function HomePage() {
  // Construct the absolute path to the JSON file within the project
  const filePath = path.join(process.cwd(), 'src', 'data', 'questions.json');
  let questions: TriviaQuestion[] = [];

  try {
    // Read and parse the questions data
    const fileContents = await fs.readFile(filePath, 'utf8');
    questions = JSON.parse(fileContents);
  } catch (error) {
    console.error('Failed to read or parse questions.json:', error);
    // If the file is missing or corrupt, we'll pass an empty array
    // The App component will handle this gracefully.
  }

  return <App questions={questions} />;
}