/*
 * This file is part of the Modular package.
 *
 * (c) Grégoire Ciles <bonjour@gregoireciles.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ModularAlreadyExistsException } from './exceptions/modular_already_exists.exception';
import { ModularProvideModulesException } from './exceptions/modular_provide_modules.exception';
import { Module } from './module';
import { modulesCompiled } from './modules_compiled';
import type { Constructor, ModularOptions, ModuleCollection } from './types';

/**
 * Container is a dependency injection container.
 *
 * It gives access to object instances (services).
 * Services and parameters are simple key/pair stores.
 */
export class Modular {
  /**
   * Registered modules as constructor.
   */
  #collection: ModuleCollection = new Map();

  /**
   * A unique ID for each module instance.
   */
  #moduleID: number = 0;

  constructor(options: ModularOptions) {
    if (!options?.modules) {
      throw new ModularProvideModulesException();
    }

    for (const name of Object.keys(options.modules)) {
      this.set(name, options.modules[name]);
    }

    this.compile();
  }

  /**
   * Register a module as a value in the collection.
   */
  set(moduleName: string, moduleValue: Constructor<Module>): void {
    if (!this.has(moduleName)) {
      this.#collection.set(moduleName, moduleValue);
    } else {
      throw new ModularAlreadyExistsException(moduleName);
    }
  }

  /**
   * Find if the collection has a module registered with the given name.
   */
  has(moduleName: string): boolean {
    return this.#collection.has(moduleName);
  }

  /**
   * Call the init method on all modules.
   */
  init(): void {
    if (modulesCompiled.modules.length === 0) {
      return;
    }

    modulesCompiled.modules.forEach((moduleCompiled) => {
      moduleCompiled.bind();
      moduleCompiled.init();
    });
  }

  /**
   * Call the destroy method on all modules.
   */
  destroy(): void {
    if (modulesCompiled.modules.length === 0) {
      return;
    }

    modulesCompiled.modules.forEach((moduleCompiled) => {
      moduleCompiled.destroy();
    });
    modulesCompiled.clear();
  }

  /**
   * Compile the collection.
   * This method should be called after all modules are registered.
   * It will create instances of all modules and store them in a collection.
   */
  compile(): void {
    for (const [moduleName, moduleConstructor] of this.#collection) {
      const elements = document.querySelectorAll(`[data-module="${moduleName}"]`);

      if (elements && elements.length > 0) {
        elements.forEach((element) => {
          element.setAttribute('data-module-id', this.#moduleID.toString());

          const moduleInstance = new moduleConstructor({
            ID: this.#moduleID,
            name: moduleName,
            element,
          });

          modulesCompiled.add(moduleInstance);
          this.#moduleID++;
        });
      }
    }
  }
}
