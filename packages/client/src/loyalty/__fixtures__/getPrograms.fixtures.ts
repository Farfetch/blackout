import moxios from 'moxios';
import type { Program } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: { response: Program[] }): void => {
    moxios.stubRequest('/api/loyalty/v1/programs', {
      response: params.response,
      status: 200,
    });
  },
  failure: (): void => {
    moxios.stubRequest('/api/loyalty/v1/programs', {
      response: 'stub error',
      status: 404,
    });
  },
};
