import * as headers from './headers';
import {
  adaptError,
  defaultErrorAdapter,
  legacyErrorAdapter,
  toError,
} from './formatError';
import { configApiBlackAndWhite } from './configs';
import client from './axiosInstance';

export {
  adaptError,
  configApiBlackAndWhite,
  defaultErrorAdapter,
  headers,
  legacyErrorAdapter,
  toError,
};

export default client;
