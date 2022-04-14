import { AnyAction, combineReducers, Middleware, MiddlewareAPI } from 'redux';
import type { StoreState } from '@farfetch/blackout-redux/types';

// This is a simplified version of our createEntitiesReducer()
// This version was used instead, because createEntitiesReducer
// does not override completely user data, so makes testing
// a little more difficult. In runtime, that is not a problem.
const entitiesReducer = (state: StoreState = {}, action: AnyAction) => {
  if (action.payload && action.payload.entities) {
    return Object.assign({}, state, action.payload.entities);
  }

  return state;
};

const reducer = combineReducers({
  entities: entitiesReducer,
});

// This is a very simplified redux store implementation.
// This was needed because our mockStore module that is based on
// redux-mock-store package does not execute the reducers
// which were needed for this test suite.
export const mockStore = (
  initialState: StoreState = {},
  middlewares: Array<Middleware>,
) => {
  const store = {
    state: initialState,

    getState() {
      return this.state;
    },

    async dispatch(action: AnyAction) {
      const next = <T extends AnyAction>(action: T) => {
        this.state = reducer(this.state as Required<typeof this.state>, action);
        return action;
      };

      await Promise.all(
        middlewares.map(middleware =>
          middleware(this as MiddlewareAPI)(next)(action),
        ),
      );
    },
  };

  return store;
};
