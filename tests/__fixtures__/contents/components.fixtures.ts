export const mockImage = {
  image: {
    type: 'image',
    alt: 'alt',
    assets: [
      {
        height: 549,
        width: 1024,
        source:
          'https://cdn-static.blackandwhite-ff.com/BWStaticContent/25000/25000/949336c2-f88e-4762-b6a1-ba55c120056c_md-burberry.jpg',
        size: 'Xs',
      },
      {
        height: 549,
        width: 1024,
        source:
          'https://cdn-static.blackandwhite-ff.com/BWStaticContent/25000/25000/949336c2-f88e-4762-b6a1-ba55c120056c_md-burberry.jpg',
        size: 'Sm',
      },
      {
        height: 549,
        width: 1024,
        source:
          'https://cdn-static.blackandwhite-ff.com/BWStaticContent/25000/25000/949336c2-f88e-4762-b6a1-ba55c120056c_md-burberry.jpg',
        size: 'Md',
      },
      {
        height: 1098,
        width: 2048,
        source:
          'https://cdn-static.blackandwhite-ff.com/BWStaticContent/25000/25000/88968585-9092-4685-8f0e-69c639be350b_lg-burberry.jpg',
        size: 'Lg',
      },
    ],
    name: 'Image',
    displayOptions: {},
  },
};

export const mockVideo = {
  video: {
    type: 'video',
    source: 'https://www.youtube.com/watch?v=b6iD0zL4104',
    provider: 'Youtube',
    name: 'Video',
    displayOptions: {},
  },
};

export const mockAudio = {
  audio: {
    type: 'custom',
    fields: {
      source: {
        type: 'text',
        value:
          '/BWStaticContent/25000/9e91511d-a260-40ed-9b6d-00a9062906d8_x-fps-aut-test-x-wma-2mb.wma',
        name: 'x-fps-aut-test-x-wma-2mb.wma',
        displayOptions: {},
      },
    },
    customType: 'Audio',
    name: 'Audio',
    displayOptions: {},
  },
};

export const mockCta = {
  cta: {
    url: '/test',
    text: 'Link',
    target: '_self',
  },
};
