import * as fromAddresses from '../reducer';
import * as fromEntities from '../../entities/selectors/entity';
import * as selectors from '../selectors';

describe('addresses redux selectors', () => {
  const addressId2 = '2222222';
  const addressId3 = '33333333';

  const myAddress2Entity = {
    id: addressId2,
    addressLine1: 'addres 2',
  };

  const myAddress3Entity = {
    id: addressId3,
    addressLine1: 'addres 3',
  };

  const countryId = 1;
  const addressSchemaEntity = {
    addressSchemaLines: [
      {
        name: 'FirstName',
        position: 0,
        type: 'FreeText',
        validationRegex: '^.{1,45}$',
        apiMapping: 'FirstName',
        isMandatory: true,
        maxLength: 45,
        minLength: 1,
        column: 0,
        row: 0,
      },
    ],
  };

  const mockState = {
    addresses: {
      error: 'error: not loaded',
      isLoading: false,
      result: ['mockId', 'mockId2'],
      predictions: {
        result: 'mock result',
        error: 'error: not loaded',
        isLoading: false,
      },
      predictionDetails: {
        result: 'mock result',
        error: 'error: not loaded',
        isLoading: false,
      },
      addresses: {
        error: 'error: not loaded',
        isLoading: false,
      },
      address: {
        error: { [addressId2]: null },
        isLoading: { [addressId2]: false },
      },
      addressSchema: {
        error: 'error: not loaded',
        isLoading: false,
      },
      defaultAddressDetails: {
        error: 'error: not loaded',
        isLoading: false,
        result: { id: '1', addressLine1: 'Rua da Lionesa 446, G12' },
      },
    },
    entities: {
      addresses: {
        [`${addressId2}`]: myAddress2Entity,
        [`${addressId3}`]: myAddress3Entity,
      },
      addressSchema: {
        [countryId]: addressSchemaEntity,
      },
    },
  };

  beforeEach(jest.clearAllMocks);

  describe('getResult()', () => {
    it('should get the result property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getResult');

      expect(selectors.getResult(mockState)).toEqual(
        mockState.addresses.result,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });
  });

  describe('getError()', () => {
    it('should get the error property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getError');

      expect(selectors.getError(mockState)).toEqual(mockState.addresses.error);
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

  describe('getAddresses()', () => {
    it('should get the addresses from state', () => {
      const expectedResult = mockState.entities.addresses;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getAddresses(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'addresses');
    });

    it('should get the addresses error property from state', () => {
      const expectedResult = mockState.addresses.addresses.error;
      const spy = jest.spyOn(fromAddresses, 'getAddresses');

      expect(selectors.getAddressesListError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the addresses isLoading property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getAddresses');

      expect(selectors.isAddressesListLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAddress()', () => {
    it('should get the specified address from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(selectors.getAddress(mockState, addressId2)).toEqual(
        myAddress2Entity,
      );
      expect(spy).toHaveBeenCalledWith(mockState, 'addresses', addressId2);
    });

    it('should get the address isLoading property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getAddress');

      expect(selectors.isAddressLoading(mockState, addressId2)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the address error property from state', () => {
      const expectedResult = mockState.addresses.address.error[addressId2];
      const spy = jest.spyOn(fromAddresses, 'getAddress');

      expect(selectors.getAddressError(mockState, addressId2)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSchema()', () => {
    it('should get the address schemas list', () => {
      const expectedResult = mockState.entities.addressSchema;
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getSchemas(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockState, 'addressSchema');
    });

    it('should get the schema for a specific country from state', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(selectors.getSchema(mockState, countryId)).toEqual(
        addressSchemaEntity,
      );
      expect(spy).toHaveBeenCalledWith(mockState, 'addressSchema', countryId);
    });
    it('should get the address schema isLoading property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getAddressSchema');

      expect(selectors.isAddressSchemaLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the address schema error property from state', () => {
      const expectedResult = mockState.addresses.addressSchema.error;
      const spy = jest.spyOn(fromAddresses, 'getAddressSchema');

      expect(selectors.getAddressSchemaError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPredictions()', () => {
    it('should get the predictions result property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getPredictions');

      expect(selectors.getPredictions(mockState)).toEqual(
        mockState.addresses.predictions.result,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });

    it('should get the predictions error property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getPredictions');

      expect(selectors.getPredictionsError(mockState)).toEqual(
        mockState.addresses.predictions.error,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });

    it('should get the predictions isLoading property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getPredictions');

      expect(selectors.isPredictionsLoading(mockState)).toEqual(
        mockState.addresses.predictions.isLoading,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });
  });

  describe('getPredictionDetails()', () => {
    it('should get the address result property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getPredictionDetails');

      expect(selectors.getPredictionDetails(mockState)).toEqual(
        mockState.addresses.predictionDetails.result,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });

    it('should get the address error property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getPredictionDetails');

      expect(selectors.getPredictionDetailsError(mockState)).toEqual(
        mockState.addresses.predictionDetails.error,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });

    it('should get the address isLoading property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getPredictionDetails');

      expect(selectors.isPredictionDetailsLoading(mockState)).toEqual(
        mockState.addresses.predictionDetails.isLoading,
      );
      expect(spy).toHaveBeenCalledWith(mockState.addresses);
    });
  });

  describe('getDefaultAddressDetails()', () => {
    it('should get the default address details isLoading property from state', () => {
      const spy = jest.spyOn(fromAddresses, 'getDefaultAddressDetails');

      expect(selectors.isDefaultAddressDetailsLoading(mockState)).toEqual(
        false,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the default address details error property from state', () => {
      const expectedResult = mockState.addresses.defaultAddressDetails.error;
      const spy = jest.spyOn(fromAddresses, 'getDefaultAddressDetails');

      expect(selectors.getDefaultAddressDetailsError(mockState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the default address details result property', () => {
      const spy = jest.spyOn(fromAddresses, 'getDefaultAddressDetails');
      const expectedResult = mockState.addresses.defaultAddressDetails.result;

      expect(selectors.getDefaultAddressDetailsResult(mockState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
