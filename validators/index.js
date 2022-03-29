
const links = require('./links');

const colors = {
  red: '\033[0;31m',
  def: '\033[0;37m',
  green: '\033[0;32m',
}
async function run() {
  console.log('run validators');
  const invalidLinks = await links.run();
  if (Object.keys(invalidLinks).length) {
    const splitter = '\n   ';
    const errorString = Object.keys(invalidLinks)
      .map(key => {
        const files = invalidLinks[key].join(splitter)
        return `${key}:${splitter}${files}`;
      })
      .join('\n')
    console.log(`${colors.red}Не валидные внутренние ссылки:
${errorString}${colors.def}`);
  } else {
    console.log(`${colors.green}Нет невалидных внутренних ссылок${colors.def}`);
  }
}

run();
