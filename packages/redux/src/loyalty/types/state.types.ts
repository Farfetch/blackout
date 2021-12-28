import type { CombinedState } from 'redux';
import type {
  Program,
  ProgramMembership,
  ProgramMembershipConvert,
  ProgramMembershipReplacement,
  ProgramMembershipStatement,
} from '@farfetch/blackout-client/loyalty/types';
import type { StateWithResult, StateWithResultArray } from '../../types';

export type State = CombinedState<{
  programs: StateWithResultArray<Program['id']>;
  membership: StateWithResult<ProgramMembership>;
  replacements: StateWithResult<ProgramMembershipReplacement>;
  converts: StateWithResult<ProgramMembershipConvert>;
  statements: StateWithResultArray<ProgramMembershipStatement['id']>;
}>;
