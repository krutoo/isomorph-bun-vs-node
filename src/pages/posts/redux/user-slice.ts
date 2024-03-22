import type { UserData } from '../../../entities/user';
import { RemoteDataState, RemoteData } from '@sima-land/isomorph/utils/redux';
import { createReducer } from '@reduxjs/toolkit';

export interface UserState extends RemoteDataState<UserData | null, string | null> {}

const initialState: UserState = {
  data: null,
  error: null,
  status: 'initial',
};

const actions = {
  ...RemoteData.createActions<UserData | null, string | null>('user'),
};

const reducer = createReducer(initialState, ({ addCase }) => {
  RemoteData.applyHandlers<UserData | null, string | null>(actions, { addCase });
});

const selectors = {
  data: (state: { user: UserState }) => state.user.data,
};

export const UserSlice = {
  initialState,
  actions,
  reducer,
  selectors,
};
