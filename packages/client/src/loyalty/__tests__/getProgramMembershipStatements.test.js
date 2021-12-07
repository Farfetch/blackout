import { getProgramMembershipStatements } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getProgramMembershipStatements.fixtures';
import moxios from 'moxios';

const programId = '1';
const membershipId = '1';
const statementData = {
  points: 0,
  type: 'string',
  action: 'string',
  createdDate: 'date',
};
const expectedConfig = undefined;

beforeEach(() => {
  moxios.install(client);
  jest.clearAllMocks();
});

afterEach(() => moxios.uninstall(client));

describe('getProgramMembershipStatements', () => {
  const spy = jest.spyOn(client, 'get');
  const apiPath = `/loyalty/v1/programs/${programId}/memberships/${membershipId}/statements?membershipId=123`;
  const query = { membershipId: '123' };

  it('should handle a client request successfully', async () => {
    const response = [{ id: 'id', ...statementData }];

    fixtures.success({
      programId,
      membershipId,
      query,
      response,
    });

    expect.assertions(2);
    await expect(
      getProgramMembershipStatements(programId, membershipId, query),
    ).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
  });

  it('should receive a client request error', async () => {
    const spy = jest.spyOn(client, 'get');

    fixtures.failure({ programId, membershipId, query });

    expect.assertions(2);
    await expect(
      getProgramMembershipStatements(programId, membershipId, query),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
  });
});
