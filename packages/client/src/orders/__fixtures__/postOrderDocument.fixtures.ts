import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (params: {
    orderId: string;
    fileId: string;
    response: string;
  }): void => {
    moxios.stubRequest(
      join(
        '/api/account/v1/orders',
        params.orderId,
        'documents',
        params.fileId,
      ),
      {
        response: params.response,
        status: 202,
      },
    );
  },
  failure: (params: { orderId: string; fileId: string }): void => {
    moxios.stubRequest(
      join(
        '/api/account/v1/orders',
        params.orderId,
        'documents',
        params.fileId,
      ),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
