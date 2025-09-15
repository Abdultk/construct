'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-insightful-reports.ts';
import '@/ai/flows/suggest-process-improvements.ts';
import '@/ai/flows/optimize-project-schedule.ts';
import '@/ai/flows/balance-team-workload.ts';
