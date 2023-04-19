import { HttpHeaders } from './httpHeaders.js';

/**
 * Config to create an axios instance to the api.blackandwhite-ff endpoints.
 */
export const configApiBlackAndWhite = {
  baseURL: 'https://api.blackandwhite-ff.com',
  headers: {
    [HttpHeaders.ContentType]: 'application/json',
  },
};
