import * as actionTypes from './actionTypes';
import { warnDeprecatedMethod } from '../../helpers';
import reducer from './reducer';
import serverInitialState from './serverInitialState';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/contents/redux',
);

export * from './actions';
export * from './selectors';

export { actionTypes, serverInitialState };

export default reducer;
