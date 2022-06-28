import { combineReducers } from 'redux';
import subscriptionPackagesReducer, {
  subscriptionPackagesEntitiesMapper,
} from './subscriptionPackages';
import userSubscriptionReducer from './userSubscriptions';

export const entitiesMapper = {
  ...subscriptionPackagesEntitiesMapper,
};

const reducers = combineReducers({
  user: userSubscriptionReducer,
  packages: subscriptionPackagesReducer,
});

export default reducers;
