import { generateBreadcrumbsList, renderScriptTag } from '../helpers';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * @typedef {object} BreadcrumbsProps
 * @property {object} breadcrumbs - Breadcrumbs data.
 * @property {string} breadcrumbs.url - Breadcrumbs Item URL.
 * @property {string} breadcrumbs.name - Breadcrumbs Item Name.
 */

/**
 * Render Structured Data (JSON-LD) for Breadcrumbs.
 *
 * @component
 * @memberof module:content/components
 *
 * @param {BreadcrumbsProps} props - All props of Breadcrumbs.
 *
 * @returns {object} - JSON-LD Schema.org object for Breadcrumbs.
 *
 * @example
 * <Breadcrumbs breadcrumbs={Array} />
 */
const Breadcrumbs = ({ breadcrumbs, space }) => {
  return (
    <Helmet>
      {renderScriptTag(generateBreadcrumbsList(breadcrumbs), space)}
    </Helmet>
  );
};

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.array.isRequired,
  space: PropTypes.number,
};

export default Breadcrumbs;
