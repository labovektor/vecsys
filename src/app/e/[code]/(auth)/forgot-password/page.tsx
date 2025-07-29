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
import { VIcons } from "@/lib/asset";
import handleRequest from "@/axios/request";
import { toast } from "sonner";
import {
  schemaForgotPassword,
  SchemaForgotPassword,
} from "@/features/auth/schema";

const ForgotPasswordScreen = () => {
  const form = useForm<SchemaForgotPassword>({
    resolver: zodResolver(schemaForgotPassword),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: SchemaForgotPassword) {
    const { error } = await handleRequest<unknown>(
      "POST",
      "/user/forgot-password",
      values
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Link Terkirim ke email Anda (Jika user tersedia)");
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
              <CardTitle>Lupa Password</CardTitle>
              <CardDescription>
                Masukkan email saat Anda mendaftar, kami akan mengirimkan link
                untuk mereset password Anda.
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
            </CardContent>

            <CardFooter className=" flex-col space-y-3">
              <Button
                disabled={form.formState.isSubmitting}
                className=" w-full"
                type="submit"
              >
                {form.formState.isSubmitting
                  ? "Mengirim Link..."
                  : "Kirim Link"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordScreen;
