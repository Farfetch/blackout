import * as helpers from '../';
import breadcrumbs from '../../components/__fixtures__/breadcrumbs.fixtures.json';
import breadcrumbsResult from '../__fixtures__/breadcrumbsResult.fixtures.json';

describe('generateBreadcrumbsList', () => {
  it('should correctly generate JSON-LD for a list of breadcrumbs', () => {
    const breadcrumbsList = helpers.generateBreadcrumbsList(breadcrumbs);

    expect(breadcrumbsList).toMatchObject(breadcrumbsResult);
  });

  it('should return no JSON-LD for a list of breadcrumbs', () => {
    const breadcrumbsList = helpers.generateBreadcrumbsList([{ text: 'foo' }]);

    expect(breadcrumbsList).toMatchObject({});
  });
});
