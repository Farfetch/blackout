import * as schemaProperties from '../components/schemas/schemaProperties';

/**
 * Generate Structured Data (JSON-LD) for Video Objects.
 *
 * @function generateVideoObject
 * @memberof module:content/helpers
 *
 * @param {object} media - All details data for the current Video.
 * @param {string} media.alt - Media file description text.
 * @param {string} media.source - Media source file path.
 * @param {object} media.thumbnails - Media thumbnail images.
 * @param {object} publicationDate - Publication date of the Video.
 *
 * @returns {object} - JSON-LD Schema.org object for Video Objects.
 */
export default (media, publicationDate) => ({
  '@context': schemaProperties.DEFAULT_CONTEXT,
  '@type': schemaProperties.DEFAULT_TYPE_VIDEO,
  name: media?.alt,
  description: media?.alt,
  '@id': media?.source,
  thumbnailUrl: media?.thumbnails?.srcLg,
  embedUrl: media?.source,
  uploadDate: publicationDate,
});
