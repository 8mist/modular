/*
 * This file is part of the Modular package.
 *
 * (c) Grégoire Ciles <bonjour@gregoireciles.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { describe, expect, test } from 'vitest';

import { ModularAlreadyExistsException } from '@/exceptions/modular_already_exists.exception';
// eslint-disable-next-line max-len
import { ModularModuleIdNotFoundException } from '@/exceptions/modular_module_id_not_found.exception';
import { ModularModuleNotFoundException } from '@/exceptions/modular_module_not_found.exception';
import { ModularProvideModulesException } from '@/exceptions/modular_provide_modules.exception';
import { ModularException } from '@/exceptions/modular.exception';

describe('Exception', () => {
  test('should throw a ModularException', () => {
    expect(() => {
      throw new ModularException('test');
    }).toThrow('test');
  });

  test('should throw a ModularAlreadyExistsException', () => {
    expect(() => {
      throw new ModularAlreadyExistsException('moduleTest');
    }).toThrow('Module "moduleTest" already exists.');
  });

  test('should throw a ModularModuleIdNotFoundException', () => {
    expect(() => {
      throw new ModularModuleIdNotFoundException(22);
    }).toThrow('Module with ID "22" not found.');
  });

  test('should throw a ModularModuleNotFoundException with a string', () => {
    expect(() => {
      throw new ModularModuleNotFoundException('moduleTest');
    }).toThrow('Module with name "moduleTest" not found.');
  });

  test('should throw a ModularProvideModulesException with a number', () => {
    expect(() => {
      throw new ModularProvideModulesException();
    }).toThrow('Please provide modules to the collection.');
  });
});
