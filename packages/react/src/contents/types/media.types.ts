export type Media = {
  // Media file description text.
  alt: string;
  // Media source file path.
  source: string;
  // Media thumbnail images.
  thumbnails: {
    // Media thumbnail image source size.
    srcLg?: string;
  };
};
