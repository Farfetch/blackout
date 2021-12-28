import {
  mockResponseProgramUsersMembership,
  programId,
} from 'tests/__fixtures__/loyalty';
import { postProgramMembership } from '..';
import { ProgramMembershipStatus } from '../types';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postProgramMembership.fixtures';
import moxios from 'moxios';

const expectedConfig = undefined;

beforeEach(() => {
  moxios.install(client);
  jest.clearAllMocks();
});

afterEach(() => moxios.uninstall(client));

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
    fixtures.success({
      programId,
      data: membershipData,
      response: mockResponseProgramUsersMembership,
    });

    expect.assertions(2);
    await expect(
      postProgramMembership(programId, membershipData),
    ).resolves.toBe(mockResponseProgramUsersMembership);
    expect(spy).toHaveBeenCalledWith(apiPath, membershipData, expectedConfig);
  });

  it('should receive a client request error', async () => {
    const spy = jest.spyOn(client, 'post');

    fixtures.failure({ programId });

    expect.assertions(2);
    await expect(
      postProgramMembership(programId, membershipData),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(apiPath, membershipData, expectedConfig);
  });
});
