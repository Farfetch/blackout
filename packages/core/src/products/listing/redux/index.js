// @TODO: Remove the whole `redux` folder in version 2.0.0.
import * as actionTypes from './actionTypes';
import { warnDeprecatedMethod } from '../../../helpers';
import reducer, { entitiesMapper } from './reducer';
import serverInitialState from './serverInitialState';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/products/listing/redux',
);

export * from './actions';
export * from './selectors';

export { actionTypes, serverInitialState, entitiesMapper };

export default reducer;
