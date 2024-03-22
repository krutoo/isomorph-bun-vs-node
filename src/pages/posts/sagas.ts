import type { PostApi } from '../../entities/post';
import type { UserApi } from '../../entities/user';
import { all, call, delay, put, race, take, takeLeading } from 'typed-redux-saga';
import { END } from 'redux-saga';
import { PostsSlice } from './redux/posts-slice';
import { UserSlice } from './redux/user-slice';
import { AuthorsSlice } from './redux/authors-slice';
import { AuthorApi } from '../../entities/author';

export interface SagaDeps {
  api: {
    offers: UserApi;
    posts: PostApi;
    authors: AuthorApi;
  };
}

function* main(deps: SagaDeps) {
  yield* takeLeading(UserSlice.actions.request, fetchUser, deps);
  yield* takeLeading(PostsSlice.actions.request, fetchPosts, deps);
  yield* takeLeading(AuthorsSlice.actions.request, fetchAuthors, deps);

  yield* race([
    //
    delay(2000),
    call(fetchData, deps),
  ]);

  yield* put(END);
}

function* fetchData(deps: SagaDeps) {
  yield* put(UserSlice.actions.request());
  yield* take([UserSlice.actions.success, UserSlice.actions.failure]);

  yield* put(PostsSlice.actions.request());
  yield* take([PostsSlice.actions.success, PostsSlice.actions.failure]);

  yield* put(AuthorsSlice.actions.request());
  yield* take([AuthorsSlice.actions.success, AuthorsSlice.actions.failure]);
}

function* fetchUser({ api }: SagaDeps) {
  const response = yield* call(api.offers.getUser);

  if (response.ok) {
    yield* put(UserSlice.actions.success(response.data));
  } else {
    yield* put(UserSlice.actions.failure(String(response.error)));
  }
}

function* fetchPosts({ api }: SagaDeps) {
  const response = yield* call(api.posts.getAll);

  if (response.ok) {
    yield* put(PostsSlice.actions.success(response.data));
  } else {
    yield* put(PostsSlice.actions.failure(String(response.error)));
  }
}

function* fetchAuthors({ api }: SagaDeps) {
  const response = yield* call(api.authors.getAll);

  if (response.ok) {
    yield* put(AuthorsSlice.actions.success(response.data));
  } else {
    yield* put(AuthorsSlice.actions.failure(String(response.error)));
  }
}

export const PostsPageSagas = {
  main,
};
