import { createToken } from '@sima-land/isomorph/di';
import { KnownToken } from '@sima-land/isomorph/tokens';

// import only types because tokens should be isomorphic
import type express from 'express';
import type { AuthorApi } from './entities/author';
import type { PostApi } from './entities/post';

export const TOKEN = {
  // tokens of common purpose components
  Lib: KnownToken,

  // tokens for specific components of this app
  Entities: {
    Author: {
      api: createToken<AuthorApi>('author/api'),
    },
    Post: {
      api: createToken<PostApi>('post/api'),
    },
  },
  Pages: {
    posts: createToken<express.Handler>('pages/posts'),
    authors: createToken<express.Handler>('pages/authors'),
  },
  mainServer: createToken<express.Application>('main-server'),
} as const;
