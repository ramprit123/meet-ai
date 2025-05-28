"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { authClient } from "~/lib/auth-client";
import { cn } from "~/lib/utils";

const authSchemas = {
  signin: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
  signup: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    name: z.string().min(2, "Name must be at least 2 characters"),
  }),
  forgot: z.object({
    email: z.string().email("Invalid email address"),
  }),
};

type AuthType = "signin" | "signup" | "forgot";

interface AuthFormProps extends React.ComponentProps<"div"> {
  type: AuthType;
  onSubmit: (data: any) => void;
  className?: string;
}

const formTitles = {
  signin: {
    title: "Login to your account",
    description: "Enter your email below to login to your account",
  },
  signup: {
    title: "Create an account",
    description: "Enter your details below to create your account",
  },
  forgot: {
    title: "Forgot password",
    description: "Enter your email address and we'll send you a reset link",
  },
};

/**
 * Renders an authentication form that adapts its fields and actions for sign-in, sign-up, or password reset.
 *
 * The form validates user input according to the selected authentication type and invokes the provided callback on successful submission. It supports email/password authentication, GitHub social login, and displays context-appropriate navigation links.
 *
 * @param type - Specifies the form mode: "signin", "signup", or "forgot".
 * @param onSubmit - Callback invoked with validated form data upon submission.
 *
 * @returns A React component rendering the authentication form UI.
 */
export function AuthForm({
  type,
  onSubmit,
  className,
  ...props
}: AuthFormProps) {
  const schema = authSchemas[type];
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: type !== "forgot" ? "" : undefined,
      name: type === "signup" ? "" : undefined,
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{formTitles[type].title}</h1>
        <p className="text-muted-foreground text-sm text-balance">
          {formTitles[type].description}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          {type === "signup" && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {type !== "forgot" && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    {type === "signin" && (
                      <Button
                        variant="link"
                        className="px-0"
                        onClick={() => {
                          // Handle forgot password navigation
                        }}
                      >
                        Forgot password?
                      </Button>
                    )}
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button type="submit" className="w-full">
            {type === "signin"
              ? "Sign In"
              : type === "signup"
                ? "Sign Up"
                : "Reset Password"}
          </Button>

          {type !== "forgot" && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background text-muted-foreground px-2">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={async () => {
                  await authClient.signIn.social({
                    provider: "github",
                  });
                }}
              >
                <svg
                  className="mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                    fill="currentColor"
                  />
                </svg>
                Continue with GitHub
              </Button>
            </>
          )}
        </form>
      </Form>

      {type !== "forgot" && (
        <div className="text-center text-sm">
          {type === "signin"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <Link
            href={`/${type === "signin" ? "sign-up" : "sign-in"}`}
            className="px-0"
          >
            {type === "signin" ? "Sign up" : "Sign in"}
          </Link>
        </div>
      )}
    </div>
  );
}
