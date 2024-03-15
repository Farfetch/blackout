import { analytics } from '@farfetch/blackout-react/analytics';
import thunk from 'redux-thunk';

import { analyticsMiddlewares as reduxAnalyticsMiddlewares } from '@farfetch/blackout-redux';

const middlewares = [
  thunk.withExtraArgument({ getOptions: () => ({}) }),
  reduxAnalyticsMiddlewares.setUser(analytics),
  reduxAnalyticsMiddlewares.bag(analytics),
  reduxAnalyticsMiddlewares.wishlist(analytics),
];

export default middlewares;
