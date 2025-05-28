"use client";

import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { AuthForm } from "~/components/auth-form";
import { authClient } from "~/lib/auth-client";

/**
 * Renders the sign-up page with a registration form and a background image.
 *
 * Displays a sign-up form that collects user information and handles account creation, showing toast notifications for success or error outcomes.
 */
export default function SignUpPage() {
  const handleSignUp = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    await authClient.signUp.email(
      { ...data },
      {
        onError(context) {
          toast.error(
            context.error?.message || "An error occurred during sign up.",
          );
        },
        onSuccess(context) {
          toast.success("Sign up successful!");
        },
      },
    );
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
          alt="Image"
          fill
          className="object-cover object-center dark:brightness-[0.2] dark:grayscale"
          priority
        />
      </div>
    </div>
  );
}
