/**
 * Products serverInitialState.
 */
import listsServerInitialState from './lists';
import productsServerInitialState from './products';
import type { ServerInitialState } from '../../types/serverInitialState.types';

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
