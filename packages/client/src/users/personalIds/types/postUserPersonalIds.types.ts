import type { Config } from '../../../types';
import type { PostUserPersonalIdsResponse } from '.';

export type PostUserPersonalIdsData = {
  backImageId: string;
  frontImageId: string;
  idNumber: string;
  name: string;
};

export type PostUserPersonalIds = (
  userId: number,
  data: PostUserPersonalIdsData,
  config: Config,
) => Promise<PostUserPersonalIdsResponse>;
