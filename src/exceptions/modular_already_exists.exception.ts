/*
 * This file is part of the Modular package.
 *
 * (c) Grégoire Ciles <bonjour@gregoireciles.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ErrorCodes } from '@/errors/errors.enum';
import { getErrorMessage } from '@/errors/get_error_message';
import { ModularException } from '@/exceptions/modular.exception';

/**
 * ModularAlreadyExistsException is thrown when a module already exists in the collection.
 */
export class ModularAlreadyExistsException extends ModularException {
  constructor(moduleName: string) {
    super(moduleName);
    this.message = getErrorMessage(ErrorCodes.MODULE_ALREADY_EXISTS, {
      moduleName: moduleName.toString(),
    });
  }
}
