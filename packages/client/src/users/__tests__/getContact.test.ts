import * as usersClient from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getContact.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getContact', () => {
  const expectedConfig = undefined;
  const userId = 123456;
  const contactId = '78910';
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = {
      id: '4c46a918-303b-4847-8825-dfb295acb6c8',
      value: 'TEST',
      countryDetails: {
        countryCode: 'PT',
        countryCallingCode: '351',
      },
      type: 'Phone',
      description: 'TEST',
    };

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(
      usersClient.getContact(userId, contactId),
    ).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts/${contactId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(
      usersClient.getContact(userId, contactId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts/${contactId}`,
      expectedConfig,
    );
  });
});
