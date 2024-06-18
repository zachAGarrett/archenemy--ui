import React from "react";
import GoogleAnalytics from "@/lib/ga4/googleAnalytics";
import { StyleProvider } from "@/components/StyleProvider";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "@/app/globals.css";
import { Button, Divider, Flex } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";

export const dynamic = "force-dynamic";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <GoogleAnalytics />
          <StyleProvider>
            <Flex vertical style={{ height: "100%" }}>
              <Flex justify="end">
                <Link href="profile">
                  <Button
                    type="primary"
                    size="large"
                    style={{ margin: 10 }}
                    shape="circle"
                    icon={<UserOutlined />}
                  />
                </Link>
              </Flex>
              {children}
            </Flex>
          </StyleProvider>
        </body>
      </UserProvider>
    </html>
  );
};

export default RootLayout;
