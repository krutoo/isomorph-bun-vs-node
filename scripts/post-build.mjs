import fs from 'node:fs/promises';

/**
 * Добавляет контент в начало файла.
 * @param {string} path Путь до файла.
 * @param {string} content Контент для добавления в начало.
 */
async function prependFile(path, content) {
  const data = await fs.readFile(path);
  const handle = await fs.open(path, 'w+');
  const insert = Buffer.from(content);

  await handle.write(insert, 0, insert.length, 0);
  await handle.write(data, 0, data.length, insert.length);
  await handle.close();
}

await prependFile('./dist/index.js', '// @bun\n');
