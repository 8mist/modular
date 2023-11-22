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
 * Represents a dependency injection container in the Modular package.
 *
 * The `Modular` class acts as a central manager for module instances, facilitating the creation,
 * initialization, and destruction of these modules based on the provided configuration. It manages a collection
 * of module constructors, allowing for dynamic instantiation and lifecycle management of modules.
 *
 * Key functionalities include:
 * - Registering module constructors with unique identifiers.
 * - Compiling modules: creating instances of registered modules and associating them with DOM elements.
 * - Initializing modules: invoking the `init` method on all compiled module instances.
 * - Destroying modules: invoking the `destroy` method on all compiled module instances
 * and clearing them from the collection.
 *
 * This class is integral to the framework's modular architecture, providing a robust mechanism
 * for managing module lifecycles and ensuring modularity and separation of concerns within the application.
 *
 * @example
 * ```ts
 * import { Modular } from '@gregoire.ciles/modular';
 *
 * const modular = new Modular({ modules: { 'ModuleName': ModuleConstructor } });
 * modular.init(); // Initializes all modules
 * // ... application logic ...
 * modular.destroy(); // Cleans up all modules
 * ```
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
