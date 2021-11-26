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
  });

  describe('Instruments', () => {
    describe('getIntruments()', () => {
      it('should get the instruments item from state', () => {
        const spy = jest.spyOn(fromEntities, 'getEntities');
        expect(selectors.getInstruments(mockState)).toEqual(
          mockFetchInstrumentsNormalizedPayload.entities.instruments,
        );
        expect(spy).toHaveBeenCalledWith(mockState, 'instruments');
      });
    });

    describe('getInstrument()', () => {
      it('should get the instrument item from state', () => {
        const spy = jest.spyOn(fromEntities, 'getEntityById');
        expect(selectors.getInstrument(mockState, instrumentId)).toEqual(
          mockFetchInstrumentsNormalizedPayload.entities.instruments[
            instrumentId
          ],
        );
        expect(spy).toHaveBeenCalledWith(
          mockState,
          'instruments',
          instrumentId,
        );
      });
    });
  });

  describe('Sub-areas selectors', () => {
    const subAreaNames = [
      'Instruments',
      'GiftCardBalance',
      'CreditBalance',
      'Intent',
      'Charges',
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
          'Instruments',
          'GiftCardBalance',
          'CreditBalance',
          'Intent',
          'Charges',
          'PaymentMethods',
        ],
        mockState,
        'payments',
        selectors,
      );
    });
  });
});
