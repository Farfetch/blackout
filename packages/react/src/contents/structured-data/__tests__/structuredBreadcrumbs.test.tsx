import {
  breadcrumbs,
  breadcrumbsResult,
  breadcrumbsResultEmpty,
  MockRenderScript,
} from './__fixtures__/index.js';
import structuredBreadcrumbs from '../structuredBreadcrumbs.js';

describe('structuredBreadcrumbs', () => {
  it('should correctly generate JSON-LD for a list of breadcrumbs', () => {
    const renderStructuredBreadcrumbs = structuredBreadcrumbs(breadcrumbs);

    expect(renderStructuredBreadcrumbs).toEqual(
      MockRenderScript(JSON.stringify(breadcrumbsResult)),
    );
  });

  it('should return no JSON-LD for a list of breadcrumbs', () => {
    const renderStructuredBreadcrumbs = structuredBreadcrumbs([
      { text: 'foo', url: '', name: '' },
    ]);

    expect(renderStructuredBreadcrumbs).toEqual(
      MockRenderScript(JSON.stringify(breadcrumbsResultEmpty)),
    );
  });
});
