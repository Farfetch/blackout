import moxios from 'moxios';
import type { GetBenefitsResponse } from '../types';

export default {
  success: (params: { response: GetBenefitsResponse }): void => {
    moxios.stubRequest('/api/legacy/v1/userbenefits', {
      response: params.response,
      status: 200,
    });
  },
  failure: (): void => {
    moxios.stubRequest('/api/legacy/v1/userbenefits', {
      response: 'stub error',
      status: 404,
    });
  },
};
