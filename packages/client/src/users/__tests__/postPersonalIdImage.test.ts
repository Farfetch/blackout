import { mockPostPersonalIdImageResponse } from 'tests/__fixtures__/users';
import { postPersonalIdImage } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postPersonalIdImage.fixtures';
import moxios from 'moxios';

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

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockPostPersonalIdImageResponse;

    fixtures.success({ userId, response });

    expect.assertions(2);

    await expect(postPersonalIdImage(userId, data, config)).resolves.toBe(
      response,
    );

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds/images`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ userId });

    expect.assertions(2);

    await expect(
      postPersonalIdImage(userId, data, config),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds/images`,
      data,
      expectedConfig,
    );
  });
});
