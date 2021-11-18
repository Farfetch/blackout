import join from 'proper-url-join';

/**
 * Construct slug for a given pathname.
 *
 * @function getSlug
 * @memberof module:product/listing/utils
 *
 * @example
 * const slug = getSlug('/us/shopping/woman');
 * Result of slug === 'listing/woman';
 *
 * @param {string} pathname - Pathname.
 *
 * @returns {string} Result with the correct path do call the endpoint.
 */
export default pathname => {
  const segments = pathname.replace(/\/+$/, '').split('/');
  const type = segments.find(entry =>
    ['shopping', 'sets', 'categories'].includes(entry),
  );

  const firstSegmentIndex = segments.indexOf(type) + 1;

  return join(
    type === 'shopping' ? 'listing' : type,
    ...segments.slice(firstSegmentIndex),
  );
};
