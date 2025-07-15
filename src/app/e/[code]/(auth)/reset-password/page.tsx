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
import { useSearchParams } from "next/navigation";
import { VIcons } from "@/lib/asset";
import handleRequest from "@/axios/request";
import { toast } from "sonner";
import {
  schemaResetPassword,
  SchemaResetPassword,
} from "@/features/auth/schema";

const ResetPasswordScreen = () => {
  const token = useSearchParams().get("token");
  const form = useForm<SchemaResetPassword>({
    resolver: zodResolver(schemaResetPassword),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  async function onSubmit(values: SchemaResetPassword) {
    const { error } = await handleRequest<unknown>(
      "POST",
      "/user/reset-password",
      {
        ...values,
        token,
      }
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Password berhasil direset");
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
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>Masukkan password yang baru!</CardDescription>
            </CardHeader>
            <CardContent>
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
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ulangi Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
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
                  ? "Reset Password..."
                  : "Reset Password"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordScreen;
