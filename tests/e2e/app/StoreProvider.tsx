import { type AnyAction, type Store } from 'redux';
import { Provider } from 'react-redux';

import { useState } from 'react';
import buildStore from './buildStore';
import type { StoreState } from '@farfetch/blackout-redux';

declare global {
  interface Window {
    store: Store;
    actionsToDispatch: AnyAction[] | undefined | null;
  }
}

function StoreProvider({
  initialState,
  children,
}: {
  initialState?: Partial<StoreState>;
  children: React.ReactNode;
}) {
  const [store] = useState(() => {
    const store = buildStore(initialState);

    window.store = store;

    if (Array.isArray(window.actionsToDispatch)) {
      window.actionsToDispatch.forEach(action => {
        store.dispatch(action);
      });

      window.actionsToDispatch = null;
    }

    return store;
  });

  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
