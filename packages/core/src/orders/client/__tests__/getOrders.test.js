import { accsvc, legacy } from '../__fixtures__/getOrders.fixtures';
import { getOrders } from '..';
import client from '../../../helpers/client';
import moxios from 'moxios';
const expectedConfig = undefined;

beforeEach(() => {
  moxios.install(client);
  jest.clearAllMocks();
});

afterEach(() => moxios.uninstall(client));

const userId = 25767945;

const mockedResponse = {
  number: 1,
  totalPages: 8,
  totalItems: 471,
  entries: [
    {
      id: 'QRDAE2',
      userId: 25767945,
      merchantId: 10361,
      merchantName: 'BROWNS WH',
      totalQuantity: 1,
      status: 'Order delivered',
      createdDate: '2021-06-23T08:56:02.353Z',
      returnAvailable: true,
      checkoutOrderId: 138847898,
      tags: [],
    },
    {
      id: 'S3R2YN',
      userId: 25767945,
      merchantId: 10361,
      merchantName: 'BROWNS WH',
      totalQuantity: 1,
      status: 'Return Accepted and Refunded',
      createdDate: '2021-06-22T16:18:07.66Z',
      returnAvailable: false,
      checkoutOrderId: 138811505,
      returnId: 24314901,
      tags: [],
    },
  ],
};

const mockedAdaptedResponse = {
  items: {
    number: 1,
    totalPages: 8,
    totalItems: 471,
    entries: [
      {
        id: 'QRDAE2',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order delivered',
        createdDate: '/Date(1624438562353)/',
        returnAvailable: true,
        checkoutOrderId: 138847898,
        tags: [],
      },
      {
        id: 'S3R2YN',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1624378687660)/',
        returnAvailable: false,
        checkoutOrderId: 138811505,
        returnId: 24314901,
        tags: [],
      },
    ],
  },
};

