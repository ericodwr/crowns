import { AnyAction } from 'redux';

import { signInFailed, signInSuccess, userSignOut } from './user.action';

import { UserData } from '../../utils/firebase/firebase.utils';

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
    };
  }

  if (signInFailed.match(action)) {
    return { ...state, error: action.payload };
  }

  if (userSignOut.match(action)) {
    return { ...state, currentUser: null };
  }

  return state;
};
