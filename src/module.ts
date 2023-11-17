/*
 * This file is part of the Modular package.
 *
 * (c) Grégoire Ciles <bonjour@gregoireciles.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// eslint-disable-next-line max-len
import { ModularModuleIdNotFoundException } from './exceptions/modular_module_id_not_found.exception';
import { ModularModuleNotFoundException } from './exceptions/modular_module_not_found.exception';
import type { ModuleKey, ModuleOptions } from './types';
import { generateCustomQuery } from './utils/generate_custom_query';
import { isFunction } from './utils/is_function';
import { isObject } from './utils/is_object';

/**
 * Module is a class that represents a module.
 * It gives access to the module element and the module methods.
 *
 * @example
 * ```ts
 * class Accordion extends Module {
 *   init() {
 *     // ...
 *   }
 *
 *   destroy() {
 *     // ...
 *   }
 * }
 * ```
 */
export class Module {
  /**
   * The module ID.
   * It is unique for each module instance.
   * @private
   */
  ID: number;

  /**
   * The module name.
   * @private
   */
  name: ModuleKey;

  /**
   * The module element.
   * @private
   */
  element: HTMLElement | null;

  /**
   * The module instances.
   * @private
   */
  modules: Module[];

  constructor({ ID, name, element, modules }: ModuleOptions) {
    this.ID = ID;
    this.name = name;
    this.element = element;
    this.modules = modules;
  }

  /**
   * Initialize the module.
   */
  init(): void {}

  /**
   * Destroy the module.
   */
  destroy(): void {}

  /**
   * Call a method on a module.
   */
  call(moduleName: ModuleKey, methodName: string, ...args: any[]) {
    const moduleInstances = this.modules.filter((module) => module.name === moduleName);

    if (moduleInstances && moduleInstances.length > 0) {
      moduleInstances.forEach((moduleInstance) =>
        this.#callMethod(moduleInstance, methodName, args),
      );
    } else {
      throw new ModularModuleNotFoundException(moduleName);
    }
  }

  /**
   * Call a method on a module by id.
   */
  callById(id: number, methodName: string, ...args: any[]) {
    const module = this.modules.find((m) => m.ID === id);

    if (module) {
      this.#callMethod(module, methodName, args);
    } else {
      throw new ModularModuleIdNotFoundException(id);
    }
  }

  /**
   * Find one or more elements in the DOM.
   */
  q<T extends HTMLElement | HTMLElement[]>(
    selectors?: string | undefined,
    context?: HTMLElement | undefined,
  ): T | null {
    let element = this.element;
    if (isObject(context)) {
      element = context;
    }

    if (!element) {
      return null;
    }

    const elements = Array.from(
      element.querySelectorAll(generateCustomQuery(this.name, selectors)),
    );

    if (elements && elements.length) {
      if (elements.length === 1) {
        return elements[0] as T;
      }

      return elements as T;
    }

    return null;
  }

  /**
   * Find the first parent element matching the query.
   */
  parent(query: string, context: Element): Element | undefined {
    const data = `[data-${this.name}="${query}"]`;
    let parent = context.parentNode;

    while (parent && parent !== document) {
      if ((parent as Element).matches(data)) {
        return parent as Element;
      }

      parent = parent.parentNode;
    }
  }

  /**
   * Call the method of a module instance.
   * @private
   */
  #callMethod(module: any, methodName: string, ...args: any[]): void {
    const moduleMethod = module[methodName];
    if (moduleMethod && isFunction(moduleMethod)) {
      moduleMethod.apply(this, ...args);
    }
  }
}
