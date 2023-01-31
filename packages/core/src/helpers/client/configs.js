import * as headers from './headers';

/**
 * Config to create an axios instance to management endpoints.
 */
export const configManagement = {
  baseURL: 'https://management.blackandwhite-ff.com',
  headers: {
    [headers.CONTENT_TYPE]: 'application/json',
  },
};

/**
 *  Config to create an axios instance to the api.blackandwhite-ff endpoints.
 */
export const configApiBlackAndWhite = {
  baseURL: 'https://api.blackandwhite-ff.com',
  headers: {
    [headers.CONTENT_TYPE]: 'application/json',
  },
};
