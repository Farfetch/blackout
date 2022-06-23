import { deleteRecipientFromTopic } from '..';
import {
  mockRecipientId1TopicId1 as recipientId,
  mockSubscriptionId as subscriptionId,
  mockTopicId1 as topicId,
} from 'tests/__fixtures__/subscriptions';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/deleteRecipientFromTopic.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('deleteRecipientFromTopic', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => {
    moxios.install(client);
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ subscriptionId, topicId, recipientId, response });

    await expect(
      deleteRecipientFromTopic(subscriptionId, topicId, recipientId),
    ).resolves.toBe(response);

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
    fixtures.failure({ subscriptionId, topicId, recipientId });

    await expect(
      deleteRecipientFromTopic(subscriptionId, topicId, recipientId),
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
