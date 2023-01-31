// @TODO: Remove the whole `redux` folder in version 2.0.0.
import * as actionTypes from './actionTypes';
import { warnDeprecatedMethod } from '../../helpers';
import reducer from './reducer';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/categories/redux',
);

export * from './actions';
export * from './selectors';

export { actionTypes };

export default reducer;
