/**
 * Checks if the given value is an object.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is an object, false otherwise.
 */
export const isObject = (value: unknown): value is Record<any, any> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
