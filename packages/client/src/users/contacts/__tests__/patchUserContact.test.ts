import { patchUserContact } from '..';
import {
  contactId,
  mockGetContactResponse,
  userId,
} from 'tests/__fixtures__/users';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/patchUserContact.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('patchUserContact', () => {
  const expectedConfig = undefined;
  const data = {
    value: '',
    path: '',
    op: '',
    from: '',
  };
  const spy = jest.spyOn(client, 'patch');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGetContactResponse));

    expect.assertions(2);

    await expect(
      patchUserContact(userId, contactId, data),
    ).resolves.toStrictEqual(mockGetContactResponse);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts/${contactId}`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(
      patchUserContact(userId, contactId, data),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts/${contactId}`,
      data,
      expectedConfig,
    );
  });
});
