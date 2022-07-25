import type { Config } from '../../types';

export type PostOrderItemActivity = (
  id: string,
  itemId: string,
  data: PostOrderItemActivityData,
  config?: Config,
) => Promise<string>;

export type PostOrderItemActivityData = {
  type: string;
};
