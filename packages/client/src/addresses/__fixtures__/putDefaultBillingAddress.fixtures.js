import moxios from 'moxios';

export default {
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
