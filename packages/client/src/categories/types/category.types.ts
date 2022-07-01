import type { Gender } from '../../types';

export type Category = {
  id: number;
  name: string;
  parentId?: number;
  gender: Gender;
  uuid?: string;
};
