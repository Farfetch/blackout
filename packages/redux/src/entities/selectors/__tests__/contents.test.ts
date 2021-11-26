import { getContent } from '../';

const mockId = '1fa65fb0-49bf-43b3-902e-78d104f160a3';
const mockContent = {
  publicationId: '1fa65fb0-49bf-43b3-902e-78d104f160a3',
  versionId: '914480a1-21a3-4bb4-8670-40ab113b1a3a',
  spaceCode: 'website',
  contentTypeCode: 'pages',
  environmentCode: 'live',
  code: 'cttpage',
};

describe('getContent()', () => {
  it('should return the content entity', () => {
    const state = {
      entities: {
        contents: {
          [mockId]: mockContent,
        },
      },
    };

    expect(getContent(state, mockId)).toEqual(mockContent);
  });
});
