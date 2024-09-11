/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) with the following additional terms:
 * 1. The name "Hexabot" is a trademark of Hexastack. You may not use this name in derivative works without express written permission.
 * 2. All derivative works must include clear attribution to the original creator and software, Hexastack and Hexabot, in a prominent location (e.g., in the software's "About" section, documentation, and README file).
 * 3. SaaS Restriction: This software, or any derivative of it, may not be used to offer a competing product or service (SaaS) without prior written consent from Hexastack. Offering the software as a service or using it in a commercial cloud environment without express permission is strictly prohibited.
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsOptional } from 'class-validator';

import { IsObjectId } from '@/utils/validation-rules/is-object-id';

import { Action } from '../types/action.type';
import { TRelation } from '../types/index.type';

export class PermissionCreateDto {
  @ApiProperty({ description: 'Id of the model', type: String })
  @IsNotEmpty()
  @IsString()
  @IsObjectId({ message: 'Model must be a valid ObjectId' })
  model: string;

  @ApiProperty({ description: 'Action to perform on the model', enum: Action })
  @IsNotEmpty()
  @IsEnum(Action)
  action: Action;

  @IsNotEmpty()
  @ApiProperty({ description: 'Id of the role', type: String })
  @IsString()
  @IsObjectId({ message: 'Role must be a valid ObjectId' })
  role: string;

  @ApiProperty({
    description: 'relation of the permission',
    type: String,
  })
  @IsString()
  @IsOptional()
  relation?: TRelation;
}