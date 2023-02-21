import {
  mockResponseProgramUsersMembership,
  programId,
} from 'tests/__fixtures__/loyalty';
import { postProgramMembership } from '..';
import { ProgramMembershipStatus } from '../types';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postProgramMembership.fixtures';
import mswServer from '../../../tests/mswServer';

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
