import * as schemaProperties from './schemas/schemaProperties';
import { renderScriptTag } from '../helpers';
import type { Media } from '../types';
import type { ReactElement } from 'react';
import type { VideoObject, WithContext } from 'schema-dts';

/**
 * Generate Structured Data (JSON-LD) for Video Objects.
 *
 * @memberof module:contents/structured-data
 *
 * @param {object} media - All details data for the current Video.
 * @param {string} media.alt - Media file description text.
 * @param {string} media.source - Media source file path.
 * @param {object} media.thumbnails - Media thumbnail images.
 * @param {string} media.thumbnails.srcLg - Media thumbnail image source size.
 * @param {string} publicationDate - Publication date of the Video.
 * @param {number} space - Add whitespace and indentation to the serialized output.
 * @example
 * import { videoObject as structuredVideoObject } from '@farfetch/blackout-react/content/structured-data';
 *
 * <Helmet>
 * {structuredVideoObject(
 * {
 * alt: '...',
 * source: '...',
 * thumbnails: '...',
 * },
 * publicationDate,
 * 2)
 * }
 * </Helmet>
 * @returns {ReactElement} - A script tag with Video Object JSON-LD structured data.
 */
const videoObject = (
  media: Media,
  publicationDate: string,
  space?: number,
): ReactElement => {
  const VIDEO: WithContext<VideoObject> = {
    '@context': schemaProperties.DEFAULT_CONTEXT,
    '@type': schemaProperties.DEFAULT_TYPE_VIDEO,
    name: media?.alt,
    description: media?.alt,
    '@id': media?.source,
    thumbnailUrl: media?.thumbnails?.srcLg,
    embedUrl: media?.source,
    uploadDate: publicationDate,
  };

  return renderScriptTag(VIDEO, space);
};

export default videoObject;
