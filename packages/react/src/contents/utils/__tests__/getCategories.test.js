import * as utils from '../';

const breadcrumbs = [
  {
    text: 'Category A',
  },
  {
    text: 'Category B',
  },
  {
    text: 'Category C',
  },
];

describe('getCategories', () => {
  it('should return a string with categories divided by commas', () => {
    const categories = utils.getCategories(breadcrumbs);
    const result = 'Category A,Category B';

    expect(categories).toBe(result);
  });

  it('should return undefined if breadcrumbs just have one item', () => {
    const categories = utils.getCategories(breadcrumbs[0]);
    const result = undefined;

    expect(categories).toBe(result);
  });
});
