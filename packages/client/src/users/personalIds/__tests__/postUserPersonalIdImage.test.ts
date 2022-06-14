import { mockPostPersonalIdImageResponse } from 'tests/__fixtures__/users';
import { postUserPersonalIdImage } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postUserPersonalIdImage.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('postPersonalIdImage', () => {
  const expectedConfig = {
    'X-SUMMER-RequestId': 'test',
  };
  const userId = 123456;
  const data = {
    file: 'string',
  };
  const config = {
    'X-SUMMER-RequestId': 'test',
  };
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = mockPostPersonalIdImageResponse;

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(
      postUserPersonalIdImage(userId, data, config),
    ).resolves.toStrictEqual(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds/images`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

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
