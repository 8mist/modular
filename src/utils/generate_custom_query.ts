/**
 * Generate a custom CSS selector query for a specific module name and selectors.
 *
 * @param {string} moduleName - The name of the module to target.
 * @param {string} selectors - The CSS selectors to append to the query.
 * @returns {string} Returns the generated CSS selector query.
 *
 * @example
 * ```ts
 * generateCustomQuery('accordion', 'item.active'); // => [data-accordion="item"].active
 * ```
 */
export function generateCustomQuery(moduleName: string, selectors?: string): string {
  if (selectors) {
    const specialCharacters = ['.', '#', '[', ' '];

    let startIndex = specialCharacters.reduce((minIndex, char) => {
      const index = selectors.indexOf(char);
      return index !== -1 && index < minIndex ? index : minIndex;
    }, selectors.length);

    let moduleItem = selectors;
    let moreSelectors = '';

    if (startIndex !== selectors.length) {
      moduleItem = selectors.slice(0, startIndex);
      moreSelectors = selectors.slice(startIndex);
    }

    return `[data-${moduleName}="${moduleItem}"]${moreSelectors}`;
  }

  return `[data-${moduleName}]`;
}
