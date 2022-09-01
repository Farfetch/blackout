import adaptProductImages from './adaptProductImages';
import type {
  AdaptGroupingProperties,
  GroupingPropertiesAdapted,
} from '../../entities';
import type { ProductGroupingProperties } from '@farfetch/blackout-client';

const adaptGroupingProperties: AdaptGroupingProperties = groupingProperties => {
  if (groupingProperties) {
    const adaptedGroupingProperties: GroupingPropertiesAdapted = {};
    Object.keys(groupingProperties).forEach(key => {
      const group = groupingProperties[key] as ProductGroupingProperties;
      const productGroupingPropertiesAdapted = group?.map(entry => ({
        ...entry,
        values: entry?.values?.map(value => ({
          ...value,
          digitalAssets: adaptProductImages(value.digitalAssets),
        })),
      }));

      adaptedGroupingProperties[key] = productGroupingPropertiesAdapted;
    });
    return adaptedGroupingProperties;
  }
  return undefined;
};

export default adaptGroupingProperties;
