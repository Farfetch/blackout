import adaptProductImages from './adaptProductImages.js';
import type { AdaptGrouping } from '../../entities/index.js';

const adaptGrouping: AdaptGrouping = grouping =>
  grouping && {
    ...grouping,
    entries: grouping.entries.map(entry => ({
      ...entry,
      digitalAssets: adaptProductImages(entry.digitalAssets),
    })),
  };

export default adaptGrouping;
