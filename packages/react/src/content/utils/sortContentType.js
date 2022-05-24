/**
 * Sorts a content type by the most recent Publish or Event date.
 *
 * @function sortContentType
 * @memberof module:content/utils
 *
 * @example
 * const sort = sortContentType([{ ...contentType }], 'PublishDate');
 *
 * @param   {Array} contentType - The list of the content types.
 * @param   {string} sortBy - Sort by publish or event date.
 *
 * @returns {Array} - Sorted list of content types.
 */
export default (contentType, sortBy) =>
  contentType.sort((a, b) => {
    switch (sortBy) {
      case 'PublishDate':
        return b?.publicationDate - a?.publicationDate;
      case 'EventDate':
        return b?.metadata?.custom?.eventDate - a?.metadata?.custom?.eventDate;
      default:
        return 0;
    }
  });
