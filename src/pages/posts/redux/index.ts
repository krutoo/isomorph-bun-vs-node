import { combineReducers } from '@reduxjs/toolkit';
import { UserSlice } from './user-slice';
import { PostsSlice } from './posts-slice';
import { AuthorsSlice } from './authors-slice';

export const reducer = combineReducers({
  user: UserSlice.reducer,
  posts: PostsSlice.reducer,
  authors: AuthorsSlice.reducer,
});
