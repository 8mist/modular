/*
 * This file is part of the Modular package.
 *
 * (c) Grégoire Ciles <bonjour@gregoireciles.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { describe, expect, test } from 'vitest';

import { isElement } from '../../utils/is_element';

describe('Utils | IsElement', () => {
  test('should return true if the value is an element', () => {
    const element = document.createElement('div');
    const elementParagraph = document.createElement('p');
    const elementSpan = document.createElement('span');
    const elementAnchor = document.createElement('a');

    expect(isElement(element)).toStrictEqual(true);
    expect(isElement(elementParagraph)).toStrictEqual(true);
    expect(isElement(elementSpan)).toStrictEqual(true);
    expect(isElement(elementAnchor)).toStrictEqual(true);
  });

  test('should return false if the value is not an element', () => {
    expect(isElement({})).toStrictEqual(false);
    expect(isElement('')).toStrictEqual(false);
    expect(isElement(0)).toStrictEqual(false);
    expect(isElement([])).toStrictEqual(false);
    expect(isElement(null)).toStrictEqual(false);
    expect(isElement(undefined)).toStrictEqual(false);
    expect(isElement(true)).toStrictEqual(false);
    expect(isElement(false)).toStrictEqual(false);
  });
});
