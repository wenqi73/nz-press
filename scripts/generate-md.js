const fs = require('fs');
const path = require('path');
const YFM = require('yaml-front-matter');
const MD = require('marked');
const generateDemo = require('./generate-demo');
const pathArg = process.argv[2];
// 路径固定
const compilePath = path.resolve(__dirname, `../${pathArg}`);
if (!fs.statSync(compilePath).isDirectory()) { console.log('can not find'); }
const dir = fs.readdirSync(compilePath);

let imports = '';
let declarations = '';
let entryComponents = [];
let routes = '';

function recurse(dir, childPath) {
  console.log(dir);
  if (!childPath) childPath = '';
  dir.forEach(fileName => {
    const nameKey = nameWithoutSuffixUtil(fileName);
    const filePath = path.join(compilePath, `${childPath}${fileName}`);
    if (fs.statSync(filePath).isDirectory()) {
      recurse(fs.readdirSync(filePath), `${childPath}${nameKey}/`);
    }
    if (/.md$/.test(fileName)) {
      const demoMarkDownFile = fs.readFileSync(filePath);
      const content = YFM.loadFront(demoMarkDownFile).__content;
      // 生成html，ts
      generateDemo(path.join(compilePath, `${childPath}`), { name: nameKey, html: MD(content) });
      imports += `import { ${componentName(nameKey)}ZhComponent } from './${childPath}${nameKey}-zh.component';\n`;
      declarations += `\t\t${componentName(nameKey)}ZhComponent,\n`;
      routes += `{'path': '${childPath}${nameKey}', 'component': ${componentName(nameKey)}ZhComponent },\n`;
    }
  });
}

recurse(dir);

const demoModule = generateDemoModule();
fs.writeFileSync(path.join(compilePath, `docs-module.ts`), demoModule);

function nameWithoutSuffixUtil(name) {
  return name.split('.')[0];
}

function generateDemoModule() {
  const demoModuleTemplate = String(fs.readFileSync(path.resolve(__dirname, './template/module.template.ts')));
  return demoModuleTemplate
    .replace(/{{imports}}/g, imports)
    .replace(/{{router}}/g, routes)
    .replace(/{{declarations}}/g, declarations)
    .replace(/{{entryComponents}}/g, entryComponents.join(',\n'));
}

function componentName(component) {
  return camelCase(firstUppercase(component));
}

function camelCase(value) {
  return value.replace(/-\w/g, (r, i) => {
    return value.charAt(i + 1).toUpperCase();
  })
}

function firstUppercase(text) {
  return text.replace(/^[a-z]/, l => l.toUpperCase());
} 
