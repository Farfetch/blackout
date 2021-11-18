import { generateArticle, renderScriptTag } from '../helpers';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * @typedef {object} ArticleProps
 * @property {object} metadata - All SEO metadata for the Article.
 * @property {object} date - All information about Article date.
 * @property {string} date.publicationDate - Publication date of the Article.
 * @property {string} date.modificationDate - Modification date of the Article.
 * @property {string} url - Relative url of the page (location.pathname).
 * @property {string} title - Title of the first component in the Page (e.g. Hero Title, or H1).
 * @property {string} image - Image URL to describe the content of the Page.
 * @property {string} author - Author name of the Article.
 * @property {Array}  breadcrumbs - Breadcrumbs list with all url Texts.
 * @property {object} publisher - Object with publisher data.
 * @property {string} publisher.name - The name of the Article publisher.
 * @property {string} publisher.url - The url of the Article publisher.
 * @property {string} publisher.logo - The logo path of the Article publisher.
 */

/**
 * Render Structured Data (JSON-LD) for an Article.
 *
 * @component
 * @memberof module:content/components
 *
 * @param {ArticleProps} props - All props of Article.
 *
 * @returns {object} - JSON-LD Schema.org object for an Article.
 *
 * @example
 * <Article
 *   metadata={object}
 *   date={{
 *     publicationDate: Date,
 *     modificationDate: Date
 *   }}
 *   url="string"
 *   title="string"
 *   image="string"
 *   author="string"
 *   breadcrumbs={Array}
 *   publisher={{
 *     name: string,
 *     url: string,
 *     logo: string
 *   }}
 * />
 */
const Article = ({
  metadata,
  date,
  url,
  title,
  image,
  author,
  breadcrumbs,
  publisher,
  space,
}) => {
  return (
    <Helmet>
      {renderScriptTag(
        generateArticle(
          metadata,
          date,
          url,
          title,
          image,
          author,
          breadcrumbs,
          publisher,
        ),
        space,
      )}
    </Helmet>
  );
};

Article.propTypes = {
  metadata: PropTypes.object,
  date: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
    }),
  ),
  publisher: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
    logo: PropTypes.string,
  }),
  space: PropTypes.number,
};

export default Article;
