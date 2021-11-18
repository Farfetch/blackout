import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest(
      `/api/content/v1/spaces/${params.spaceCode}/contentTypes`,
      {
        method: 'get',
        response: params.response,
        status: 200,
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      `/api/content/v1/spaces/${params.spaceCode}/contentTypes`,
      {
        method: 'get',
        response: 'error',
        status: 404,
      },
    );
  },
};
