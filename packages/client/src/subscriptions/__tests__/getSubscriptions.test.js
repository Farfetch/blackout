import { getSubscriptions } from '..';
import {
  mockQuery,
  mockResponse,
} from 'tests/__fixtures__/subscriptions/getSubscriptions.fixtures';
import client from '../../helpers/client';
import join from 'proper-url-join';
import moxios from 'moxios';
import moxiosFixtures from '../__fixtures__/getSubscriptions.fixtures';

describe('getSubscriptions', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    moxiosFixtures.success(mockQuery, mockResponse);

    await expect(getSubscriptions(mockQuery)).resolves.toBe(mockResponse);

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptions', { query: mockQuery }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    moxiosFixtures.failure(mockQuery);

    await expect(getSubscriptions(mockQuery)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptions', { query: mockQuery }),
      expectedConfig,
    );
  });
});
