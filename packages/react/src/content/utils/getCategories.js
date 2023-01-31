import initial from 'lodash/initial';

/**
 * Aggregate all the url texts in breadcrumbs into strings separated by commas.
 *
 * @function getCategories
 * @memberof module:content/utils
 *
 * @example
 * const breadcrumbs = [{ text: 'Homepage' }, { text: 'About' }];
 * const categories = getCategories(breadcrumbs);
 * Result of categories = 'About';
 *
 * @param {object} breadcrumbs - All the breadcrumbs links.
 *
 * @returns {string} - Breadcrumbs url text divided by commas.
 */
export default breadcrumbs => {
  // Remove the first entry of the array (E.g. Always Homepage).
  const breadcrumbsInitial = initial(breadcrumbs);

  if (!breadcrumbsInitial.length) {
    return undefined;
  }

  // Couldn't use reduce because breadcrumbs will have just one item often.
  return breadcrumbsInitial.map(breadcrumb => breadcrumb.text).join();
};
