import moxios from 'moxios';

export default {
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
