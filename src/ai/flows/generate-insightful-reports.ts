'use server';
/**
 * @fileOverview A Genkit flow for generating insightful reports on project performance, cost analysis, or risk assessment using a RAG pattern.
 *
 * - generateInsightfulReport - A function that generates reports based on user query and provided documents.
 * - GenerateInsightfulReportInput - The input type for the generateInsightfulReport function.
 * - GenerateInsightfulReportOutput - The return type for the generateInsightfulReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DocumentSchema = z.object({
  content: z.string().describe('The text content of a single document or data chunk to be used as context.'),
});

const UserContextSchema = z.object({
  role: z.string().describe("The user's role (e.g., 'Project Manager', 'Executive')."),
  name: z.string().describe("The user's name."),
});

const ProjectContextSchema = z.object({
    name: z.string().describe("The name of the project being discussed."),
    status: z.string().describe("The current status of the project (e.g., 'On Track', 'At Risk')."),
});

const GenerateInsightfulReportInputSchema = z.object({
  query: z
    .string()
    .describe(
      'The user query for the report, specifying the type of report (project performance, cost analysis, or risk assessment) and any specific details or filters.'
    ),
  documents: z.array(DocumentSchema).describe('An array of documents representing the knowledge base for this query. The AI will only use this information to answer.'),
  userContext: UserContextSchema.optional().describe('Information about the user making the request.'),
  projectContext: ProjectContextSchema.optional().describe('Information about the project in question.'),
});
export type GenerateInsightfulReportInput = z.infer<typeof GenerateInsightfulReportInputSchema>;

const GenerateInsightfulReportOutputSchema = z.object({
  report: z.string().describe('The generated report in a human-readable format, based on the provided documents.'),
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

  Your primary task is to answer the user's query based *only* on the information provided in the documents below. Do not use any external knowledge. If the documents do not contain the answer, state that the information is not available.

  {{#if userContext}}
  The user '{{userContext.name}}' has the role of '{{userContext.role}}'. Tailor the report's tone and level of detail for this audience.
  {{/if}}

  {{#if projectContext}}
  The query is regarding the project '{{projectContext.name}}', which is currently '{{projectContext.status}}'.
  {{/if}}

  User Query: {{{query}}}

  Documents:
  {{#each documents}}
  ---
  {{{this.content}}}
  ---
  {{/each}}

  Based on the query and the provided documents, generate a comprehensive and data-driven report. The report must be clear, concise, and provide actionable insights for decision-making.

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
