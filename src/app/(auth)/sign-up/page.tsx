"use client";

import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { AuthForm } from "~/components/auth-form";
import { authClient } from "~/lib/auth-client";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const handleSignUp = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      await authClient.signUp.email(
        { ...data },
        {
          onError(context) {
            const errorMessage = context.error?.message;
            if (errorMessage?.includes("email")) {
              toast.error("Email is already in use or invalid.");
            } else if (errorMessage?.includes("password")) {
              toast.error("Password does not meet requirements.");
            } else {
              toast.error(errorMessage || "An error occurred during sign up.");
            }
          },
          onSuccess() {
            toast.success("Sign up successful!");
          },
        },
      );
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <AuthForm type="signup" onSubmit={handleSignUp} />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/sign-in.png"
          alt="Sign up illustration"
          fill
          className="object-cover object-center dark:brightness-[0.2] dark:grayscale"
          priority
        />
      </div>
    </div>
  );
}
