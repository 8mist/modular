/*
 * This file is part of the Modular package.
 *
 * (c) Grégoire Ciles <bonjour@gregoireciles.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ErrorCodes } from '@/errors/errors.enum';
import type { ErrorVariables } from '@/types';

/**
 * Generates an error message by replacing placeholders
 * in the error code template with values from the provided variables.
 *
 * @param {ErrorCodes} errorCodes - An error code string containing placeholders.
 * @param {ErrorVariables} [variables] - An optional object containing variable
 * values to replace in the error code string.
 * @returns {string} The generated error message with placeholders replaced by actual variable values.
 */
export function getErrorMessage(errorCodes: ErrorCodes, variables?: ErrorVariables): string {
  let errorMessage = errorCodes as string;

  if (variables) {
    for (const [variable, variableValue] of Object.entries(variables)) {
      errorMessage = errorMessage.replace(new RegExp(`{{${variable}}}`, 'g'), `${variableValue}`);
    }
  }

  return errorMessage;
}
