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
 * ModularProvideModulesException is thrown when the modules are not provided to the Modular instance.
 */
export class ModularProvideModulesException extends ModularException {
  constructor() {
    super('');
    this.message = getErrorMessage(ErrorCodes.PROVIDE_MODULES);
  }
}
