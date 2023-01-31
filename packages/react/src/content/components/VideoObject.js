import { generateVideoObject, renderScriptTag } from '../helpers';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * @typedef {object} VideoObjectProps
 * @property {object} media - All editorial data for the current Video.
 * @property {string} media.alt - Media file description text.
 * @property {string} media.source - Media source file path.
 * @property {object} media.thumbnails - Media thumbnail images.
 * @property {object} publicationDate - Publication date of the Video.
 */

/**
 * Render Structured Data (JSON-LD) for Video Objects.
 *
 * @component
 * @memberof module:content/components
 *
 * @param {VideoObjectProps} props - All props of Video Object.
 *
 * @returns {object} - JSON-LD Schema.org object for Video Objects.
 *
 * @example
 * <VideoObject
 *   media={object}
 *   publicationDate={Date}
 * />
 */
const VideoObject = props => {
  const { media, publicationDate, space } = props;

  return (
    <Helmet>
      {renderScriptTag(generateVideoObject(media, publicationDate), space)}
    </Helmet>
  );
};

VideoObject.propTypes = {
  media: PropTypes.object.isRequired,
  publicationDate: PropTypes.string.isRequired,
  space: PropTypes.number,
};

export default VideoObject;
