"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { use } from "react";
import { useForm } from "react-hook-form";
import {
  SchemaLoginParticipant as SchemaLogin,
  schemaLoginParticipant as schemaLogin,
} from "@/features/auth/schema";
import { useRouter } from "next/navigation";
import { VIcons } from "@/lib/asset";
import handleRequest from "@/axios/request";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LoginScreen = ({ params }: { params: Promise<{ code: string }> }) => {
  const { code } = use(params);
  const router = useRouter();
  const form = useForm<SchemaLogin>({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SchemaLogin) {
    const { error } = await handleRequest<unknown>(
      "POST",
      "/user/login",
      values
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    router.replace(`/e/${code}/administration`);
  }
  return (
    <div className=" flex justify-center items-center h-svh bg-primary">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-[350px]">
            <CardHeader>
              <Image
                src={VIcons.mainLabel}
                width={120}
                height={48}
                alt="logo"
                className=" m-auto"
              />
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Masukkan email & password yang benar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Link
                href={`/e/${code}/forgot-password`}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "w-full justify-end"
                )}
              >
                Lupa password?
              </Link>
            </CardContent>

            <CardFooter className=" flex-col space-y-3">
              <Button
                disabled={form.formState.isSubmitting}
                className=" w-full"
                type="submit"
              >
                {form.formState.isSubmitting ? "Loging in..." : "Login"}
              </Button>
              <span className=" text-sm text-center">
                Belum punya akun?{" "}
                <Link
                  href={`/e/${code}/register`}
                  className={buttonVariants({ variant: "link" })}
                >
                  Daftar di sini.
                </Link>
              </span>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default LoginScreen;
