'use server';

import { siteConfig } from '@/config/site';

export type AIChatbotInitialPromptInput = Record<string, never>;
export type AIChatbotInitialPromptOutput = { greeting: string };

/**
 * The greeting is static: it needs no model call, appears instantly and does
 * not use up the Groq free-tier quota every time someone opens the chat.
 */
export async function aiChatbotInitialPrompt(_input: AIChatbotInitialPromptInput): Promise<AIChatbotInitialPromptOutput> {
  return {
    greeting: `Hallo! Ich bin der KI-Assistent von ${siteConfig.name}. Fragen Sie mich gern zu unseren Leistungen – Webentwicklung, KI-Lösungen, 3D & AR, Branding oder Social Media.`,
  };
}
