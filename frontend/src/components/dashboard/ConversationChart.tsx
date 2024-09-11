/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) with the following additional terms:
 * 1. The name "Hexabot" is a trademark of Hexastack. You may not use this name in derivative works without express written permission.
 * 2. All derivative works must include clear attribution to the original creator and software, Hexastack and Hexabot, in a prominent location (e.g., in the software's "About" section, documentation, and README file).
 * 3. SaaS Restriction: This software, or any derivative of it, may not be used to offer a competing product or service (SaaS) without prior written consent from Hexastack. Offering the software as a service or using it in a commercial cloud environment without express permission is strictly prohibited.
 */

import { Card, CardContent, Divider } from "@mui/material";
import { MultiLineChart, ResponsiveChartContainer } from "eazychart-react";
import { useTranslation } from "react-i18next";

import { StyledCardHeader } from "@/app-components/card/StyledCardHeader";
import { useFindStats } from "@/hooks/entities/bot-stat-hooks";
import { LineChartStats } from "@/types/bot-stat.types";
import { buildMultiLineChartConfig, transformToLine } from "@/utils/chart";

import { NoDataChart } from "./NoDataChart";

const ConversationChart = () => {
  const { t, i18n } = useTranslation();
  const { data: conversations } = useFindStats<LineChartStats>("conversation");
  const { data: conversationData, domainKeys: conversationDomains } =
    transformToLine(conversations);

  return (
    <Card>
      <StyledCardHeader
        title={t("charts.conversations")}
        description={t("charts.desc.conversations")}
      />
      <Divider />
      <CardContent>
        {conversationData.length > 0 ? (
          <ResponsiveChartContainer>
            <MultiLineChart
              {...buildMultiLineChartConfig(i18n.language)({
                data: conversationData,
                domainKeys: conversationDomains,
              })}
            />
          </ResponsiveChartContainer>
        ) : (
          <NoDataChart />
        )}
      </CardContent>
    </Card>
  );
};

ConversationChart.displayName = "ConversationChart";

export default ConversationChart;