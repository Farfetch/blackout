import * as fromEntities from '../../../entities/redux/selectors/entity';
import * as fromReducer from '../reducer';
import * as selectors from '../selectors';
import {
  expectedPaymentTokensNormalizedPayload,
  paymentTokenId,
} from '../__fixtures__/paymentTokens.fixtures';
import {
  instrumentId,
  mockGetInstrumentsNormalizedPayload,
} from '../__fixtures__/getInstruments.fixtures';
import { selectorAssertions } from '../../../../tests/helpers';

describe('Payments redux selectors', () => {
  const mockState = {
    payments: {
      tokens: {
        error: null,
        result: null,
        isLoading: false,
      },
      orderPayments: {
        error: null,
        isLoading: false,
      },
      transaction: {
        error: null,
        isLoading: false,
        result: null,
      },
      instruments: {
        error: null,
        isLoading: false,
        result: null,
      },
      giftCardBalance: {
        error: null,
        isLoading: false,
        result: null,
      },
      creditBalance: {
        error: null,
        isLoading: false,
        result: null,
      },
      intent: {
        error: null,
        isLoading: false,
        result: null,
      },
      charges: {
        error: null,
        isLoading: false,
        result: null,
      },
      applePaySession: {
        error: null,
        isLoading: false,
        result: null,
      },
    },
    entities: {
      ...expectedPaymentTokensNormalizedPayload.entities,
      ...mockGetInstrumentsNormalizedPayload.entities,
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPaymentTokens()', () => {
    it('should get the payment tokens from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');
      expect(selectors.getPaymentTokens(mockState)).toEqual(
        expectedPaymentTokensNormalizedPayload.entities.paymentTokens,
      );
      expect(spy).toHaveBeenCalledWith(mockState, 'paymentTokens');
    });
  });

  describe('getPaymentToken()', () => {
    it('should get the return item from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');
      expect(selectors.getPaymentToken(mockState, paymentTokenId)).toEqual(
        expectedPaymentTokensNormalizedPayload.entities.paymentTokens[
          paymentTokenId
        ],
      );
      expect(spy).toHaveBeenCalledWith(
        mockState,
        'paymentTokens',
        paymentTokenId,
      );
    });
  });

  describe('getPaymentTokensError()', () => {
    it('should get the payment tokens error property', () => {
      const spy = jest.spyOn(fromReducer, 'getTokens');
      const expectedResult = mockState.payments.tokens.error;
      expect(selectors.getPaymentTokensError(mockState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isPaymentTokensLoading()', () => {
    it('should get the payment tokens isLoading property', () => {
      const spy = jest.spyOn(fromReducer, 'getTokens');
      const expectedResult = mockState.payments.tokens.isLoading;

      expect(selectors.isPaymentTokensLoading(mockState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPaymentTokensResult()', () => {
    it('should get the payment tokens result property', () => {
      const spy = jest.spyOn(fromReducer, 'getTokens');
      const expectedResult = mockState.payments.tokens.result;

      expect(selectors.getPaymentTokensResult(mockState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getIntruments()', () => {
    it('should get the instruments item from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');
      expect(selectors.getInstruments(mockState)).toEqual(
        mockGetInstrumentsNormalizedPayload.entities.instruments,
      );
      expect(spy).toHaveBeenCalledWith(mockState, 'instruments');
    });
  });

  describe('getInstrument()', () => {
    it('should get the instrument item from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');
      expect(selectors.getInstrument(mockState, instrumentId)).toEqual(
        mockGetInstrumentsNormalizedPayload.entities.instruments[instrumentId],
      );
      expect(spy).toHaveBeenCalledWith(mockState, 'instruments', instrumentId);
    });
  });

  describe('Sub-areas selectors', () => {
    const subAreaNames = [
      'OrderPayments',
      'Transaction',
      'Instruments',
      'GiftCardBalance',
      'CreditBalance',
      'Intent',
      'Charges',
      'ApplePaySession',
    ];

    describe('sub-areas loading selectors', () => {
      selectorAssertions.assertSubAreasLoadingSelector(
        subAreaNames,
        mockState,
        selectors,
      );
    });

    describe('sub-areas error selectors', () => {
      selectorAssertions.assertSubAreasErrorSelector(
        subAreaNames,
        mockState,
        'payments',
        selectors,
      );
    });

    describe('sub-areas result selectors', () => {
      selectorAssertions.assertSubAreasResultSelector(
        [
          'Transaction',
          'Instruments',
          'GiftCardBalance',
          'CreditBalance',
          'Intent',
          'Charges',
          'ApplePaySession',
        ],
        mockState,
        'payments',
        selectors,
      );
    });
  });
});
