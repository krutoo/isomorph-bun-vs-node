import type { Author } from '../../../entities/author';
import { RemoteDataState, RemoteData } from '@sima-land/isomorph/utils/redux';
import { createReducer } from '@reduxjs/toolkit';

export interface AuthorsState extends RemoteDataState<Author[], string | null> {}

const initialState: AuthorsState = {
  data: [],
  error: null,
  status: 'initial',
};

const actions = {
  ...RemoteData.createActions<Author[], string | null>('authors'),
};

const reducer = createReducer(initialState, ({ addCase }) => {
  RemoteData.applyHandlers<Author[], string | null>(actions, { addCase });
});

const selectors = {
  items: (state: { authors: AuthorsState }) => state.authors.data,
};

export const AuthorsSlice = {
  initialState,
  actions,
  reducer,
  selectors,
};
