'use server';

/**
 * @fileOverview A process improvement suggestion AI agent.
 *
 * - suggestProcessImprovements - A function that suggests process improvements based on project data.
 * - SuggestProcessImprovementsInput - The input type for the suggestProcessImprovements function.
 * - SuggestProcessImprovementsOutput - The return type for the suggestProcessImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProcessImprovementsInputSchema = z.object({
  projectData: z
    .string()
    .describe('Detailed data about the project, including budget, schedule, resource allocation, and performance metrics.'),
});
export type SuggestProcessImprovementsInput = z.infer<typeof SuggestProcessImprovementsInputSchema>;

const SuggestProcessImprovementsOutputSchema = z.object({
  processImprovements: z
    .string()
    .describe('A list of process improvements suggested by the AI, with clear explanations of how they can improve project efficiency and reduce costs.'),
});
export type SuggestProcessImprovementsOutput = z.infer<typeof SuggestProcessImprovementsOutputSchema>;

export async function suggestProcessImprovements(
  input: SuggestProcessImprovementsInput
): Promise<SuggestProcessImprovementsOutput> {
  return suggestProcessImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProcessImprovementsPrompt',
  input: {schema: SuggestProcessImprovementsInputSchema},
  output: {schema: SuggestProcessImprovementsOutputSchema},
  prompt: `You are an expert project management consultant. Analyze the following project data and suggest process improvements to enhance efficiency and reduce costs. Provide specific, actionable recommendations.

Project Data:
{{projectData}}`,
});

const suggestProcessImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestProcessImprovementsFlow',
    inputSchema: SuggestProcessImprovementsInputSchema,
    outputSchema: SuggestProcessImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
