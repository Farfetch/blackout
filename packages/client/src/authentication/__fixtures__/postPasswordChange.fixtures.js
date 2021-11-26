import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest(
      `/api/account/v1/users/${params.data.userId}/passwordchange`,
      {
        method: 'post',
        status: 200,
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      `/api/account/v1/users/${params.data.userId}/passwordchange`,
      {
        method: 'post',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
