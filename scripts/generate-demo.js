const path = require('path');
const fs = require('fs');
const camelCase = require('./camelcase');
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
    zh: result.html
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

function wrapperHeader(title, whenToUse, language, example) {
  if (example) {
    return `<section class="markdown">
	${title}
	<section class="markdown" ngNonBindable>
		${whenToUse}
	</section>
	<h2>
		<span>${language === 'zh' ? '代码演示' : 'Examples'}</span>
		<i class="anticon anticon-appstore code-box-expand-trigger" title="${language === 'zh' ? '展开全部代码' : 'expand all code'}" (click)="expandAllCode()"></i>
	</h2>
</section>${example}`
  } else {
    return `<section class="markdown">
	${title}
	<section class="markdown">
		${whenToUse}
	</section></section>`
  }
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