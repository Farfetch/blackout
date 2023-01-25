import type {
  BlackoutError,
  Raffle,
  RaffleParticipation,
  Raffles,
} from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';

export type RafflesNormalized = Omit<Raffles, 'entries'> & {
  entries: Array<Raffle['id']>;
};

export type RafflesState = CombinedState<{
  allRaffles: Record<
    string,
    {
      result: RafflesNormalized | null;
      isLoading: boolean;
      error: BlackoutError | null;
    }
  >;
  raffles: Record<
    Raffle['id'],
    { error: BlackoutError | null; isLoading: boolean }
  >;
  estimations: Record<
    Raffle['id'],
    { error: BlackoutError | null; isLoading: boolean }
  >;
  participations: Record<
    RaffleParticipation['id'],
    { error: BlackoutError | null; isLoading: boolean }
  >;
  participationCreations: Record<
    Raffle['id'],
    { error: BlackoutError | null; isLoading: boolean }
  >;
}>;
