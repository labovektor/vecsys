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
import { z } from "zod";
import { schemaLogin } from "@/schema/auth_schema";
import { useToast } from "@/components/hooks/use-toast";
import { AuthActionKind, useAuthContext } from "@/_context/AuthContext";
import { loginAction } from "@/_actions/auth.action";
import { useRouter } from "next/navigation";

const LoginScreen = () => {
  const auth = useAuthContext();
  const router = useRouter();

  const { toast } = useToast();
  const form = useForm<z.infer<typeof schemaLogin>>({
    resolver: zodResolver(schemaLogin),
  });

  async function onSubmit(values: z.infer<typeof schemaLogin>) {
    const { error, data } = await loginAction(values);

    if (error) {
      toast({
        variant: "destructive",
        title: "Oops!",
        description: error,
      });
      return;
    }

    auth.dispatch({
      type: AuthActionKind.LOGIN,
      payload: data,
    });

    router.replace("/dashboard");
  }
  return (
    <div className=" flex justify-center items-center h-svh">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-[350px]">
            <CardHeader>
              <Image
                src="img/logo_main.svg"
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
                      <Input {...field} />
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
