/**
 * Checks if the given value is a string.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a string, false otherwise.
 */
export const isString = (value: unknown): value is string => typeof value === 'string';
