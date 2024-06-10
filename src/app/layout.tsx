import React from "react";
import "@/css/globals.css";
import GoogleAnalytics from "@/lib/ga4/googleAnalytics";
import { StyleProvider } from "@/components/StyleProvider";
import { Space } from "antd";

export const dynamic = "force-dynamic";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        <StyleProvider>
          <Space>{children}</Space>
        </StyleProvider>
      </body>
    </html>
  );
};

export default RootLayout;
