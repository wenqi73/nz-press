const fs = require('fs');
const path = require('path');
const YFM = require('yaml-front-matter');
const MD = require('./marked');
const generateDemo = require('./generate-demo');
const log = require('./utils/log')

/**
 * @param sourcePath md file path
 * @param compilePath app path
 */
module.exports = function(sourcePath, compilePath) {
  if (!fs.statSync(compilePath).isDirectory()) {
    log.error('can not find the application path');
    return;
  }

  let dir
  try {
    dir = fs.readdirSync(sourcePath);
  } catch(err) {
    log.error('docs path is not valid')
    return;
  }
  
  let imports = '';
  let declarations = '';
  let entryComponents = [];
  let routes = '';
  let homeRoute = '';
  let menus = [];
  let locales = [];

  let config;
  let hasConfig = false;

  try {
    config = require(path.join(sourcePath, '.nzpress', 'config.js'));
    hasConfig = true;
  } catch (err) {
    config = require(path.join(compilePath, `../assets/default-config.js`));
    hasConfig = false;
    log.info('There is no config.js, automatically use the default config')
  } finally {
    locales = Object.keys(config.locales);
    fs.writeFileSync(path.join(compilePath, `../assets/config.js`), `module.exports = ${JSON.stringify(config)}`);
  }

  /**
   * pick the locals directory
   */
  for (let i = 0; i < dir.length; i++) {
    const name = dir[i];
    if (locales.indexOf(`/${name}`) >= 0) {
      dir.splice(i, 1);
      i--;
      fs.mkdirSync(path.join(compilePath, name));
      recurse(fs.readdirSync(path.join(sourcePath, name)), `${name}/`, null, name);
    }
  }

  // separate
  recurse(dir);

  if (hasConfig) {
    // reset menus
    const configMenus = [];
    locales.forEach(l => {
      const sidebar = config.locales[l].sidebar || [];
      // set language
      sidebar.forEach(s => s.language = l.replace(/\//g, ''));
      // generate menu
      configMenus.push(...sidebar);
    })
    if (configMenus.length > 0) menus = configMenus;
  }

  if (menus.length > 0) {
    homeRoute = menus[0].link;
  }

  if (config.home) {
    homeRoute = config.home
  }

  const menuFile = generateMenu(menus);
  fs.writeFileSync(path.join(compilePath, `../assets/menus.ts`), menuFile);

  // generate module
  const moduleFile = generateModule();
  fs.writeFileSync(path.join(compilePath, `app.module.ts`), moduleFile);

  // generate route module
  const routeModule = generateRouteModule();
  fs.writeFileSync(path.join(compilePath, `app-routing.module.ts`), routeModule);

  /**
   * 遍历每个文件
   * @param {array} dir 目录
   * @param {string} parentPath 父级路径
   * @param {array} menuItem 左侧菜单
   * @param {string} language 语言
   */
  function recurse(dir, parentPath, menuItem, language) {
    if (!parentPath) parentPath = '';
    if (!menuItem) menuItem = menus;
    if (!language) language = '';
    dir.forEach(fileName => {
      if (fileName.match(/^\./)) return;
      const nameKey = nameWithoutSuffixUtil(fileName);
      const filePath = path.join(sourcePath, `${parentPath}${fileName}`);
      const destPath = path.join(compilePath, `${parentPath}`);
      const routePath = `${parentPath}${nameKey}`;
      // continue recursing
      if (fs.statSync(filePath).isDirectory()) {
        fs.mkdirSync(path.join(destPath, `${fileName}`));
        menuItem.push({
          title: `${nameKey}`,
          children: [],
          language
        });
        // sub-directory
        const parentMenu = menuItem.find(m => m.title === `${nameKey}`).children;
        recurse(fs.readdirSync(filePath), `${routePath}/`, parentMenu, language);
      } else {
        if (/.md$/.test(fileName)) {
          const mdFile = fs.readFileSync(filePath);
          const result = baseInfo(mdFile, filePath);
          const nameAndLanguage = nameKey + language;
          // html，ts
          generateDemo(destPath, {
            name: nameKey,
            language,
            ...result
          })

          // imports
          imports += `import { ${componentName(nameAndLanguage)}Component } from './${routePath}';\n`

          // declarations
          declarations += `\t\t${componentName(nameAndLanguage)}Component,\n`

          // routes
          routes += `
          {
            path: '${routePath}',
            component: ${componentName(nameAndLanguage)}Component
          },\n`;

          menuItem.push({
            link: `/${routePath}`,
            title: result.title,
            language,
            children: null
          });
        }
      }
    });
  }

  function generateMenu(menus) {
    const menuTemplate = String(fs.readFileSync(path.resolve(__dirname, './template/menus.ts')));
    return menuTemplate.replace(/{{menus}}/g, JSON.stringify(menus));
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

function baseInfo(file, filePath) {
  const meta = YFM.loadFront(file);
  const content = meta.__content;
  let title = '无标题';
  delete meta.__content;
  try {
    title = content.match(/# (.*)/)[1];
  } catch (error) {
    console.warn(filePath, '缺少标题');
  }
  return {
    meta: meta,
    path: path,
    content: MD(content),
    raw: content,
    title
  }
}