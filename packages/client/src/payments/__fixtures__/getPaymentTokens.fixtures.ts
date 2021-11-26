import join from 'proper-url-join';
import moxios from 'moxios';
import type { GetPaymentTokensQuery, PaymentTokens } from '../types';

export default {
  success: (params: {
    query: GetPaymentTokensQuery;
    response: PaymentTokens;
  }): void => {
    moxios.stubRequest(
      join('/api/payment/v1/tokens', {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { query: GetPaymentTokensQuery }): void => {
    moxios.stubRequest(
      join('/api/payment/v1/tokens', {
        query: params.query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
