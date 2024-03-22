import { createApplication, Resolve } from '@sima-land/isomorph/di';
import { PresetBunHandler } from '@sima-land/isomorph/preset/bun-handler';
import { TOKEN } from '../../tokens';
import { Layout } from '../../components/Layout';
import { Nav } from '../../components/Nav';
import { createAuthorApi } from '../../entities/author';
import { RegularHelmet } from '@sima-land/isomorph/preset/server';

export function AuthorsPageApp() {
  const app = createApplication();

  app.preset(
    PresetBunHandler(({ override }) => {
      override(TOKEN.Lib.Http.Handler.Page.render, provideRender);
      override(TOKEN.Lib.Http.Handler.Page.helmet, () => RegularHelmet);
      override(TOKEN.Lib.Http.Handler.Page.assets, () => ({
        js: '',
        css: 'http://localhost:8080/index.css',
      }));
    }),
  );

  app.bind(TOKEN.Entities.Author.api).toProvider(provideAuthorApi);

  return app;
}

function provideRender(resolve: Resolve) {
  const api = resolve(TOKEN.Entities.Author.api);

  return async () => {
    const response = await api.getAll();
    const authors = response.ok ? response.data : [];

    return (
      <Layout>
        <h1>Authors</h1>
        <Nav />
        <div>
          {authors.map(item => (
            <article key={item.id}>
              <h3>{item.username}</h3>
              <p>{item.name}</p>
            </article>
          ))}
        </div>
      </Layout>
    );
  };
}

function provideAuthorApi(resolve: Resolve) {
  const fetch = resolve(TOKEN.Lib.Http.fetch);

  return createAuthorApi({
    host: 'https://jsonplaceholder.typicode.com/',
    fetch,
  });
}
