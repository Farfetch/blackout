import join from 'proper-url-join';
import moxios from 'moxios';

/**
 * Response payloads.
 */
export default {
  success: params => {
    moxios.stubRequest(join('/api/settings/v1/countries', params.countryCode), {
      method: 'get',
      response: params.response,
      status: 200,
    });
  },
  failure: params => {
    moxios.stubRequest(join('/api/settings/v1/countries', params.countryCode), {
      method: 'get',
      response: 'stub error',
      status: 404,
    });
  },
};
