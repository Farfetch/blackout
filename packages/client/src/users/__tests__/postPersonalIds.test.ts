import {
  mockPostPersonalIdsData,
  mockPostPersonalIdsResponse,
} from 'tests/__fixtures__/users';
import { postPersonalIds } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postPersonalIds.fixtures';
import moxios from 'moxios';

describe('postPersonalIds', () => {
  const expectedConfig = {
    'X-SUMMER-RequestId': 'test',
  };
  const data = mockPostPersonalIdsData;
  const userId = 123456;
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
    const response = mockPostPersonalIdsResponse;

    fixtures.success(userId, response);

    expect.assertions(2);

    await expect(postPersonalIds(userId, data, config)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalids`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure(userId);

    expect.assertions(2);

    await expect(
      postPersonalIds(userId, data, config),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalids`,
      data,
      expectedConfig,
    );
  });
});
