export const data = {
  type: 'custom',
  fields: {
    pageSize: {
      type: 'number',
      value: 10,
      name: 'PageSize',
      displayOptions: {},
    },
    orderOption: {
      type: 'text',
      value: 'EventDate',
      name: 'OrderOption',
      displayOptions: {},
    },
    contentToInclude: {
      type: 'text',
      value: '',
      name: 'ContentToInclude',
      displayOptions: {},
    },
    allowedContentTypes: {
      type: 'list',
      components: [],
      name: 'AllowedContentTypes',
      displayOptions: {},
    },
    contentTypes: {
      type: 'list',
      components: [
        {
          type: 'custom',
          fields: {
            id: {
              type: 'number',
              value: 0,
              name: 'Id',
              displayOptions: {},
            },
            key: {
              type: 'text',
              value: 'qa-test',
              name: 'Key',
              displayOptions: {},
            },
            attributes: {
              type: 'list',
              components: [
                {
                  type: 'custom',
                  fields: {
                    key: {
                      type: 'text',
                      value: 'qa-text',
                      name: 'Key',
                      displayOptions: {},
                    },
                    values: {
                      type: 'text',
                      value: '',
                      name: 'Values',
                      displayOptions: {},
                    },
                  },
                  name: 'GenericContentAttribute',
                  displayOptions: {},
                },
                {
                  type: 'custom',
                  fields: {
                    key: {
                      type: 'text',
                      value: 'text1',
                      name: 'Key',
                      displayOptions: {},
                    },
                    values: {
                      type: 'text',
                      name: 'Values',
                      displayOptions: {},
                    },
                  },
                  name: 'GenericContentAttribute',
                  displayOptions: {},
                },
              ],
              name: 'Attributes',
              displayOptions: {},
            },
          },
          displayOptions: {},
        },
      ],
      name: 'ContentTypes',
      displayOptions: {},
    },
  },
  customType: 'ContentListComponent',
  name: 'ContentList',
  displayOptions: {},
};

export const response = [
  {
    publicationId: '16528ff2-035d-4cee-a1af-1c5f38a09f27',
    versionId: '8b472273-0c2b-4c1c-b7dc-feb77e2130b7',
    spaceCode: 'dev_web',
    contentTypeCode: 'qa-test',
    environmentCode: 'live',
    code: 'content',
    target: {
      channel: 'Web',
      language: 'en-GB',
    },
    publicationDate: '2022-05-20T10:02:43.7867276Z',
    components: [
      {
        type: 'list',
        components: [
          {
            type: 'list',
            components: [
              {
                type: 'text',
                value: 'This is Content type',
                name: 'Text',
                displayOptions: {
                  uuid: 'c1265684-26c0-4d29-b3c2-651e2818bdd6',
                  matchId: 'c1265684-26c0-4d29-b3c2-651e2818bdd6',
                  displayName: 'Text',
                  moduleId: '139a4ab6-84ca-43cf-8f75-096f5d1f5523',
                  moduleVersionId: '2d5bbad9-a1a5-493f-a450-56c61d602f16',
                  moduleVersionName: '1',
                },
              },
            ],
            name: 'subsection',
            displayOptions: {
              displayId: '1d96fb81-e38a-4169-909d-08c3c907a96c',
              displayName: 'Subsection 1',
            },
          },
        ],
        name: 'section',
        displayOptions: {
          displayId: 'b53394f7-f29c-49e3-bee9-f12a2e632f44',
          displayName: 'Section 1',
        },
      },
    ],
  },
];

