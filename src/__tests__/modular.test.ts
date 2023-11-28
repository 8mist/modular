/*
 * This file is part of the Modular package.
 *
 * (c) Grégoire Ciles <bonjour@gregoireciles.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { describe, expect, test, vi } from 'vitest';

import { Modular } from '../modular';
import { Module } from '../module';
import { modulesCompiled } from '../modules_compiled';

describe('Module', () => {
  test('should throw an error if no modules are provided', () => {
    expect(() => {
      new Modular({} as any);
    }).toThrowError('Please provide modules to the collection.');
  });

  test('should be able to find a module if it registered', () => {
    class TestModule extends Module {}

    const modular = new Modular({
      modules: {
        test: TestModule,
      },
    });

    expect(modular.has('test')).toStrictEqual(true);
  });

  test('should not be able to find a module if it is not registered', () => {
    const modular = new Modular({
      modules: {},
    });

    expect(modular.has('test')).toStrictEqual(false);
  });

  test('should be able to register a module', () => {
    class TestModule extends Module {}

    const modular = new Modular({
      modules: {},
    });

    modular.set('test', TestModule);

    expect(modular.has('test')).toStrictEqual(true);
  });

  test('should be able to throw an error if a module is already registered', () => {
    class TestModule extends Module {}

    const modular = new Modular({
      modules: {
        test: TestModule,
      },
    });

    expect(() => {
      modular.set('test', TestModule);
    }).toThrowError('Module "test" already exists.');
  });

  test('should be able to create a module instance if element exists in DOM', () => {
    class TestModule extends Module {}

    const element = document.createElement('div');
    element.setAttribute('data-module', 'test');
    global.document.body.appendChild(element);

    new Modular({
      modules: {
        test: TestModule,
      },
    });

    expect(modulesCompiled.modules.length).toStrictEqual(1);
    expect(modulesCompiled.modules[0]).toBeInstanceOf(TestModule);
    expect(modulesCompiled.modules[0].element).toStrictEqual(element);

    global.document.body.removeChild(element);
  });

  test('should be able to call init and bind methods', () => {
    class TestModule extends Module {
      public init(): void {}

      public bind(): void {
        this.setData('test', 'init');
      }
    }

    const initSptOn = vi.spyOn(TestModule.prototype, 'init');
    const bindSpyOn = vi.spyOn(TestModule.prototype, 'bind');

    const element = document.createElement('div');
    element.setAttribute('data-module', 'test');
    global.document.body.appendChild(element);

    const modular = new Modular({
      modules: {
        test: TestModule,
      },
    });

    modular.init();

    expect(element.getAttribute('data-test')).toStrictEqual('init');
    expect(initSptOn).toHaveBeenCalled();
    expect(bindSpyOn).toHaveBeenCalled();

    modular.destroy();
    global.document.body.removeChild(element);
  });

  test('should not be able to call init and bind methods if element does not exist in DOM', () => {
    class TestModule extends Module {
      public init(): void {}

      public bind(): void {}
    }

    const initSptOn = vi.spyOn(TestModule.prototype, 'init');
    const bindSpyOn = vi.spyOn(TestModule.prototype, 'bind');

    const modular = new Modular({
      modules: {
        test: TestModule,
      },
    });

    modular.init();

    expect(initSptOn).not.toHaveBeenCalled();
    expect(bindSpyOn).not.toHaveBeenCalled();

    modular.destroy();
  });

  test('should be able to call destroy method', () => {
    class TestModule extends Module {
      public destroy(): void {
        this.setData('test', 'destroy');
      }
    }

    const destroySpyOn = vi.spyOn(TestModule.prototype, 'destroy');

    const element = document.createElement('div');
    element.setAttribute('data-module', 'test');
    global.document.body.appendChild(element);

    const modular = new Modular({
      modules: {
        test: TestModule,
      },
    });

    modular.init();
    modular.destroy();

    expect(element.getAttribute('data-test')).toStrictEqual('destroy');
    expect(destroySpyOn).toHaveBeenCalled();

    modular.destroy();
    global.document.body.removeChild(element);
  });

  test('should not be able to call destroy method if element does not exist in DOM', () => {
    class TestModule extends Module {
      public destroy(): void {}
    }

    const destroySpyOn = vi.spyOn(TestModule.prototype, 'destroy');

    const modular = new Modular({
      modules: {
        test: TestModule,
      },
    });

    modular.init();
    modular.destroy();

    expect(destroySpyOn).not.toHaveBeenCalled();
  });
});
