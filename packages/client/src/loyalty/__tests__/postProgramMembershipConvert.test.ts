import {
  membershipId,
  mockResponseProgramMembershipConvert,
  programId,
} from 'tests/__fixtures__/loyalty';
import { postProgramMembershipConvert } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postProgramMembershipConvert.fixtures';
import mswServer from '../../../tests/mswServer';

const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

describe('postProgramMembershipConvert', () => {
  const spy = jest.spyOn(client, 'post');
  const apiPath = `/loyalty/v1/programs/${programId}/memberships/${membershipId}/converts`;

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockResponseProgramMembershipConvert));

    expect.assertions(2);
    await expect(
      postProgramMembershipConvert(programId, membershipId),
    ).resolves.toStrictEqual(mockResponseProgramMembershipConvert);
    expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
  });

  it('should receive a client request error', async () => {
    const spy = jest.spyOn(client, 'post');

    mswServer.use(fixtures.failure());

    expect.assertions(2);
    await expect(
      postProgramMembershipConvert(programId, membershipId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
  });
});
