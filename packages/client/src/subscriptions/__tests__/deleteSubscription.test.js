import { deleteSubscription } from '..';
import {
  mockEmailHash,
  mockResponse,
  mockSubscriptionId,
} from 'tests/__fixtures__/subscriptions/deleteSubscription.fixtures';
import client from '../../helpers/client';
import join from 'proper-url-join';
import moxios from 'moxios';
import moxiosFixtures from '../__fixtures__/deleteSubscription.fixtures';

describe('deleteSubscription', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => {
    moxios.install(client);
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    moxiosFixtures.success(
      { id: mockSubscriptionId, emailHash: mockEmailHash },
      mockResponse,
    );

    await expect(
      deleteSubscription({ id: mockSubscriptionId, emailHash: mockEmailHash }),
    ).resolves.toBe(mockResponse);

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptions', {
        query: {
          id: mockSubscriptionId,
          emailHash: mockEmailHash,
        },
      }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    moxiosFixtures.failure({
      id: mockSubscriptionId,
      emailHash: mockEmailHash,
    });

    await expect(
      deleteSubscription({ id: mockSubscriptionId, emailHash: mockEmailHash }),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptions', {
        query: {
          id: mockSubscriptionId,
          emailHash: mockEmailHash,
        },
      }),
      expectedConfig,
    );
  });
});
