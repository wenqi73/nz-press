const path = require('path');
const fs = require('fs');
const camelCase = require('./camelcase');
const angularNonBindAble = require('./angular-nonbindable');

module.exports = function (componentPath, result) {
  const name = result.name;
  const language = result.language;
  const demoTemplate = generateTemplate(result);
  fs.writeFileSync(path.join(componentPath, `${name}.html`), demoTemplate.zh);
  const demoComponent = generateDemoComponent(result);
  fs.writeFileSync(path.join(componentPath, `${name}.ts`), demoComponent.zh);
};

function componentName(component) {
  return camelCase(firstUppercase(component));
}

function generateTemplate(result) {
  return {
    zh: wrapperDocs(generateToc(result.meta, result.raw), angularNonBindAble(result.content))
  }
};

function generateDemoComponent(content) {
  const demoComponentTemplate = String(fs.readFileSync(path.resolve(__dirname, './template/component.template.ts')))
  const component = content.name
  let output = demoComponentTemplate
  output = output.replace(/{{component}}/g, component)
  let zhOutput = output
  zhOutput = zhOutput.replace(/{{componentName}}/g, `${componentName(component + content.language)}`)
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

function wrapperDocs(toc, content) {
  return `<article class="markdown">${toc}
  <section class="markdown" ngNonBindable>${content}</section>
  </article>`
}

function wrapperAll(toc, content) {
  return `<article>${toc}${content}</article>`
}

function generateToc(meta, raw) {
  if (meta.timeline) return '';
  const remark = require('remark')();
  const ast = remark.parse(raw);
  let links = '';
  for (let i = 0; i < ast.children.length; i++) {
    const child = ast.children[i];
    if (child.type === 'heading' && child.depth === 2) {
      try { 
        const text = child.children[0].value
        const lowerText = text.toLowerCase().replace(/ /g, '-').replace(/\./g, '-').replace(/\?/g,'')
        links += `<nz-link nzHref="#${lowerText}" nzTitle="${text}"></nz-link>`
      } catch(err) { console.log('generateToc: ', err) }
    }
  }
  return `<nz-affix class="toc-affix" [nzOffsetTop]="16">
    <nz-anchor [nzAffix]="false" nzShowInkInFixed (nzClick)="goLink($event)">
      ${links}
    </nz-anchor>
  </nz-affix>`;
}