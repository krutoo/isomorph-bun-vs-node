import { MainApp } from './app';
import { TOKEN } from './tokens';

MainApp().invoke(
  [TOKEN.Lib.Config.source, TOKEN.Lib.logger, TOKEN.Lib.Http.serve],
  (config, logger, serve) => {
    const server = Bun.serve({
      port: config.require('HTTP_PORT_MAIN'),
      fetch: serve,
    });

    logger.info(`Main server started on ${server.url}`);
  },
);
