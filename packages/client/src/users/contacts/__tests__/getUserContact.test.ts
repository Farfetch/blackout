import {
  contactId,
  mockGetContactResponse,
  userId,
} from 'tests/__fixtures__/users';
import { getUserContact } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getUserContact.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('getUserContact', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGetContactResponse));

    expect.assertions(2);

    await expect(getUserContact(userId, contactId)).resolves.toStrictEqual(
      mockGetContactResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts/${contactId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(getUserContact(userId, contactId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts/${contactId}`,
      expectedConfig,
    );
  });
});
