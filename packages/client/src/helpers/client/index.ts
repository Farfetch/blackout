import * as headers from './headers';
import {
  adaptError,
  isBlackoutErrorType,
  toBlackoutError,
} from './formatError';
import { configApiBlackAndWhite } from './configs';

export {
  configApiBlackAndWhite,
  headers,
  isBlackoutErrorType,
  toBlackoutError,
  adaptError,
};
export { default } from './axiosInstance';
