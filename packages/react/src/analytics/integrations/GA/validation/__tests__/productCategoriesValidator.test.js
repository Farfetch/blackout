import {
  ADD_IMPRESSION_COMMAND,
  ADD_PRODUCT_COMMAND,
  MAX_PRODUCT_CATEGORIES,
  SET_ACTION_COMMAND,
} from '../../constants';
import { utils } from '@farfetch/blackout-core/analytics';
import productCategoriesValidator from '../productCategoriesValidator';

utils.logger.warn = jest.fn();
const mockLoggerWarn = utils.logger.warn;

describe('productCategoriesValidator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe(`For each ${ADD_PRODUCT_COMMAND} command`, () => {
    it('Should warn when product category field exceeds the maximum number of levels of hierarchy', () => {
      const gaCommandList = [
        ['set', 'currencyCode', 'EUR'],
        [
          ADD_PRODUCT_COMMAND,
          {
            category:
              'Men/T-shirts/Long Sleeve/Main Collection/Patterned/Skinny',
          },
        ],
        [
          ADD_PRODUCT_COMMAND,
          {
            category:
              'Men/T-shirts/Long Sleeve/Main Collection/Patterned/Regular',
          },
        ],
        [
          ADD_PRODUCT_COMMAND,
          {
            category: 'Men/T-shirts/Long Sleeve/Main Collection/Patterned/Slim',
          },
        ],
        [SET_ACTION_COMMAND, 'checkout', { step: 2 }],
        ['send', 'event', 'Ecommerce'],
      ];

      productCategoriesValidator(gaCommandList);

      expect(mockLoggerWarn).toHaveBeenCalledTimes(3);
      expect(mockLoggerWarn).toHaveBeenNthCalledWith(
        1,
        `[GA] - Product category hierarchy '${gaCommandList[1][1].category}' exceeded maximum of ${MAX_PRODUCT_CATEGORIES}. GA only allows up to ${MAX_PRODUCT_CATEGORIES} levels.`,
      );
    });
  });

  describe(`For each ${ADD_IMPRESSION_COMMAND} command`, () => {
    it('Should warn when product category field exceeds the maximum number of levels of hierarchy', () => {
      const gaCommandList = [
        ['set', 'currencyCode', 'EUR'],
        [
          ADD_IMPRESSION_COMMAND,
          {
            category:
              'Men/T-shirts/Long Sleeve/Main Collection/Patterned/Skinny',
          },
        ],
        [
          ADD_IMPRESSION_COMMAND,
          {
            category:
              'Men/T-shirts/Long Sleeve/Main Collection/Patterned/Regular',
          },
        ],
        [
          ADD_IMPRESSION_COMMAND,
          {
            category: 'Men/T-shirts/Long Sleeve/Main Collection/Patterned/Slim',
          },
        ],
        [SET_ACTION_COMMAND, 'checkout', { step: 2 }],
        ['send', 'event', 'Ecommerce'],
      ];

      productCategoriesValidator(gaCommandList);

      expect(mockLoggerWarn).toHaveBeenCalledTimes(3);
      expect(mockLoggerWarn).toHaveBeenNthCalledWith(
        1,
        `[GA] - Product category hierarchy '${gaCommandList[1][1].category}' exceeded maximum of ${MAX_PRODUCT_CATEGORIES}. GA only allows up to ${MAX_PRODUCT_CATEGORIES} levels.`,
      );
    });
  });

  it('Should warn when product category field is not of string type', () => {
    const gaCommandList = [
      [
        ADD_PRODUCT_COMMAND,
        {
          category: [
            'Men',
            'T-shirts',
            'Long Sleeve',
            'Main Collection',
            'Patterned',
            'Skinny',
          ],
        },
      ],
    ];

    productCategoriesValidator(gaCommandList);

    expect(mockLoggerWarn).toHaveBeenCalledWith(
      `[GA] - Product category field must be a string but got a ${typeof gaCommandList[0][1]
        .category} with value ${gaCommandList[0][1].category}.`,
    );
  });
});
