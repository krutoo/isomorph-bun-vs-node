import { PresetBun, HandlerProvider } from '@sima-land/isomorph/preset/bun';
import { createApplication } from '@sima-land/isomorph/di';
import { TOKEN } from '../tokens';
import { AuthorsPageApp } from '../pages/authors';
import { PostsPageApp } from '../pages/posts';

export function MainApp() {
  const app = createApplication();

  app.preset(
    PresetBun(({ override }) => {
      override(TOKEN.Lib.Http.Serve.routes, resolve => {
        const posts = resolve(TOKEN.Pages.posts);
        const authors = resolve(TOKEN.Pages.authors);

        return [
          ['/', posts],
          ['/posts', posts],
          ['/authors', authors],
        ];
      });
    }),
  );

  app.bind(TOKEN.Pages.authors).toProvider(HandlerProvider(AuthorsPageApp));
  app.bind(TOKEN.Pages.posts).toProvider(HandlerProvider(PostsPageApp));

  return app;
}
