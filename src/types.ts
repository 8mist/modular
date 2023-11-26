/*
 * This file is part of the Modular package.
 *
 * (c) Grégoire Ciles <bonjour@gregoireciles.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Module } from './module';

/**
 * Shape of a class constructor.
 */
export type Constructor<T> = new (...args: any[]) => T;

/**
 * Accepted values for the module name.
 */
export type ModuleName = string;

/**
 * Options accepted by the Modular class.
 */
export type ModularOptions = {
  modules: {
    [name: ModuleName]: Constructor<Module>;
  };
};

/**
 * Shape of the registered collectables.
 */
export type ModuleCollection = Map<ModuleName, Constructor<Module>>;

/**
 * Shape of the registered collectables compiled.
 */
export type ModuleCollectionCompiled = Map<ModuleName, Module>;

/**
 * Shape of the module compiled.
 */
export type ModuleCompiled = Module;

/**
 * Options accepted by the module class.
 */
export type ModuleOptions<TElement> = {
  ID: number;
  name: ModuleName;
  element: TElement;
};

/**
 * Variables accepted by the getErrorMessage function.
 */
export type ErrorVariables = {
  [key: string]: any;
};
