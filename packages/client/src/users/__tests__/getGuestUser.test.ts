import { getGuestUser } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getGuestUser.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getGuestUser', () => {
  const expectedConfig = undefined;
  const userId = 123;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = {
      id: userId,
      bagId: 'string',
      wishlistId: 'string',
      ip: 'string',
      countryCode: 'string',
      externalId: 'string',
      friendId: 'string',
      expiryDate: '2020-03-31T15:21:55.109Z',
    };

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(getGuestUser(userId)).resolves.toStrictEqual(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/guestUsers/${userId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(getGuestUser(userId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/guestUsers/${userId}`,
      expectedConfig,
    );
  });
});
