/*
 * This file is part of the Modular package.
 *
 * (c) Grégoire Ciles <bonjour@gregoireciles.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { describe, expect, test } from 'vitest';

import { generateCustomQuery } from '../../utils/generate_custom_query';

describe('generateCustomQuery', () => {
  test('should generate a query `[data-module-test]`', () => {
    const query = generateCustomQuery('module-test');
    expect(query).toStrictEqual('[data-module-test]');
  });

  test('should generate a query `[data-module-test="sample"]`', () => {
    const query = generateCustomQuery('module-test', 'sample');
    expect(query).toStrictEqual('[data-module-test="sample"]');
  });

  test('should generate a query `[data-module-test="sample"].is-open`', () => {
    const query = generateCustomQuery('module-test', 'sample.is-open');
    expect(query).toStrictEqual('[data-module-test="sample"].is-open');
  });

  test('should generate a query `[data-module-test="sample"] .has-space`', () => {
    const query = generateCustomQuery('module-test', 'sample .has-space');
    expect(query).toStrictEqual('[data-module-test="sample"] .has-space');
  });

  test('should generate a query `[data-module-test="sample"]#id`', () => {
    const query = generateCustomQuery('module-test', 'sample#id');
    expect(query).toStrictEqual('[data-module-test="sample"]#id');
  });

  test('should generate a query `[data-module-test="sample"] #id-space`', () => {
    const query = generateCustomQuery('module-test', 'sample #id-space');
    expect(query).toStrictEqual('[data-module-test="sample"] #id-space');
  });

  test('should generate a query `[data-module-test="sample"][data-title]`', () => {
    const query = generateCustomQuery('module-test', 'sample[data-title]');
    expect(query).toStrictEqual('[data-module-test="sample"][data-title]');
  });

  test('should generate a query `[data-module-test="sample"] [data-space]`', () => {
    const query = generateCustomQuery('module-test', 'sample [data-space]');
    expect(query).toStrictEqual('[data-module-test="sample"] [data-space]');
  });

  test('should generate a query `[data-module-test="sample"] > *`', () => {
    const query = generateCustomQuery('module-test', 'sample > *');
    expect(query).toStrictEqual('[data-module-test="sample"] > *');
  });

  test('should generate a query `[data-module-test="sample"] > p`', () => {
    const query = generateCustomQuery('module-test', 'sample > p');
    expect(query).toStrictEqual('[data-module-test="sample"] > p');
  });
});
