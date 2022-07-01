import * as fromEntities from '../../entities/selectors/entity';
import * as fromReducer from '../reducer';
import * as selectors from '../selectors';
import {
  expectedPaymentTokensNormalizedPayload,
  instrumentId,
  mockFetchInstrumentsNormalizedPayload,
  mockInitialState,
  paymentTokenId,
} from 'tests/__fixtures__/payments';
import { selectorAssertions } from '../../../tests/helpers';

const mockState = {
  ...mockInitialState,
  entities: {
    ...expectedPaymentTokensNormalizedPayload.entities,
    ...mockFetchInstrumentsNormalizedPayload.entities,
  },
};

describe('Payments redux selectors', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Payment Tokens', () => {
    describe('getPaymentTokens()', () => {
      it('should get the payment tokens from state', () => {
        const spy = jest.spyOn(fromEntities, 'getEntities');
        expect(selectors.getPaymentTokens(mockState)).toEqual(
          expectedPaymentTokensNormalizedPayload.entities.paymentTokens,
        );
        expect(spy).toHaveBeenCalledWith(mockState, 'paymentTokens');
      });
    });

    describe('getPaymentToken()', () => {
      it('should get the return item from state', () => {
        const spy = jest.spyOn(fromEntities, 'getEntityById');
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
        const spy = jest.spyOn(fromReducer, 'getPaymentTokens');
        const expectedResult = mockState.payments.paymentTokens.error;
        expect(selectors.getPaymentTokensError(mockState)).toEqual(
          expectedResult,
        );
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    describe('arePaymentTokensLoading()', () => {
      it('should get the payment tokens isLoading property', () => {
        const spy = jest.spyOn(fromReducer, 'getPaymentTokens');
        const expectedResult = mockState.payments.paymentTokens.isLoading;

        expect(selectors.arePaymentTokensLoading(mockState)).toEqual(
          expectedResult,
        );
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    describe('getPaymentTokensResult()', () => {
      it('should get the payment tokens result property', () => {
        const spy = jest.spyOn(fromReducer, 'getPaymentTokens');
        const expectedResult = mockState.payments.paymentTokens.result;

        expect(selectors.getPaymentTokensResult(mockState)).toEqual(
          expectedResult,
        );
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Instruments', () => {
    describe('getPaymentInstruments()', () => {
      it('should get the payment instruments item from state', () => {
        const spy = jest.spyOn(fromEntities, 'getEntities');
        expect(selectors.getPaymentInstruments(mockState)).toEqual(
          mockFetchInstrumentsNormalizedPayload.entities.paymentInstruments,
        );
        expect(spy).toHaveBeenCalledWith(mockState, 'paymentInstruments');
      });
    });

    describe('getPaymentInstrument()', () => {
      it('should get the payment instrument item from state', () => {
        const spy = jest.spyOn(fromEntities, 'getEntityById');
        expect(selectors.getPaymentInstrument(mockState, instrumentId)).toEqual(
          mockFetchInstrumentsNormalizedPayload.entities.paymentInstruments[
            instrumentId
          ],
        );
        expect(spy).toHaveBeenCalledWith(
          mockState,
          'paymentInstruments',
          instrumentId,
        );
      });
    });
  });

  describe('Sub-areas selectors', () => {
    const subAreaNames = [
      'PaymentInstruments',
      'GiftCardBalance',
      'UserCreditBalance',
      'PaymentIntent',
      'PaymentIntentCharge',
      'PaymentMethods',
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
          'PaymentInstruments',
          'GiftCardBalance',
          'UserCreditBalance',
          'PaymentIntent',
          'PaymentIntentCharge',
          'PaymentMethods',
        ],
        mockState,
        'payments',
        selectors,
      );
    });
  });
});
