import { PresetNode } from '@sima-land/isomorph/preset/node';
import { Resolve, createApplication } from '@sima-land/isomorph/di';
import { TOKEN } from '../tokens';
import { HandlerProvider } from '@sima-land/isomorph/preset/node';
import { AuthorsPageApp } from '../pages/authors';
import { PostsPageApp } from '../pages/posts';
import { createConfigSource } from '@sima-land/isomorph/config';

export function MainApp() {
  const app = createApplication();

  app.preset(
    PresetNode(({ override }) => {
      override(TOKEN.Lib.Config.source, () => {
        return createConfigSource(process.env);
      });
    }),
  );

  app.bind(TOKEN.Pages.authors).toProvider(HandlerProvider(AuthorsPageApp));
  app.bind(TOKEN.Pages.posts).toProvider(HandlerProvider(PostsPageApp));
  app.bind(TOKEN.mainServer).toProvider(provideMainServer);

  return app;
}

function provideMainServer(resolve: Resolve) {
  const createServer = resolve(TOKEN.Lib.Express.factory);
  const posts = resolve(TOKEN.Pages.posts);
  const authors = resolve(TOKEN.Pages.authors);

  // промежуточные слои (express) доступные из пресета PresetNode
  const requestHandle = resolve(TOKEN.Lib.Express.Middleware.request);
  const logging = resolve(TOKEN.Lib.Express.Middleware.log);
  const metrics = resolve(TOKEN.Lib.Express.Middleware.metrics);
  const tracing = resolve(TOKEN.Lib.Express.Middleware.tracing);
  const errorHandle = resolve(TOKEN.Lib.Express.Middleware.error);

  const server = createServer();

  // регистрируем промежуточные слои
  server.use(['/', '/posts', '/authors'], [requestHandle, logging, metrics, tracing]);

  server.get('/', posts);
  server.get('/posts', posts);
  server.get('/authors', authors);

  // регистрируем промежуточный слой обработки ошибок
  server.use(['/', '/posts', '/authors'], [errorHandle]);

  return server;
}
