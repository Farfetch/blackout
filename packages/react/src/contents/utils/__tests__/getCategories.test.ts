import * as utils from '..';

const breadcrumbs = [
  {
    text: 'Category A',
    url: '/',
    name: 'category-a',
  },
  {
    text: 'Category B',
    url: '/',
    name: 'category-b',
  },
  {
    text: 'Category C',
    url: '/',
    name: 'category-c',
  },
];

const breadcrumbsSingle = [
  {
    text: 'Category A',
    url: '/',
    name: 'category-a',
  },
];

describe('getCategories', () => {
  it('should return a string with categories divided by commas', () => {
    const categories = utils.getCategories(breadcrumbs);
    const result = 'Category A,Category B';

    expect(categories).toBe(result);
  });

  it('should return undefined if breadcrumbs just have one item', () => {
    const categories = utils.getCategories(breadcrumbsSingle);
    const result = undefined;

    expect(categories).toBe(result);
  });
});
