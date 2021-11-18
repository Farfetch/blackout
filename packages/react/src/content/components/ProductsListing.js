import { generateProductListing, renderScriptTag } from '../helpers';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * @typedef {object} ProductsListingProps
 * @property {object} listing - All details data for the Products List.
 * @property {object} metadata - All SEO metadata for the Products List.
 * @property {string} url - Relative URL of the page.
 */

/**
 * Render Structured Data (JSON-LD) for Products Listing.
 *
 * @component
 * @memberof module:content/components
 *
 * @param {ProductsListingProps} props - All props of Products Listing.
 *
 * @returns {object} - JSON-LD Schema.org object for Product Listing.
 *
 * @example
 * <ProductsListing
 *   listing={object}
 *   metadata={object}
 *   url="String"
 * />
 */
const ProductsListing = ({ listing, metadata, url, space }) => {
  return (
    <Helmet>
      {renderScriptTag(generateProductListing(listing, metadata, url), space)}
    </Helmet>
  );
};

ProductsListing.propTypes = {
  listing: PropTypes.object.isRequired,
  metadata: PropTypes.object,
  url: PropTypes.string.isRequired,
  space: PropTypes.number,
};

export default ProductsListing;
