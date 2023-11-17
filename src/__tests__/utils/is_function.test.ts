/*
 * This file is part of the Modular package.
 *
 * (c) Grégoire Ciles <bonjour@gregoireciles.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { describe, expect, test } from 'vitest';

import { isFunction } from '@/utils/is_function';

describe('Utils | IsFunction', () => {
  test('should return true if the value is a function', () => {
    const fn = () => {};
    const fn2 = function () {};

    expect(isFunction(fn)).toStrictEqual(true);
    expect(isFunction(fn2)).toStrictEqual(true);
  });

  test('should return false if the value is not a function', () => {
    expect(isFunction('')).toStrictEqual(false);
    expect(isFunction(0)).toStrictEqual(false);
    expect(isFunction([])).toStrictEqual(false);
    expect(isFunction(null)).toStrictEqual(false);
    expect(isFunction(undefined)).toStrictEqual(false);
    expect(isFunction(true)).toStrictEqual(false);
    expect(isFunction(false)).toStrictEqual(false);
  });
});
