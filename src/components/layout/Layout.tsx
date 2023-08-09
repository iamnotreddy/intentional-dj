import * as React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-[#2b0634]">
      <div className="w-full">{children}</div>
    </div>
  );
}
