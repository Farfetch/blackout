import moxios from 'moxios';

type ParamsData = {
  data: {
    userId: number;
  };
};

export default {
  success: (params: ParamsData) => {
    moxios.stubRequest(
      `/api/account/v1/users/${params.data.userId}/passwordchange`,
      {
        status: 200,
      },
    );
  },
  failure: (params: ParamsData) => {
    moxios.stubRequest(
      `/api/account/v1/users/${params.data.userId}/passwordchange`,
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
