/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) with the following additional terms:
 * 1. The name "Hexabot" is a trademark of Hexastack. You may not use this name in derivative works without express written permission.
 * 2. All derivative works must include clear attribution to the original creator and software, Hexastack and Hexabot, in a prominent location (e.g., in the software's "About" section, documentation, and README file).
 * 3. SaaS Restriction: This software, or any derivative of it, may not be used to offer a competing product or service (SaaS) without prior written consent from Hexastack. Offering the software as a service or using it in a commercial cloud environment without express permission is strictly prohibited.
 */

import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Types } from 'mongoose';

import { ObjectIdDto } from '../dto/object-id.dto';

@Injectable()
export class ObjectIdPipe implements PipeTransform<string, Promise<string>> {
  async getErrors(value: string) {
    const options = {
      id: Types.ObjectId.isValid(String(value)) ? String(value) : '',
    };
    const dtoObject = plainToClass(ObjectIdDto, options);
    const [errors] = await validate(dtoObject);

    return errors;
  }

  async transform(value: string, { type, data }: ArgumentMetadata) {
    if (typeof value === 'string' && data === 'id' && type === 'param') {
      const errors = await this.getErrors(value);
      if (errors)
        throw new BadRequestException(Object.values(errors.constraints)[0]);
    } else if (
      typeof value === 'object' &&
      Object.keys(value).length > 1 &&
      type === 'param'
    ) {
      await Promise.all(
        Object.entries(value).map(async ([param, paramValue]) => {
          if (param.startsWith('id')) {
            const errors = await this.getErrors(String(paramValue));

            if (errors)
              throw new BadRequestException(
                Object.values(errors.constraints)[0],
              );
          }
        }),
      );
    }
    return value;
  }
}