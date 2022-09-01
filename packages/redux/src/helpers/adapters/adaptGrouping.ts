import adaptProductImages from './adaptProductImages';
import type { AdaptGrouping, GroupingAdapted } from '../../entities';
import type { ProductGrouping } from '@farfetch/blackout-client';

const adaptGrouping: AdaptGrouping = grouping => {
  if (grouping) {
    const adaptedGrouping: GroupingAdapted = {};
    Object.keys(grouping).forEach(key => {
      const group = grouping[key] as ProductGrouping;
      const productGroupingAdapted = {
        ...group,
        entries: group?.entries?.map(entry => ({
          ...entry,
          digitalAssets: adaptProductImages(entry.digitalAssets),
        })),
      };
      adaptedGrouping[key] = productGroupingAdapted;
    });
    return adaptedGrouping;
  }
  return undefined;
};

export default adaptGrouping;
