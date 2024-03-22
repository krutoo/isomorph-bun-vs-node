import { createToken } from '@sima-land/isomorph/di';
import { KnownToken } from '@sima-land/isomorph/tokens';

// import only types because tokens should be isomorphic
import type express from 'express';
import type { AuthorApi } from './entities/author';
import type { PostApi } from './entities/post';
import type { ServerHandler } from '@sima-land/isomorph/preset/server';
import { UserApi } from './entities/user';

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
    Offers: {
      api: createToken<UserApi>('offers/api'),
    },
  },
  Pages: {
    posts: createToken<ServerHandler>('pages/posts'),
    authors: createToken<ServerHandler>('pages/authors'),
  },
  mainServer: createToken<express.Application>('main-server'),
} as const;
