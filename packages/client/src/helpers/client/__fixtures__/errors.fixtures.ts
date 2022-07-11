import type {
  MockAxiosApiErrorData,
  MockAxiosResponse,
  Result,
} from '../types';

const mockAxiosApiError = (
  data: MockAxiosApiErrorData,
  returnResponse = true,
  returnRequest = true,
) => {
  const config = {
    url: '/test',
    method: 'post',
    data: '{"username":"pepe@acme.com","password":"123456","rememberme":true}',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=utf-8',
    },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
  };
  const response = {
    status: 400,
    data: data,
    config: {
      url: '/test',
      method: 'post',
      data: '{"username":"pepe@acme.com","password":"123456","rememberme":true}',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=utf-8',
      },
      transformRequest: [null],
      transformResponse: [null],
      timeout: 0,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxContentLength: -1,
    },
  };
  const request = {
    status: 400,
    response: {
      description: 'i am error',
    },
  };

  const result: Result = { config };

  if (returnResponse) result['response'] = response as MockAxiosResponse;
  if (returnRequest) result['request'] = request;

  result.isAxiosError = true;

  return result;
};

export const legacyApiErrorData = mockAxiosApiError({
  success: false,
  errorCode: 14,
  errorMessage: 'Could not authenticate',
  errorData: {
    key: 'value',
    productId: '13981125',
  },
});

export const ApiErrorData = mockAxiosApiError({
  message: 'Could not authenticate',
  code: 14,
  developerMessage: 'Could not authenticate',
  moreInformation: 'more information',
  exception: {},
});

export const ApiErrorDataNoMessage = mockAxiosApiError({
  message: null,
  code: 14,
  developerMessage: 'Could not authenticate',
  moreInformation: 'more information',
  exception: {},
});

export const ApiErrorDataNoMessageNorDeveloperMessage = mockAxiosApiError({
  message: null,
  code: 14,
  developerMessage: null,
  moreInformation: 'more information',
  exception: {},
});

export const ApiErrorString = mockAxiosApiError('Could not authenticate.');

export const APIListErrorData = mockAxiosApiError({
  errors: [
    {
      message: 'Could not authenticate',
      code: 14,
      developerMessage: 'Could not authenticate',
      moreInformation: 'more information',
      exception: {},
    },
    {
      message: 'Could not authenticate',
      code: 18,
      developerMessage: 'This is another error',
      moreInformation: 'More information on this new error',
      exception: {},
    },
  ],
});

export const ApiErrorNoResponse = mockAxiosApiError({}, false);

export const errorAxios = {
  message: 'Oops, Axios failed somehow',
  isAxiosError: true,
};
