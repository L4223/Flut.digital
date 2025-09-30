'use server';
/**
 * @fileOverview An AI chatbot initial prompt flow.
 *
 * - aiChatbotInitialPrompt - A function that generates an initial greeting and assistance offer from the AI chatbot.
 * - AIChatbotInitialPromptInput - The input type for the aiChatbotInitialPrompt function.
 * - AIChatbotInitialPromptOutput - The return type for the aiChatbotInitialPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotInitialPromptInputSchema = z.object({})
export type AIChatbotInitialPromptInput = z.infer<typeof AIChatbotInitialPromptInputSchema>

const AIChatbotInitialPromptOutputSchema = z.object({
  greeting: z.string().describe('The initial greeting and assistance offer from the AI chatbot.'),
});
export type AIChatbotInitialPromptOutput = z.infer<typeof AIChatbotInitialPromptOutputSchema>

export async function aiChatbotInitialPrompt(input: AIChatbotInitialPromptInput): Promise<AIChatbotInitialPromptOutput> {
  return aiChatbotInitialPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotInitialPromptPrompt',
  input: {schema: AIChatbotInitialPromptInputSchema},
  output: {schema: AIChatbotInitialPromptOutputSchema},
  prompt: `You are a friendly and helpful AI chatbot for Flut Digital Hub. Your purpose is to assist users with information about the company, its services, and the content available on the website.

  Generate a greeting message that introduces yourself and offers initial assistance. Be concise and engaging.
  `,
});

const aiChatbotInitialPromptFlow = ai.defineFlow(
  {
    name: 'aiChatbotInitialPromptFlow',
    inputSchema: AIChatbotInitialPromptInputSchema,
    outputSchema: AIChatbotInitialPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
