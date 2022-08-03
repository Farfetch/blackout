import { combineReducers } from 'redux';
import { recommendedSetsReducer } from './recommendedSet';
import attributesReducer from './attributes';
import detailsReducer, {
  entitiesMapper as detailsEntitiesMapper,
} from './details';
import fittingsReducer from './fittings';
import groupingReducer from './grouping';
import listsReducer, { entitiesMapper as listsEntitiesMapper } from './lists';
import measurementsReducer, {
  entitiesMapper as measurementsEntitiesMapper,
} from './measurements';
import recentlyViewedProductsReducer from './recentlyViewedProducts';
import recommendedProductsReducer from './recommendedProducts';
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
  details: detailsReducer,
  fittings: fittingsReducer,
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
