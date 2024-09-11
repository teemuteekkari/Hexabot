/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) with the following additional terms:
 * 1. The name "Hexabot" is a trademark of Hexastack. You may not use this name in derivative works without express written permission.
 * 2. All derivative works must include clear attribution to the original creator and software, Hexastack and Hexabot, in a prominent location (e.g., in the software's "About" section, documentation, and README file).
 * 3. SaaS Restriction: This software, or any derivative of it, may not be used to offer a competing product or service (SaaS) without prior written consent from Hexastack. Offering the software as a service or using it in a commercial cloud environment without express permission is strictly prohibited.
 */

import { FC, PropsWithChildren } from 'react';

import CloseIcon from './icons/CloseIcon';
import { useColors } from '../providers/ColorProvider';
import { useSettings } from '../providers/SettingsProvider';
import { useWidget } from '../providers/WidgetProvider';
import './ChatHeader.scss';

type ChatHeaderProps = PropsWithChildren;

const ChatHeader: FC<ChatHeaderProps> = ({ children }) => {
  const settings = useSettings();
  const { colors } = useColors();
  const widget = useWidget();

  return (
    <div
      className="sc-header"
      style={{ background: colors.header.bg, color: colors.header.text }}
    >
      {children ? (
        children
      ) : (
        <>
          {settings.titleImageUrl && (
            <img
              className="sc-header--img"
              src={settings.titleImageUrl}
              alt=""
            />
          )}
          <div className="sc-header--title">{settings.title}</div>
        </>
      )}
      <div
        className="sc-header--close-button"
        onClick={() => widget.setIsOpen(false)}
      >
        <CloseIcon />
      </div>
    </div>
  );
};

export default ChatHeader;