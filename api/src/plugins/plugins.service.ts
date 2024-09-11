/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) with the following additional terms:
 * 1. The name "Hexabot" is a trademark of Hexastack. You may not use this name in derivative works without express written permission.
 * 2. All derivative works must include clear attribution to the original creator and software, Hexastack and Hexabot, in a prominent location (e.g., in the software's "About" section, documentation, and README file).
 * 3. SaaS Restriction: This software, or any derivative of it, may not be used to offer a competing product or service (SaaS) without prior written consent from Hexastack. Offering the software as a service or using it in a commercial cloud environment without express permission is strictly prohibited.
 */

import { Injectable } from '@nestjs/common';

import { BasePlugin } from './base-plugin.service';
import { PluginInstance } from './map-types';
import { PluginType } from './types';

/**
 * @summary Service for managing and retrieving plugins.
 *
 * Plugins are dynamically loaded Nestjs providers.
 * They offer additional features to the app (example : custom blocks)
 *
 * @description
 * The `PluginService` is responsible for managing a registry of plugins that extend from a base plugin type.
 * It provides methods for adding, retrieving, and finding plugins based on a key or plugin identifier.
 * This service is generic and supports a default plugin type `BaseBlockPlugin`.
 *
 * @typeparam T - The plugin type, which extends from `BasePlugin`. By default, it uses `BaseBlockPlugin`.
 */
@Injectable()
export class PluginService<T extends BasePlugin = BasePlugin> {
  /**
   * The registry of plugins, stored as a map where the first key is the type of plugin,
   * the second key is the name of the plugin and the value is a plugin of type `T`.
   */
  private registry: Map<PluginType, Map<string, T>> = new Map(
    Object.keys(PluginType).map((t) => [t as PluginType, new Map()]),
  );

  constructor() {}

  /**
   * Registers a plugin with a given key.
   *
   * @param key The unique identifier for the plugin.
   * @param plugin The plugin instance to register.
   */
  public setPlugin(type: PluginType, key: string, plugin: T) {
    const registry = this.registry.get(type);
    registry.set(key, plugin);
  }

  /**
   * Retrieves all registered plugins as an array.
   *
   * @returns An array containing all the registered plugins.
   */
  public getAllByType<PT extends PluginType>(type: PT): PluginInstance<PT>[] {
    const registry = this.registry.get(type);
    return Array.from(registry.values()) as PluginInstance<PT>[];
  }

  /**
   * Retrieves a plugin based on its key.
   *
   * @param id The key used to register the plugin.
   *
   * @returns The plugin associated with the given key, or `undefined` if not found.
   */
  public getPlugin<PT extends PluginType>(type: PT, id: string) {
    const registry = this.registry.get(type);
    const plugin = registry.get(id);
    return plugin ? (plugin as PluginInstance<PT>) : undefined;
  }

  /**
   * Finds a plugin by its internal `id` property.
   *
   * @param pluginId The unique `id` of the plugin to find.
   *
   * @returns The plugin with the matching `id`, or `undefined` if no plugin is found.
   */
  public findPlugin<PT extends PluginType>(type: PT, pluginId: string) {
    return this.getAllByType(type).find((plugin) => {
      return plugin.id === pluginId;
    });
  }
}