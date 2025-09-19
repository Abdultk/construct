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
  content: z.string().describe('The text content of a single document or data chunk to be used as context. The AI will source its answer from this content.'),
});

const UserContextSchema = z.object({
  role: z.string().describe("The user's role (e.g., 'Project Manager', 'Executive'). This helps tailor the response to the user's perspective."),
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
      'The user\'s natural language query for the report. The AI will process this to understand the user\'s intent, extract key entities, and determine the required information.'
    ),
  documents: z.array(DocumentSchema).describe('An array of documents representing the knowledge base for this query. The AI will only use this information to answer.'),
  userContext: UserContextSchema.optional().describe('Information about the user making the request, used to resolve context.'),
  projectContext: ProjectContextSchema.optional().describe('Information about the project in question, used to resolve context.'),
});
export type GenerateInsightfulReportInput = z.infer<typeof GenerateInsightfulReportInputSchema>;

const GenerateInsightfulReportOutputSchema = z.object({
  report: z.string().describe('The generated report in a human-readable format, structured based on the interpreted query and provided context.'),
});
export type GenerateInsightfulReportOutput = z.infer<typeof GenerateInsightfulReportOutputSchema>;

export async function generateInsightfulReport(input: GenerateInsightfulReportInput): Promise<GenerateInsightfulReportOutput> {
  return generateInsightfulReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInsightfulReportPrompt',
  input: {schema: GenerateInsightfulReportInputSchema},
  output: {schema: GenerateInsightfulReportOutputSchema},
  prompt: `You are an expert AI assistant for construction executives. Your primary task is to interpret a user's query, analyze the provided context and documents, and generate an insightful, data-driven report.

Your response must be based *only* on the information provided in the documents. Do not use any external knowledge. If the documents do not contain the answer, state that the information is not available.

{{#if userContext}}
The user '{{userContext.name}}' has the role of '{{userContext.role}}'. You must tailor the report's tone, level of detail, and format to be appropriate for this user. For example, an executive may require a high-level summary, while a project manager may need more tactical details.
{{/if}}

{{#if projectContext}}
The query is regarding the project '{{projectContext.name}}', which is currently '{{projectContext.status}}'. Frame your analysis within this project context.
{{/if}}

User Query: {{{query}}}

Analyze this query to determine the user's intent. Based on that intent, synthesize the information from the following documents to generate a clear, concise, and actionable report.

Documents:
{{#each documents}}
---
{{{this.content}}}
---
{{/each}}

Generated Report:
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
