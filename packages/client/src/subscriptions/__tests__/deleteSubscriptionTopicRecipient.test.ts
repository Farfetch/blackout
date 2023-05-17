import { deleteSubscriptionTopicRecipient } from '../index.js';
import {
  mockRecipientId1TopicId1 as recipientId,
  mockSubscriptionId as subscriptionId,
  mockTopicId1 as topicId,
} from 'tests/__fixtures__/subscriptions/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/deleteSubscriptionTopicRecipient.fixtures.js';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer.js';

describe('deleteSubscriptionTopicRecipient', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');

  it('should handle a client request successfully', async () => {
    const response = {};

    mswServer.use(fixtures.success(response));

    await expect(
      deleteSubscriptionTopicRecipient(subscriptionId, topicId, recipientId),
    ).resolves.toStrictEqual(response);

    expect(spy).toHaveBeenCalledWith(
      join(
        '/marketing/v1/subscriptions/',
        subscriptionId,
        '/topics/',
        topicId,
        '/addresses/',
        recipientId,
      ),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      deleteSubscriptionTopicRecipient(subscriptionId, topicId, recipientId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join(
        '/marketing/v1/subscriptions/',
        subscriptionId,
        '/topics/',
        topicId,
        '/addresses/',
        recipientId,
      ),
      expectedConfig,
    );
  });
});
