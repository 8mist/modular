import { isObject } from './is_object';

/**
 * Check if the given value is an element.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is an element, false otherwise.
 */
export const isElement = (value: unknown): value is HTMLElement | Element =>
  isObject(value) && (value instanceof HTMLElement || value instanceof Element);
