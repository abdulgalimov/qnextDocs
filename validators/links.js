const fs = require('fs').promises;
const conf = require('../docs-src/.vuepress/conf.json');

const ignoreFiles = ['.DS_Store', '.git', '.gitignore', '.vuepress', '_export', 'not_ready'];
const files = [];
const dirs = {};
const docsSrcDir = './docs-src/';
async function readFiles(path) {
  const filesAll = await fs.readdir(docsSrcDir+path, {withFileTypes: true});
  const filesInDir = {};
  for (let i=0; i<filesAll.length; i++) {
    const file = filesAll[i];
    if (ignoreFiles.includes(file.name)) continue;
    if (file.isDirectory()) {
      await readFiles(`${path}/${file.name}`).catch(err => {
        console.log('err', err);
      });
    } else if (file.isFile()) {
      if (file.name.substr(file.name.length-3) === '.md') {
        filesInDir[file.name] = true;
        files.push(path+'/'+file.name);
      }
    }
  }
  //
  if (path !== '.') dirs[path.substr(1)] = filesInDir;
}

async function run() {
  await readFiles('.')
  for (let i=0; i<files.length; i++) {
    const fileName = files[i];
    const contentBuffer = await fs.readFile(docsSrcDir+fileName);
    const content = contentBuffer.toString();
    linkReg.lastIndex = 0;
    await checkContent(fileName, content);
  }
  return invalidLinks;
}

const linkReg = /\[[^\]]+\]\((?<link>[^)]+)\)/g;
const invalidLinks = {};
function checkContent(fileName, content) {
  let exec
  do {
    exec = linkReg.exec(content);
    if (exec) {
      let link = exec.groups.link;
      if (link.includes('://') || link.indexOf('#') === 0 || link.indexOf('./') === 0) continue;
      if (link.indexOf(conf.basePath) === 0) {
        link = link.substr(conf.basePath.length);
      }
      const checkLink = link.charAt(0) !== '/' ? '/'+link : link;
      const key = conf.basePath+link;
      if (!dirs[checkLink] && (!invalidLinks[key] || !invalidLinks[key].includes(fileName))) {
        invalidLinks[key] = invalidLinks[key]||[];
        invalidLinks[key].push(fileName)
      }
    }
  } while (exec);
}

module.exports = {
  run,
};
