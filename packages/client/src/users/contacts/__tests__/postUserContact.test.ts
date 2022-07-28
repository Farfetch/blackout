import { mockGetContactResponse, userId } from 'tests/__fixtures__/users';
import { postUserContact } from '..';
import { UserContactType } from '../types';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postUserContact.fixtures';
import mswServer from '../../../../tests/mswServer';

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

    expect.assertions(2);

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

    expect.assertions(2);

    await expect(postUserContact(userId, data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/contacts`,
      data,
      expectedConfig,
    );
  });
});
