import * as headers from './headers';
import { configApiBlackAndWhite } from './configs';
import { isBlackoutErrorType, toBlackoutError } from './formatError';

export {
  configApiBlackAndWhite,
  headers,
  isBlackoutErrorType,
  toBlackoutError,
};
export { default } from './axiosInstance';
