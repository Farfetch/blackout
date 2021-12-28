import get from 'lodash/get';
import join from 'proper-url-join';
import moxios from 'moxios';

const getQuery = params => get(params, 'query');

export default {
  success: params => {
    moxios.stubRequest(
      join('api/legacy/v1', 'users', params.id, 'creditMovements', {
        query: getQuery(params),
      }),
      {
        response: get(params, 'response'),
        status: 200,
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      join('api/legacy/v1', 'users', params.id, 'creditMovements', {
        query: getQuery(params),
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
