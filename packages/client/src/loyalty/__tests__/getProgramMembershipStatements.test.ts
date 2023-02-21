import { getProgramMembershipStatements } from '..';
import {
  membershipId,
  mockResponseProgramMembershipStatement,
  programId,
} from 'tests/__fixtures__/loyalty';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getProgramMembershipStatements.fixtures';
import mswServer from '../../../tests/mswServer';

const expectedConfig = undefined;

beforeEach(() => jest.clearAllMocks());

describe('getProgramMembershipStatements', () => {
  const spy = jest.spyOn(client, 'get');
  const apiPath = `/loyalty/v1/programs/${programId}/memberships/${membershipId}/statements?initialDate=2017-07-20`;
  const query = { initialDate: '2017-07-20' };

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success([mockResponseProgramMembershipStatement]));

    await expect(
      getProgramMembershipStatements(programId, membershipId, query),
    ).resolves.toContainEqual(mockResponseProgramMembershipStatement);
    expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
  });

  it('should receive a client request error', async () => {
    const spy = jest.spyOn(client, 'get');

    mswServer.use(fixtures.failure());

    await expect(
      getProgramMembershipStatements(programId, membershipId, query),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
  });
});
