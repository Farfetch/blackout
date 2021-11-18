import { buildDesignerResultHash } from '../utils';
import { INITIAL_STATE } from './reducer';
import { normalize } from 'normalizr';
import designerResult from '../../entities/schemas/designerResult';
import get from 'lodash/get';
import parse from 'url-parse';

/**
 * Converts server data from designers to store state.
 *
 * @function serverInitialState
 *
 * @param {object} page - Params from the `page` object injected by the server.
 * @param {object} page.model - Page model.
 *
 * @returns {object} Initial state for the designers reducer.
 */
export default ({ model }) => {
  if (!get(model, 'designers')) {
    return { designers: INITIAL_STATE };
  }

  const { designers, slug, subfolder } = model;
  const { query } = parse(slug);
  const hash = buildDesignerResultHash(subfolder, query);
  // Normalize it
  const { entities } = normalize({ designers, hash, slug }, designerResult);

  return {
    designers: {
      hash,
      isLoading: {
        [hash]: false,
      },
    },
    entities,
  };
};
