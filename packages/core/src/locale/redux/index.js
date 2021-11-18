import * as actionTypes from './actionTypes';
import * as middlewares from './middlewares';
import { warnDeprecatedMethod } from '../../helpers';
import reducer from './reducer';
import serverInitialState from './serverInitialState';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/locale/redux',
);

export * from './actions';
export * from './selectors';

export { actionTypes, middlewares, serverInitialState };

export default reducer;
