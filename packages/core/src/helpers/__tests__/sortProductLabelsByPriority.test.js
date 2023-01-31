import { sortProductLabelsByPriority } from '..';

describe('sortProductLabelsByPriority()', () => {
  const mockProduct = {
    labels: [
      {
        id: 1502,
        name: 'Label 2',
        priority: 2,
      },
      {
        id: 1503,
        name: 'Label 3',
        priority: 3,
      },
      {
        id: 1501,
        name: 'Label 1',
        priority: 1,
      },
    ],
  };

  it('should get the labels ascending by priority', () => {
    expect(sortProductLabelsByPriority(mockProduct)).toEqual([
      {
        id: 1501,
        name: 'Label 1',
        priority: 1,
      },
      {
        id: 1502,
        name: 'Label 2',
        priority: 2,
      },
      {
        id: 1503,
        name: 'Label 3',
        priority: 3,
      },
    ]);
  });

  it('should get the labels descending by priority', () => {
    expect(sortProductLabelsByPriority(mockProduct, 'desc')).toEqual([
      {
        id: 1503,
        name: 'Label 3',
        priority: 3,
      },
      {
        id: 1502,
        name: 'Label 2',
        priority: 2,
      },
      {
        id: 1501,
        name: 'Label 1',
        priority: 1,
      },
    ]);
  });
});
