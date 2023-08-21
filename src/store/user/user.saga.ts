import { takeLatest, put, all, call } from "typed-redux-saga/macro";

import { USER_ACTION_TYPES } from "./user.types";
import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
  EmailSignInStart,
  SignUpStart,
} from "./user.action";

import {
  User,
  userRegister,
  userLogin,
  userLogout,
  getCurrentUser,
} from "../../utils/linkToServer/user.utils";

//signInWithEmail
export function* signInWithEmail({
  payload: { email, password },
}: EmailSignInStart) {
  try {
    const data = yield* call(userLogin, { email, password } as User);
    if (data && !data.error) {
      yield* put(signInSuccess(data));
    } else {
      yield* put(signInFailed(data.error));
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

// signUp
export function* signUp({
  payload: { displayName, email, password },
}: SignUpStart) {
  try {
    const data = yield* call(userRegister, {
      displayName,
      email,
      password,
    } as User);
    if (data && !data.error) {
      yield* put(signUpSuccess(data));
    } else {
      yield* put(signUpFailed(data.error));
    }
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}

// signOut
export function* signOut() {
  try {
    const data = yield* call(userLogout);
    if (data && data.message === "User logged out successfully.") {
      yield* put(signOutSuccess());
    } else {
      yield* put(
        signOutFailed(new Error("Error during logout. Please try again."))
      );
    }
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

// checkUserSession
export function* checkUserSession() {
  try {
    const user: User | null = yield* call(getCurrentUser);
    if (user) {
      yield* put(signInSuccess(user));
    } else {
      yield* put(signInFailed(new Error("Not authenticated")));
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, checkUserSession);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignOutStart),
  ]);
}
