import * as actionTypes from './actionTypes';
import { warnDeprecatedMethod } from '../../helpers';
import reducer, { entitiesMapper } from './reducer';

export * from './actions';
export * from './selectors';

export { actionTypes, entitiesMapper };

export default reducer;

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/subscriptions/redux',
);
