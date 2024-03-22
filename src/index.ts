import { Logger } from '@sima-land/isomorph/log';
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

    runGCWatcher(logger);
  },
);

/**
 * По мотивам https://discord.com/channels/876711213126520882/1211928485715771412/1219245245771022376.
 * @inheritdoc
 */
function runGCWatcher(logger: Logger) {
  /** @inheritdoc */
  const getMemoryUsage = () => process.memoryUsage().rss / 1024 / 1024;

  const start = getMemoryUsage();

  setInterval(() => {
    Bun.gc(true);

    const diff = getMemoryUsage() - start;
    if (diff > 10) {
      logger.error(`Memory Diff: ${diff} MB`);
    } else if (process.env.NODE_ENV === 'development') {
      logger.info(`Memory Diff: ${diff} MB`);
    }
  }, 60000);
}
