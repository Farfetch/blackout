/**
 * Get fallback image from an array of images by breakpoint.
 *
 * @param array - Image with an array of elements.
 * @param string - Breakpoint for render a image.
 *
 * @returns - Image fallback by breakpoint.
 */

import imageArrToObj from './imageArrToObj.js';
import type { Assets } from '../../../../../types/base.types.js';

const getFallbackSrcImage = (assets: Array<Assets>, breakpoint: string) => {
  const sourcesBySize = imageArrToObj(assets);
  const fallbackSrc =
    sourcesBySize?.[breakpoint] ||
    sourcesBySize?.Lg ||
    sourcesBySize?.Md ||
    sourcesBySize?.Sm ||
    sourcesBySize?.Xs;

  return fallbackSrc;
};

export default getFallbackSrcImage;
