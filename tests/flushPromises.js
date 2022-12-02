/**
 * This util will ensure all unresolved promises are flushed when nodejs/jest exits too early
 * without waiting for them to be resolved.
 *
 * Do not use this in production.
 *
 * @see https://rickschubert.net/blog/posts/flushing-promises for more context.
 *
 * @returns {Promise} - The promise of setImmediate fulfilled.
 */
function flushPromises() {
  return new Promise(setImmediate);
}

export default flushPromises;
