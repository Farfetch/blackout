import {
  membershipId,
  mockResponseProgramMembershipReplacement,
  programId,
} from 'tests/__fixtures__/loyalty/index.mjs';
import { postProgramMembershipReplacement } from '../index.js';
import { ProgramMembershipReplacementReason } from '../types/index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postProgramMembershipReplacement.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

describe('postProgramMembershipReplacement', () => {
  const spy = jest.spyOn(client, 'post');
  const apiPath = `/loyalty/v1/programs/${programId}/memberships/${membershipId}/replacements`;
  const replacementData = {
    id: '111',
    reason: ProgramMembershipReplacementReason.Lost,
  };

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockResponseProgramMembershipReplacement));

    await expect(
      postProgramMembershipReplacement(
        programId,
        membershipId,
        replacementData,
      ),
    ).resolves.toStrictEqual(mockResponseProgramMembershipReplacement);
    expect(spy).toHaveBeenCalledWith(apiPath, replacementData, expectedConfig);
  });

  it('should receive a client request error', async () => {
    const spy = jest.spyOn(client, 'post');

    mswServer.use(fixtures.failure());

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
