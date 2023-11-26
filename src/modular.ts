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
import type { Constructor, ModularOptions, ModuleCollection, ModuleName } from './types';

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
   * A Map to store registered modules with their names as keys.
   *
   * @private
   * @type {ModuleCollection}
   */
  #collection: ModuleCollection = new Map();

  /**
   * An internal counter to generate unique IDs for each module instance.
   *
   * @private
   * @type {number}
   */
  #moduleID: number = 0;

  /**
   * Creates a Modular instance and registers provided modules.
   *
   * @param {ModularOptions} options - Configuration options for the modular system.
   * @throws {ModularProvideModulesException} If no modules are provided in options.
   */
  constructor(options: ModularOptions) {
    if (!options?.modules) {
      throw new ModularProvideModulesException();
    }

    for (const name of Object.keys(options.modules)) {
      this.set(name, options.modules[name]);
    }

    this.#compile();
  }

  /**
   * Registers a module in the collection.
   *
   * @param {ModuleName} moduleName - The name to register the module under.
   * @param {Constructor<Module>} moduleValue - The constructor of the module.
   * @throws {ModularAlreadyExistsException} If a module with the same name already exists.
   */
  set(moduleName: ModuleName, moduleValue: Constructor<Module>): void {
    if (!this.has(moduleName)) {
      this.#collection.set(moduleName, moduleValue);
    } else {
      throw new ModularAlreadyExistsException(moduleName);
    }
  }

  /**
   * Find if the collection has a module registered with the given name.
   *
   * @param {ModuleName} moduleName - The name of the module to check.
   * @returns {boolean} True if the module is registered, false otherwise.
   */
  has(moduleName: ModuleName): boolean {
    return this.#collection.has(moduleName);
  }

  /**
   * Initializes all registered modules.
   *
   * Calls the init and bind methods on each modules instance.
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
   * Destroys all initialized modules.
   *
   * Calls the destroy method on each module instance.
   */
  destroy(): void {
    if (modulesCompiled.modules.length === 0) {
      return;
    }

    modulesCompiled.modules.forEach((moduleCompiled) => moduleCompiled.destroy());
    modulesCompiled.clear();
  }

  /**
   * Compile the collection of modules.
   *
   * Creates instances of all registered modules and stores them in a collection.
   *
   * @private
   */
  #compile(): void {
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

          modulesCompiled.set(moduleInstance);
          this.#moduleID++;
        });
      }
    }
  }
}
