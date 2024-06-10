"use client";

import { PropsWithChildren } from "react";
import { ConfigProvider } from "antd";
import { AntdProvider } from "./AntdProvider";

export function StyleProvider({ children }: PropsWithChildren) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: "#FFF",
          colorPrimary: "#309FEE",
          colorLink: "#C66FD8",
          colorTextLightSolid: "#F0F7F4",
          colorTextBase: "#131112",
          colorBgLayout: "#FFF",
          colorBgContainer: "#FCFCFC",
          colorSuccess: "#309FEE",
          colorError: "#F26419",
          colorWarning: "#E8AA14",
          borderRadius: 4,
        },
        components: {
          Menu: {},
        },
      }}
    >
      <AntdProvider>{children}</AntdProvider>
    </ConfigProvider>
  );
}
