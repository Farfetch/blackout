import {
  breadcrumbs,
  breadcrumbsResult,
  breadcrumbsResultEmpty,
  MockRenderScript,
} from './__fixtures__';
import structuredBreadcrumbs from '../breadcrumbs';

describe('structuredBreadcrumbs', () => {
  it('should correctly generate JSON-LD for a list of breadcrumbs', () => {
    const renderScructuredBreadcrumbs = structuredBreadcrumbs(breadcrumbs);

    expect(renderScructuredBreadcrumbs).toEqual(
      MockRenderScript(JSON.stringify(breadcrumbsResult)),
    );
  });

  it('should return no JSON-LD for a list of breadcrumbs', () => {
    const renderScructuredBreadcrumbs = structuredBreadcrumbs([
      { text: 'foo', url: null, name: undefined },
    ]);

    expect(renderScructuredBreadcrumbs).toEqual(
      MockRenderScript(JSON.stringify(breadcrumbsResultEmpty)),
    );
  });
});
