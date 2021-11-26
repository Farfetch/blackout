import join from 'proper-url-join';
import moxios from 'moxios';

const getReqUrl = params =>
  join('/api/account/v1/addressesprediction/', params.text, {
    query: params.query,
  });

export default {
  success: params => {
    moxios.stubRequest(getReqUrl(params), {
      method: 'get',
      response: params.response,
      status: 200,
    });
  },
  failure: params => {
    moxios.stubRequest(getReqUrl(params), {
      method: 'get',
      response: 'stub error',
      status: 404,
    });
  },
};
