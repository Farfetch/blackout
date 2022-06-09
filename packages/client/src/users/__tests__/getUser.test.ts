import * as usersClient from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getUser.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getUser', () => {
  const expectedConfig = undefined;
  const responseUrl = '/account/v1/users/me';
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = {
      bagId: '3a52edfe-5b17-46b9-ba5d-ed87cb36aa67',
      dateOfBirth: '/Date(631152000000)/',
      email: 'teste@conta.com',
      gender: 0,
      id: 29538482,
      title: {
        id: '111',
        value: 'Dr.',
      },
      name: 'Ivo Mota',
      phoneNumber: '910000000',
      segments: [],
      username: 'teste@conta.com',
      wishlistId: '8e091868-b74b-47e1-ab27-a2c247c92242',
      isExternalLogin: false,
      genders: ['NotDefined', 'Male', 'Female'],
      genderId: 0,
    };

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(usersClient.getUser()).resolves.toStrictEqual(response);

    expect(spy).toHaveBeenCalledWith(responseUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(usersClient.getUser()).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(responseUrl, expectedConfig);
  });
});
