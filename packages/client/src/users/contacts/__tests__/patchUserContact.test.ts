import {
  contactId,
  mockGetContactResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { patchUserContact, type PatchUserContactOperation } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/patchUserContact.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('patchUserContact', () => {
  const expectedConfig = undefined;
  const data: PatchUserContactOperation[] = [
    {
      value: '',
      path: '',
      op: 'replace',
    },
  ];
  const spy = jest.spyOn(client, 'patch');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGetContactResponse));

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
