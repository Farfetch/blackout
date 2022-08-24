import type { AnyAction, Dispatch } from 'redux';
import type { MockStoreEnhanced } from 'redux-mock-store';
import type { StoreState } from '../../';
import type { ThunkMiddleware } from 'redux-thunk';

export type MockStore = (
  reducer: Record<string, unknown> | null,
  state?: StoreState,
  middleware?: ThunkMiddleware<StoreState, AnyAction, Middleware>[],
) => MockStoreEnhanced<unknown, Dispatch<AnyAction>>;

export type Middleware = {
  getContext: () => {
    cultureCode: string;
    countryCode: string;
    currencyCode: string;
  };
  getOptions: () => { productImgQueryParam: string };
};
