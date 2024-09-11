/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) with the following additional terms:
 * 1. The name "Hexabot" is a trademark of Hexastack. You may not use this name in derivative works without express written permission.
 * 2. All derivative works must include clear attribution to the original creator and software, Hexastack and Hexabot, in a prominent location (e.g., in the software's "About" section, documentation, and README file).
 * 3. SaaS Restriction: This software, or any derivative of it, may not be used to offer a competing product or service (SaaS) without prior written consent from Hexastack. Offering the software as a service or using it in a commercial cloud environment without express permission is strictly prohibited.
 */

import mongoose from 'mongoose';

import { BlockCreateDto } from '@/chat/dto/block.dto';
import { BlockModel, Block } from '@/chat/schemas/block.schema';
import { CategoryModel } from '@/chat/schemas/category.schema';
import { FileType } from '@/chat/schemas/types/attachment';
import { ButtonType } from '@/chat/schemas/types/button';
import { QuickReplyType } from '@/chat/schemas/types/quick-reply';

import { getFixturesWithDefaultValues } from '../defaultValues';
import { TFixturesDefaultValues } from '../types';

export const blocks: BlockCreateDto[] = [
  {
    name: 'hasNextBlocks',
    patterns: ['Hi'],
    trigger_channels: [],
    category: null,
    options: {
      typing: 0,
      fallback: {
        active: false,
        max_attempts: 1,
        message: [],
      },
    },
    message: ['Hi back !'],
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    name: 'hasPreviousBlocks',
    patterns: ['colors'],
    trigger_channels: [],
    category: null,
    options: {
      typing: 0,
      fallback: {
        active: false,
        max_attempts: 1,
        message: [],
      },
    },
    message: {
      text: 'What"s your favorite color?',
      quickReplies: [
        {
          content_type: QuickReplyType.text,
          title: 'Green',
          payload: 'Green',
        },
        {
          content_type: QuickReplyType.text,
          title: 'Yellow',
          payload: 'Yellow',
        },
        {
          content_type: QuickReplyType.text,
          title: 'Red',
          payload: 'Red',
        },
      ],
    },
    position: {
      x: 0,
      y: 1,
    },
  },
  {
    name: 'buttons',
    patterns: ['about'],
    trigger_channels: [],
    category: null,
    options: {
      typing: 0,
      fallback: {
        active: false,
        max_attempts: 1,
        message: [],
      },
    },
    message: {
      text: 'What would you like to know about us?',
      buttons: [
        {
          type: ButtonType.postback,
          title: 'Vision',
          payload: 'Vision',
        },
        {
          type: ButtonType.postback,
          title: 'Values',
          payload: 'Values',
        },
        {
          type: ButtonType.postback,
          title: 'Approach',
          payload: 'Approach',
        },
      ],
    },
    position: {
      x: 0,
      y: 2,
    },
  },
  {
    name: 'attachment',
    patterns: ['image'],
    trigger_channels: [],
    category: null,
    options: {
      typing: 0,
      fallback: {
        active: false,
        max_attempts: 1,
        message: [],
      },
    },
    message: {
      attachment: {
        type: FileType.image,
        payload: {
          attachment_id: '1',
        },
      },
      quickReplies: [],
    },
    position: {
      x: 0,
      y: 3,
    },
  },
  {
    name: 'test',
    patterns: ['yes'],
    trigger_channels: [],
    category: null,
    //to be verified
    options: {
      typing: 0,
      fallback: {
        active: false,
        max_attempts: 1,
        message: [],
      },
    },
    message: [':)', ':D', ';)'],
    position: {
      x: 36,
      y: 78,
    },
  },
];

export const blockDefaultValues: TFixturesDefaultValues<Block> = {
  options: {},
  builtin: false,
  nextBlocks: [],
  capture_vars: [],
  assign_labels: [],
  trigger_labels: [],
  starts_conversation: false,
  attachedToBlock: null,
};

export const blockFixtures = getFixturesWithDefaultValues<Block>({
  fixtures: blocks,
  defaultValues: blockDefaultValues,
});

export const installBlockFixtures = async () => {
  const Category = mongoose.model(CategoryModel.name, CategoryModel.schema);
  const defaultCategory = await Category.create({
    label: 'default',
    builtin: true,
  });
  const Block = mongoose.model(BlockModel.name, BlockModel.schema);
  const blocks = await Block.insertMany(
    blockFixtures.map((blockFixture) => ({
      ...blockFixture,
      category: defaultCategory.id,
    })),
  );
  return await Block.updateOne(
    { name: 'hasNextBlocks' },
    { $set: { nextBlocks: blocks[1].id } },
  );
};