import moxios from 'moxios';

const legacy = {
  success: params => {
    moxios.stubRequest('/api/legacy/v1/addressbook', {
      method: 'get',
      response: params.response,
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/legacy/v1/addressbook', {
      method: 'get',
      response: 'stub error',
      status: 404,
    });
  },
};

const accsvc = {
  success: params => {
    moxios.stubRequest(`/api/account/v1/users/${params.userId}/addresses`, {
      method: 'get',
      response: params.response,
      status: 200,
    });
  },
  failure: params => {
    moxios.stubRequest(`/api/account/v1/users/${params.userId}/addresses`, {
      method: 'get',
      response: 'stub error',
      status: 404,
    });
  },
};

export default {
  legacy,
  accsvc,
};
