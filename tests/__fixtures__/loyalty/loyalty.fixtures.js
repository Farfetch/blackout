export const programId = 1;
export const membershipId = 1;
export const replacementId = 1;
export const convertId = 1;
export const statementId = 1;

const programsEntity = { id: programId, name: 'string' };
const replacementsEntity = { id: replacementId, reason: 'string' };
const convertsEntity = { id: convertId };
const statementsEntity = {
  id: statementId,
  points: 0,
  category: 'Purchase',
};
const membershipEntity = {
  id: membershipId,
  externalId: 'string',
  userId: 0,
  rewardPoints: 0,
  cashBalance: 0,
  status: 'string',
};

export const mockResponseProgramMembership = {
  id: membershipId,
  externalId: 'string',
  userId: 0,
  rewardPoints: 0,
  cashBalance: 0,
  status: 'string',
};

export const mockResponseProgramMembershipConvert = {
  id: 0,
  createdDate: 'date',
};

export const mockResponseProgramMembershipStatement = {
  id: 0,
  points: 0,
  type: 'string',
  action: 'string',
  createdDate: 'date',
};

export const mockResponseProgramUsersMembership = {
  id: membershipId,
  externalId: 'string',
  userId: 0,
  rewardPoints: 0,
  cashBalance: 0,
  status: 'string',
};

export const mockResponseProgramMembershipReplacement = {
  id: membershipId,
  reason: 'string',
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
    converts: { 0: mockResponseProgramMembershipConvert },
  },
  result: 0,
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
      result: [statementId],
      isLoading: false,
    },
  },
  entities: {
    programs: { [programId]: programsEntity },
    membership: { [membershipId]: membershipEntity },
    replacements: { [replacementId]: replacementsEntity },
    converts: { [convertId]: convertsEntity },
    statements: { [statementId]: statementsEntity },
  },
};
