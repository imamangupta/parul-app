import { Zap } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <section className="mx-20 flex justify-between items-center py-8">
      <div className="flex items-center text-xl gap-2">
        <Zap className="text-blue-600" size={30} />
        <Link className="font-semibold" href={"/"}>
          Smart
          <span className="text-blue-600"> Solar</span>
        </Link>
      </div>
      <div className="flex gap-7 capitalize items-center">
        <Link className={buttonVariants({variant:"ghost"})} href={"/"}>home</Link>
        <Link className={buttonVariants({variant:"ghost"})} href={"/"}>Providers</Link>
        <Link className={buttonVariants({variant:"ghost"})} href={"/"}>Solar Estimation AI Tool</Link>
      </div>
      <div className="flex gap-5">
        <Link href={"/join-as-provider"} className={buttonVariants({variant:"ghost"})}>Join As Provider</Link>
        <Link href={"/"} className={cn(buttonVariants(),"bg-blue-600 p-5 rounded-lg shadow-none")}>Get Started</Link>
      </div>
    </section>
  );
};

export default Navbar;
