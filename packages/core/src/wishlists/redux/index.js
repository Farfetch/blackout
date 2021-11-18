// @TODO: Remove the whole `redux` folder in version 2.0.0.
import * as actionTypes from './actionTypes';
import * as middlewares from './middlewares';
import { warnDeprecatedMethod } from '../../helpers';
import reducer, { entitiesMapper } from './reducer';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/wishlists/redux',
);

export * from './actions';
export * from './selectors';

export { actionTypes, middlewares, entitiesMapper };

export default reducer;
