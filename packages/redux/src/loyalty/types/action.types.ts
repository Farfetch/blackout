import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  BlackoutError,
  Program,
  ProgramMembership,
  ProgramMembershipConvert,
  ProgramMembershipReplacement,
  ProgramMembershipStatement,
} from '@farfetch/blackout-client';
import type { NormalizedSchema } from 'normalizr';

/**
 * Create Program Membership Convert Action.
 */
export type CreateProgramMembershipConvertAction =
  | CreateProgramMembershipConvertFailureAction
  | CreateProgramMembershipConvertRequestAction
  | CreateProgramMembershipConvertSuccessAction;

type CreateProgramMembershipConvertPayload = NormalizedSchema<
  {
    converts: Record<ProgramMembershipConvert['id'], ProgramMembershipConvert>;
  },
  ProgramMembershipConvert['id']
>;
export interface CreateProgramMembershipConvertFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.CREATE_PROGRAM_MEMBERSHIP_CONVERT_FAILURE;
}

export interface CreateProgramMembershipConvertRequestAction extends Action {
  type: typeof actionTypes.CREATE_PROGRAM_MEMBERSHIP_CONVERT_REQUEST;
}

export interface CreateProgramMembershipConvertSuccessAction extends Action {
  payload: CreateProgramMembershipConvertPayload;
  type: typeof actionTypes.CREATE_PROGRAM_MEMBERSHIP_CONVERT_SUCCESS;
}

/**
 * Create Program Membership Action.
 */
export type CreateProgramMembershipAction =
  | CreateProgramMembershipFailureAction
  | CreateProgramMembershipRequestAction
  | CreateProgramMembershipSuccessAction;

type CreateProgramMembershipPayload = NormalizedSchema<
  {
    membership: Record<ProgramMembership['id'], ProgramMembership>;
  },
  Array<ProgramMembership['id']>
>;
export interface CreateProgramMembershipFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.CREATE_PROGRAM_MEMBERSHIP_FAILURE;
}

export interface CreateProgramMembershipRequestAction extends Action {
  type: typeof actionTypes.CREATE_PROGRAM_MEMBERSHIP_REQUEST;
}

export interface CreateProgramMembershipSuccessAction extends Action {
  payload: CreateProgramMembershipPayload;
  type: typeof actionTypes.CREATE_PROGRAM_MEMBERSHIP_SUCCESS;
}

/**
 * Create Program Membership Replacement Action.
 */
export type CreateProgramMembershipReplacementAction =
  | CreateProgramMembershipReplacementFailureAction
  | CreateProgramMembershipReplacementRequestAction
  | CreateProgramMembershipReplacementSuccessAction;

type CreateProgramMembershipReplacementPayload = NormalizedSchema<
  {
    replacements: Record<
      ProgramMembershipReplacement['id'],
      ProgramMembershipReplacement
    >;
  },
  ProgramMembershipReplacement['id']
>;
export interface CreateProgramMembershipReplacementFailureAction
  extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_FAILURE;
}

export interface CreateProgramMembershipReplacementRequestAction
  extends Action {
  type: typeof actionTypes.CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_REQUEST;
}

export interface CreateProgramMembershipReplacementSuccessAction
  extends Action {
  payload: CreateProgramMembershipReplacementPayload;
  type: typeof actionTypes.CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_SUCCESS;
}

/**
 * Fetch Program Membership Statements Action.
 */
export type FetchProgramMembershipStatementsAction =
  | FetchProgramMembershipStatementsFailureAction
  | FetchProgramMembershipStatementsRequestAction
  | FetchProgramMembershipStatementsSuccessAction;

type FetchProgramMembershipStatementsPayload = NormalizedSchema<
  {
    statements: Record<
      ProgramMembershipStatement['id'],
      ProgramMembershipStatement
    >;
  },
  Array<ProgramMembershipStatement['id']>
>;
export interface FetchProgramMembershipStatementsFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PROGRAM_MEMBERSHIP_STATEMENTS_FAILURE;
}

export interface FetchProgramMembershipStatementsRequestAction extends Action {
  type: typeof actionTypes.FETCH_PROGRAM_MEMBERSHIP_STATEMENTS_REQUEST;
}

export interface FetchProgramMembershipStatementsSuccessAction extends Action {
  payload: FetchProgramMembershipStatementsPayload;
  type: typeof actionTypes.FETCH_PROGRAM_MEMBERSHIP_STATEMENTS_SUCCESS;
}

/**
 * Fetch Programs Action.
 */
export type FetchProgramsAction =
  | FetchProgramsFailureAction
  | FetchProgramsRequestAction
  | FetchProgramsSuccessAction;

type FetchProgramsPayload = NormalizedSchema<
  {
    programs: Record<Program['id'], Program>;
  },
  Array<Program['id']>
>;
export interface FetchProgramsFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PROGRAMS_FAILURE;
}

export interface FetchProgramsRequestAction extends Action {
  type: typeof actionTypes.FETCH_PROGRAMS_REQUEST;
}

export interface FetchProgramsSuccessAction extends Action {
  payload: FetchProgramsPayload;
  type: typeof actionTypes.FETCH_PROGRAMS_SUCCESS;
}

/**
 * Fetch Program Users Membership Action.
 */
export type FetchProgramUsersMembershipAction =
  | FetchProgramUsersMembershipFailureAction
  | FetchProgramUsersMembershipRequestAction
  | FetchProgramUsersMembershipSuccessAction;

type FetchProgramUsersMembershipPayload = NormalizedSchema<
  {
    membership: Record<ProgramMembership['id'], ProgramMembership>;
  },
  Array<ProgramMembership['id']>
>;
export interface FetchProgramUsersMembershipFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_FAILURE;
}

export interface FetchProgramUsersMembershipRequestAction extends Action {
  type: typeof actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_REQUEST;
}

export interface FetchProgramUsersMembershipSuccessAction extends Action {
  payload: FetchProgramUsersMembershipPayload;
  type: typeof actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_SUCCESS;
}
