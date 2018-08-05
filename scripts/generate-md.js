const fs = require('fs');
const path = require('path');
// const wrench = require('wrench');
const YFM = require('yaml-front-matter');
const MD = require('marked');
// const parseDocMdUtil = require('./utils/parse-doc-md');
// const parseDemoMdUtil = require('./utils/parse-demo-md');
// const generateCodeBox = require('./utils/generate-code-box');
const generateDemo = require('./generate-demo');
// const generateDocs = require('./utils/generate-docs');
// const generateRoutes = require('./utils/generate-routes');
// const getMeta = require('./utils/get-meta');
const pathArg = process.argv[2];
// const isSyncSpecific = target && (target !== 'init');
const compilePath = path.resolve(__dirname, './');
if (!fs.statSync(compilePath).isDirectory()) { console.log('can not find'); }
const dir = fs.readdirSync(compilePath);
dir.forEach(componentName => {
  const componentPath = path.join(compilePath, componentName);
  // fs.mkdirSync(componentPath);
  if (/.md$/.test(componentName)) {
    const nameKey = nameWithoutSuffixUtil(componentName);
    const demoMarkDownFile = fs.readFileSync(componentPath);
    const content = YFM.loadFront(demoMarkDownFile).__content;
    // console.log(componentPath);
    // console.log(YFM.loadFront(demoMarkDownFile));
    generateDemo(path.join(compilePath, nameKey), { name: nameKey, html: MD(content) });
    // fs.writeFileSync(path.join(compilePath, `${nameKey}.html`), MD(content));
  }
});

function nameWithoutSuffixUtil(name) {
  return name.split('.')[0];
}
