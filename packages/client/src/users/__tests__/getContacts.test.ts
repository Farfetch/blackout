import * as usersClient from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getContacts.fixtures';
import moxios from 'moxios';

describe('getContacts', () => {
  const expectedConfig = undefined;
  const userId = 123456;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = [
      {
        id: '4c46a918-303b-4847-8825-dfb295acb6c8',
        value: 'TEST',
        countryDetails: {
          countryCode: 'PT',
          countryCallingCode: '351',
        },
        type: 'Phone',
        description: 'TEST',
      },
    ];

    fixtures.success({ userId, response });

    expect.assertions(2);

    await expect(usersClient.getContacts(userId)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ userId });

    expect.assertions(2);

    await expect(usersClient.getContacts(userId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts`,
      expectedConfig,
    );
  });
});
