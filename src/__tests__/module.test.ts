/*
 * This file is part of the Modular package.
 *
 * (c) Grégoire Ciles <bonjour@gregoireciles.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { describe, expect, test, vi } from 'vitest';

import { Module } from '../module';
import { modulesCompiled } from '../modules_compiled';

describe('Module', () => {
  test('should be able to create a module', () => {
    const element = document.createElement('div');
    element.setAttribute('data-module', 'test');
    const testModule = new Module({
      ID: 1,
      name: 'test',
      element,
    });

    expect(testModule.ID).toBe(1);
    expect(testModule.name).toBe('test');
    expect(testModule.element).toBe(element);
  });

  test('should call the bind method', () => {
    const element = document.createElement('div');
    element.setAttribute('data-module', 'test');
    const testModule = new Module({
      ID: 1,
      name: 'test',
      element,
    });

    const bindSpy = vi.spyOn(testModule, 'bind');
    testModule.bind();
    expect(bindSpy).toHaveBeenCalled();
  });

  test('should call the init method', () => {
    const element = document.createElement('div');
    element.setAttribute('data-module', 'test');
    const testModule = new Module({
      ID: 1,
      name: 'test',
      element,
    });

    const initSpy = vi.spyOn(testModule, 'init');
    testModule.init();
    expect(initSpy).toHaveBeenCalled();
  });

  test('should call the destroy method', () => {
    const element = document.createElement('div');
    element.setAttribute('data-module', 'test');
    const testModule = new Module({
      ID: 1,
      name: 'test',
      element,
    });

    const destroySpy = vi.spyOn(testModule, 'destroy');
    testModule.destroy();
    expect(destroySpy).toHaveBeenCalled();
  });

  test('should be able to call a method of another module by name', () => {
    class ButtonModule extends Module {}

    const buttonElement = document.createElement('button');
    buttonElement.setAttribute('data-module', 'button');
    const buttonModule = new ButtonModule({
      ID: 1,
      name: 'button',
      element: buttonElement,
    });

    class TestModule extends Module {
      public click(): boolean {
        return true;
      }
    }

    const element = document.createElement('div');
    element.setAttribute('data-module', 'test');
    const testModule = new TestModule({
      ID: 2,
      name: 'test',
      element,
    });

    modulesCompiled.set(buttonModule);
    modulesCompiled.set(testModule);

    const spyClick = vi.spyOn(testModule, 'click');

    buttonModule.call('test', 'click');

    expect(spyClick).toHaveBeenCalled();

    modulesCompiled.clear();
  });

  test('should throw an error if the module does not exist', () => {
    class ButtonModule extends Module {}

    const buttonElement = document.createElement('button');
    buttonElement.setAttribute('data-module', 'button');
    const buttonModule = new ButtonModule({
      ID: 1,
      name: 'button',
      element: buttonElement,
    });

    modulesCompiled.set(buttonModule);

    expect(() => {
      buttonModule.call('test', 'click');
    }).toThrow();

    modulesCompiled.clear();
  });

  test('should be able to call a method of another module by ID', () => {
    class ButtonModule extends Module {}

    const buttonElement = document.createElement('button');
    buttonElement.setAttribute('data-module', 'button');
    const buttonModule = new ButtonModule({
      ID: 1,
      name: 'button',
      element: buttonElement,
    });

    class TestModule extends Module {
      public click(): boolean {
        return true;
      }
    }

    const element = document.createElement('div');
    element.setAttribute('data-module', 'test');
    const testModule = new TestModule({
      ID: 2,
      name: 'test',
      element,
    });

    modulesCompiled.set(buttonModule);
    modulesCompiled.set(testModule);

    const spyClick = vi.spyOn(testModule, 'click');

    buttonModule.callById(2, 'click');

    expect(spyClick).toHaveBeenCalled();

    modulesCompiled.clear();
  });

  test('should throw an error if the module does not exist', () => {
    class ButtonModule extends Module {}

    const buttonElement = document.createElement('button');
    buttonElement.setAttribute('data-module', 'button');
    const buttonModule = new ButtonModule({
      ID: 1,
      name: 'button',
      element: buttonElement,
    });

    modulesCompiled.set(buttonModule);

    expect(() => {
      buttonModule.callById(2001, 'click');
    }).toThrow();

    modulesCompiled.clear();
  });

  test('should be able to find a element by the query method', () => {
    const element = document.createElement('div');
    element.setAttribute('data-module', 'test');
    element.innerHTML = '<p data-test="child">TestChild</p>';
    const testModule = new Module({
      ID: 1,
      name: 'test',
      element,
    });

    const result = testModule.q<HTMLParagraphElement>('child');
    expect(result).not.toBeNull();
    expect(result?.innerHTML).toBe('TestChild');
  });

  test('should be able to find elements by the query method', () => {
    const element = document.createElement('div');
    element.setAttribute('data-module', 'test');
    element.innerHTML = `
      <p data-test="child">TestChild 1</p>
      <p data-test="child">TestChild 2</p>
    `;
    const testModule = new Module({
      ID: 1,
      name: 'test',
      element,
    });

    const result = testModule.q<HTMLParagraphElement[]>('child');
    const res = testModule.q<HTMLElement>('child');
    expect(result).not.toBeNull();
    expect(result?.length).toBe(2);
  });

  test('should be able to return null when no element is found', () => {
    const element = document.createElement('div');
    element.setAttribute('data-module', 'test');
    const testModule = new Module({
      ID: 1,
      name: 'test',
      element,
    });

    const result = testModule.q('child');
    expect(result).toBeNull();
  });

  test('should be able to return null when element module is not defined', () => {
    const testModule = new Module({
      ID: 1,
      name: 'test',
      element: undefined as any,
    });

    const result = testModule.q('child');
    expect(result).toBeNull();
  });

  test('should be able to return an element when context is defined', () => {
    const element = document.createElement('div');
    element.setAttribute('data-module', 'test');
    const div = document.createElement('div');
    div.setAttribute('data-test', 'parent');
    const p = document.createElement('p');
    p.setAttribute('data-test', 'child');
    div.appendChild(p);
    element.appendChild(div);
    const testModule = new Module({
      ID: 1,
      name: 'test',
      element,
    });

    const result = testModule.q<HTMLParagraphElement>('child', div);
    expect(result).not.toBeNull();
    expect(result?.getAttribute('data-test')).toBe('child');
  });

  test('should be able to find the parent element', () => {
    const element = document.createElement('div');
    element.setAttribute('data-module', 'test');
    const div = document.createElement('div');
    div.setAttribute('data-test', 'test');
    const p = document.createElement('p');
    div.appendChild(p);
    element.appendChild(div);

    const testModule = new Module({
      ID: 1,
      name: 'test',
      element,
    });

    const result = testModule.parent<HTMLElement>('test', p);
    expect(result).not.toBeNull();
    expect(result?.getAttribute('data-test')).toBe('test');
  });

  test('should be able to return undefined when no parent element is found', () => {
    const element = document.createElement('div');
    element.setAttribute('data-module', 'test');
    const div = document.createElement('div');
    div.setAttribute('data-test', 'test');
    const p = document.createElement('p');
    div.appendChild(p);
    element.appendChild(div);

    const testModule = new Module({
      ID: 1,
      name: 'test',
      element,
    });

    const result = testModule.parent<HTMLElement>('undefined', p);
    expect(result).toBeUndefined();
  });

  test('should be able to set data', () => {
    const element = document.createElement('div');
    element.setAttribute('data-module', 'test');
    const testModule = new Module({
      ID: 1,
      name: 'test',
      element,
    });

    testModule.setData('test', 'test');
    expect(testModule.getData('test')).toBe('test');
  });

  test('should be able to return null when element is not defined', () => {
    const element = document.createElement('div');
    element.setAttribute('data-module', 'test');
    const testModule = new Module({
      ID: 1,
      name: 'test',
      element: undefined as any,
    });

    expect(testModule.getData('test')).toBeNull();
  });
});
