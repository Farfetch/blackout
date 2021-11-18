import join from 'proper-url-join';
import moxios from 'moxios';

export const legacy = {
  success: params => {
    moxios.stubRequest(
      join('/api/legacy/v1/guestorders', params.id, {
        query: { guestUserEmail: params.guestUserEmail },
      }),
      {
        method: 'get',
        response: params.response,
        status: 200,
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      join('/api/legacy/v1/guestorders', params.id, {
        query: { guestUserEmail: params.guestUserEmail },
      }),
      {
        method: 'get',
        response: 'stub error',
        status: 404,
      },
    );
  },
};

export const accsvc = {
  success: params => {
    moxios.stubRequest(join('/api/account/v1/guestorders', params.id), {
      method: 'get',
      response: params.response,
      status: 200,
    });
  },
  failure: params => {
    moxios.stubRequest(join('/api/account/v1/guestorders', params.id), {
      method: 'get',
      response: 'stub error',
      status: 404,
    });
  },
};
