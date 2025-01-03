import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

const JoinAsProvider = () => {
  return (
    <main className="flex h-screen justify-center items-center">
      <div className="p-10 rounded-lg border">
        <div>
          <div className="flex items-center justify-center text-base gap-2">
            <Zap className="text-blue-600" size={18} />
            <Link className="font-medium" href={"/"}>
              Smart
              <span className="text-blue-600"> Solar</span>
            </Link>
          </div>
          <div className="flex flex-col my-5">
            <h1 className="text-xl text-center font-medium">
              Join As Provider
            </h1>
            <p className="text-sm text-center text-slate-500 mt-3 w-[35ch]">Lorem ipsum sit amet consectetur doloremque sit earum nobis magnam</p>
          </div>
        </div>
        <form method="POST" className="w-[300px] gap-2 flex flex-col">
          <div className="space-y-1">
            <Label>Company Name</Label>
            <Input />
          </div>
          <div className="space-y-1">
            <Label>Email Address</Label>
            <Input />
          </div>
          <div className="space-y-1">
            <Label>Password</Label>
            <Input />
          </div>
          <div className="space-y-1">
            <Label>Phone Number</Label>
            <Input />
          </div>
          <div className="space-y-1">
            <Label>Adreess </Label>
            <Input />
          </div>
          <Button className="bg-blue-600 p-5 mt-5">Submit</Button>
        </form>
      </div>
    </main>
  );
};

export default JoinAsProvider;
