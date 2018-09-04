const fs = require('fs');
const path = require('path');
const YFM = require('yaml-front-matter');
const MD = require('marked');
const generateDemo = require('./generate-demo');

// md文件路径
const sourcePath = path.join(process.argv[2]);
// 目标文件路径
const compilePath = path.join(process.argv[3]);

if (!fs.statSync(compilePath).isDirectory()) { console.log('can not find'); }

const dir = fs.readdirSync(sourcePath);
let imports = '';
let declarations = '';
let entryComponents = [];
let routes = ``;
let menus = [];

/**
 * 遍历每个文件
 * @param {*} dir 目录
 * @param {*} parentPath 父级路径
 */
function recurse(dir, parentPath, menuItem) {
  if (!parentPath) parentPath = '';
  if (!menuItem) menuItem = menus;
  dir.forEach(fileName => {
    const nameKey = nameWithoutSuffixUtil(fileName);
    const filePath = path.join(sourcePath, `${parentPath}${fileName}`);
    // 继续遍历目录
    if (fs.statSync(filePath).isDirectory()) {
      menuItem.push(
        {
          // link: `/docs/${parentPath}${nameKey}`,
          i18n: `${nameKey}`,
          children: [],
          language: 'zh'
        }
      );
      // 传到下一个循环中
      menuItem = menuItem.find(m => m.i18n === `${nameKey}`).children;
      recurse(fs.readdirSync(filePath), `${parentPath}${nameKey}/`, menuItem);
    }
    if (/.md$/.test(fileName)) {
      const demoMarkDownFile = fs.readFileSync(filePath);
      const content = YFM.loadFront(demoMarkDownFile).__content;
      // 生成html，ts
      generateDemo(path.join(compilePath, `${parentPath}`), { name: nameKey, html: MD(content) });
      // imports
      imports += `import { ${componentName(nameKey)}ZhComponent } from './${parentPath}${nameKey}-zh';\n`;
      // declarations
      declarations += `\t\t${componentName(nameKey)}ZhComponent,\n`;
      // routes
      routes += `
        {
          path: '${parentPath}${nameKey}',
          component: ${componentName(nameKey)}ZhComponent
        },\n`;

      // nameKey作为菜单名
      menuItem.push(
        {
          link: `/docs/${parentPath}${nameKey}`,
          i18n: `${nameKey}`,
          language: 'zh',
          children: null
        }
      );
        // {
        //   link: '/docs/${parentPath}${nameKey}',
        //   i18n: ${nameKey},
        //   children: []
        // },\n`;
    }
  });
}

recurse(dir);
copyFile(
  path.resolve(__dirname, './template/layout.component.html'),
  path.join(compilePath, `layout.component.html`)
);

copyFile(
  path.resolve(__dirname, './template/layout.component.ts'),
  path.join(compilePath, `layout.component.ts`)
);

// 生成menu
const demoMenu = generateDemoMenu(menus);
fs.writeFileSync(path.join(compilePath, `menu.ts`), demoMenu);

// 生成module
const demoModule = generateDemoModule();imports
fs.writeFileSync(path.join(compilePath, `docs.module.ts`), demoModule);

function generateDemoMenu(menus) {
  let str = `export const MENUS = {{menus}};`;
  return str.replace(/{{menus}}/g, JSON.stringify(menus));
}

function generateDemoModule() {
  const demoModuleTemplate = String(fs.readFileSync(path.resolve(__dirname, './template/module.template.ts')));
  return demoModuleTemplate
    .replace(/{{imports}}/g, imports)
    .replace(/{{router}}/g, routes)
    .replace(/{{declarations}}/g, declarations)
    .replace(/{{entryComponents}}/g, entryComponents.join(',\n'));
}

function nameWithoutSuffixUtil(name) {
  return name.split('.')[0];
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

function copyFile(sourceFile, destPath) {
  const readStream = fs.createReadStream(sourceFile);
  const writeStream = fs.createWriteStream(destPath);
  readStream.pipe(writeStream);
}