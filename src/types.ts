/*
 * This file is part of the Modular package.
 *
 * (c) Grégoire Ciles <bonjour@gregoireciles.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Module } from '@/module';

/**
 * Shape of a class constructor
 */
export type Constructor<T> = new (...args: any[]) => T;

/**
 * Accepted values for the collectable key
 */
export type ModuleKey = string;

/**
 * Options accepted by the Modular class
 */
export type ModularOptions = {
  modules: {
    [key: ModuleKey]: Constructor<Module>;
  };
};

/**
 * Shape of the registered collectables
 */
export type ModuleCollection = Map<ModuleKey, Constructor<Module>>;

/**
 * Shape of the registered collectables compiled
 */
export type ModuleCollectionCompiled = Map<ModuleKey, Module>;

/**
 * Variables accepted by the getErrorMessage function
 */
export type ErrorVariables = {
  [key: string]: any;
};

/**
 * Options accepted by the module class
 */
export type ModuleOptions = {
  ID: number;
  name: ModuleKey;
  element: HTMLElement | null;
  modules: Module[];
};
