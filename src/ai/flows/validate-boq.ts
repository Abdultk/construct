'use server';

/**
 * @fileOverview A Genkit flow for validating a Bill of Quantities (BOQ).
 *
 * This flow analyzes a list of BOQ items, identifies potential anomalies,
 * and provides a summary and a list of suggestions for improvement.
 *
 * It exports:
 * - `validateBoq`: The main function to trigger the BOQ validation.
 * - `ValidateBoqInput`: The input type for the validation function.
 * - `ValidateBoqOutput`: The output type for the validation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const BoqItemSchema = z.object({
  id: z.string().describe('The unique identifier for the BOQ item (e.g., "1.1", "2.3.4").'),
  description: z.string().describe('The description of the work item.'),
  unit: z.string().optional().describe('The unit of measurement (e.g., "m³", "sqm", "LS").'),
  quantity: z.number().optional().describe('The quantity of the item.'),
  rate: z.number().optional().describe('The rate per unit.'),
  isParent: z.boolean().describe('Whether this is a parent/summary item or a line item.'),
});

const ValidateBoqInputSchema = z.object({
  items: z.array(BoqItemSchema).describe('The list of all items in the Bill of Quantities.'),
});
export type ValidateBoqInput = z.infer<typeof ValidateBoqInputSchema>;

const AnomalySchema = z.object({
    itemId: z.string().describe('The ID of the BOQ item with the anomaly.'),
    anomaly: z.string().describe('A brief description of the identified anomaly (e.g., "Unusually High Rate", "Mismatched Unit").'),
    suggestion: z.string().describe('A concise, actionable suggestion to correct the anomaly or for further investigation.'),
});

const ValidateBoqOutputSchema = z.object({
  summary: z.string().describe('A high-level summary of the validation findings, including the number of anomalies found and general observations.'),
  anomalies: z.array(AnomalySchema).describe('A list of identified anomalies with specific suggestions.'),
});
export type ValidateBoqOutput = z.infer<typeof ValidateBoqOutputSchema>;

export async function validateBoq(input: ValidateBoqInput): Promise<ValidateBoqOutput> {
  return validateBoqFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateBoqPrompt',
  input: { schema: ValidateBoqInputSchema },
  output: { schema: ValidateBoqOutputSchema },
  prompt: `You are an expert quantity surveyor AI specializing in cost estimation and Bill of Quantities (BOQ) validation for large construction projects. Your task is to analyze the provided BOQ data and identify any anomalies, inconsistencies, or potential cost-saving opportunities.

Analyze the following list of BOQ items:
{{#each items}}
- ID: {{id}}
  - Description: {{description}}
  - Unit: {{unit}}
  - Quantity: {{quantity}}
  - Rate: {{rate}}
  - Is Parent: {{isParent}}
{{/each}}

Review the items based on the following criteria:
1.  **Reasonableness of Rates:** Are the rates for each item within a typical range for standard construction work? Flag any rates that seem unusually high or low.
2.  **Consistency:** Do units and descriptions match? (e.g., 'Concrete' should be in 'm³', not 'sqm').
3.  **Completeness:** Are there any obvious items missing for a standard construction project of this type? (This is a secondary check, focus on the provided data first).
4.  **Mathematical Accuracy:** While the amounts are pre-calculated, quickly scan for any glaring issues.
5.  **Cost Optimization:** Identify any items where the rate seems high and could be a candidate for negotiation or value engineering.

Based on your analysis, provide a high-level summary and then a list of specific, actionable anomalies. For each anomaly, provide the item ID, a description of the issue, and a clear suggestion for what to do.
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
