export type GetOrderDocument = (
  id: string,
  documentId: string,
  config?: Record<string, unknown>,
) => Promise<string>;
