import { postProgramMembership } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postProgramMembership.fixtures';
import moxios from 'moxios';

const programId = '1';
const membershipData = {
  externalId: 'string',
  userId: 0,
  rewardPoints: 0,
  cashBalance: 0,
  status: 'string',
  createdDate: 'date',
  updatedDate: 'date',
};
const expectedConfig = undefined;

beforeEach(() => {
  moxios.install(client);
  jest.clearAllMocks();
});

afterEach(() => moxios.uninstall(client));

describe('postProgramMembership', () => {
  const spy = jest.spyOn(client, 'post');
  const apiPath = `/loyalty/v1/programs/${programId}/memberships`;

  it('should handle a client request successfully', async () => {
    const response = { id: 'id', ...membershipData };

    fixtures.success({ programId, response });

    expect.assertions(2);
    await expect(
      postProgramMembership(programId, membershipData),
    ).resolves.toBe(response);
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
