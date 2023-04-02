import { ReactNode } from "react";
import { Navbar } from "./navbar";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="min-h-full mx-auto lg:max-w-7xl lg:min-h-[800px] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        {children}
      </div>
    </>
  );
}
