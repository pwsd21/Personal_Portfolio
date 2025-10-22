import React from "react";
import { Navbar } from "@/app/components/navbar";
import { ModeToggle } from "@/app/components/mode-toggle";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar developerInitial="P" />
      <main className="min-h-screen w-full max-w-[700px] mx-auto px-5">
        {children}
      </main>
      <ModeToggle />
    </>
  );
};

export default RootLayout;
