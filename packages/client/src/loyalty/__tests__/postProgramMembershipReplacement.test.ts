import {
  membershipId,
  mockResponseProgramMembershipReplacement,
  programId,
} from 'tests/__fixtures__/loyalty';
import { postProgramMembershipReplacement } from '..';
import { ProgramMembershipReplacementReason } from '../types';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postProgramMembershipReplacement.fixtures';
import moxios from 'moxios';

const expectedConfig = undefined;

beforeEach(() => {
  moxios.install(client);
  jest.clearAllMocks();
});

afterEach(() => moxios.uninstall(client));

describe('postProgramMembershipReplacement', () => {
  const spy = jest.spyOn(client, 'post');
  const apiPath = `/loyalty/v1/programs/${programId}/memberships/${membershipId}/replacements`;
  const replacementData = {
    id: '111',
    reason: ProgramMembershipReplacementReason.Lost,
  };

  it('should handle a client request successfully', async () => {
    fixtures.success({
      programId,
      membershipId,
      data: replacementData,
      response: mockResponseProgramMembershipReplacement,
    });

    expect.assertions(2);
    await expect(
      postProgramMembershipReplacement(
        programId,
        membershipId,
        replacementData,
      ),
    ).resolves.toBe(mockResponseProgramMembershipReplacement);
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
