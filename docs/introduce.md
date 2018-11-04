# Quick Start

NzPress can generate static HTML through your Markdown file, it is powered by angular and inspiring from NG-ZORRO and VuePress.

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