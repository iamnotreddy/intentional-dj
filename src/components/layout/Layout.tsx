import * as React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="w-full">{children}</div>
    </div>
  );
}
