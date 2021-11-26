import join from 'proper-url-join';
import moxios from 'moxios';
import type { Category } from '../types';

export default {
  success: (params: { response: Category[] }): void => {
    moxios.stubRequest(join('/api/commerce/v1/categories'), {
      response: params.response,
      status: 200,
    });
  },
  failure: (): void => {
    moxios.stubRequest(join('/api/commerce/v1/categories'), {
      response: 'stub error',
      status: 404,
    });
  },
};
