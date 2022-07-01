import * as selectors from '../selectors';
import { mockBaseState } from '../../__fixtures__/state.fixtures';
import merge from 'lodash/merge';
import type { UserAddress } from '@farfetch/blackout-client';

describe('redux selectors', () => {
  describe('areUserAddressesLoading()', () => {
    const mockLoadingState = merge({}, mockBaseState, {
      users: { addresses: { isLoading: true } },
    });

    it('should return `isLoading` value from `addresses` slice', () => {
      expect(selectors.areUserAddressesLoading(mockBaseState)).toBe(false);

      expect(selectors.areUserAddressesLoading(mockLoadingState)).toBe(true);
    });
  });

  describe('areUserAddressesListLoading()', () => {
    const mockLoadingState = merge({}, mockBaseState, {
      users: { addresses: { addresses: { isLoading: true } } },
    });

    it('should return `isLoading` value from `addresses.addresses` slice', () => {
      expect(selectors.areUserAddressesListLoading(mockBaseState)).toBe(false);

      expect(selectors.areUserAddressesListLoading(mockLoadingState)).toBe(
        true,
      );
    });
  });

  describe('isUserAddressLoading()', () => {
    const loadingAddress = '111';
    const notLoadingAddress = '222';

    const mockLoadingState = merge({}, mockBaseState, {
      users: {
        addresses: { address: { isLoading: { [loadingAddress]: true } } },
      },
    });

    it('should return `isLoading` value from `addresses.address` slice', () => {
      expect(
        selectors.isUserAddressLoading(mockBaseState, notLoadingAddress),
      ).toBeFalsy();

      expect(
        selectors.isUserAddressLoading(mockLoadingState, loadingAddress),
      ).toBe(true);
    });
  });

  describe('isUserDefaultAddressDetailsLoading()', () => {
    const mockLoadingState = merge({}, mockBaseState, {
      users: {
        addresses: {
          defaultAddressDetails: {
            error: null,
            isLoading: true,
            result: null,
          },
        },
      },
    });

    it('should return `isLoading` value from `addresses.defaultAddressDetails` slice', () => {
      expect(selectors.isUserDefaultAddressDetailsLoading(mockBaseState)).toBe(
        false,
      );

      expect(
        selectors.isUserDefaultAddressDetailsLoading(mockLoadingState),
      ).toBe(true);
    });
  });

  describe('getUserAddressesError()', () => {
    const dummyError = new Error('dummy error');

    const mockErrorState = merge({}, mockBaseState, {
      users: { addresses: { error: dummyError } },
    });

    it('should return `error` value from `addresses` slice', () => {
      expect(selectors.getUserAddressesError(mockBaseState)).toBe(null);

      expect(selectors.getUserAddressesError(mockErrorState)).toBe(dummyError);
    });
  });

  describe('getUserAddressesListError()', () => {
    const dummyError = new Error('dummy error');

    const mockErrorState = merge({}, mockBaseState, {
      users: { addresses: { addresses: { error: dummyError } } },
    });

    it('should return `error` value from `addresses.addresses` slice', () => {
      expect(selectors.getUserAddressesListError(mockBaseState)).toBe(null);

      expect(selectors.getUserAddressesListError(mockErrorState)).toBe(
        dummyError,
      );
    });
  });

  describe('getUserAddressError()', () => {
    const dummyError = new Error('dummy error');
    const addressWithError = '111';
    const addressWithoutError = '222';

    const mockErrorState = merge({}, mockBaseState, {
      users: {
        addresses: { address: { error: { [addressWithError]: dummyError } } },
      },
    });

    it('should return `error` value from `addresses.address` slice', () => {
      expect(
        selectors.getUserAddressError(mockBaseState, addressWithoutError),
      ).toBeFalsy();

      expect(
        selectors.getUserAddressError(mockErrorState, addressWithError),
      ).toBe(dummyError);
    });
  });

  describe('getUserDefaultAddressDetailsError()', () => {
    const dummyError = new Error('dummy error');

    const mockErrorState = merge({}, mockBaseState, {
      users: { addresses: { defaultAddressDetails: { error: dummyError } } },
    });

    it('should return `error` value from `addresses.defaultAddressDetails` slice', () => {
      expect(selectors.getUserDefaultAddressDetailsError(mockBaseState)).toBe(
        null,
      );

      expect(selectors.getUserDefaultAddressDetailsError(mockErrorState)).toBe(
        dummyError,
      );
    });
  });

  describe('getUserAddressesResult()', () => {
    const userAddresses = ['111', '222'];

    const mockStateWithResult = merge({}, mockBaseState, {
      users: { addresses: { result: userAddresses } },
    });

    it('should return `result` value from `addresses` slice', () => {
      expect(selectors.getUserAddressesResult(mockBaseState)).toBe(null);

      expect(selectors.getUserAddressesResult(mockStateWithResult)).toEqual(
        userAddresses,
      );
    });
  });

  describe('getUserDefaultAddressDetailsResult()', () => {
    const defaultUserAddress: UserAddress = {
      id: '11',
    } as unknown as UserAddress;

    const mockStateWithResult = merge({}, mockBaseState, {
      users: {
        addresses: { defaultAddressDetails: { result: defaultUserAddress } },
      },
    });

    it('should return `result` value from `addresses.defaultAddressDetails` slice', () => {
      expect(selectors.getUserDefaultAddressDetailsResult(mockBaseState)).toBe(
        null,
      );

      expect(
        selectors.getUserDefaultAddressDetailsResult(mockStateWithResult),
      ).toEqual(defaultUserAddress);
    });
  });

  describe('getUserAddresses()', () => {
    it('should return the addresses entity', () => {
      expect(selectors.getUserAddresses(mockBaseState)).toBe(
        mockBaseState.entities?.addresses,
      );
    });
  });

  describe('getUserAddress()', () => {
    it('should return a specific address entity', () => {
      const addressId = Object.keys(
        mockBaseState.entities?.addresses as object,
      )[0] as string;

      expect(selectors.getUserAddress(mockBaseState, addressId)).toBe(
        mockBaseState.entities?.addresses?.[addressId],
      );
    });
  });
});
