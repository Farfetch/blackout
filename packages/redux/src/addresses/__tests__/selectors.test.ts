import * as fromAddresses from '../reducer';
import * as selectors from '../selectors';
import { mockCurrentState as mockState } from 'tests/__fixtures__/addresses';

describe('addresses redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('getAddressesError()', () => {
    it('should get the error property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getError');

      expect(selectors.getAddressesError(mockState)).toEqual(
        mockState.addresses.error,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });
  });

  describe('isAddressesLoading()', () => {
    it('should get the addresses loading property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getIsLoading');

      expect(selectors.isAddressesLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });
  });

  describe('getAddressPredictions()', () => {
    it('should get the predictions result property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getAddressPredictions');

      expect(selectors.getAddressPredictions(mockState)).toEqual(
        mockState.addresses.predictions.result,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });

    it('should get the predictions error property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getAddressPredictions');

      expect(selectors.getAddressPredictionsError(mockState)).toEqual(
        mockState.addresses.predictions.error,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });

    it('should get the predictions isLoading property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getAddressPredictions');

      expect(selectors.isAddressPredictionsLoading(mockState)).toEqual(
        mockState.addresses.predictions.isLoading,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });
  });

  describe('getAddressPrediction()', () => {
    it('should get the address result property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getAddressPrediction');

      expect(selectors.getAddressPrediction(mockState)).toEqual(
        mockState.addresses.prediction.result,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });

    it('should get the address error property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getAddressPrediction');

      expect(selectors.getAddressPredictionError(mockState)).toEqual(
        mockState.addresses.prediction.error,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });

    it('should get the address isLoading property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getAddressPrediction');

      expect(selectors.isAddressPredictionLoading(mockState)).toEqual(
        mockState.addresses.prediction.isLoading,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });
  });
});
