import moxios from 'moxios';

const legacy = {
  success: params => {
    moxios.stubRequest(`/api/legacy/v1/addressbook/schema/${params.id}`, {
      method: 'get',
      response: params.response,
      status: 200,
    });
  },
  failure: params => {
    moxios.stubRequest(`/api/legacy/v1/addressbook/schema/${params.id}`, {
      method: 'get',
      response: 'stub error',
      status: 404,
    });
  },
};

const accsvc = {
  success: params => {
    moxios.stubRequest(
      `/api/account/v1/countries/${params.id}/addressSchemas`,
      {
        method: 'get',
        response: params.response,
        status: 200,
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      `/api/account/v1/countries/${params.id}/addressSchemas`,
      {
        method: 'get',
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
