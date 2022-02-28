import type { Integration } from '../integrations';
import type { IntegrationFactory } from '../integrations/Integration';

type IntegrationRuntimeData = {
  instance: Integration | undefined;
  Factory: IntegrationFactory;
  options: Record<string, unknown>;
};

export default IntegrationRuntimeData;
