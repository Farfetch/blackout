import type { Program } from '@farfetch/blackout-client/loyalty/types';

export type ProgramEntity = Program;

export type ProgramsEntity = Record<Program['id'], Program> | undefined;
