import type { Config } from '../../types/index.js';
import type { PackagingOption } from './index.js';

export type GetPackagingOptionsQuery = {
  channelCode: string;
};

export type GetPackagingOptions = (
  query?: GetPackagingOptionsQuery,
  config?: Config,
) => Promise<PackagingOption[]>;
