import type { Config } from '../../types';
import type { PostPersonalIdsResponse } from './personalId.types';

export type PostPersonalIdsData = {
  backImageId: string;
  frontImageId: string;
  idNumber: string;
  name: string;
};

export type PostPersonalIds = (
  userId: number,
  data: PostPersonalIdsData,
  config: Config,
) => Promise<PostPersonalIdsResponse>;
