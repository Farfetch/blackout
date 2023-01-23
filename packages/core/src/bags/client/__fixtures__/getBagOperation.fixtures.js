import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest(
      join(
        '/api/commerce/v1/bags',
        params.bagId,
        'operations',
        params.bagOperationId,
      ),
      {
        method: 'get',
        response: params.response,
        status: 200,
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      join(
        '/api/commerce/v1/bags',
        params.bagId,
        'operations',
        params.bagOperationId,
      ),
      {
        method: 'get',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
