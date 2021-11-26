import {
  breadcrumbs,
  breadcrumbsResult,
  breadcrumbsResultEmpty,
} from '../__fixtures__/breadcrumbs.fixtures';
import { renderScriptTag } from '../../helpers';
import structuredBreadcrumbs from '../breadcrumbs';

describe('structuredBreadcrumbs', () => {
  it('should correctly generate JSON-LD for a list of breadcrumbs', () => {
    const renderScructuredBreadcrumbs = structuredBreadcrumbs(breadcrumbs);

    expect(renderScructuredBreadcrumbs).toEqual(
      renderScriptTag(breadcrumbsResult),
    );
  });

  it('should return no JSON-LD for a list of breadcrumbs', () => {
    const renderScructuredBreadcrumbs = structuredBreadcrumbs([
      { text: 'foo' },
    ]);

    expect(renderScructuredBreadcrumbs).toEqual(
      renderScriptTag(breadcrumbsResultEmpty),
    );
  });
});
