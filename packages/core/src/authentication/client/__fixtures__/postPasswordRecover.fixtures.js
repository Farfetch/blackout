import moxios from 'moxios';

export const accsvc = {
  success: () => {
    moxios.stubRequest('/api/account/v1/users/passwordrecover', {
      method: 'post',
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/account/v1/users/passwordrecover', {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};

export const legacy = {
  success: () => {
    moxios.stubRequest('/api/legacy/v1/account/password/recover', {
      method: 'post',
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/legacy/v1/account/password/recover', {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};

export const newRecover = {
  success: () => {
    moxios.stubRequest('/api/legacy/v1/account/password/retrieve', {
      method: 'post',
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/legacy/v1/account/password/retrieve', {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
