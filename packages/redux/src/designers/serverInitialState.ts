import { generateDesignerResultHash } from './utils';
import { INITIAL_STATE } from './reducer';
import get from 'lodash/get';
import parse from 'url-parse';
import type { Model, StoreState } from '../types';

/**
 * Converts server data from designers to store state.
 *
 * @function serverInitialState
 *
 * @param {object} page - Params from the `page` object injected by the server.
 * @param {object} page.model - Page model.
 * @param {object} page.model.designers - Page model.
 * @param {string} page.model.slug - Page model.
 * @param {string} page.model.subfolder - Page model.
 *
 * @returns {object} Initial state for the designers reducer.
 */
const serverInitialState = ({
  model,
}: {
  model: Model;
}): {
  designers: StoreState['designers'];
} => {
  if (!get(model, 'designers')) {
    return { designers: INITIAL_STATE };
  }

  const { slug } = model;
  const { query } = parse(slug);
  const hash = generateDesignerResultHash(query);

  return {
    designers: {
      hash,
      error: {},
      isLoading: {
        [hash]: false,
      },
      result: {
        [hash]: model,
      },
    },
  };
};

export default serverInitialState;
