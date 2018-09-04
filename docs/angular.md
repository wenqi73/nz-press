# Angular 环境

### 组件引入
- ng-zorro尚不支持通过自定义主题，采用简单粗暴的方法：把ng-zorro/src/components复制到本地src目录中，改名为ng-zorro-antd

```tree
src
|--app
|--ng-zorro-antd
|  |--affix
|  |--alert
...
|  |--ng-zorro-antd.module.ts
```

- 新增依赖包，然后执行npm install --production：

```typescript
dependencies: {
  "@angular/cdk": "5.0.0",
  "moment": "^2.18.1",
  "tslib": "^1.7.1"
}
```

- 修改app-module.ts

```js
import { NgZorroAntdModule } from '../ng-zorro-antd/ng-zorro-antd.module';
```

- 将侧边布局复制到app.component.html
- 执行npm run start，查看localhost:4200
- 执行ng build
- 修改dist/index.html

```html
<!--  base标签为页面上的所有链接规定默认地址或默认目标 -->
<base href="./">
```

