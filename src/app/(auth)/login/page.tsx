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
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { schemaLogin } from "@/schema/auth_schema";
import { useToast } from "@/components/hooks/use-toast";

const LoginScreen = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schemaLogin>>({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const postLogin = useMutation({
    mutationFn: (payload: z.infer<typeof schemaLogin>) =>
      axiosInstance.post("/admin/login", payload),
    onError: (error, variables, context) => {
      toast({
        variant: "destructive",
        title: "Oops!",
        description: error.response.data.message,
      });
    },
  });

  function onSubmit(values: z.infer<typeof schemaLogin>) {
    postLogin.mutate(values);
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
              <Button className=" w-full" type="submit">
                Login
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default LoginScreen;
