import { MainApp } from './app';
import { TOKEN } from './tokens';

MainApp().invoke(
  [TOKEN.Lib.Config.source, TOKEN.Lib.logger, TOKEN.mainServer],
  (config, logger, server) => {
    const mainPort = config.require('HTTP_PORT_MAIN');

    if (process.env.NODE_ENV) {
      console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);
    }

    server.listen(mainPort, () => {
      logger.info(`Main server started on http://localhost:${mainPort}`);
    });
  },
);
