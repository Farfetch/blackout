/**
 * @module helpers/client
 * @category Helpers
 * @subcategory Client
 */

import * as headers from './headers';
import {
  adaptError,
  defaultErrorAdapter,
  legacyErrorAdapter,
} from './formatError';
import { configApiBlackAndWhite, configManagement } from './configs';
import client from './axiosInstance';

export {
  adaptError,
  defaultErrorAdapter,
  headers,
  legacyErrorAdapter,
  configManagement,
  configApiBlackAndWhite,
};

export default client;
