import type { Config } from '../../../types';
import type {
  PostUserPersonalIdImageData,
  PostUserPersonalIdImageResponse,
} from '.';

export type PostUserPersonalIdImage = (
  userId: number,
  data: PostUserPersonalIdImageData,
  config: Config,
) => Promise<PostUserPersonalIdImageResponse>;
