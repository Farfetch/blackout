import join from 'proper-url-join';
import moxios from 'moxios';
import type {
  GetCreditMovementsQuery,
  GetCreditMovementsResponse,
} from '../types';

export default {
  success: (params: {
    id: number;
    query: GetCreditMovementsQuery;
    response: GetCreditMovementsResponse;
  }): void => {
    moxios.stubRequest(
      join('api/legacy/v1/users', params.id, 'creditMovements', {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { id: number; query: GetCreditMovementsQuery }): void => {
    moxios.stubRequest(
      join('api/legacy/v1/users', params.id, 'creditMovements', {
        query: params.query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
