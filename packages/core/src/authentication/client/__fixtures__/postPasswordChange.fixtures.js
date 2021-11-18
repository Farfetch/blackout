import moxios from 'moxios';

const legacy = {
  success: params => {
    moxios.stubRequest('/api/legacy/v1/account/password/change', {
      data: params.data,
      method: 'post',
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/legacy/v1/account/password/change', {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};

const accountService = {
  success: params => {
    moxios.stubRequest(
      `/api/account/v1/users/${params.data.userId}/passwordchange`,
      {
        data: params.data,
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

export default {
  legacy,
  accountService,
};
