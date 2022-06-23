import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (params: {
    subscriptionId: string;
    topicId: string;
    recipientId: string;
    response: unknown;
  }) => {
    moxios.stubRequest(
      join(
        '/api/marketing/v1/subscriptions/',
        params.subscriptionId,
        '/topics/',
        params.topicId,
        '/addresses/',
        params.recipientId,
      ),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: {
    subscriptionId: string;
    topicId: string;
    recipientId: string;
  }) => {
    moxios.stubRequest(
      join(
        '/api/marketing/v1/subscriptions/',
        params.subscriptionId,
        '/topics/',
        params.topicId,
        '/addresses/',
        params.recipientId,
      ),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
