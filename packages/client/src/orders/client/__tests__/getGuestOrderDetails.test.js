import { getGuestOrderDetails } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getGuestOrderDetails.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

const id = '123456';
const guestUserEmail = 'guest@email.com';
const expectedConfig = undefined;

beforeEach(() => {
  moxios.install(client);
  jest.clearAllMocks();
});

afterEach(() => moxios.uninstall(client));

describe('getGuestOrderDetails', () => {
  const spy = jest.spyOn(client, 'get');

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({
      id,
      guestUserEmail,
      response,
    });

    await expect(getGuestOrderDetails(id, guestUserEmail)).resolves.toBe(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      join('/legacy/v1/guestorders', id, {
        query: { guestUserEmail: guestUserEmail },
      }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({
      id,
      guestUserEmail,
    });

    await expect(
      getGuestOrderDetails(id, guestUserEmail),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      join('/legacy/v1/guestorders', id, {
        query: { guestUserEmail: guestUserEmail },
      }),
      expectedConfig,
    );
  });
});
