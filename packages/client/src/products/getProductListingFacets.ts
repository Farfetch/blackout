import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetProductListingFacets } from './types/getProductListingFacets.types.js';

const getProductListingFacets: GetProductListingFacets = (query, config) =>
  client
    .get(join('/commerce/v1/listingFacets', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getProductListingFacets;
