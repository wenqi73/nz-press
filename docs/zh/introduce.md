# 快速上手

Nzpress 能够通过 Markdown 文件来生成静态网页，它以 angular 为底层，灵感来自于 NG-ZORRO 以及 vuepress。

```bash
npm install @angular/cli@latest -g

npm install -g nz-press

# Create a markdown file
mkdir docs && cd docs
echo '# Hello NzPress' > README.md

# Start writing
nzpress dev       

# Build to static files
nzpress build
```