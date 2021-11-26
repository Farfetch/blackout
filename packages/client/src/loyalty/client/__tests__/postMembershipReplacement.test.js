import { postProgramMembershipReplacement } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postMembershipReplacement.fixtures';
import moxios from 'moxios';

const programId = '1';
const membershipId = '1';
const replacementData = { reason: 'string' };
const expectedConfig = undefined;

beforeEach(() => {
  moxios.install(client);
  jest.clearAllMocks();
});

afterEach(() => moxios.uninstall(client));

describe('postMembershipReplacement', () => {
  const spy = jest.spyOn(client, 'post');
  const apiPath = `/loyalty/v1/programs/${programId}/memberships/${membershipId}/replacements`;

  it('should handle a client request successfully', async () => {
    const response = {
      id: 'id',
      reason: 'string',
      createdDate: 'date',
    };

    fixtures.success({
      programId,
      membershipId,
      response,
    });

    expect.assertions(2);
    await expect(
      postProgramMembershipReplacement(
        programId,
        membershipId,
        replacementData,
      ),
    ).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(apiPath, replacementData, expectedConfig);
  });

  it('should receive a client request error', async () => {
    const spy = jest.spyOn(client, 'post');

    fixtures.failure({ programId, membershipId });

    expect.assertions(2);
    await expect(
      postProgramMembershipReplacement(
        programId,
        membershipId,
        replacementData,
      ),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(apiPath, replacementData, expectedConfig);
  });
});
