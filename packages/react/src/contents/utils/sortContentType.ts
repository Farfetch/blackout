import { SortContentOption } from '../types/base.types.js';
import type { ContentsEntity } from '@farfetch/blackout-redux';

/**
 * Sorts a content type by the most recent Publish or Event date.
 *
 *
 * @example
 * const sort = sortContentType([\{ ...contentType \}], 'PublishDate');
 *
 * @param contentType - The list of the content types.
 * @param sortBy - Sort by publish or event date.
 *
 * @returns Sorted list of content types.
 */
const sortContentType = (
  contentType: Array<ContentsEntity>,
  sortBy: SortContentOption,
) =>
  contentType.sort((a, b) => {
    switch (sortBy) {
      case SortContentOption.PublishDate: {
        if (!a.publicationDate && !b.publicationDate) {
          return 0;
        }

        if (!a.publicationDate) {
          return 1;
        }

        if (!b.publicationDate) {
          return -1;
        }

        return b.publicationDate - a.publicationDate;
      }
      case SortContentOption.EventDate:
        const aEventDate = a.metadata?.custom?.eventDate;
        const bEventDate = b.metadata?.custom?.eventDate;

        if (!aEventDate && !bEventDate) {
          return 0;
        }

        if (!aEventDate) {
          return 1;
        }

        if (!bEventDate) {
          return -1;
        }

        return bEventDate - aEventDate;
      default:
        return 0;
    }
  });

export default sortContentType;
