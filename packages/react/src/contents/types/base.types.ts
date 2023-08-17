import type { ReactNode } from 'react';

export enum SortContentOption {
  PublishDate = 'PublishDate',
  EventDate = 'EventDate',
}

export type Assets = {
  height: number;
  width: number;
  source: string;
  size: string;
};

export type Audio = {
  type: string;
  fields: {
    source: {
      type: string;
      value: string;
      name: string;
      displayOptions: Record<string, never>;
    };
  };
  customType: string;
  name: string;
  displayOptions: Record<string, never>;
};

export type AudioComponent = {
  data: {
    audio: Audio;
    image: Image;
    cta?: CallToAction;
  };
  hasAudio: boolean;
  breakpoint: string;
  media?: DefaultMedia;
};

export type BoolComponent = {
  data: {
    value: boolean | null | undefined;
  };
};

export type CallToActionComponent = {
  children: ReactNode;
  data: {
    text?: string;
    url?: string;
    target: string;
  };
  'data-test'?: string;
  style?: React.CSSProperties;
};

export type CallToAction = {
  url?: string;
  text: string;
  target: string;
};

export type ColorComponent = {
  data: {
    hex: string | null | undefined;
  };
};

export type ContentListComponent = {
  data: {
    fields: {
      pageSize: {
        value: number;
      };
      orderOption: {
        value: SortContentOption;
      };
      contentTypes: {
        components: [
          {
            fields: {
              key: {
                value: string;
              };
            };
          },
        ];
      };
    };
  };
  location: {
    query?: Record<string, string>;
  };
  viewportBreakpoint: string;
};

export type DateTimeComponent = {
  data: {
    utcDate: string | null;
  };
};

export type DefaultMedia = { [size: string]: string };

export type HTMLComponent = {
  data: {
    value: string;
  };
};

export type Image = {
  type: string;
  assets: Array<Assets>;
  alt: string;
  name: string;
  displayOptions: Record<string, never>;
};

export type ThumbnailComponent = {
  image: Image;
  breakpoint: string;
};

export type ImageComponent = {
  data: {
    cta?: CallToAction;
    image: Image;
  };
  showAsThumbnail: boolean;
  breakpoint: string;
  media?: DefaultMedia;
};

export type MediaComponent = {
  data: {
    fields: {
      image?: Image;
      video?: Video;
      audio?: Audio;
      cta?: CallToAction;
    };
  };
  viewportBreakpoint: string;
  media?: DefaultMedia;
};

export type NumberComponent = {
  data: {
    value: number;
  };
};

export type TextComponent = {
  data: {
    value: string;
  };
};

export type Video = {
  type: string;
  source: string;
  provider: string;
  name: string;
  displayOptions: Record<string, never>;
};

export type VideoComponent = {
  data: {
    video: Video;
    image: Image;
    cta?: CallToAction;
  };
  hasVideo: boolean;
  breakpoint: string;
  media?: DefaultMedia;
};