const oldMockedResponse = {
  userId: 25767945,
  items: {
    entries: [
      {
        id: 'QRDAE2',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order delivered',
        createdDate: '/Date(1624438562353)/',
        returnAvailable: true,
        checkoutOrderId: 138847898,
        returnId: null,
      },
      {
        id: 'S3R2YN',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1624378687660)/',
        returnAvailable: false,
        checkoutOrderId: 138811505,
        returnId: 24314901,
      },
      {
        id: '24BJKS',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1624359822360)/',
        returnAvailable: false,
        checkoutOrderId: 138791030,
        returnId: 24312900,
      },
      {
        id: 'S3QKAN',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1624356047107)/',
        returnAvailable: false,
        checkoutOrderId: 138782257,
        returnId: 24310028,
      },
      {
        id: 'EZ4YSH',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1624355648633)/',
        returnAvailable: false,
        checkoutOrderId: 138779758,
        returnId: null,
      },
      {
        id: 'LUSZY5',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1624354740177)/',
        returnAvailable: false,
        checkoutOrderId: 138781064,
        returnId: null,
      },
      {
        id: 'AAP2CD',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1623770226910)/',
        returnAvailable: false,
        checkoutOrderId: 138335554,
        returnId: null,
      },
      {
        id: 'EEU56H',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1623769154107)/',
        returnAvailable: false,
        checkoutOrderId: 138334734,
        returnId: null,
      },
      {
        id: 'BBGH7K',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1623681060280)/',
        returnAvailable: false,
        checkoutOrderId: 138257055,
        returnId: null,
      },
      {
        id: 'BBGXYK',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1623678799090)/',
        returnAvailable: false,
        checkoutOrderId: 138250943,
        returnId: null,
      },
      {
        id: '77CF4Q',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1623678622967)/',
        returnAvailable: false,
        checkoutOrderId: 138251411,
        returnId: null,
      },
      {
        id: '6VBJPC',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1622539570000)/',
        returnAvailable: false,
        checkoutOrderId: 135375870,
        returnId: null,
      },
      {
        id: 'F72BTF',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1622536793240)/',
        returnAvailable: false,
        checkoutOrderId: 135376565,
        returnId: 24320793,
      },
      {
        id: 'EMHJAH',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1622051261013)/',
        returnAvailable: false,
        checkoutOrderId: 135096974,
        returnId: 24100337,
      },
      {
        id: 'PQFFQ7',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1622049869067)/',
        returnAvailable: false,
        checkoutOrderId: 135096253,
        returnId: 24091965,
      },
      {
        id: '79MU7Q',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 2,
        status: 'Order cancelled',
        createdDate: '/Date(1622048422663)/',
        returnAvailable: false,
        checkoutOrderId: 135093267,
        returnId: null,
      },
      {
        id: 'XPG4GB',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1622048042670)/',
        returnAvailable: false,
        checkoutOrderId: 135095040,
        returnId: 24092012,
      },
      {
        id: '3ZTSEG',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1622028739537)/',
        returnAvailable: false,
        checkoutOrderId: 135070610,
        returnId: 24100360,
      },
      {
        id: 'SELMGN',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 2,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1622027928607)/',
        returnAvailable: false,
        checkoutOrderId: 135064817,
        returnId: 24100379,
      },
      {
        id: 'AB8EZD',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1621435006680)/',
        returnAvailable: false,
        checkoutOrderId: 134657442,
        returnId: null,
      },
      {
        id: '3EUSUQ',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 2,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1620296189697)/',
        returnAvailable: false,
        checkoutOrderId: 132939475,
        returnId: 24320780,
      },
      {
        id: 'MJ6N4P',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1620208120057)/',
        returnAvailable: false,
        checkoutOrderId: 132801900,
        returnId: 23927082,
      },
      {
        id: 'KFC7R2',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1620208002373)/',
        returnAvailable: false,
        checkoutOrderId: 132802618,
        returnId: 23933089,
      },
      {
        id: 'LNKQL4',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1620145549683)/',
        returnAvailable: false,
        checkoutOrderId: 132729833,
        returnId: 24008924,
      },
      {
        id: 'KFTTH2',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1620145086063)/',
        returnAvailable: false,
        checkoutOrderId: 132728218,
        returnId: null,
      },
      {
        id: 'Q2TRPR',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1620144549033)/',
        returnAvailable: false,
        checkoutOrderId: 132678747,
        returnId: null,
      },
      {
        id: 'UDGV9L',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1620123919570)/',
        returnAvailable: false,
        checkoutOrderId: 132664522,
        returnId: null,
      },
      {
        id: 'FSNDHS',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1620121490907)/',
        returnAvailable: false,
        checkoutOrderId: 132661782,
        returnId: 23919379,
      },
      {
        id: 'UDGQAL',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 3,
        status: 'Order cancelled',
        createdDate: '/Date(1620120958643)/',
        returnAvailable: false,
        checkoutOrderId: 132663050,
        returnId: null,
      },
      {
        id: 'Y9W6CF',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1620120178563)/',
        returnAvailable: false,
        checkoutOrderId: 132655861,
        returnId: null,
      },
      {
        id: '7ZXH69',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1620056941387)/',
        returnAvailable: false,
        checkoutOrderId: 132599124,
        returnId: 23917856,
      },
      {
        id: 'XV88D3',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1620048178583)/',
        returnAvailable: false,
        checkoutOrderId: 132592769,
        returnId: 23913081,
      },
      {
        id: 'TH42WW',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1620047243957)/',
        returnAvailable: false,
        checkoutOrderId: 132592395,
        returnId: 23912854,
      },
      {
        id: 'R4LJM6',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1620046073100)/',
        returnAvailable: false,
        checkoutOrderId: 132592124,
        returnId: 23912733,
      },
      {
        id: 'UDTT8L',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1619520264923)/',
        returnAvailable: false,
        checkoutOrderId: 132187242,
        returnId: null,
      },
      {
        id: 'BRXBLB',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1619518881383)/',
        returnAvailable: false,
        checkoutOrderId: 132186368,
        returnId: null,
      },
      {
        id: '3E73QQ',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1619518759920)/',
        returnAvailable: false,
        checkoutOrderId: 132186355,
        returnId: null,
      },
      {
        id: 'JWJDM5',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1619514506033)/',
        returnAvailable: false,
        checkoutOrderId: 132184168,
        returnId: null,
      },
      {
        id: 'THTJKW',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1619514248330)/',
        returnAvailable: false,
        checkoutOrderId: 132183499,
        returnId: null,
      },
      {
        id: 'MJT3DP',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1619445569283)/',
        returnAvailable: false,
        checkoutOrderId: 132128556,
        returnId: null,
      },
      {
        id: 'LWHNA4',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1619432411223)/',
        returnAvailable: false,
        checkoutOrderId: 132117289,
        returnId: null,
      },
      {
        id: 'RF4NP6',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1619190467240)/',
        returnAvailable: false,
        checkoutOrderId: 130982972,
        returnId: 23885743,
      },
      {
        id: 'DBXVSE',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1619166901897)/',
        returnAvailable: false,
        checkoutOrderId: 130964838,
        returnId: null,
      },
      {
        id: 'CHH7YV',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1619084317187)/',
        returnAvailable: false,
        checkoutOrderId: 130915565,
        returnId: null,
      },
      {
        id: 'J56YP5',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1618930391160)/',
        returnAvailable: false,
        checkoutOrderId: 130823848,
        returnId: 23885598,
      },
      {
        id: 'WPQSYY',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1618929842800)/',
        returnAvailable: false,
        checkoutOrderId: 130824708,
        returnId: 23885610,
      },
      {
        id: 'XQ4E93',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1618929558460)/',
        returnAvailable: false,
        checkoutOrderId: 130824673,
        returnId: null,
      },
      {
        id: 'RFSKJ6',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1618912842917)/',
        returnAvailable: false,
        checkoutOrderId: 130808188,
        returnId: 23827740,
      },
      {
        id: '3CLTKQ',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1618905243337)/',
        returnAvailable: false,
        checkoutOrderId: 130801875,
        returnId: 23826719,
      },
      {
        id: 'XQFSW3',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1618845361853)/',
        returnAvailable: false,
        checkoutOrderId: 130761793,
        returnId: 23822548,
      },
      {
        id: 'V2SHP7',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1618837791730)/',
        returnAvailable: false,
        checkoutOrderId: 130754589,
        returnId: 23820533,
      },
      {
        id: 'DBQEDE',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1618837293373)/',
        returnAvailable: false,
        checkoutOrderId: 130754534,
        returnId: 23820466,
      },
      {
        id: '29M6AZ',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1618836226227)/',
        returnAvailable: false,
        checkoutOrderId: 130752887,
        returnId: 23820386,
      },
      {
        id: 'V2S5V7',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1618836173853)/',
        returnAvailable: false,
        checkoutOrderId: 130750461,
        returnId: 23820389,
      },
      {
        id: 'ZUN4NT',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1618832009463)/',
        returnAvailable: false,
        checkoutOrderId: 130753168,
        returnId: null,
      },
      {
        id: 'BKYHNB',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1618827634210)/',
        returnAvailable: false,
        checkoutOrderId: 130751616,
        returnId: null,
      },
      {
        id: 'HXRJPU',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1618825820833)/',
        returnAvailable: false,
        checkoutOrderId: 130746055,
        returnId: null,
      },
      {
        id: 'AV4WUX',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1618824239343)/',
        returnAvailable: false,
        checkoutOrderId: 130745539,
        returnId: 23818434,
      },
      {
        id: 'RFZ2S6',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Return Accepted and Refunded',
        createdDate: '/Date(1618820692897)/',
        returnAvailable: false,
        checkoutOrderId: 130739900,
        returnId: 23821116,
      },
      {
        id: 'YEDTDF',
        userId: 25767945,
        merchantId: 10361,
        merchantName: 'BROWNS WH',
        totalQuantity: 1,
        status: 'Order cancelled',
        createdDate: '/Date(1618589897587)/',
        returnAvailable: false,
        checkoutOrderId: 130636309,
        returnId: null,
      },
    ],
    number: 1,
    totalItems: 471,
    totalPages: 8,
  },
  config: null,
  seoPageType: 1,
  redirectUrl: null,
  components: {},
  siteKeys: {},
  seoMetadata: null,
  staticPath: null,
  baseUrl: null,
  relativeUrl: null,
  returnUrl: null,
  translationsUrl: null,
  subfolder: null,
  slug: null,
  serverSideJsApp: null,
  currencyCode: null,
  currencyCultureCode: null,
  pageContent: null,
  dataLayer: null,
  isMobileDevice: false,
  screenPixelsWidth: 0,
  screenPixelsHeight: 0,
  countryCode: null,
  countryId: 0,
  cultureCode: null,
  pageType: null,
  clientOnlyPage: false,
  requestSourceCountryCode: null,
  newsletterSubscriptionOptionDefault: false,
  view: null,
};
describe('getOrders', () => {
  describe('legacy', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      legacy.success({ response: oldMockedResponse });

      await expect(getOrders()).resolves.toStrictEqual(oldMockedResponse);
      expect(spy).toHaveBeenCalledWith('/legacy/v1/orders', expectedConfig);
    });

    it('should handle a client request successfully with pagination', async () => {
      const query = {
        page: 1,
        pageSize: 2,
      };

      legacy.success({ query, response: oldMockedResponse });

      await expect(getOrders(query)).resolves.toStrictEqual(oldMockedResponse);
      expect(spy).toHaveBeenCalledWith(
        `/legacy/v1/orders?page=${query.page}&pageSize=${query.pageSize}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      legacy.failure({});

      await expect(getOrders()).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith('/legacy/v1/orders', expectedConfig);
    });
  });
  describe('accsvc', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      accsvc.success({ userId, response: mockedResponse });

      await expect(getOrders({ userId })).resolves.toStrictEqual(
        mockedAdaptedResponse,
      );
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/orders`,
        expectedConfig,
      );
    });

    it('should handle a client request successfully with pagination', async () => {
      const query = {
        page: 1,
        pageSize: 2,
      };

      accsvc.success({ query, userId, response: mockedResponse });

      await expect(getOrders({ query, userId })).resolves.toStrictEqual(
        mockedAdaptedResponse,
      );
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/orders?page=${query.page}&pageSize=${query.pageSize}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      accsvc.failure({ userId });

      await expect(getOrders({ userId })).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/orders`,
        expectedConfig,
      );
    });
  });
});
