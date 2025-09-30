'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/optimize-project-schedule.ts';
import '@/ai/flows/balance-team-workload.ts';
import '@/ai/flows/validate-boq.ts';
import '@/ai/flows/analyze-change-impact.ts';
import '@/ai/flows/get-first-aid-advice.ts';
