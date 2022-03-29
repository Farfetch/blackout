import type { Config } from '../../types';
import type {
  PostPersonalIdImageData,
  PostPersonalIdImageResponse,
} from './personalId.types';

export type PostPersonalIdImage = (
  userId: number,
  data: PostPersonalIdImageData,
  config: Config,
) => Promise<PostPersonalIdImageResponse>;
