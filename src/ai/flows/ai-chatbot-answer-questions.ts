// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview An AI chatbot flow that answers user questions about the company's services.
 *
 * - aiChatbotAnswerQuestions - A function that handles the chatbot answering questions process.
 * - AIChatbotAnswerQuestionsInput - The input type for the aiChatbotAnswerQuestions function.
 * - AIChatbotAnswerQuestionsOutput - The return type for the aiChatbotAnswerQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotAnswerQuestionsInputSchema = z.object({
  question: z.string().describe('The user question about the company\u0027s services.'),
});
export type AIChatbotAnswerQuestionsInput = z.infer<typeof AIChatbotAnswerQuestionsInputSchema>;

const AIChatbotAnswerQuestionsOutputSchema = z.object({
  answer: z.string().describe('The AI\u0027s answer to the user question.'),
});
export type AIChatbotAnswerQuestionsOutput = z.infer<typeof AIChatbotAnswerQuestionsOutputSchema>;

export async function aiChatbotAnswerQuestions(input: AIChatbotAnswerQuestionsInput): Promise<AIChatbotAnswerQuestionsOutput> {
  return aiChatbotAnswerQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotAnswerQuestionsPrompt',
  input: {schema: AIChatbotAnswerQuestionsInputSchema},
  output: {schema: AIChatbotAnswerQuestionsOutputSchema},
  prompt: `You are a helpful AI chatbot for Flut.digital, a digital agency.  Use the following information to answer the user\'s question about the company\'s services.  If the question is not related to the company\'s services, respond that you are only able to answer questions about Flut.digital\'s services.

Flut.digital provides the following services:
- Web Development
- Branding
- 3D/AR Development
- AI Solutions
- Social Media Marketing
- IT Training

Question: {{{question}}}`,
});

const aiChatbotAnswerQuestionsFlow = ai.defineFlow(
  {
    name: 'aiChatbotAnswerQuestionsFlow',
    inputSchema: AIChatbotAnswerQuestionsInputSchema,
    outputSchema: AIChatbotAnswerQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
