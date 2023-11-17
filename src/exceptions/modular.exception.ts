/*
 * This file is part of the Modular package.
 *
 * (c) Grégoire Ciles <bonjour@gregoireciles.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * ModularException is the base class for all exceptions thrown by the Modular package.
 */
export class ModularException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ModularException';
  }
}
