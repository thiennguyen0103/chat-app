import { Sidebar } from "@/components/sidebar";
import React, { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-20 hidden h-full w-60 flex-col md:flex">
        <Sidebar />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default Layout;
