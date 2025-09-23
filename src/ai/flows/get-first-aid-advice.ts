'use server';

/**
 * @fileOverview A Genkit flow for providing first aid advice for common construction site injuries.
 *
 * It takes a user's query about a specific injury and returns step-by-step first aid instructions,
 * along with a clear safety disclaimer.
 *
 * It exports:
 * - `getFirstAidAdvice`: A function to trigger the first aid advice flow.
 * - `GetFirstAidAdviceInput`: The input type for the function.
 * - `GetFirstAidAdviceOutput`: The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetFirstAidAdviceInputSchema = z.object({
  query: z.string().describe('The user\'s question about a first aid situation (e.g., "what to do for a deep cut?").'),
});
export type GetFirstAidAdviceInput = z.infer<
  typeof GetFirstAidAdviceInputSchema
>;

const GetFirstAidAdviceOutputSchema = z.object({
  advice: z.string().describe('Clear, step-by-step first aid instructions. Use numbered lists for clarity.'),
  disclaimer: z.string().describe('A standard, non-negotiable safety disclaimer that must always be displayed.'),
});
export type GetFirstAidAdviceOutput = z.infer<
  typeof GetFirstAidAdviceOutputSchema
>;

export async function getFirstAidAdvice(
  input: GetFirstAidAdviceInput
): Promise<GetFirstAidAdviceOutput> {
  return getFirstAidAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getFirstAidAdvicePrompt',
  input: {schema: GetFirstAidAdviceInputSchema},
  output: {schema: GetFirstAidAdviceOutputSchema},
  prompt: `You are a first aid advisor AI for a construction site. Your purpose is to provide clear, simple, step-by-step first aid instructions for common injuries. You are NOT a substitute for a professional medical opinion.

User's query: "{{{query}}}"

Based on the query, provide step-by-step first aid advice. The advice should be easy to follow in an emergency.

Your response MUST be in the requested JSON format.
1.  **advice**: Provide the instructions as a numbered list within a single string.
2.  **disclaimer**: You MUST return the following exact disclaimer text: "This is not a substitute for professional medical advice. For any serious injuries, call emergency services immediately."
`,
});

const getFirstAidAdviceFlow = ai.defineFlow(
  {
    name: 'getFirstAidAdviceFlow',
    inputSchema: GetFirstAidAdviceInputSchema,
    outputSchema: GetFirstAidAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
