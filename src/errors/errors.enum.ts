/*
 * This file is part of the Modular package.
 *
 * (c) Grégoire Ciles <bonjour@gregoireciles.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export enum ErrorCodes {
  PROVIDE_MODULES = 'Please provide modules to the collection.',
  MODULE_ALREADY_EXISTS = 'Module "{{moduleName}}" already exists.',
  MODULE_ID_NOT_FOUND = 'Module with ID "{{moduleID}}" not found.',
  MODULE_NAME_NOT_FOUND = 'Module with name "{{moduleName}}" not found.',
}
