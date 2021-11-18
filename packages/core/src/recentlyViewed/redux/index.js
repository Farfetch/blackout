import * as actionTypes from './actionTypes';
import { warnDeprecatedMethod } from '../../helpers';
import reducer from './reducer';

export * from './actions';
export * from './selectors';

export { actionTypes };

export default reducer;

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/recentlyViewed/redux',
);
