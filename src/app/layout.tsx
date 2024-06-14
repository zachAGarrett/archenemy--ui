import React from "react";
import GoogleAnalytics from "@/lib/ga4/googleAnalytics";
import { StyleProvider } from "@/components/StyleProvider";
import "@/app/globals.css";

export const dynamic = "force-dynamic";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        <StyleProvider>{children}</StyleProvider>
      </body>
    </html>
  );
};

export default RootLayout;
