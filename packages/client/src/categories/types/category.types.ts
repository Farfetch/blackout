import type { GenderEnum } from '../../types';

export type Category = {
  id: number;
  name: string;
  parentId?: number;
  gender: GenderEnum;
  uuid?: string;
};
