/**
 * Products serverInitialState.
 */
import listsServerInitialState from './listings.js';
import productsServerInitialState from './products.js';
import type { ServerInitialState } from '../../types/serverInitialState.types.js';

const serverInitialState: ServerInitialState = ({ model, options }) => {
  const { entities: listsEntities, ...listsState } = listsServerInitialState({
    model,
    options,
  });
  const { entities: productsEntities, ...productsState } =
    productsServerInitialState({ model, options });

  return {
    entities: { ...listsEntities, ...productsEntities },
    products: {
      ...listsState,
      ...productsState,
    },
  };
};

export default serverInitialState;
