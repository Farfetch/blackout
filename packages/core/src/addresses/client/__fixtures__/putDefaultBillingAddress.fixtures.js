import moxios from 'moxios';

const legacy = {
  success: params => {
    moxios.stubRequest(`/api/legacy/v1/addressbook/billing/${params.id}`, {
      method: 'put',
      response: params.response,
      status: 200,
    });
  },
  failure: params => {
    moxios.stubRequest(`/api/legacy/v1/addressbook/billing/${params.id}`, {
      method: 'put',
      response: 'stub error',
      status: 404,
    });
  },
};

const accsvc = {
  success: params => {
    moxios.stubRequest(
      `/api/account/v1/users/${params.userId}/addresses/billing/${params.id}`,
      {
        method: 'put',
        response: params.response,
        status: 200,
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      `/api/account/v1/users/${params.userId}/addresses/billing/${params.id}`,
      {
        method: 'put',
        response: 'stub error',
        status: 404,
      },
    );
  },
};

export default {
  legacy,
  accsvc,
};
