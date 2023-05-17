import { deleteUserPersonalId } from '../index.js';
import { personalId, userId } from 'tests/__fixtures__/users/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/deleteUserPersonalId.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('deleteUserPersonalId', () => {
  const expectedConfig = {
    'X-SUMMER-RequestId': 'test',
  };
  const config = {
    'X-SUMMER-RequestId': 'test',
  };
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = 200;

    mswServer.use(fixtures.success(response));

    await expect(
      deleteUserPersonalId(userId, personalId, config),
    ).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds/${personalId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      deleteUserPersonalId(userId, personalId, config),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds/${personalId}`,
      expectedConfig,
    );
  });
});
