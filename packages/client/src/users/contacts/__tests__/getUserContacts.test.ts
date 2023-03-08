import { getUserContacts } from '../index.js';
import {
  mockGetContactsResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/getUserContacts.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('getUserContacts', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGetContactsResponse));

    await expect(getUserContacts(userId)).resolves.toStrictEqual(
      mockGetContactsResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getUserContacts(userId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts`,
      expectedConfig,
    );
  });
});
