import get from 'lodash/get';
import invariant from 'invariant';

/**
 * Returns a specific entity by given name and id.
 *
 * @function getEntity
 * @memberof module:entities/selectors
 *
 * @param   {object} state - Aplication state.
 * @param   {string} name  - Entity name.
 * @param   {number} id    - Entity identifier.
 *
 * @returns {object} The entity.
 */
export const getEntity = (state, name, id = null) => {
  invariant(
    typeof state.entities !== 'undefined',
    [
      'It looks like you are trying to access the `entities` state property but it does not exist.',
      'You need to add a `entities` reducer to the top level of your state tree.',
    ].join('\n'),
  );

  const path = ['entities', name];
  if (id !== null) path.push(id);

  return get(state, path);
};
