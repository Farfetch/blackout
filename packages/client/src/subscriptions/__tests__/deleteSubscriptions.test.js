import { deleteSubscriptions } from '..';
import {
  mockEmailHash,
  mockResponse,
} from 'tests/__fixtures__/subscriptions/deleteSubscriptions.fixtures';
import client from '../../helpers/client';
import join from 'proper-url-join';
import moxios from 'moxios';
import moxiosFixtures from '../__fixtures__/deleteSubscriptions.fixtures';

describe('deleteSubscriptions', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => {
    moxios.install(client);
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    moxiosFixtures.success(mockEmailHash, mockResponse);

    await expect(deleteSubscriptions(mockEmailHash)).resolves.toBe(
      mockResponse,
    );

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptions', mockEmailHash),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    moxiosFixtures.failure(mockEmailHash);

    await expect(deleteSubscriptions(mockEmailHash)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptions', mockEmailHash),
      expectedConfig,
    );
  });
});
