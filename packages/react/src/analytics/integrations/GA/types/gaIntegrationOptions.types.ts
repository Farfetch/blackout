import type { IntegrationOptions } from '@farfetch/blackout-analytics';

export type GAIntegrationOptions = {
  createFields?: { trackingId: string; name: string };
  productMappings?: Record<string, unknown>;
  scopeCommands?: Record<string, unknown>;
  schemas?: Record<string, unknown>;
  onPreProcessCommands?: (...args: unknown[]) => unknown;
  nonInteractionEvents?: Record<string, unknown>;
} & IntegrationOptions;
