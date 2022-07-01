import * as fromAddresses from '../reducer';
import * as selectors from '../selectors';
import { mockCurrentState as mockState } from 'tests/__fixtures__/addresses';

describe('addresses redux selectors', () => {
  beforeEach(jest.clearAllMocks);

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

      expect(selectors.areAddressPredictionsLoading(mockState)).toEqual(
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

      expect(selectors.areAddressPredictionDetailsLoading(mockState)).toEqual(
        mockState.addresses.prediction.isLoading,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });
  });
});
