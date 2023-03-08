import {
  ProgramMembershipReplacementReason,
  ProgramMembershipStatementCategory,
  ProgramMembershipStatus,
} from '@farfetch/blackout-client';

export const programId = '1';
export const membershipId = '1';
export const replacementId = '1';
export const convertId = '1';
export const statementId = '1';

const statementCategory = ProgramMembershipStatementCategory.Purchase;

export const mockResponsePrograms = [
  {
    id: programId,
    name: 'Program1',
  },
];

export const mockResponseProgramMembership = {
  id: membershipId,
  externalId: 'string',
  userId: 0,
  rewardPoints: 0,
  cashBalance: 0,
  status: ProgramMembershipStatus.Activated,
};

export const mockResponseProgramMembershipConvert = {
  id: convertId,
  createdDate: 'date',
};

export const mockResponseProgramMembershipStatement = {
  id: statementId,
  points: 0,
  category: statementCategory,
  referenceDate: '2021-12-31T10:42:58.031Z',
};

export const mockResponseProgramUsersMembership = {
  id: membershipId,
  externalId: 'string',
  userId: 0,
  rewardPoints: 0,
  cashBalance: 0,
  status: ProgramMembershipStatus.Activated,
  createdDate: 'date',
  updatedDate: 'date',
};

export const mockResponseProgramMembershipReplacement = {
  id: membershipId,
  reason: ProgramMembershipReplacementReason.NameChanged,
  createdDate: 'date',
};

export const expectedNormalizedPayloadProgramMembership = {
  entities: {
    memberships: { [membershipId]: mockResponseProgramMembership },
  },
  result: membershipId,
};

export const expectedNormalizedPayloadProgramMembershipConvert = {
  entities: {
    converts: { [convertId]: mockResponseProgramMembershipConvert },
  },
  result: convertId,
};

export const mockResponseProgramMembershipStatements = [
  mockResponseProgramMembershipStatement,
];

export const expectedNormalizedPayloadProgramUsersMembership = {
  entities: {
    memberships: { [membershipId]: mockResponseProgramUsersMembership },
  },
  result: membershipId,
};

export const expectedNormalizedPayloadProgramMembershipReplacement = {
  entities: {
    replacements: {
      [membershipId]: mockResponseProgramMembershipReplacement,
    },
  },
  result: membershipId,
};

export const expectedNormalizedPayloadProgramMembershipStatements = {
  entities: {
    statements: {
      [statementId]: {
        ...mockResponseProgramMembershipStatement,
      },
    },
  },
  result: [statementId],
};

export const expectedNormalizedPayloadPrograms = {
  entities: {
    programs: {
      [programId]: {
        ...mockResponsePrograms[0],
      },
    },
  },
  result: [programId],
};

export const mockState = {
  loyalty: {
    programs: {
      error: 'error: not loaded',
      result: [programId],
      isLoading: false,
    },
    membership: {
      error: 'error: not loaded',
      result: membershipId,
      isLoading: false,
    },
    replacements: {
      error: 'error: not loaded',
      result: [replacementId],
      isLoading: false,
    },
    converts: {
      error: 'error: not loaded',
      result: [convertId],
      isLoading: false,
    },
    statements: {
      error: 'error: not loaded',
      result: expectedNormalizedPayloadProgramMembershipStatements.result,
      isLoading: false,
    },
  },
  entities: {
    programs: { ...expectedNormalizedPayloadPrograms['entities'].programs },
    memberships: {
      ...expectedNormalizedPayloadProgramMembership['entities'].memberships,
    },
    replacements: {
      ...expectedNormalizedPayloadProgramMembershipReplacement['entities']
        .replacements,
    },
    converts: {
      ...expectedNormalizedPayloadProgramMembershipConvert['entities'].converts,
    },
    statements: {
      ...expectedNormalizedPayloadProgramMembershipStatements['entities']
        .statements,
    },
  },
};
