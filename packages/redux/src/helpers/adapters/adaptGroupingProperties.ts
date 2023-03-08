import adaptProductImages from './adaptProductImages.js';
import type { AdaptGroupingProperties } from '../../entities/index.js';

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
