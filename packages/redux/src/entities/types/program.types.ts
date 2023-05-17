import type { Program } from '@farfetch/blackout-client';

export type ProgramEntity = Program;

export type ProgramsEntity = Record<Program['id'], Program> | undefined;
