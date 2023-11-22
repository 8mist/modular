/*
 * This file is part of the Modular package.
 *
 * (c) Grégoire Ciles <bonjour@gregoireciles.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { describe, expect, test } from 'vitest';

import { isString } from '../../utils/is_string';

describe('Utils | IsString', () => {
  test('should return true if the value is a string', () => {
    const str = 'Welcome to Modular!';
    const emptyString = '';

    expect(isString(str)).toStrictEqual(true);
    expect(isString(emptyString)).toStrictEqual(true);
  });

  test('should return false if the value is not a string', () => {
    expect(isString({})).toStrictEqual(false);
    expect(isString(0)).toStrictEqual(false);
    expect(isString([])).toStrictEqual(false);
    expect(isString(null)).toStrictEqual(false);
    expect(isString(undefined)).toStrictEqual(false);
    expect(isString(true)).toStrictEqual(false);
    expect(isString(false)).toStrictEqual(false);
  });
});
