import * as headers from './headers.js';
import {
  adaptError,
  isBlackoutErrorType,
  toBlackoutError,
} from './formatError.js';
import { configApiBlackAndWhite } from './configs.js';

export {
  configApiBlackAndWhite,
  headers,
  isBlackoutErrorType,
  toBlackoutError,
  adaptError,
};
export { default } from './axiosInstance.js';
