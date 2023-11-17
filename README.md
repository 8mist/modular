<h1 align="center">Modular</h1>
<p align="center">A simple and lightweight module system for JavaScript.</p>

## Fast Track ⏱️

Discover the library in **less than 5 minutes**.

Install [Node.js](https://nodejs.org/en/download/) and install SplitText using your favorite package
manager.

```bash
npm install @gregoire.ciles/modular
```

```bash
yarn add @gregoire.ciles/modular
```

```bash
pnpm add @gregoire.ciles/modular
```

Then, open your favorite code editor and create new files `index.html` and `index.ts`.

```html
<header data-module="header"></header>
```

```ts
import { Modular, Module } from '@gregoire.ciles/modular';

class Header extends Module {
  init(): void {
    console.log(this);
  }
}

const modular = new Modular({
  modules: {
    header: Header,
  },
});

modular.init();
```

Finally, open `index.html` in your browser and open the console to see the result.

## TypeScript Support

Modular is written in TypeScript and provides type definitions.

> **Note:** TypeScript is not required to use Modular.

> **💡 TIP:** Type annotations are very useful and help your IDE understand the type provided by
> Modular. <br /> The IDEs (VSCode, WebStorm, etc.) will be able to provide you with autocompletion
> and type hints.

## Credits

[© Grégoire Ciles](https://github.com/GregoireCiles)
