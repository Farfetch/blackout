import {
  mockPostPersonalIdImageResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { postUserPersonalIdImage } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/postUserPersonalIdImage.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('postPersonalIdImage', () => {
  const expectedConfig = {
    'X-SUMMER-RequestId': 'test',
  };
  const data = {
    file: 'string',
  };
  const config = {
    'X-SUMMER-RequestId': 'test',
  };
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockPostPersonalIdImageResponse));

    await expect(
      postUserPersonalIdImage(userId, data, config),
    ).resolves.toStrictEqual(mockPostPersonalIdImageResponse);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds/images`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      postUserPersonalIdImage(userId, data, config),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds/images`,
      data,
      expectedConfig,
    );
  });
});
