import type { Post } from '../../../entities/post';
import { RemoteDataState, RemoteData } from '@sima-land/isomorph/utils/redux';
import { createReducer } from '@reduxjs/toolkit';

export interface PostsState extends RemoteDataState<Post[], string | null> {}

const initialState: PostsState = {
  data: [],
  error: null,
  status: 'initial',
};

const actions = {
  ...RemoteData.createActions<Post[], string | null>('posts'),
};

const reducer = createReducer(initialState, ({ addCase }) => {
  RemoteData.applyHandlers<Post[], string | null>(actions, { addCase });
});

const selectors = {
  items: (state: { posts: PostsState }) => state.posts.data,
};

export const PostsSlice = {
  initialState,
  actions,
  reducer,
  selectors,
};
