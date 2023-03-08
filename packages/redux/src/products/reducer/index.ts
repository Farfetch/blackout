import { combineReducers } from 'redux';
import attributesReducer from './attributes.js';
import detailsReducer, {
  entitiesMapper as detailsEntitiesMapper,
} from './details.js';
import fittingsReducer from './fittings.js';
import groupingPropertiesReducer from './groupingProperties.js';
import groupingReducer from './grouping.js';
import listsReducer, {
  entitiesMapper as listsEntitiesMapper,
} from './lists.js';
import measurementsReducer, {
  entitiesMapper as measurementsEntitiesMapper,
} from './measurements.js';
import outfitsReducer from './outfits.js';
import recentlyViewedProductsReducer from './recentlyViewedProducts.js';
import recommendedProductsReducer from './recommendedProducts.js';
import recommendedSetsReducer from './recommendedSet.js';
import sizeGuidesReducer from './sizeGuides.js';
import sizesReducer from './sizes.js';
import variantsByMerchantsLocationsReducer from './variantsByMerchantsLocations.js';

export const entitiesMapper = {
  ...detailsEntitiesMapper,
  ...listsEntitiesMapper,
  ...measurementsEntitiesMapper,
};

const reducers = combineReducers({
  attributes: attributesReducer,
  grouping: groupingReducer,
  groupingProperties: groupingPropertiesReducer,
  details: detailsReducer,
  fittings: fittingsReducer,
  outfits: outfitsReducer,
  lists: listsReducer,
  measurements: measurementsReducer,
  recentlyViewed: recentlyViewedProductsReducer,
  recommendedProducts: recommendedProductsReducer,
  recommendedSets: recommendedSetsReducer,
  sizeGuides: sizeGuidesReducer,
  sizes: sizesReducer,
  variantsByMerchantsLocations: variantsByMerchantsLocationsReducer,
});

export default reducers;
