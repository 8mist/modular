/*
 * This file is part of the Modular package.
 *
 * (c) Grégoire Ciles <bonjour@gregoireciles.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { describe, expect, test } from 'vitest';

import { ErrorCodes } from '@/errors/errors.enum';
import { getErrorMessage } from '@/errors/get_error_message';

describe('Errors', () => {
  test('should get an error message', () => {
    const errorMessage = getErrorMessage(ErrorCodes.PROVIDE_MODULES);
    expect(errorMessage).toStrictEqual('Please provide modules to the collection.');
  });

  test('should get an error message with variables', () => {
    const errorMessage = getErrorMessage(ErrorCodes.MODULE_ALREADY_EXISTS, {
      moduleName: 'test',
    });
    expect(errorMessage).toStrictEqual('Module "test" already exists.');
  });
});
