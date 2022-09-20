import resetSubscriptionPackages from './resetSubscriptionPackages';
import resetUserSubscriptions from './resetUserSubscriptions';
import type {
  ResetSubscriptionPackagesAction,
  ResetUserSubscriptionsAction,
} from '../types';
import type { StoreState } from '../../types';
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
