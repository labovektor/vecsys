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
import { useRouter } from "next/navigation";
import { VIcons } from "@/lib/asset";
import handleRequest from "@/axios/request";
import { toast } from "sonner";
import Link from "next/link";
import { schemaRegister, SchemaRegister } from "@/features/auth/schema";
import { getEventConfigByCode } from "@/lib/event-config";

const RegisterScreen = ({ params }: { params: Promise<{ code: string }> }) => {
  const router = useRouter();

  const { code } = use(params);
  const cfg = getEventConfigByCode(code);

  const form = useForm<SchemaRegister>({
    resolver: zodResolver(schemaRegister),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirm_password: "",
    },
  });

  async function onSubmit(values: SchemaRegister) {
    const { error } = await handleRequest<unknown>("POST", "/user/register", {
      ...values,
      event_id: cfg.id,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Yeay! Berhasil daftar");
    router.replace(`/e/${code}/login`);
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
              <CardTitle>Daftar</CardTitle>
              <CardDescription>Masukkan data lengkap Anda.</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                {form.formState.isSubmitting ? "Daftar..." : "Daftar"}
              </Button>
              <span className=" text-sm text-center">
                Sudah punya akun?{" "}
                <Link
                  href={`/e/${code}/login`}
                  className={buttonVariants({ variant: "link" })}
                >
                  Masuk.
                </Link>
              </span>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default RegisterScreen;
