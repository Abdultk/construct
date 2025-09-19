
'use server';

/**
 * @fileOverview A Genkit flow for validating a Bill of Quantities (BOQ).
 *
 * This flow analyzes a list of BOQ items against a specified or auto-detected
 * standard, identifies potential anomalies, and provides a summary and a list
 * of suggestions for improvement. This serves as an example of AI-powered
 * Knowledge Expansion, where the system mines actionable insights from raw
 * project data.
 *
 * It exports:
 * - `validateBoq`: The main function to trigger the BOQ validation.
 * - `ValidateBoqInput`: The input type for the validation function.
 * - `ValidateBoqOutput`: The output type for the validation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const BoqItemSchema = z.object({
  id: z.string().describe('The unique identifier for the BOQ item (e.g., "1.1", "2.3.4").'),
  description: z.string().describe('The description of the work item.'),
  unit: z.string().optional().describe('The unit of measurement (e.g., "m³", "sqm", "LS").'),
  quantity: z.number().optional().describe('The quantity of the item.'),
  rate: z.number().optional().describe('The rate per unit.'),
  isParent: z.boolean().describe('Whether this is a parent/summary item or a line item.'),
});

const ValidateBoqInputSchema = z.object({
  items: z.array(BoqItemSchema).describe('The list of all items in the Bill of Quantities, representing the raw data to be mined for knowledge.'),
  boqStandard: z.string().optional().describe('The selected BOQ standard to validate against (e.g., "NRM", "CESMM4"). If not provided, the AI will attempt to auto-detect the standard.'),
});
export type ValidateBoqInput = z.infer<typeof ValidateBoqInputSchema>;

const AnomalySchema = z.object({
    itemId: z.string().describe('The ID of the BOQ item with the anomaly.'),
    anomaly: z.string().describe('A brief description of the identified anomaly (e.g., "Unusually High Rate", "Mismatched Unit"). This represents a piece of mined knowledge.'),
    suggestion: z.string().describe('A concise, actionable suggestion to correct the anomaly or for further investigation. This is the extracted, actionable insight.'),
});

const ValidateBoqOutputSchema = z.object({
  summary: z.string().describe('A high-level summary of the validation findings, including the number of anomalies found and general observations.'),
  anomalies: z.array(AnomalySchema).describe('A list of identified anomalies with specific suggestions, representing the full set of expanded knowledge.'),
  detectedStandard: z.string().optional().describe('The BOQ standard the AI detected or used for validation.'),
});
export type ValidateBoqOutput = z.infer<typeof ValidateBoqOutputSchema>;

export async function validateBoq(input: ValidateBoqInput): Promise<ValidateBoqOutput> {
  return validateBoqFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateBoqPrompt',
  input: { schema: ValidateBoqInputSchema },
  output: { schema: ValidateBoqOutputSchema },
  prompt: `You are an expert quantity surveyor AI specializing in cost estimation and Bill of Quantities (BOQ) validation for large construction projects. You have been trained on thousands of BOQ samples from various international and regional standards. Your task is to act as a "Knowledge Miner" by analyzing the provided BOQ data to identify anomalies, inconsistencies, and potential cost-saving opportunities.

{{#if boqStandard}}
The user has specified that the BOQ standard is '{{boqStandard}}'. You MUST use this standard for your validation.
{{else}}
No specific BOQ standard was provided. First, attempt to auto-detect the standard (e.g., NRM, CESMM4, SMM7, POMI, UNIFORMAT II, MasterFormat, DIN 276, IS 1200) based on a multi-layered analysis of the items. Analyze the numbering scheme (e.g., numeric like 1.1 vs alphanumeric like A1), hierarchy, item descriptions (e.g., "formwork" vs. "shuttering"), terminology, and units of measurement to determine the most likely standard. State the detected standard in your response.
{{/if}}

Analyze the following list of BOQ items:
{{#each items}}
- ID: {{id}}
  - Description: {{description}}
  - Unit: {{unit}}
  - Quantity: {{quantity}}
  - Rate: {{rate}}
  - Is Parent: {{isParent}}
{{/each}}

Review the items based on the specified (or detected) standard and the following criteria to extract new knowledge:
1.  **Structural & Vocabulary Compliance:** Analyze the numbering scheme, hierarchy, and terminology. Does the itemization and vocabulary comply with the rules and common language of the BOQ standard? For example, NRM uses numeric subsections (1.1, 1.2), whereas CESMM4 might use alphanumeric (A1, A2). Similarly, check if the technical terms used in descriptions are consistent with the chosen standard.
2.  **Reasonableness of Rates:** Are the rates for each item within a typical range for standard construction work? Flag any rates that seem unusually high or low.
3.  **Consistency:** Do units and descriptions match? (e.g., 'Concrete' should be in 'm³', not 'sqm').
4.  **Completeness:** Are there any obvious items missing for a standard construction project of this type according to the chosen standard?
5.  **Cost Optimization:** Identify any items where the rate seems high and could be a candidate for negotiation or value engineering.

Based on your analysis, provide a high-level summary, the detected standard (if applicable), and then a list of specific, actionable anomalies. For each anomaly, provide the item ID, a description of the issue, and a clear suggestion for what to do. This output will represent the new, validated knowledge extracted from the data.
`,
});

const validateBoqFlow = ai.defineFlow(
  {
    name: 'validateBoqFlow',
    inputSchema: ValidateBoqInputSchema,
    outputSchema: ValidateBoqOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
