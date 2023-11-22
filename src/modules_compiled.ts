/*
 * This file is part of the Modular package.
 *
 * (c) Grégoire Ciles <bonjour@gregoireciles.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ModuleCompiled, ModuleKey } from './types';

/**
 * Class representing a collection of compiled modules.
 * It is used to store all compiled modules.
 */
class ModulesCompiled {
  /**
   * The array of compiled modules.
   *
   * @type {import("./types").ModuleCompiled[]}
   * @private
   */
  #modulesCompiled: ModuleCompiled[] = [];

  /**
   * Gets the array of compiled modules.
   *
   * @returns {import("./types").ModuleCompiled[]} An array of compiled module instances.
   */
  get modules(): ModuleCompiled[] {
    return this.#modulesCompiled;
  }

  /**
   * Adds a new module instance to the collection.
   *
   * @param {import("./types").ModuleCompiled} moduleInstance - The module instance to be added.
   */
  add(moduleInstance: ModuleCompiled): void {
    this.#modulesCompiled.push(moduleInstance);
  }

  /**
   * Clears all module instances from the collection.
   */
  clear(): void {
    this.#modulesCompiled = [];
  }

  /**
   * Filters the collection of modules by a given module name.
   *
   * @param {import("./types").ModuleKey} moduleName - The name of the module to filter by.
   * @returns {import("./types").ModuleCompiled[]} An array of compiled modules that match the given name.
   */
  filterByName(moduleName: ModuleKey): ModuleCompiled[] {
    return this.#modulesCompiled.filter((compiledModule) => compiledModule.name === moduleName);
  }

  /**
   * Retrieves a module instance by its ID.
   *
   * @param {number} id - The ID of the module to retrieve.
   * @returns {import("./types").ModuleCompiled | undefined} The module instance with the given ID,
   * or undefined if not found.
   */
  getById(id: number): ModuleCompiled | undefined {
    return this.#modulesCompiled.find((compiledModule) => compiledModule.ID === id);
  }
}

const modulesCompiled = new ModulesCompiled();
export { modulesCompiled };
