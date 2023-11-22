/*
 * This file is part of the Modular package.
 *
 * (c) Grégoire Ciles <bonjour@gregoireciles.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { afterEach, describe, expect, test } from 'vitest';

import { Module } from '../module';
import { modulesCompiled } from '../modules_compiled';

describe('ModulesCompiled', () => {
  afterEach(() => {
    modulesCompiled.clear();
  });

  test('should be able to add a module instance', () => {
    class TestModule extends Module {}

    const moduleInstance = new TestModule({
      ID: 1,
      name: 'test',
      element: document.createElement('div'),
    });

    modulesCompiled.add(moduleInstance);

    expect(modulesCompiled.modules).toContain(moduleInstance);
    expect(modulesCompiled.modules.length).toBe(1);
  });

  test('should be able to clear all module instances', () => {
    class TestModule extends Module {}

    const moduleInstance = new TestModule({
      ID: 1,
      name: 'test',
      element: document.createElement('div'),
    });

    modulesCompiled.add(moduleInstance);
    modulesCompiled.clear();

    expect(modulesCompiled.modules).not.toContain(moduleInstance);
    expect(modulesCompiled.modules.length).toBe(0);
  });

  test('should be able to filter modules by name', () => {
    class TestModule extends Module {}

    const moduleInstance1 = new TestModule({
      ID: 1,
      name: 'test',
      element: document.createElement('div'),
    });

    const moduleInstance2 = new TestModule({
      ID: 2,
      name: 'test-2',
      element: document.createElement('div'),
    });

    modulesCompiled.add(moduleInstance1);
    modulesCompiled.add(moduleInstance2);

    expect(modulesCompiled.filterByName('test')).toContain(moduleInstance1);
    expect(modulesCompiled.filterByName('test').length).toBe(1);
  });

  test('should be able to retrieve a module by ID', () => {
    class TestModule extends Module {}

    const moduleInstance1 = new TestModule({
      ID: 1,
      name: 'test',
      element: document.createElement('div'),
    });

    const moduleInstance2 = new TestModule({
      ID: 2,
      name: 'test',
      element: document.createElement('div'),
    });

    modulesCompiled.add(moduleInstance1);
    modulesCompiled.add(moduleInstance2);

    expect(modulesCompiled.getById(1)).toBe(moduleInstance1);
    expect(modulesCompiled.getById(2)).toBe(moduleInstance2);
  });
});
