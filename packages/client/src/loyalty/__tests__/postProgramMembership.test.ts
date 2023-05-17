import {
  mockResponseProgramUsersMembership,
  programId,
} from 'tests/__fixtures__/loyalty/index.mjs';
import { postProgramMembership } from '../index.js';
import { ProgramMembershipStatus } from '../types/index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postProgramMembership.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

describe('postProgramMembership', () => {
  const spy = jest.spyOn(client, 'post');
  const apiPath = `/loyalty/v1/programs/${programId}/memberships`;
  const membershipData = {
    id: '1111',
    externalId: 'string',
    userId: 0,
    rewardPoints: 0,
    cashBalance: 0,
    status: ProgramMembershipStatus.Activated,
  };

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockResponseProgramUsersMembership));

    await expect(
      postProgramMembership(programId, membershipData),
    ).resolves.toStrictEqual(mockResponseProgramUsersMembership);
    expect(spy).toHaveBeenCalledWith(apiPath, membershipData, expectedConfig);
  });

  it('should receive a client request error', async () => {
    const spy = jest.spyOn(client, 'post');

    mswServer.use(fixtures.failure());

    await expect(
      postProgramMembership(programId, membershipData),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(apiPath, membershipData, expectedConfig);
  });
});
