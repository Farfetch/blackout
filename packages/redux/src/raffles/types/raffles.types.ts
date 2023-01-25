import type {
  Raffle,
  RaffleEstimation,
  RaffleParticipation,
} from '@farfetch/blackout-client';

export type DetailedRaffle = Raffle & {
  estimation: RaffleEstimation | undefined;
  participation: RaffleParticipation | undefined;
};
