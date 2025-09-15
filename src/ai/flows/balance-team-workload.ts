'use server';

/**
 * @fileOverview This file defines a Genkit flow for balancing team workloads on a Kanban board.
 *
 * It takes a list of tasks and team members, analyzes the distribution, and suggests reassignments to optimize workload.
 * It exports:
 * - `balanceTeamWorkload`: A function to trigger the workload balancing flow.
 * - `BalanceTeamWorkloadInput`: The input type for the function.
 * - `BalanceTeamWorkloadOutput`: The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  priority: z.string(),
  assigneeId: z.string(),
  dueDate: z.string().optional(),
  aiEstimate: z.string().optional(),
  isCritical: z.boolean().optional(),
});

const TeamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const BalanceTeamWorkloadInputSchema = z.object({
  tasks: z.array(TaskSchema).describe('The list of all tasks on the Kanban board.'),
  teamMembers: z.array(TeamMemberSchema).describe('The list of all team members available for assignment.'),
});

export type BalanceTeamWorkloadInput = z.infer<
  typeof BalanceTeamWorkloadInputSchema
>;

const BalanceTeamWorkloadOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A clear, concise, and actionable set of recommendations for reassigning tasks to balance the workload. Explain the reasoning for each suggestion (e.g., "To free up Bob who is overloaded, move Task X to Alice who has capacity.").'
    ),
});

export type BalanceTeamWorkloadOutput = z.infer<
  typeof BalanceTeamWorkloadOutputSchema
>;

export async function balanceTeamWorkload(
  input: BalanceTeamWorkloadInput
): Promise<BalanceTeamWorkloadOutput> {
  return balanceTeamWorkloadFlow(input);
}

const prompt = ai.definePrompt({
  name: 'balanceTeamWorkloadPrompt',
  input: {schema: BalanceTeamWorkloadInputSchema},
  output: {schema: BalanceTeamWorkloadOutputSchema},
  prompt: `You are an expert project manager AI specializing in team dynamics and workload optimization. Your goal is to analyze the provided list of tasks and team members from a Kanban board and suggest reassignments to ensure a balanced and efficient workflow.

Consider the following factors in your analysis:
- The number of tasks assigned to each team member.
- The priority of the tasks. High-priority or critical tasks require more attention.
- Any provided AI estimates for task duration.
- Avoid reassigning tasks that are already 'In Review' or 'Completed' unless absolutely necessary.

Analyze the following data:

Team Members:
{{#each teamMembers}}
- {{name}} (ID: {{id}})
{{/each}}

Tasks:
{{#each tasks}}
- Task: "{{title}}" (ID: {{id}})
  - Priority: {{priority}}
  - Assigned to: {{assigneeId}}
  {{#if dueDate}}- Due: {{dueDate}}{{/if}}
  {{#if aiEstimate}}- Est: {{aiEstimate}}{{/if}}
{{/each}}


Based on your analysis, provide a set of actionable recommendations to balance the workload. Be specific about which tasks should be moved and to whom, and briefly justify each recommendation.
`,
});

const balanceTeamWorkloadFlow = ai.defineFlow(
  {
    name: 'balanceTeamWorkloadFlow',
    inputSchema: BalanceTeamWorkloadInputSchema,
    outputSchema: BalanceTeamWorkloadOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
