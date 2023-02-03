import { combineReducers } from 'redux';
import attributesReducer from './attributes';
import detailsReducer, {
  entitiesMapper as detailsEntitiesMapper,
} from './details';
import fittingsReducer from './fittings';
import groupingPropertiesReducer from './groupingProperties';
import groupingReducer from './grouping';
import listsReducer, { entitiesMapper as listsEntitiesMapper } from './lists';
import measurementsReducer, {
  entitiesMapper as measurementsEntitiesMapper,
} from './measurements';
import outfitsReducer from './outfits';
import recentlyViewedProductsReducer from './recentlyViewedProducts';
import recommendedProductsReducer from './recommendedProducts';
import recommendedSetsReducer from './recommendedSet';
import sizeGuidesReducer from './sizeGuides';
import sizesReducer from './sizes';
import variantsByMerchantsLocationsReducer from './variantsByMerchantsLocations';

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
