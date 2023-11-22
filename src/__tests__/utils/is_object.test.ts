/*
 * This file is part of the Modular package.
 *
 * (c) Grégoire Ciles <bonjour@gregoireciles.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { describe, expect, test } from 'vitest';

import { isObject } from '../../utils/is_object';

describe('Utils | IsObject', () => {
  test('should return true if the value is an object', () => {
    const modules = { test: {} };
    const emptyObject = {};

    expect(isObject(modules)).toStrictEqual(true);
    expect(isObject(emptyObject)).toStrictEqual(true);
  });

  test('should return false if the value is not an object', () => {
    expect(isObject('')).toStrictEqual(false);
    expect(isObject(0)).toStrictEqual(false);
    expect(isObject([])).toStrictEqual(false);
    expect(isObject(null)).toStrictEqual(false);
    expect(isObject(undefined)).toStrictEqual(false);
    expect(isObject(true)).toStrictEqual(false);
    expect(isObject(false)).toStrictEqual(false);
  });
});
