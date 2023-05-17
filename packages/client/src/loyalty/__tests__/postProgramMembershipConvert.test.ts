import {
  membershipId,
  mockResponseProgramMembershipConvert,
  programId,
} from 'tests/__fixtures__/loyalty/index.mjs';
import { postProgramMembershipConvert } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postProgramMembershipConvert.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

describe('postProgramMembershipConvert', () => {
  const spy = jest.spyOn(client, 'post');
  const apiPath = `/loyalty/v1/programs/${programId}/memberships/${membershipId}/converts`;

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockResponseProgramMembershipConvert));

    await expect(
      postProgramMembershipConvert(programId, membershipId),
    ).resolves.toStrictEqual(mockResponseProgramMembershipConvert);
    expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
  });

  it('should receive a client request error', async () => {
    const spy = jest.spyOn(client, 'post');

    mswServer.use(fixtures.failure());

    await expect(
      postProgramMembershipConvert(programId, membershipId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
  });
});
