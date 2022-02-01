import join from 'proper-url-join';
import moxios from 'moxios';
import type { Tracking } from '../types';

export default {
  success: (params: { trackingCodes: string; response: Tracking[] }): void => {
    moxios.stubRequest(
      join('/api/account/v1/trackings', {
        query: { trackingNumbers: params.trackingCodes },
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { trackingCodes: string }): void => {
    moxios.stubRequest(
      join('/api/account/v1/trackings', {
        query: { trackingNumbers: params.trackingCodes },
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
