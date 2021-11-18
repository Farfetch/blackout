import { generateProduct, renderScriptTag } from '../helpers';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * @typedef {object} ProductProps
 * @property {object} product - All details data for the current Product.
 * @property {object} metadata - All SEO metadata for the current Product.
 * @property {string} lastCategory - Last category name.
 * @property {string} url - Relative url of the product (location.pathname).
 * @property {string} seller - Seller name for this particular product. */

/**
 * Render Structured Data (JSON-LD) for Product Details.
 *
 * @component
 * @memberof module:content/components
 *
 * @param {ProductProps} props - All props of Product.
 *
 * @returns {object} - JSON-LD Schema.org object for Product Details.
 *
 * @example
 * <Product
 *   product={object}
 *   metadata={object}
 *   lastCategory="string"
 *   url="string"
 *   seller="string"
 * />
 */
const Product = ({ product, metadata, lastCategory, url, seller, space }) => {
  return (
    <Helmet>
      {renderScriptTag(
        generateProduct(product, metadata, lastCategory, url, seller),
        space,
      )}
    </Helmet>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  metadata: PropTypes.object,
  lastCategory: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  seller: PropTypes.string.isRequired,
  space: PropTypes.number,
};

export default Product;
