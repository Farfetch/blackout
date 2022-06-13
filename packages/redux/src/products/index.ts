import * as actionTypesProducts from './actionTypes';
import reducer, { entitiesMapper as entitiesMapperProducts } from './reducer';
import serverInitialStateProducts from './serverInitialState';

export * from './actions';
export * from './selectors';
export * from './types';
export * from './utils';

export {
  actionTypesProducts,
  entitiesMapperProducts,
  serverInitialStateProducts,
};

export default reducer;
