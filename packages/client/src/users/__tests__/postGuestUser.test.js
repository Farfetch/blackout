import { postGuestUser } from '../';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postGuestUser.fixtures';
import moxios from 'moxios';

describe('postGuestUser', () => {
  const expectedConfig = undefined;
  const data = { countryId: 'PT', ip: '228.43.23.4' };
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ response });

    expect.assertions(2);

    await expect(postGuestUser(data)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/guestUsers',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure();

    expect.assertions(2);

    await expect(postGuestUser(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/guestUsers',
      data,
      expectedConfig,
    );
  });
});
