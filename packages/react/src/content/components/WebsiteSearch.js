import { generateWebsiteSearch, renderScriptTag } from '../helpers';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * @typedef {object} WebsiteSearchProps
 * @property {object} metadata - SEO metadata for type WebsiteSearch on Homepage.
 * @property {string} url - Relative URL of the page.
 * @property {string} searchTitle - Website title.
 * @property {string} urlTemplate - Complete url to query on (e.g https://www.domain.com/en-pt/shopping?&query=).
 */

/**
 * Render Structured Data (JSON-LD) for WebsiteSearch.
 *
 * @component
 * @memberof module:content/components
 *
 * @param {WebsiteSearchProps} props - All props of WebsiteSearch.
 *
 * @returns {object} - JSON-LD Schema.org object for Website Search.
 *
 * @example
 * <WebsiteSearch
 *   metadata={object}
 *   url="String"
 *   searchTitle="String"
 *   urlTemplate="String"
 * />
 */
const WebsiteSearch = ({ metadata, url, searchTitle, urlTemplate, space }) => {
  return (
    <Helmet>
      {renderScriptTag(
        generateWebsiteSearch(metadata, url, searchTitle, urlTemplate),
        space,
      )}
    </Helmet>
  );
};

WebsiteSearch.propTypes = {
  metadata: PropTypes.object,
  url: PropTypes.string.isRequired,
  searchTitle: PropTypes.string,
  urlTemplate: PropTypes.string,
  space: PropTypes.number,
};

export default WebsiteSearch;
