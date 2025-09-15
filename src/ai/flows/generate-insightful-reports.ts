'use server';
/**
 * @fileOverview A Genkit flow for generating insightful reports on project performance, cost analysis, or risk assessment.
 *
 * - generateInsightfulReport - A function that generates reports based on user query.
 * - GenerateInsightfulReportInput - The input type for the generateInsightfulReport function.
 * - GenerateInsightfulReportOutput - The return type for the generateInsightfulReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInsightfulReportInputSchema = z.object({
  query: z
    .string()
    .describe(
      'The user query for the report, specifying the type of report (project performance, cost analysis, or risk assessment) and any specific details or filters.'
    ),
});
export type GenerateInsightfulReportInput = z.infer<typeof GenerateInsightfulReportInputSchema>;

const GenerateInsightfulReportOutputSchema = z.object({
  report: z.string().describe('The generated report in a human-readable format.'),
});
export type GenerateInsightfulReportOutput = z.infer<typeof GenerateInsightfulReportOutputSchema>;

export async function generateInsightfulReport(input: GenerateInsightfulReportInput): Promise<GenerateInsightfulReportOutput> {
  return generateInsightfulReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInsightfulReportPrompt',
  input: {schema: GenerateInsightfulReportInputSchema},
  output: {schema: GenerateInsightfulReportOutputSchema},
  prompt: `You are an AI assistant specialized in generating insightful reports for construction executives.

  Based on the user's query, generate a comprehensive report on project performance, cost analysis, or risk assessment.
  The report should be clear, concise, and data-driven, providing actionable insights for decision-making.

  User Query: {{{query}}}

  Report:
  `,
});

const generateInsightfulReportFlow = ai.defineFlow(
  {
    name: 'generateInsightfulReportFlow',
    inputSchema: GenerateInsightfulReportInputSchema,
    outputSchema: GenerateInsightfulReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
