// @TODO: Remove this file in version 2.0.0.
import moxios from 'moxios';

/**
 * Response payloads.
 */
export default {
  success: params => {
    moxios.stubRequest('/api/settings/v1/sitefeatures', {
      method: 'get',
      response: params.response,
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/settings/v1/sitefeatures', {
      method: 'get',
      response: 'stub error',
      status: 404,
    });
  },
};
