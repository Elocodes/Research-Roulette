# Research-Roulette

## Project Overview

**Research-Roulette** is a mobile-first web application designed to make learning about scientific and technological breakthroughs both fun and accessible. It gamifies the process of staying up-to-date with a diverse range of research, from AI to quantum computing, through a simple and engaging "spin-to-learn" interface.

This project demonstrates a strategic approach to AI-assisted development by using large language models for one-time content generation, avoiding continuous API costs, and proving that the most effective solutions are not always the most complex.

---

## Tech Stack & Architecture

- **Frontend:** Next.js with React for a fast, responsive, and mobile-first user interface.
- **Backend:** Bun for running the one-time data generation script and for serving the static content.
- **Data Storage:** A single, local `JSON` file acts as the project's database, containing all of the pre-generated Q&A content.
- **Key Libraries:**
  - **AI Integration:** Gemini API for content generation.
  - **Data Validation:** Zod for ensuring the AI-generated data conforms to a strict schema.
  - **UI/UX:** Custom React components for the interactive "spin" animation and displaying content.

---

## My AI Integration Plan

Gemini CLI will be my core AI assistant and will be used in the following ways:

### Code or Feature Generation
- **Data Generation Script:** AI will be used to write the initial Bun script that orchestrates the batch calls to the Gemini API, ensuring the output is correctly formatted for the project's needs.
- **Core Components:** I will use the AI to scaffold the `SpinWheel` and `QuestionCard` React components, allowing me to focus on styling and logic rather than boilerplate code.
- **Documentation:** The AI will assist in generating core documentation, including this `README.md` file, by summarizing the project's purpose and tech stack.

### Testing Support
- **Unit Tests for Data:** I will prompt the AI to generate a comprehensive Jest test suite to validate the Zod schema. This guarantees the integrity of the data before it's used in the application.
- **Integration Tests:** AI will assist in creating tests that confirm the app correctly reads from the local `JSON` file and that the "spin" logic selects and displays a new question correctly.

### Schema-Aware Generation
- **Schema Definition:** My first step will be to prompt the AI to define a robust `Zod` schema for the trivia questions, including fields like `question_text`, `correct_answer`, `incorrect_answers`, and `source_link`.
- **Data Handling Functions:** Using this defined schema as context, I will prompt the AI to generate the necessary utility functions for reading and parsing the data from the `JSON` file.

---

## In-Editor & PR Review Tooling

- **Tool of Choice:** CodeRabbit
- **Usage Plan:** I will use CodeRabbit to perform automated code reviews on my final project. I will also leverage its ability to summarize my pull requests and draft professional, detailed commit messages, documenting my development journey with clarity and purpose.

---

## My Prompting Strategy

Here are examples of the types of prompts I will use to guide the AI:

- **For Data Generation:**
  `You are an expert on scientific and technological breakthroughs. Generate a JSON array of 50 unique trivia questions about topics like AI, quantum computing, and laser technology. For each question, provide a "question" string, a "correct_answer" string, an array of three "incorrect_answers", and a "source_link" to the original paper, patent, or article. Ensure the information is accurate and from the last 10 years.`

- **For Testing:**
  `Given the following Zod schema for a trivia question object, generate a comprehensive test suite using Jest. The tests should validate both correct and incorrect data structures, ensuring all required fields are present and that their data types are correct.`