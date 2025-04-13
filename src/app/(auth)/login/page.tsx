"use client";

import { Button } from "@/components/ui/button";
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
import React from "react";
import { useForm } from "react-hook-form";
import { SchemaLogin, schemaLogin } from "@/features/auth/schema";
import { useRouter } from "next/navigation";
import { VIcons } from "@/lib/asset";
import handleRequest from "@/axios/request";
import { toast } from "sonner";

const LoginScreen = () => {
  const router = useRouter();
  const form = useForm<SchemaLogin>({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: SchemaLogin) {
    const { error } = await handleRequest<unknown>(
      "POST",
      "/admin/login",
      values
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    router.replace("/dashboard");
  }
  return (
    <div className=" flex justify-center items-center h-svh bg-primary">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-[350px]">
            <CardHeader>
              <Image
                src={VIcons.main}
                width={120}
                height={48}
                alt="logo"
                className=" m-auto"
              />
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Masukkan username & password yang benar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
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
            </CardContent>
            <CardFooter>
              <Button
                disabled={form.formState.isSubmitting}
                className=" w-full"
                type="submit"
              >
                {form.formState.isSubmitting ? "Loging in..." : "Login"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default LoginScreen;
