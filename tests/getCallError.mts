class NoErrorThrownError extends Error {}

export default async function getCallError<TError>(
  call: () => unknown,
): Promise<TError> {
  try {
    await call();

    throw new NoErrorThrownError();
  } catch (error: unknown) {
    return error as TError;
  }
}
