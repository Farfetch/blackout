import { combineReducers } from 'redux';
import subscriptionPackagesReducer, {
  subscriptionPackagesEntitiesMapper,
} from './subscriptionPackages.js';
import userSubscriptionReducer from './userSubscriptions.js';

export const entitiesMapper = {
  ...subscriptionPackagesEntitiesMapper,
};

const reducers = combineReducers({
  user: userSubscriptionReducer,
  packages: subscriptionPackagesReducer,
});

export default reducers;
