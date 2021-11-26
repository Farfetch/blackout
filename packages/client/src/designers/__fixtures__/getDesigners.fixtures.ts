import join from 'proper-url-join';
import moxios from 'moxios';
import type { Designers, GetDesignersQuery } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    query: GetDesignersQuery;
    response: Designers;
  }): void => {
    moxios.stubRequest(
      join('/api/legacy/v1/designers', {
        query: params.query,
      }),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { query: GetDesignersQuery }): void => {
    moxios.stubRequest(
      join('/api/legacy/v1/designers', {
        query: params.query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
