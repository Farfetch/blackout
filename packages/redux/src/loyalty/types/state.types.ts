import type { CombinedState } from 'redux';
import type {
  Program,
  ProgramMembership,
  ProgramMembershipConvert,
  ProgramMembershipReplacement,
  ProgramMembershipStatement,
} from '@farfetch/blackout-client';
import type { StateWithResult, StateWithResultArray } from '../../types';

export type LoyaltyState = CombinedState<{
  programs: StateWithResultArray<Program['id']>;
  membership: StateWithResult<Array<ProgramMembership['id']>>;
  replacements: StateWithResult<ProgramMembershipReplacement>;
  converts: StateWithResult<ProgramMembershipConvert>;
  statements: StateWithResultArray<ProgramMembershipStatement['id']>;
}>;
