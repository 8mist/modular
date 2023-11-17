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
 * ModularModuleIdNotFoundException is thrown when a module ID is not found in the collection.
 */
export class ModularModuleIdNotFoundException extends ModularException {
  constructor(id: number) {
    super(id.toString());
    this.message = getErrorMessage(ErrorCodes.MODULE_ID_NOT_FOUND, {
      moduleID: id.toString(),
    });
  }
}
