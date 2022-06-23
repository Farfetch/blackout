import { adaptProductImages } from '..';
import {
  digitalAssets,
  groupedProductImages,
  productImages,
} from '../__fixtures__/adapters.fixtures';

describe('adaptProductImages()', () => {
  const adapterMatcher = expect.arrayContaining([
    expect.objectContaining({
      order: expect.any(Number),
      sources: expect.any(Object),
    }),
  ]);

  it('should adapt legacy product images organized by groups (imageGroups) successfully', () => {
    const result = adaptProductImages(groupedProductImages);

    expect(result).toEqual(adapterMatcher);
    expect(result).toMatchSnapshot('Product images adapter - imagesGroup');
  });

  it('should adapt legacy product images (images) successfully', () => {
    const result = adaptProductImages(productImages);

    expect(result).toEqual(adapterMatcher);
    expect(result).toMatchSnapshot('Product images adapter - images');
  });

  it('should adapt digital assets images successfully', () => {
    const result = adaptProductImages(digitalAssets);

    expect(result).toEqual(adapterMatcher);
    expect(result).toMatchSnapshot('Product images adapter - images');
  });

  it('should return undefined when no images are provided', () => {
    const result = adaptProductImages();

    expect(result).toBeUndefined();
  });

  it('should adapt legacy product images with a query param', () => {
    const mockParam = 'c=0';

    const result = adaptProductImages(groupedProductImages, {
      productImgQueryParam: mockParam,
    });

    // This is just in case result is not an array as
    // it is supposed to be in this case
    expect.assertions(1);

    if (Array.isArray(result) && result.length > 0) {
      expect.assertions(result.length);

      result.forEach(image => {
        expect(image.sources['250']).toEqual(
          expect.stringMatching(/.jpg\?c=0$/),
        );
      });
    }
  });

  it('should adapt legacy product images with a query param with a question mark', () => {
    const mockParam = '?c=0';
    const result = adaptProductImages(groupedProductImages, {
      productImgQueryParam: mockParam,
    });

    // This is just in case result is not an array as
    // it is supposed to be in this case
    expect.assertions(1);

    if (Array.isArray(result) && result.length > 0) {
      expect.assertions(result.length);

      result.forEach(image => {
        expect(image.sources['250']).toEqual(
          expect.stringMatching(/.jpg\?c=0$/),
        );
      });
    }
  });
});
