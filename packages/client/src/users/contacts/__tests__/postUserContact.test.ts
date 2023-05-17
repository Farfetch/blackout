import {
  mockGetContactResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { postUserContact } from '../index.js';
import { UserContactType } from '../types/index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/postUserContact.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('postUserContact', () => {
  const expectedConfig = undefined;
  const data = {
    id: 0,
    value: '',
    countryDetails: {
      countryCode: '',
      countryCallingCode: '',
    },
    type: UserContactType.Phone,
    description: '',
  };
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGetContactResponse));

    await expect(postUserContact(userId, data)).resolves.toStrictEqual(
      mockGetContactResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(postUserContact(userId, data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts`,
      data,
      expectedConfig,
    );
  });
});
