import { postGuestUser } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postGuestUser.fixtures';
import mswServer from '../../../tests/mswServer';

describe('postGuestUser', () => {
  const expectedConfig = undefined;
  const data = { countryCode: 'PT', ip: '228.43.23.4' };
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = {
      id: 123,
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

    await expect(postGuestUser(data)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/guestUsers',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(postGuestUser(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/guestUsers',
      data,
      expectedConfig,
    );
  });
});
