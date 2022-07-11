import { adaptError, defaultError, toBlackoutError } from '../formatError';
import {
  ApiErrorData,
  ApiErrorDataNoMessage,
  ApiErrorDataNoMessageNorDeveloperMessage,
  ApiErrorNoResponse,
  ApiErrorString,
  APIListErrorData,
  errorAxios,
  legacyApiErrorData,
} from '../__fixtures__/errors.fixtures';
import type {
  DefaultErrorAdapterData,
  LegacyErrorAdapterData,
  ListErrorData,
  MockAxiosRequest,
  MockAxiosResponse,
} from '../types';

describe('formatError()', () => {
  beforeEach(jest.clearAllMocks);

  it('should format the error properly when the api returns the error (legacy)', () => {
    const result = adaptError(legacyApiErrorData);
    const { data, status } = legacyApiErrorData.response as MockAxiosResponse;
    const { errorMessage, errorCode } = data as LegacyErrorAdapterData;

    expect(result).toEqual(
      expect.objectContaining({
        code: errorCode,
        message: errorMessage,
        status,
      }),
    );
    expect(result).toMatchSnapshot();
  });

  it('should format the error properly when the api returns an OBJECT with the error ', () => {
    const result = adaptError(ApiErrorData);
    const { data, status } = ApiErrorData.response as MockAxiosResponse;
    const { message, code } = data as DefaultErrorAdapterData;

    expect(result).toEqual(
      expect.objectContaining({
        code,
        message,
        status,
      }),
    );
    expect(result).toMatchSnapshot();
  });

  it('should format the error properly when the api returns an OBJECT with the error but has no message', () => {
    const result = adaptError(ApiErrorDataNoMessage);
    const { data } = ApiErrorData.response as MockAxiosResponse;
    const { developerMessage } = data as DefaultErrorAdapterData;

    expect(result).toEqual(
      expect.objectContaining({
        message: developerMessage,
      }),
    );
  });

  it('should format the error properly when the api returns an OBJECT with the error but has no message nor developer message', () => {
    const result = adaptError(ApiErrorDataNoMessageNorDeveloperMessage);

    expect(result).toEqual(
      expect.objectContaining({
        message: 'Unexpected error',
      }),
    );
  });

  it('should format the error properly when the api returns an error of type string', () => {
    const result = adaptError(ApiErrorString);

    expect(result).toEqual(
      expect.objectContaining({
        code: defaultError.code,
        message: ApiErrorString?.response?.data,
        status: 400,
      }),
    );
  });

  it('should format the error properly when the api returns a LIST with errors', () => {
    const result = adaptError(APIListErrorData);
    const { data, status } = APIListErrorData.response as MockAxiosResponse;
    const { errors } = data as ListErrorData;

    expect(result).toEqual(
      expect.objectContaining({
        code: errors[0]?.code,
        message: errors[0]?.message,
        status,
      }),
    );
    expect(result).toMatchSnapshot();
  });

  it('should format the error properly when the request has no response', () => {
    const result = adaptError(ApiErrorNoResponse);
    const {
      response: { description },
      status,
    } = ApiErrorNoResponse.request as MockAxiosRequest;

    expect(result).toEqual(
      expect.objectContaining({
        code: defaultError.code,
        message: description,
        status,
      }),
    );
    expect(result).toMatchSnapshot();
  });

  it('should format the error was created while setting up the request', () => {
    const result = adaptError(errorAxios);

    expect(result).toEqual(
      expect.objectContaining({
        code: defaultError.code,
        message: errorAxios.message,
        status: undefined,
      }),
    );
  });

  it('should convert error to BlackoutError', () => {
    const genericError = new Error();
    const customError = Object.assign(genericError, { ...legacyApiErrorData });
    const adaptAxiosError = adaptError(customError);
    const axiosErrorResult = toBlackoutError(adaptAxiosError);

    expect(axiosErrorResult).toEqual(customError);

    const errorResult = toBlackoutError(new Error('foo'));

    expect(errorResult).toEqual(
      expect.objectContaining({
        code: defaultError.code,
        message: 'foo',
      }),
    );

    const unknownErrorResult = toBlackoutError({ foo: 'bar' });

    expect(unknownErrorResult).toEqual(
      expect.objectContaining({
        code: defaultError.code,
        message: defaultError.message,
      }),
    );
  });
});
