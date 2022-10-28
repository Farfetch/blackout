import * as fromEntities from '../../entities/selectors/entity';
import * as fromReducer from '../reducer';
import * as selectors from '../selectors';
import {
  expectedPaymentTokensNormalizedPayload,
  instrumentId,
  mockFetchInstrumentsNormalizedPayload,
  mockFetchInstrumentsResponse,
  mockInitialState,
  mockPaymentInstrumentsWithDataState,
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

    describe('arePaymentTokensFetched()', () => {
      it('should return correctly if not fetched', () => {
        expect(selectors.arePaymentTokensFetched(mockInitialState)).toBe(false);
      });

      it('should return correctly on error', () => {
        const mockError = {
          message: 'This is an error message',
          name: 'error',
          code: 500,
        };

        expect(
          selectors.arePaymentTokensFetched({
            ...mockState,
            payments: {
              ...mockState.payments,
              paymentTokens: {
                ...mockState.payments?.paymentTokens,
                error: mockError,
              },
            },
          }),
        ).toBe(true);
      });

      it('should return correctly on load', () => {
        expect(
          selectors.arePaymentTokensFetched({
            ...mockState,
            payments: {
              ...mockState.payments,
              paymentTokens: {
                ...mockState.payments?.paymentTokens,
                isLoading: true,
              },
            },
          }),
        ).toBe(false);
      });
    });
  });

  describe('Instruments', () => {
    describe('getPaymentIntentInstruments()', () => {
      it('should get the payment instruments item from state', () => {
        expect(
          selectors.getPaymentIntentInstruments(
            mockPaymentInstrumentsWithDataState,
          ),
        ).toEqual([
          mockFetchInstrumentsNormalizedPayload.entities.paymentInstruments[
            mockFetchInstrumentsResponse[0]?.id
          ],
        ]);
      });
    });

    describe('getPaymentIntentInstrument()', () => {
      it('should get the payment instrument item from state', () => {
        const spy = jest.spyOn(fromEntities, 'getEntityById');
        expect(
          selectors.getPaymentIntentInstrument(mockState, instrumentId),
        ).toEqual(
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
      'PaymentIntentInstruments',
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
          'PaymentIntentInstruments',
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
