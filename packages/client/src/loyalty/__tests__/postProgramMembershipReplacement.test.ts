import {
  membershipId,
  mockResponseProgramMembershipReplacement,
  programId,
} from 'tests/__fixtures__/loyalty';
import { postProgramMembershipReplacement } from '..';
import { ProgramMembershipReplacementReason } from '../types';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postProgramMembershipReplacement.fixtures';
import mswServer from '../../../tests/mswServer';

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

    expect.assertions(2);
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
