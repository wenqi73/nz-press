const fs = require('fs');
const path = require('path');
const YFM = require('yaml-front-matter');
const MD = require('./marked');
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
let routes = '';
let homeRoute = '';
let menus = [];

recurse(dir);

copyFile(
  path.resolve(__dirname, './template/layout.component.html'),
  path.join(compilePath, `layout.component.html`)
);

copyFile(
  path.resolve(__dirname, './template/layout.component.ts'),
  path.join(compilePath, `layout.component.ts`)
);

// generate menu
const demoMenu = generateMenu(menus);
fs.writeFileSync(path.join(compilePath, `menu.ts`), demoMenu);


// generate module
const moduleFile = generateModule();
fs.writeFileSync(path.join(compilePath, `app.module.ts`), moduleFile);

// generate route module
const routeModule = generateRouteModule();
fs.writeFileSync(path.join(compilePath, `app-routing.module.ts`), routeModule);

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
    const destPath = path.join(compilePath, `${parentPath}`);
    const routePath = `${parentPath}${nameKey}`;
    
    // continue recursing
    if (fs.statSync(filePath).isDirectory()) {
      fs.mkdirSync(path.join(destPath, `${fileName}`));
      menuItem.push(
        {
          // link: `/docs/${parentPath}${nameKey}`,
          i18n: `${nameKey}`,
          children: [],
          language: 'zh'
        }
      );
      // 传到下一个循环中
      const parentMenu = menuItem.find(m => m.i18n === `${nameKey}`).children;
      recurse(fs.readdirSync(filePath), `${routePath}/`, parentMenu);
    } else {
      if (/.md$/.test(fileName)) {
        const mdFile = fs.readFileSync(filePath);
        const result = baseInfo(mdFile);
        // 生成html，ts
        generateDemo(destPath, { name: nameKey, ...result });

        // imports
        imports += `import { ${componentName(nameKey)}ZhComponent } from './${routePath}-zh';\n`;

        // declarations
        declarations += `\t\t${componentName(nameKey)}ZhComponent,\n`;
        
        // routes
        if (!homeRoute) homeRoute = `${routePath}`;
        routes += `
          {
            path: '${routePath}',
            component: ${componentName(nameKey)}ZhComponent
          },\n`;
  
        // nameKey作为菜单名
        menuItem.push(
          {
            link: `/${routePath}`,
            i18n: `${nameKey}`,
            language: 'zh',
            children: null
          }
        );
      }
    }
  });
}

function generateMenu(menus) {
  let str = `export const MENUS = {{menus}};`;
  return str.replace(/{{menus}}/g, JSON.stringify(menus));
}

function generateModule() {
  const moduleTemplate = String(fs.readFileSync(path.resolve(__dirname, './template/app.module.template.ts')));
  return moduleTemplate
    .replace(/{{imports}}/g, imports)
    .replace(/{{declarations}}/g, declarations)
    .replace(/{{entryComponents}}/g, entryComponents.join(',\n'));
}

function generateRouteModule() {
  const demoModuleTemplate = String(fs.readFileSync(path.resolve(__dirname, './template/app-routing.template.ts')));
  return demoModuleTemplate
    .replace(/{{imports}}/g, imports)
    .replace(/{{router}}/g, routes)
    .replace(/{{homeRoute}}/g, homeRoute)
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

function baseInfo(file) {
  const meta = YFM.loadFront(file);
  const content = meta.__content;
  delete meta.__content;
  return {
    meta   : meta,
    path   : path,
    content: MD(content),
    raw    : content
  }
}