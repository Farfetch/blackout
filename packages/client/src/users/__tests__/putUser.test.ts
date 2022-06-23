import * as usersClient from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/putUser.fixtures';
import moxios from 'moxios';

describe('putUser', () => {
  const expectedConfig = undefined;
  const userId = 123456;
  const data = {
    name: 'New Name',
    email: 'teste@conta.com',
  };
  const spy = jest.spyOn(client, 'put');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {
      bagId: '3a52edfe-5b17-46b9-ba5d-ed87cb36aa67',
      dateOfBirth: '1990-01-01T00:00:00.000Z',
      email: 'teste@conta.com',
      gender: 0,
      id: 29538482,
      title: {
        id: '111',
        value: 'Dr.',
      },
      name: 'New Name',
      firstName: 'New',
      lastName: 'Name',
      phoneNumber: '910000000',
      segments: [],
      username: 'teste@conta.com',
      wishlistId: '8e091868-b74b-47e1-ab27-a2c247c92242',
      isExternalLogin: false,
      createdDate: '2022-06-09T21:12:24.116Z',
      updatedDate: '2022-06-09T21:12:24.116Z',
      isGuest: false,
      status: 'Active',
      countryCode: 'PT',
      receiveNewsletters: false,
    };

    fixtures.put.success({ response, userId });

    expect.assertions(2);

    await expect(usersClient.putUser(userId, data)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.put.failure({ userId });

    expect.assertions(2);

    await expect(usersClient.putUser(userId, data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}`,
      data,
      expectedConfig,
    );
  });
});
