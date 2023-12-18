import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { Config } from '../types/index.js';
import type { GetSEOFilesQuery, SEOFiles } from './types/seoFiles.types.js';

const getSEOFiles = (
  query: GetSEOFilesQuery,
  config?: Config,
): Promise<SEOFiles> =>
  client
    .get(join('/content/v1/seofiles', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getSEOFiles;
