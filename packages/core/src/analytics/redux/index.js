import {
  bagMiddleware,
  setUserMiddleware,
  wishlistMiddleware,
} from './middlewares';
import { warnDeprecatedMethod } from '../../helpers';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/analytics/redux',
);

export { bagMiddleware, setUserMiddleware, wishlistMiddleware };
