import adaptProductImages from './adaptProductImages';
import type { AdaptGrouping } from '../../entities';

const adaptGrouping: AdaptGrouping = grouping =>
  grouping && {
    ...grouping,
    entries: grouping.entries.map(entry => ({
      ...entry,
      digitalAssets: adaptProductImages(entry.digitalAssets),
    })),
  };

export default adaptGrouping;
