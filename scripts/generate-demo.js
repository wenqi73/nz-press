const path = require('path');
const fs = require('fs');
const camelCase = require('./camelcase');
const angularNonBindAble = require('./angular-nonbindable');

module.exports = function (componentPath, result) {
  const name = result.name;
  const demoTemplate = generateTemplate(result);
  fs.writeFileSync(path.join(componentPath, `${name}-zh.html`), demoTemplate.zh);
  const demoComponent = generateDemoComponent(result);
  fs.writeFileSync(path.join(componentPath, `${name}-zh.ts`), demoComponent.zh);
};

function componentName(component) {
  return camelCase(firstUppercase(component));
}

function generateComponentName(component, language) {
  return `NzDemo${componentName(component)}${language}Component`
}

function generateTemplate(result) {
  return {
    zh: wrapperDocs(angularNonBindAble(result.html))
  }
};

function generateDemoComponent(content) {
  const demoComponentTemplate = String(fs.readFileSync(path.resolve(__dirname, './template/component.template.ts')));
  const component = content.name;
  let output = demoComponentTemplate;
  output = output.replace(/{{component}}/g, component);
  let zhOutput = output;
  zhOutput = zhOutput.replace(/{{componentName}}/g, `${componentName(component)}Zh`);
  zhOutput = zhOutput.replace(/{{language}}/g, 'zh');
  return {
    zh: zhOutput
  };
}

function firstUppercase(text) {
  return text.replace(/^[a-z]/, l => l.toUpperCase());
} 

function wrapperAPI(content) {
  return `<section class="markdown api-container" ngNonBindable>${content}</section>`
}

function wrapperDocs(content) {
  return `<article class="markdown">
  <section class="markdown" ngNonBindable>${content}</section>
  </article>`
}

function wrapperAll(toc, content) {
  return `<article>${toc}${content}</article>`
}

function generateToc(language, name, demoMap) {
  let linkArray = [];
  for (const key in demoMap) {
    linkArray.push(
      {
        content: `<nz-link nzHref="#components-${name}-demo-${key}" nzTitle="${demoMap[key].meta.title[language]}"></nz-link>`,
        order  : demoMap[key].meta.order
      }
    );
  }
  linkArray.sort((pre, next) => pre.order - next.order);
  const links = linkArray.map(link => link.content).join('');
  return `
    <nz-affix class="toc-affix" [nzOffsetTop]="16">
      <nz-anchor [nzAffix]="false" nzShowInkInFixed (nzClick)="goLink($event)">
        ${links}
      </nz-anchor>
    </nz-affix>
  `;
}