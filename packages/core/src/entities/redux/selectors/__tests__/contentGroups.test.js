import { getContentGroup } from '../';

const mockContentHash = 'codes=123&spaceCode=345';
const mockContentGroup = {
  number: 1,
  totalPages: 1,
  totalItems: 3,
  entries: [
    {
      publicationId: '1fa65fb0-49bf-43b3-902e-78d104f160a3',
    },
  ],
};

describe('getContentGroup()', () => {
  it('should return the content group entity', () => {
    const state = {
      entities: {
        contentGroups: {
          [mockContentHash]: mockContentGroup,
        },
      },
    };

    expect(getContentGroup(state, mockContentHash)).toEqual(mockContentGroup);
  });
});
