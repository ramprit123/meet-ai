"use client";

import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import { AuthForm } from "~/components/auth-form";
import { authClient } from "~/lib/auth-client";

/**
 * Renders the sign-in page with a form for user authentication and branding.
 *
 * Displays a sign-in form that submits user credentials to the authentication client, alongside branding and a background image on large screens.
 */
export default function SignInPage() {
  const handleSingIn = async (data: { email: string; password: string }) => {
    authClient.signIn.email({
      ...data,
    });
  };
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Meet AI
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <AuthForm type="signin" onSubmit={handleSingIn} />
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
