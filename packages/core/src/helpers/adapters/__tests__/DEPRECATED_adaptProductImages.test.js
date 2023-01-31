import { defaultClassifier } from '../DEPRECATED_adaptProductImages';
import { DEPRECATED_adaptProductImages } from '..';
import { groupedProductImages } from '../__fixtures__/adapters.fixtures';

describe('DEPRECATED_adaptProductImages()', () => {
  it('should return undefined if no images are provided', () => {
    expect(DEPRECATED_adaptProductImages()).toBeUndefined();
  });

  describe('with default classifier and contextual standard images', () => {
    it('should adapt legacy product images successfully', () => {
      expect(
        DEPRECATED_adaptProductImages(groupedProductImages),
      ).toMatchSnapshot('product images adapter');
    });

    it('should provide an empty product images adapter when no images are provided', () => {
      expect(DEPRECATED_adaptProductImages({})).toMatchSnapshot(
        'product images adapter without images provided',
      );
    });
  });

  describe('with custom properties', () => {
    it('should return a structure from a custom classifier', () => {
      const expectedResult = 'foo';
      const classifier = jest.fn(() => expectedResult);

      expect(
        DEPRECATED_adaptProductImages(groupedProductImages, classifier),
      ).toBe(expectedResult);
    });

    it('should return a structure with custom contextual standard images', () => {
      const contextual = {
        foo: 'foo',
        bar: 'bar',
      };
      const classifier = jest.fn((_, contextual) => ({
        contextual,
      }));

      expect(
        DEPRECATED_adaptProductImages(
          groupedProductImages,
          classifier,
          contextual,
        ),
      ).toEqual(expect.objectContaining({ contextual }));
    });
  });
});

describe('defaultClassifier()', () => {
  it('should classify image resources correctly', () => {
    const resources = [
      'https://foo.com/primary-image.jpg',
      'https://foo.com/secondary-image.jpg',
      'https://foo.com/other-image-1.jpg',
      'https://foo.com/other-image-2.jpg',
    ];
    const contextualResources = { foo: 'foo' };

    expect(defaultClassifier(resources, contextualResources)).toMatchSnapshot(
      'default classifier object',
    );
  });
});
