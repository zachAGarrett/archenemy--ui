import React from "react";
import GoogleAnalytics from "@/lib/ga4/googleAnalytics";
import { StyleProvider } from "@/components/StyleProvider";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "@/app/globals.css";

export const dynamic = "force-dynamic";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <GoogleAnalytics />
          <StyleProvider>{children}</StyleProvider>
        </body>
      </UserProvider>
    </html>
  );
};

export default RootLayout;
