import { postProgramMembershipConvert } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postMembershipConvert.fixtures';
import moxios from 'moxios';

const programId = '1';
const membershipId = '1';
const expectedConfig = undefined;

beforeEach(() => {
  moxios.install(client);
  jest.clearAllMocks();
});

afterEach(() => moxios.uninstall(client));

describe('postMembershipConvert', () => {
  const spy = jest.spyOn(client, 'post');
  const apiPath = `/loyalty/v1/programs/${programId}/memberships/${membershipId}/converts`;

  it('should handle a client request successfully', async () => {
    const response = { id: 'id', createdDate: 'date' };

    fixtures.success({ programId, membershipId, response });

    expect.assertions(2);
    await expect(
      postProgramMembershipConvert(programId, membershipId),
    ).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
  });

  it('should receive a client request error', async () => {
    const spy = jest.spyOn(client, 'post');

    fixtures.failure({ programId, membershipId });

    expect.assertions(2);
    await expect(
      postProgramMembershipConvert(programId, membershipId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
  });
});