export const responseWithMultipleCodes = [
  ...response,
  {
    publicationId: 'eced3dc3-6997-4353-8fa3-244aadfd59fd',
    versionId: '1ccca0c2-d2d1-4b07-b883-61d9519028b5',
    spaceCode: 'dev_web',
    contentTypeCode: 'qa-test',
    environmentCode: 'live',
    code: 'new-content',
    target: {
      channel: 'Web',
      language: 'en-GB',
    },
    publicationDate: '2022-05-20T10:02:06.5036269Z',
    components: [
      {
        type: 'list',
        components: [
          {
            type: 'list',
            components: [
              {
                type: 'bool',
                value: false,
                name: 'Boolean',
                displayOptions: {
                  uuid: '3174efee-b6dc-4224-8f1c-70b50546aa55',
                  matchId: '3174efee-b6dc-4224-8f1c-70b50546aa55',
                  displayName: 'Boolean',
                  moduleId: 'f095ec2a-e537-4a85-8df2-2465cae64486',
                  moduleVersionId: 'ce5cca12-caf9-47a5-be7f-4ea207e5b3a9',
                  moduleVersionName: '1',
                },
              },
              {
                type: 'color',
                hex: '#7b4343',
                name: 'Color',
                displayOptions: {
                  uuid: '497732aa-e098-4b67-89cf-de6cc4bf186e',
                  matchId: '497732aa-e098-4b67-89cf-de6cc4bf186e',
                  displayName: 'Color',
                  moduleId: '49b618cf-149c-4e46-a555-34e4269d2c7a',
                  moduleVersionId: '22dabd91-d9d0-4ea8-a2d0-9c3f9560e0f9',
                  moduleVersionName: '1',
                },
              },
              {
                type: 'custom',
                fields: {
                  image: {
                    type: 'image',
                    alt: '',
                    name: 'Image',
                    displayOptions: {
                      transformationIds: '{}',
                      originalIds: '{}',
                    },
                  },
                  cta: {
                    type: 'link',
                    url: '/null/',
                    text: '',
                    target: '',
                    name: 'CallToAction',
                    displayOptions: {
                      uuid: '6be88169-5c88-44ca-96d8-5a2e94c993ed',
                      matchId: '6be88169-5c88-44ca-96d8-5a2e94c993ed',
                      displayName: 'Media',
                      linkType: null,
                      moduleId: '8ffe31e2-9b13-4c71-b63a-e645d18e0d38',
                      moduleVersionId: 'e47192da-584d-419c-a2a8-b04d42eadaff',
                      moduleVersionName: '1',
                    },
                  },
                },
                customType: 'MediaComponent',
                name: 'Media',
                displayOptions: {
                  uuid: '6be88169-5c88-44ca-96d8-5a2e94c993ed',
                  matchId: '6be88169-5c88-44ca-96d8-5a2e94c993ed',
                  displayName: 'Media',
                  moduleId: '8ffe31e2-9b13-4c71-b63a-e645d18e0d38',
                  moduleVersionId: 'e47192da-584d-419c-a2a8-b04d42eadaff',
                  moduleVersionName: '1',
                  fileIds: '{}',
                  fileNames: '{}',
                  isSimpleMedia: 'false',
                  mediaType: 'image',
                },
              },
              {
                type: 'number',
                value: 0.0,
                name: 'Number',
                displayOptions: {
                  uuid: '56a17ed7-8069-44de-8220-e976be93f302',
                  matchId: '56a17ed7-8069-44de-8220-e976be93f302',
                  displayName: 'Number',
                  moduleId: '77dcd07c-67c1-4ca5-8180-b07a7078d996',
                  moduleVersionId: 'b973dd75-ef1a-4b63-bfc6-32760c736832',
                  moduleVersionName: '1',
                },
              },
              {
                type: 'text',
                value: '',
                name: 'Text',
                displayOptions: {
                  uuid: '66d8ab2c-31b8-409b-a723-0664a60eb16b',
                  matchId: '66d8ab2c-31b8-409b-a723-0664a60eb16b',
                  displayName: 'Text',
                  moduleId: '139a4ab6-84ca-43cf-8f75-096f5d1f5523',
                  moduleVersionId: '2d5bbad9-a1a5-493f-a450-56c61d602f16',
                  moduleVersionName: '1',
                },
              },
            ],
            name: 'subsection',
            displayOptions: {
              displayId: 'fbcc80fe-dda2-4bf8-ab76-a46d755eee8e',
              displayName: 'Subsection 1',
            },
          },
        ],
        name: 'section',
        displayOptions: {
          displayId: '1342dcfd-e410-4404-a8e0-185d1acb7169',
          displayName: 'Section 1',
        },
      },
    ],
  },
];

export const responseWithEventDate = [
  {
    ...responseWithMultipleCodes[0],
    metadata: {
      custom: {
        eventDate: responseWithMultipleCodes[0].publicationDate,
      },
    },
  },
  {
    ...responseWithMultipleCodes[1],
    metadata: {
      custom: {
        eventDate: responseWithMultipleCodes[1].publicationDate,
      },
    },
  },
];
