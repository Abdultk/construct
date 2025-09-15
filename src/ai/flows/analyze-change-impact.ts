'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing the impact of a project change request.
 *
 * It takes the details of a proposed change, analyzes its potential impact on cost, schedule, and risks, and returns a structured analysis.
 * It exports:
 * - `analyzeChangeImpact`: A function to trigger the change impact analysis flow.
 * - `AnalyzeChangeImpactInput`: The input type for the function.
 * - `AnalyzeChangeImpactOutput`: The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeChangeImpactInputSchema = z.object({
  changeTitle: z.string().describe('The title of the change request.'),
  changeDescription: z
    .string()
    .describe('A detailed description and justification for the proposed change.'),
  affectedWbs: z.string().describe('The Work Breakdown Structure (WBS) code for the affected work package.'),
  proposedSolution: z.string().describe('The detailed proposed solution for implementing the change.'),
  projectScheduleData: z.string().optional().describe('Optional: Relevant data from the project schedule for context.'),
});

export type AnalyzeChangeImpactInput = z.infer<
  typeof AnalyzeChangeImpactInputSchema
>;

const AnalyzeChangeImpactOutputSchema = z.object({
  estimatedCostImpact: z.string().describe('A clear and concise estimation of the financial impact (e.g., "+$15,200", "-$5,000", "No significant cost impact").'),
  estimatedScheduleImpact: z.string().describe('A clear and concise estimation of the schedule impact (e.g., "+5 days", "-2 days", "No significant schedule impact").'),
  potentialRisks: z.string().describe('A bullet-point list of potential risks introduced by this change. If no significant risks, state that. E.g., "- Increased lead time for new material.\n- Requires specialized labor which may be unavailable."'),
});

export type AnalyzeChangeImpactOutput = z.infer<
  typeof AnalyzeChangeImpactOutputSchema
>;

export async function analyzeChangeImpact(
  input: AnalyzeChangeImpactInput
): Promise<AnalyzeChangeImpactOutput> {
  return analyzeChangeImpactFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeChangeImpactPrompt',
  input: {schema: AnalyzeChangeImpactInputSchema},
  output: {schema: AnalyzeChangeImpactOutputSchema},
  prompt: `You are a construction project management AI expert. Your task is to analyze the following change request and provide a concise impact analysis.

Change Request Details:
- Title: {{{changeTitle}}}
- Description: {{{changeDescription}}}
- Affected WBS: {{{affectedWbs}}}
- Proposed Solution: {{{proposedSolution}}}
{{#if projectScheduleData}}
- Project Context: {{{projectScheduleData}}}
{{/if}}

Based on the information provided, perform an impact analysis. Be realistic and use typical construction industry knowledge to estimate impacts.

Your output must be in the requested JSON format, providing:
1.  **estimatedCostImpact**: A string representing the estimated cost change (e.g., "+$15,200.00").
2.  **estimatedScheduleImpact**: A string representing the estimated schedule change (e.g., "+5 days").
3.  **potentialRisks**: A string containing a brief, bulleted list of potential risks.
`,
});

const analyzeChangeImpactFlow = ai.defineFlow(
  {
    name: 'analyzeChangeImpactFlow',
    inputSchema: AnalyzeChangeImpactInputSchema,
    outputSchema: AnalyzeChangeImpactOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
