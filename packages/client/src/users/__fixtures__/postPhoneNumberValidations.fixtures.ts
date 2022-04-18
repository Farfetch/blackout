import get from 'lodash/get';
import moxios from 'moxios';

export default {
  success: (params: { response: Record<string, unknown> }): void => {
    moxios.stubRequest('/api/account/v1/phoneNumberValidations', {
      response: get(params, 'response'),
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/account/v1/phoneNumberValidations', {
      response: 'stub error',
      status: 404,
    });
  },
};
