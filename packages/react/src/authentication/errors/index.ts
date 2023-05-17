export class LoginWithoutDataError extends Error {
  constructor() {
    super('Invalid call to login. Data is not a valid object');
  }
}
export class NotLoggedInError extends Error {
  constructor() {
    super('The current user is not logged in.');
  }
}

export class PendingUserOperationError extends Error {
  constructor() {
    super(
      "Cannot call this method while there is a pending login/logout operation. Please check the value of 'isLoading' to make sure it is false before calling login/logout methods",
    );
  }
}

export class ProfileChangedError extends Error {
  constructor() {
    super(
      'The profile fetched might not be for the current user. Please try again later.',
    );
  }
}
