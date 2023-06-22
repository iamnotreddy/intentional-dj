import * as React from "react";
import { Header } from "../Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-slate-200 bg-transparent">
      <div className="absolute left-0 top-0 z-20 w-full">
        <Header />
      </div>
      <div>{children}</div>
    </div>
  );
}
