import * as fromEntities from '../../entities/selectors/entity';
import * as selectors from '../selectors';
import {
  mockFetchRaffleNormalizedPayload,
  mockFetchRaffleParticipationsNormalizedPayload,
  mockFetchRafflesNormalizedPayload,
  mockRaffleEstimationNormalizedPayload,
  mockRaffleEstimationResponse,
  mockRaffleParticipationResponse,
  mockRafflesState,
  participationId,
  raffleId,
} from 'tests/__fixtures__/raffles';
import { type RafflesQuery, RaffleStatus } from '@farfetch/blackout-client';
import type { StoreState } from '../../types';

describe('Raffles redux selectors', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllRaffles', () => {
    it('should return an array of raffles', () => {
      const expectedRaffles = Object.values(
        mockFetchRafflesNormalizedPayload.entities.raffles,
      );
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(selectors.getAllRaffles(mockRafflesState as StoreState)).toEqual(
        expectedRaffles,
      );
      expect(spy).toHaveBeenCalledWith(mockRafflesState, 'raffles');
    });

    it('should return an empty object when raffles is undefined', () => {
      const spy = jest.spyOn(fromEntities, 'getEntities');
      const state = { entities: {} } as StoreState;

      expect(selectors.getAllRaffles(state)).toEqual([]);
      expect(spy).toHaveBeenCalledWith(state, 'raffles');
    });
  });

  describe('getRafflesResult', () => {
    const query = { status: RaffleStatus.Closed };

    it('should return an array of raffles for a specific query params', () => {
      const expectedRaffles = [
        mockFetchRafflesNormalizedPayload.entities.raffles[raffleId],
      ];

      expect(
        selectors.getRafflesResult(mockRafflesState as StoreState, query),
      ).toEqual(expectedRaffles);
    });

    it("should return undefined when a raffle with specific query params doesn't exist", () => {
      const query = { status: RaffleStatus.Draft };

      expect(
        selectors.getRafflesResult(mockRafflesState as StoreState, query),
      ).toBeUndefined();
    });
  });

  describe('getRaffle', () => {
    it('should return a raffle', () => {
      const expectedRaffles =
        mockFetchRafflesNormalizedPayload.entities.raffles[raffleId];

      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(
        selectors.getRaffle(mockRafflesState as StoreState, raffleId),
      ).toEqual(expectedRaffles);
      expect(spy).toHaveBeenCalledWith(mockRafflesState, 'raffles', raffleId);
    });
  });

  describe('getRaffleEstimation', () => {
    it('should return a raffle estimation', () => {
      const expectedRaffles =
        mockRaffleEstimationNormalizedPayload.entities.raffleEstimations[
          raffleId
        ];

      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(
        selectors.getRaffleEstimation(mockRafflesState as StoreState, raffleId),
      ).toEqual(expectedRaffles);
      expect(spy).toHaveBeenCalledWith(
        mockRafflesState,
        'raffleEstimations',
        raffleId,
      );
    });
  });

  describe('getRaffleParticipation', () => {
    it('should return a raffle participation', () => {
      const expectedRaffles =
        mockFetchRaffleParticipationsNormalizedPayload.entities
          .raffleParticipations[participationId];

      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(
        selectors.getRaffleParticipation(
          mockRafflesState as StoreState,
          participationId,
        ),
      ).toEqual(expectedRaffles);
      expect(spy).toHaveBeenCalledWith(
        mockRafflesState,
        'raffleParticipations',
        participationId,
      );
    });
  });

  describe('getRaffleParticipationForRaffle', () => {
    it('should return a raffle participation', () => {
      const expectedRaffleParticipation =
        mockFetchRaffleParticipationsNormalizedPayload.entities
          .raffleParticipations[participationId];
      const spy = jest.spyOn(fromEntities, 'getEntities');

      expect(
        selectors.getRaffleParticipationForRaffle(
          mockRafflesState as StoreState,
          raffleId,
        ),
      ).toEqual(expectedRaffleParticipation);
      expect(spy).toHaveBeenCalledWith(
        mockRafflesState,
        'raffleParticipations',
      );
    });

    it('should return undefined when raffle participations are undefined', () => {
      const spy = jest.spyOn(fromEntities, 'getEntities');
      const state = { entities: {} } as StoreState;

      expect(
        selectors.getRaffleParticipationForRaffle(state, raffleId),
      ).toBeUndefined();
      expect(spy).toHaveBeenCalledWith(state, 'raffleParticipations');
    });
  });

  describe('getDetailedRaffle', () => {
    it('should return a detailed raffle', () => {
      const expectedRaffles = {
        ...mockFetchRaffleNormalizedPayload.entities.raffles[raffleId],
        participation: mockRaffleParticipationResponse,
        estimation: mockRaffleEstimationResponse,
      };

      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(
        selectors.getDetailedRaffle(mockRafflesState as StoreState, raffleId),
      ).toEqual(expectedRaffles);
      expect(spy).toHaveBeenCalledWith(mockRafflesState, 'raffles', raffleId);
      expect(spy).toHaveBeenCalledWith(
        mockRafflesState,
        'raffleEstimations',
        raffleId,
      );
    });

    it('should return undefined when raffle doesnt exist', () => {
      const invalidRaffleId = 'invalid Raffle Id';

      expect(
        selectors.getDetailedRaffle(
          mockRafflesState as StoreState,
          invalidRaffleId,
        ),
      ).toBeUndefined();
    });

    it('should return just a raffle when raffle participation and raffle estimation do not exist', () => {
      const expectedResult = {
        ...mockFetchRaffleNormalizedPayload.entities.raffles[raffleId],
        estimation: undefined,
        participation: undefined,
      };
      const state = {
        ...mockRafflesState,
        entities: {
          ...mockRafflesState.entities,
          raffleParticipations: {},
          raffleEstimations: {},
        },
      };

      expect(
        selectors.getDetailedRaffle(state as StoreState, raffleId),
      ).toEqual(expectedResult);
    });
  });

  describe('areRafflesLoading', () => {
    it('should return the loading status for the raffles request', () => {
      const hash = `?status=${RaffleStatus.Closed}`;
      const expectedResult =
        mockRafflesState.raffles?.allRaffles[hash]?.isLoading;
      const query = { status: RaffleStatus.Closed };

      expect(
        selectors.areRafflesLoading(
          mockRafflesState as StoreState,
          query as RafflesQuery,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getRafflesError', () => {
    it('should return the error status for the raffles request', () => {
      const hash = `?status=${RaffleStatus.Closed}`;
      const expectedResult = mockRafflesState.raffles?.allRaffles[hash]?.error;
      const query = { status: RaffleStatus.Closed };

      expect(
        selectors.getRafflesError(mockRafflesState as StoreState, query),
      ).toEqual(expectedResult);
    });
  });

  describe('isRaffleLoading', () => {
    it('should return the loading status for a raffle request', () => {
      const expectedResult =
        mockRafflesState.raffles?.raffles[raffleId]?.isLoading;

      expect(
        selectors.isRaffleLoading(mockRafflesState as StoreState, raffleId),
      ).toEqual(expectedResult);
    });
  });

  describe('getRaffleError', () => {
    it('should return the error status for a raffle request', () => {
      const expectedResult = mockRafflesState.raffles?.raffles[raffleId]?.error;

      expect(
        selectors.getRaffleError(mockRafflesState as StoreState, raffleId),
      ).toEqual(expectedResult);
    });
  });

  describe('isRaffleEstimationLoading', () => {
    it('should return the loading status for a raffle estimation request', () => {
      const expectedResult =
        mockRafflesState.raffles?.estimations[raffleId]?.isLoading;

      expect(
        selectors.isRaffleEstimationLoading(
          mockRafflesState as StoreState,
          raffleId,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getRaffleEstimationError', () => {
    it('should return the error status for a raffle estimation request', () => {
      const expectedResult =
        mockRafflesState.raffles?.estimations[raffleId]?.error;

      expect(
        selectors.getRaffleEstimationError(
          mockRafflesState as StoreState,
          raffleId,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('isRaffleParticipationLoading', () => {
    it('should return the loading status for a raffle participation request', () => {
      const expectedResult =
        mockRafflesState.raffles?.participations[participationId]?.isLoading;

      expect(
        selectors.isRaffleParticipationLoading(
          mockRafflesState as StoreState,
          participationId,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getRaffleParticipationError', () => {
    it('should return the error status for a raffle participation request', () => {
      const expectedResult =
        mockRafflesState.raffles?.participations[participationId]?.error;

      expect(
        selectors.getRaffleParticipationError(
          mockRafflesState as StoreState,
          participationId,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('isRaffleParticipationCreationLoading', () => {
    it('should return the loading status for a raffle participation creation request', () => {
      const expectedResult =
        mockRafflesState.raffles?.participationCreations[raffleId]?.isLoading;

      expect(
        selectors.isRaffleParticipationCreationLoading(
          mockRafflesState as StoreState,
          raffleId,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getRaffleParticipationCreationError', () => {
    it('should return the error status for a raffle participation creation request', () => {
      const expectedResult =
        mockRafflesState.raffles?.participationCreations[raffleId]?.error;

      expect(
        selectors.getRaffleParticipationCreationError(
          mockRafflesState as StoreState,
          raffleId,
        ),
      ).toEqual(expectedResult);
    });
  });
});
