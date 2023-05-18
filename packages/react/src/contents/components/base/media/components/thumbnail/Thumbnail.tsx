import { ImageThumbnail } from './styles.js';
import getFallbackSrcImage from '../utils/getFallbackSrcImage.js';
import type { ThumbnailComponent } from '../../../../../index.js';

const Thumbnail = ({
  image: { alt, assets, name },
  breakpoint,
}: ThumbnailComponent): JSX.Element => {
  const fallbackSrc = getFallbackSrcImage(assets, breakpoint);

  return (
    <img
      alt={alt}
      style={ImageThumbnail}
      src={fallbackSrc}
      data-test={`${name}-thumbnail`}
    />
  );
};

export default Thumbnail;
