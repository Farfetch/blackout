import type {
  GetSEOError,
  IsSEOLoading,
} from '@farfetch/blackout-redux/contents/types';
import type { IndexSignature } from '@farfetch/blackout-client/types';

type MaskIcon = {
  rel: string;
  href?: string;
  color?: string;
};

type MetaName = 'description' | 'keywords';

export type AppIconLinks = Partial<{
  appleIcons: {
    href: string;
    sizes: string;
  }[];
  icons: {
    href: string;
    sizes: string;
  }[];
  maskIcon: Partial<MaskIcon>;
}>;

export type Meta = {
  name: MetaName;
  content: string;
};

export type Link = {
  rel: string;
  href: string;
  hreflang?: string;
};

export type UseMetatags = {
  error: GetSEOError;
  isLoading: IsSEOLoading;
  meta: {
    title?: string;
    description?: string;
    canonical?: string;
    meta: Partial<IndexSignature<string> & Meta>[];
    link: (Link | MaskIcon)[];
  };
};
