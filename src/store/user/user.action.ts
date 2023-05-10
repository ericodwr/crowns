import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload,
} from '../../utils/reducer/reducer.utils';

import { UserData } from '../../utils/firebase/firebase.utils';

import { USER_ACTION_TYPES } from './user.types';

// typescript
export type Data = {
  email: string;
  password: string;
  displayName: string;
};

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export type SetCurrentUser = ActionWithPayload<
  USER_ACTION_TYPES.SET_CURRENT_USER,
  UserData
>;

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN>;

export type EmailSignInStart = ActionWithPayload<
  USER_ACTION_TYPES.EMAIL_SIGN_IN,
  { email: string; password: string }
>;

export type UserSignUp = ActionWithPayload<
  USER_ACTION_TYPES.USER_SIGN_UP,
  Data
>;

export type SignInSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  UserData
>;

export type SignInFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_FAILED,
  Error
>;

export type UserSignOut = Action<USER_ACTION_TYPES.USER_SIGN_OUT>;

// function
export const setCurrentUser = (user: UserData) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = withMatcher(
  (): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION),
);

export const googleSignInStart = withMatcher(
  (): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN),
);

export const emailSignInStart = withMatcher(
  (email: string, password: string): EmailSignInStart =>
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN, { email, password }),
);

export const userSignUp = withMatcher(
  (email: string, password: string, displayName: string): UserSignUp =>
    createAction(USER_ACTION_TYPES.USER_SIGN_UP, {
      email,
      password,
      displayName,
    }),
);

export const signInSuccess = withMatcher(
  (user: UserData & { id: string }): SignInSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user),
);

export const signInFailed = withMatcher(
  (error: any): SignInFailed =>
    createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error),
);

export const userSignOut = withMatcher(
  (): UserSignOut => createAction(USER_ACTION_TYPES.USER_SIGN_OUT),
);
