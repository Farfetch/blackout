import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (
    subscriptionId: string,
    topicId: string,
    recipientId: string,
    response: unknown,
  ) => {
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
        response,
        status: 200,
      },
    );
  },
  failure: (subscriptionId: string, topicId: string, recipientId: string) => {
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
        response: 'stub error',
        status: 404,
      },
    );
  },
};
