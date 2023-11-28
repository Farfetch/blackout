import { defaultBaseURL } from './configs.js';
import { HttpHeaders } from './httpHeaders.js';
import axios from 'axios';

/**
 * Create our axios instance to manipulate its defaults.
 */
export default axios.create({
  baseURL: defaultBaseURL,
  headers: {
    [HttpHeaders.ContentType]: 'application/json',
  },
});
