import { createApplication, Resolve } from '@sima-land/isomorph/di';
import { PresetBunHandler } from '@sima-land/isomorph/preset/bun-handler';
import { TOKEN } from '../../tokens';
import { createPostApi } from '../../entities/post';
import { PostsPage } from './containers/posts-page';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { PostsPageSagas } from './sagas';
import { createUserApi } from '../../entities/user';
import { reducer } from './redux';
import { GlobalDataScript } from '@sima-land/isomorph/utils/ssr';
import { createAuthorApi } from '../../entities/author';
import { RegularHelmet } from '@sima-land/isomorph/preset/server';

export function PostsPageApp() {
  const app = createApplication();

  // используем пресет "PresetHandler"
  app.preset(
    PresetBunHandler(({ override }) => {
      // переопределяем провайдеры пресета
      override(TOKEN.Lib.Http.Handler.Page.render, provideRender);
      override(TOKEN.Lib.Http.Handler.Page.helmet, () => RegularHelmet);
      override(TOKEN.Lib.Http.Handler.Page.assets, () => ({
        js: '',
        css: 'http://localhost:8080/index.css',
      }));
    }),
  );

  // добавляем в приложение собственные компоненты
  app.bind(TOKEN.Entities.Post.api).toProvider(providePostApi);
  app.bind(TOKEN.Entities.Offers.api).toProvider(provideUserApi);
  app.bind(TOKEN.Entities.Author.api).toProvider(provideAuthorApi);

  return app;
}

function provideRender(resolve: Resolve) {
  const offers = resolve(TOKEN.Entities.Offers.api);
  const posts = resolve(TOKEN.Entities.Post.api);
  const authors = resolve(TOKEN.Entities.Author.api);
  const logger = resolve(TOKEN.Lib.logger);

  return async () => {
    const sagaMiddleware = createSagaMiddleware({
      onError: logger.error,
    });

    const store = configureStore({
      reducer,
      middleware: [sagaMiddleware],
    });

    await sagaMiddleware.run(PostsPageSagas.main, { api: { posts, offers, authors } }).toPromise();

    return (
      <Provider store={store}>
        <PostsPage />
        <GlobalDataScript property='initialState' value={store.getState()} />
      </Provider>
    );
  };
}

function provideUserApi(resolve: Resolve) {
  const fetch = resolve(TOKEN.Lib.Http.fetch);
  const hosts = resolve(TOKEN.Lib.Http.Api.knownHosts);

  return createUserApi({
    fetch,
    host: hosts.get('simaV6'),
  });
}

function provideAuthorApi(resolve: Resolve) {
  const fetch = resolve(TOKEN.Lib.Http.fetch);

  return createAuthorApi({
    host: 'https://jsonplaceholder.typicode.com/',
    fetch,
  });
}

function providePostApi(resolve: Resolve) {
  const fetch = resolve(TOKEN.Lib.Http.fetch);

  return createPostApi({
    host: 'https://jsonplaceholder.typicode.com/',
    fetch,
  });
}
