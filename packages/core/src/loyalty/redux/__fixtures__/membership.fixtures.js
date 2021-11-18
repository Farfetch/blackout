export const programId = 1;
export const membershipId = 1;

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
