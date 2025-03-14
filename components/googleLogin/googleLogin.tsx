"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
export default function GoogleLogin() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3">
        <Button
          onClick={async () =>
            await signIn("google", {
              callbackUrl: window.location.origin || "/",
            })
          }
          className="w-full bg-transparent hover:bg-gray-300 border border-gray-800 rounded-full text-black"
          variant="default"
        >
          <FcGoogle className="mr-2 size-5 text-blue-500" />
          Log in with Google
        </Button>
      </div>
  
    </div>
  );
}
