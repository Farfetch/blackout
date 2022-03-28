import {
  mockPutDefaultPersonalIdData,
  mockPutDefaultPersonalIdResponse,
} from 'tests/__fixtures__/users';
import { putDefaultPersonalId } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/putDefaultPersonalId.fixtures';
import moxios from 'moxios';

describe('putDefaultPersonalId', () => {
  const expectedConfig = {
    'X-SUMMER-RequestId': 'test',
  };
  const userId = 123456;
  const data = mockPutDefaultPersonalIdData;
  const config = {
    'X-SUMMER-RequestId': 'test',
  };
  const spy = jest.spyOn(client, 'put');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockPutDefaultPersonalIdResponse;

    fixtures.success(userId, response);

    expect.assertions(2);

    await expect(putDefaultPersonalId(userId, data, config)).resolves.toBe(
      response,
    );

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds/default`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure(userId);

    expect.assertions(2);
    await expect(
      putDefaultPersonalId(userId, data, config),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds/default`,
      data,
      expectedConfig,
    );
  });
});
