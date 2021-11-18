import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (subscriptionId, topicId, recipientId, response) => {
    moxios.stubRequest(
      join(
        '/api/marketing/v1/subscriptions/',
        subscriptionId,
        '/topics/',
        topicId,
        '/addresses/',
        recipientId,
      ),
      {
        method: 'delete',
        response,
        status: 200,
      },
    );
  },
  failure: (subscriptionId, topicId, recipientId) => {
    moxios.stubRequest(
      join(
        '/api/marketing/v1/subscriptions/',
        subscriptionId,
        '/topics/',
        topicId,
        '/addresses/',
        recipientId,
      ),
      {
        method: 'delete',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
