import { deleteRecipientFromTopic } from '..';
import client from '../../../helpers/client';
import fixtures from '../__mocks__/deleteRecipientFromTopic.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('deleteRecipientFromTopic', () => {
  const expectedConfig = undefined;
  const subscriptionId = 'a0147156-b875-4353-a77d-b92ee3bb4625';
  const topicId = '8a3899e1-93dd-44d5-97c3-84cd24d12174';
  const recipientId = '5f8775c4-c7a0-4c91-b661-c8e70e0378fc';
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => {
    moxios.install(client);
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success(subscriptionId, topicId, recipientId, response);

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
    fixtures.failure(subscriptionId, topicId, recipientId);

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
