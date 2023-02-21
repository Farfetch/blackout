import { getUserContacts } from '..';
import { mockGetContactsResponse, userId } from 'tests/__fixtures__/users';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getUserContacts.fixtures';
import mswServer from '../../../../tests/mswServer';

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
