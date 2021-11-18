/**
 * Generate Structured Data (JSON-LD) for Breadcrumbs.
 *
 * @function generateBreadcrumbsList
 * @memberof module:content/helpers
 *
 * @param {object} breadcrumbs - Breadcrumbs data.
 * @param {string} breadcrumbs.url - Breadcrumbs Item URL.
 * @param {string} breadcrumbs.name - Breadcrumbs Item Name.
 *
 * @returns {object} - JSON-LD Schema.org object for Breadcrumbs.
 */
export default breadcrumbs => ({
  '@context': 'http://schema.org/',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs
    .filter(breadcrumb => (breadcrumb.url || '').length > 0)
    .map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': breadcrumb.url,
        name: breadcrumb.name,
      },
    })),
});
