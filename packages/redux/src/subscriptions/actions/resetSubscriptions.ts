import resetSubscriptionPackages from './resetSubscriptionPackages.js';
import resetUserSubscriptions from './resetUserSubscriptions.js';
import type {
  ResetSubscriptionPackagesAction,
  ResetUserSubscriptionsAction,
} from '../types/index.js';
import type { StoreState } from '../../types/index.js';
import type { ThunkDispatch } from 'redux-thunk';

const resetSubscriptions =
  () =>
  (
    dispatch: ThunkDispatch<
      StoreState,
      unknown,
      ResetSubscriptionPackagesAction | ResetUserSubscriptionsAction
    >,
  ): void => {
    dispatch(resetUserSubscriptions());
    dispatch(resetSubscriptionPackages());
  };

export default resetSubscriptions;
