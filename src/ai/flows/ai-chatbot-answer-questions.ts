'use server';

import { groqChat } from '@/ai/groq';
import { services } from '@/config/services';
import { siteConfig } from '@/config/site';

export type AIChatbotAnswerQuestionsInput = { question: string };
export type AIChatbotAnswerQuestionsOutput = { answer: string };

const MAX_QUESTION_LENGTH = 500;

const systemPrompt = `Du bist der freundliche KI-Assistent der Digitalagentur ${siteConfig.name} aus ${siteConfig.contact.region}.
Antworte immer auf Deutsch, kurz und hilfreich (höchstens 4 Sätze), in der Sie-Form.

Leistungen von ${siteConfig.name}:
${services.map((s) => `- ${s.title}: ${s.description}`).join('\n')}

${siteConfig.name} setzt KI gezielt im eigenen Entwicklungsprozess ein (Recherche, Prototypen, Code, Qualitätsprüfung); Entscheidungen und Abnahme liegen beim Menschen.
Kontakt: ${siteConfig.contact.email}, ${siteConfig.contact.phone}, Kontaktformular unter /kontakt.

Regeln:
- Beantworte nur Fragen zu ${siteConfig.name}, seinen Leistungen, Projekten und Arbeitsweise.
- Erfinde keine Preise, Termine, Kunden oder Zusagen. Verweise bei solchen Fragen auf ein persönliches Gespräch über die Kontaktdaten.
- Bei themenfremden Fragen erkläre freundlich, dass du nur zu ${siteConfig.name} Auskunft geben kannst.`;

export async function aiChatbotAnswerQuestions(input: AIChatbotAnswerQuestionsInput): Promise<AIChatbotAnswerQuestionsOutput> {
  const question = String(input?.question ?? '').trim().slice(0, MAX_QUESTION_LENGTH);
  if (!question) return { answer: 'Wie kann ich Ihnen helfen?' };

  try {
    const answer = await groqChat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: question },
    ]);
    return { answer };
  } catch (error) {
    // Details stay in the server log; visitors get a helpful message instead.
    console.error('[chat]', error);
    const rateLimited = error instanceof Error && error.message.includes(' 429');
    return {
      answer: rateLimited
        ? `Gerade erreichen mich sehr viele Fragen. Bitte versuchen Sie es in einer Minute erneut – oder schreiben Sie uns direkt an ${siteConfig.contact.email}.`
        : `Ich kann gerade leider nicht antworten. Schreiben Sie uns gern an ${siteConfig.contact.email} oder nutzen Sie das Kontaktformular.`,
    };
  }
}
