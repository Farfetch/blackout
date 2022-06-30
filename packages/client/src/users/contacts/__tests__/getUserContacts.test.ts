import { getUserContacts } from '..';
import { userId } from 'tests/__fixtures__/users';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getUserContacts.fixtures';
import mswServer from '../../../../tests/mswServer';
import type { UserContactResponse } from '../types';

describe('getUserContacts', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

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
    ] as UserContactResponse[];

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(getUserContacts(userId)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(getUserContacts(userId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts`,
      expectedConfig,
    );
  });
});
