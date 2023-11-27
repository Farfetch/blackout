import join from 'proper-url-join';

/**
 * Construct slug for a given pathname.
 *
 * @example
 * ```
 * const slug = getSlug('/us/shopping/woman');
 * Result of slug === 'woman';
 *
 * ```
 *
 * @param pathname - Pathname.
 *
 * @returns Result with the correct path do call the endpoint.
 */
const getSlug = (pathname: string, isCustomListingPage?: boolean): string => {
  const segments = pathname.replace(/\/+$/, '').split('/');
  const type = segments.find(entry =>
    ['shopping', 'sets', 'categories'].includes(entry),
  );

  // When it is a Custom Listing Page it will return the last segment
  // Example: '/en-pt/customlisting'
  if (isCustomListingPage) {
    return `/${segments[segments.length - 1]}`;
  }

  if (!type) {
    return '';
  }

  const typeIndex = segments.indexOf(type) + 1;

  // This prevents the cases we don't have slugs in the path.
  // Example: 'en-pt/shopping'
  if (typeIndex >= segments.length) {
    return '';
  }

  // @ts-expect-error join receives multiple arguments
  return join(...segments.slice(typeIndex));
};

export default getSlug;
