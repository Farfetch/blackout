import * as headers from './headers.js';
import axios from 'axios';

/**
 * Create our axios instance to manipulate its defaults.
 */
export default axios.create({
  baseURL: '/api',
  headers: {
    [headers.CONTENT_TYPE]: 'application/json',
  },
});
