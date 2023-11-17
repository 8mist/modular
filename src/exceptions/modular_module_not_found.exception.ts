/*
 * This file is part of the Modular package.
 *
 * (c) Grégoire Ciles <bonjour@gregoireciles.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ErrorCodes } from '../errors/errors.enum';
import { getErrorMessage } from '../errors/get_error_message';
import { ModularException } from './modular.exception';

/**
 * ModularModuleNotFoundException is thrown when a module name is not found in the collection.
 */
export class ModularModuleNotFoundException extends ModularException {
  constructor(moduleName: string) {
    super(moduleName);
    this.message = getErrorMessage(ErrorCodes.MODULE_NAME_NOT_FOUND, { moduleName });
  }
}
