import { getDefaultPersonalId } from '..';
import { mockGetDefaultPersonalIdResponse } from 'tests/__fixtures__/users';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getDefaultPersonalId.fixtures';
import moxios from 'moxios';

describe('getDefaultPersonalId', () => {
  const expectedConfig = {
    'X-SUMMER-RequestId': 'test',
  };
  const userId = 123456;
  const config = {
    'X-SUMMER-RequestId': 'test',
  };
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockGetDefaultPersonalIdResponse;

    fixtures.success({ userId, response });

    expect.assertions(2);

    await expect(getDefaultPersonalId(userId, config)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalids/default`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ userId });

    expect.assertions(2);
    await expect(
      getDefaultPersonalId(userId, config),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalids/default`,
      expectedConfig,
    );
  });
});
