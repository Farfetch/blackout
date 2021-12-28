import {
  membershipId,
  mockResponseProgramMembershipConvert,
  programId,
} from 'tests/__fixtures__/loyalty';
import { postProgramMembershipConvert } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postProgramMembershipConvert.fixtures';
import moxios from 'moxios';

const expectedConfig = undefined;

beforeEach(() => {
  moxios.install(client);
  jest.clearAllMocks();
});

afterEach(() => moxios.uninstall(client));

describe('postProgramMembershipConvert', () => {
  const spy = jest.spyOn(client, 'post');
  const apiPath = `/loyalty/v1/programs/${programId}/memberships/${membershipId}/converts`;

  it('should handle a client request successfully', async () => {
    fixtures.success({
      programId,
      membershipId,
      response: mockResponseProgramMembershipConvert,
    });

    expect.assertions(2);
    await expect(
      postProgramMembershipConvert(programId, membershipId),
    ).resolves.toBe(mockResponseProgramMembershipConvert);
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
