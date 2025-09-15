'use server';

/**
 * @fileOverview This file defines a Genkit flow for optimizing project schedules using generative AI.
 *
 * The flow takes project schedule data as input, analyzes it using an AI model, and suggests proactive adjustments to mitigate potential delays.
 * It exports:
 * - `optimizeProjectSchedule`: A function to trigger the project schedule optimization flow.
 * - `OptimizeProjectScheduleInput`: The input type for the `optimizeProjectSchedule` function.
 * - `OptimizeProjectScheduleOutput`: The output type for the `optimizeProjectSchedule` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeProjectScheduleInputSchema = z.object({
  projectScheduleData: z
    .string()
    .describe(
      'Project schedule data in a structured format (e.g., JSON, CSV). Include task dependencies, durations, resource allocations, and any relevant constraints.'
    ),
  weatherConditions: z
    .string()
    .optional()
    .describe(
      'Historical and predicted weather conditions for the project location. Can be a textual description or structured data.'
    ),
  resourceAvailability: z
    .string()
    .optional()
    .describe(
      'Information on resource availability, including labor, equipment, and materials. Specify any constraints or limitations.'
    ),
  historicalData: z
    .string()
    .optional()
    .describe(
      'Historical project data from similar projects, including actual durations, costs, and resource utilization. Can be in a structured format.'
    ),
});

export type OptimizeProjectScheduleInput = z.infer<
  typeof OptimizeProjectScheduleInputSchema
>;

const OptimizeProjectScheduleOutputSchema = z.object({
  optimizedSchedule: z
    .string()
    .describe(
      'The optimized project schedule, incorporating suggested adjustments to mitigate potential delays. The format should match the input format.'
    ),
  delayPredictions: z
    .string()
    .optional()
    .describe(
      'A description of the predicted delays, including the tasks affected, the estimated delay duration, and the confidence level of the prediction.'
    ),
  suggestedAdjustments: z
    .string()
    .describe(
      'A list of suggested adjustments to the project schedule, including task reassignments, resource reallocation, and schedule modifications. Each adjustment should include a justification.'
    ),
});

export type OptimizeProjectScheduleOutput = z.infer<
  typeof OptimizeProjectScheduleOutputSchema
>;

export async function optimizeProjectSchedule(
  input: OptimizeProjectScheduleInput
): Promise<OptimizeProjectScheduleOutput> {
  return optimizeProjectScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeProjectSchedulePrompt',
  input: {schema: OptimizeProjectScheduleInputSchema},
  output: {schema: OptimizeProjectScheduleOutputSchema},
  prompt: `You are an expert project manager specializing in construction projects. Your goal is to analyze the provided project schedule, predict potential delays, and suggest proactive adjustments to keep the project on track.

Analyze the following project schedule data, weather conditions, resource availability, and historical data to identify potential risks and opportunities for optimization.

Project Schedule Data:
{{{projectScheduleData}}}

Weather Conditions:
{{{weatherConditions}}}

Resource Availability:
{{{resourceAvailability}}}

Historical Data:
{{{historicalData}}}

Based on your analysis, provide the following:

1.  Optimized Schedule: A revised project schedule incorporating your suggested adjustments. The format should match the input project schedule data.
2.  Delay Predictions: A description of the predicted delays, including the tasks affected, the estimated delay duration, and the confidence level of the prediction.
3.  Suggested Adjustments: A list of suggested adjustments to the project schedule, including task reassignments, resource reallocation, and schedule modifications. Each adjustment should include a justification.

Ensure that the optimized schedule is realistic and achievable, taking into account all relevant constraints and dependencies. Focus on providing actionable recommendations that the project manager can implement immediately.
`,
});

const optimizeProjectScheduleFlow = ai.defineFlow(
  {
    name: 'optimizeProjectScheduleFlow',
    inputSchema: OptimizeProjectScheduleInputSchema,
    outputSchema: OptimizeProjectScheduleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
