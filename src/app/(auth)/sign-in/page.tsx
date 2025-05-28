"use client";

import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { AuthForm } from "~/components/auth-form";
import { authClient } from "~/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const handleSignIn = async (data: { email: string; password: string }) => {
    try {
      const result = await authClient.signIn.email({
        ...data,
        rememberMe: true,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(result.error.message || "Failed to sign in");
        return;
      }

      toast.success("Successfully signed in!");
      router.push("/");
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Sign-in error:", error);
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
            Meet AI
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <AuthForm type="signin" onSubmit={handleSignIn} />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/sign-in.png"
          alt="Sign In illustration"
          fill
          className="object-cover object-center dark:brightness-[0.2] dark:grayscale"
          priority
        />
      </div>
    </div>
  );
}
