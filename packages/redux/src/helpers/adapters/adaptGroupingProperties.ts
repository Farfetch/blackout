import adaptProductImages from './adaptProductImages';
import type { AdaptGroupingProperties } from '../../entities';

const adaptGroupingProperties: AdaptGroupingProperties = groupingProperties =>
  groupingProperties &&
  groupingProperties?.map(property => ({
    ...property,
    values: property?.values?.map(value => ({
      ...value,
      digitalAssets: adaptProductImages(value.digitalAssets),
    })),
  }));

export default adaptGroupingProperties;
