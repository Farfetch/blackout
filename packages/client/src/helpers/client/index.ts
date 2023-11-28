import {
  adaptError,
  isBlackoutErrorType,
  toBlackoutError,
} from './formatError.js';
import { configApiBlackAndWhite, defaultBaseURL } from './configs.js';
import { HttpHeaders } from './httpHeaders.js';

export {
  configApiBlackAndWhite,
  defaultBaseURL,
  HttpHeaders,
  isBlackoutErrorType,
  toBlackoutError,
  adaptError,
};
export { default } from './axiosInstance.js';
