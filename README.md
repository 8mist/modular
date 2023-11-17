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

## API

### Modular

#### `constructor(options: ModularOptions)`

Create a new instance of Modular.

##### `options`

| Name      | Type                                | Default | Description       |
| --------- | ----------------------------------- | ------- | ----------------- |
| `modules` | `Record<string, ModuleConstructor>` | `{}`    | A map of modules. |

#### `init()`

Initialize all modules.

#### `destroy()`

Destroy all modules.

#### `has(moduleName: string): boolean`

Check if a module exists.

##### `moduleName`

The name of the module. <br /> This is the value of the `data-module` attribute. <br /> For example,
if you have `<div data-module="header"></div>`, the module name is `header`.

### Module

#### `constructor(element: HTMLElement)`

Create a new instance of Module.

##### `element`

The element of the module. <br /> This is the element with the `data-module` attribute.

#### `init()`

Initialize the module. <br /> This method is called by Modular.

#### `destroy()`

Destroy the module. <br /> This method is called by Modular.

#### `call(moduleName: string, methodName: string, ...args: any[]): void`

Call a method of a module.

```html
<div>
  <button data-module="one">One</button>
  <button data-module="two">Two</button>
</div>
```

```ts
import { Modular, Module } from '@gregoire.ciles/modular';

class One extends Module {
  init(): void {
    this.el.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(): void {
    this.call('two', 'method');
  }
}

class Two extends Module {
  method(): void {
    console.log(this.name, 'method');
  }
}

const modular = new Modular({
  modules: {
    one: One,
    two: Two,
  },
});

modular.init();
```

#### `callById(id: number, methodName: string, ...args: any[]): void`

Call a method of a module by its id. <br /> This method is useful when you want to call a method of
a specific instance of a module. <br /> This is the element with the `data-module-id` attribute.
<br /> For example, if you have two instances of the same module on the same page, you can call a
method of a specific instance. <br />

```html
<div data-module="header" data-module-id="1"></div>
<div data-module="header" data-module-id="2"></div>
```

```ts
import { Module } from '@gregoire.ciles/modular';

class Header extends Module {
  init(): void {
    this.callById(1, 'method');
  }

  method(): void {
    console.log('method');
  }
}
```

#### `q<T extends HTMLElement | HTMLElement[]>(selectors?: string | undefined, context?: HTMLElement | undefined): T | null`

Get the first element that matches the selectors.

```html
<div data-module="header">
  <div class="logo" data-header="logo"></div>
</div>
```

```ts
import { Module } from '@gregoire.ciles/modular';

class Header extends Module {
  init(): void {
    const logo = this.q<HTMLElement>('logo');
  }
}
```

You can also add native selectors like `.`, `#`, etc.

```html
<div data-module="header">
  <button class="profile" data-header="button"></button>
  <button class="logout" data-header="button"></button>
</div>
```

```ts
import { Module } from '@gregoire.ciles/modular';

class Header extends Module {
  init(): void {
    const profileButton = this.q<HTMLElement>('button.profile');
  }
}
```

#### `parent(query: string, context: Element): Element | undefined`

Find the first parent element matching the query.

```html
<div data-module="header">
  <div data-header="wrapper">
    <button data-header="item">Item</button>
  </div>
</div>
```

```ts
import { Module } from '@gregoire.ciles/modular';

class Header extends Module {
  init(): void {
    const item = this.q<HTMLElement>('item');
    const parentItem = this.parent('wrapper', item);
  }
}
```

## Credits

[© Grégoire Ciles](https://github.com/GregoireCiles)
