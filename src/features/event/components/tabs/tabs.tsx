"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const InformasiUmum = dynamic(() => import("./informasi-umum"), { ssr: false });
const KelolaRegion = dynamic(
  () => import("../../../event-region/kelola-region"),
  { ssr: false }
);
const KelolaCategory = dynamic(
  () => import("../../../event-category/kelola-category"),
  {
    ssr: false,
  }
);
const KelolaVoucher = dynamic(
  () => import("../../../event-referral/kelola-referral"),
  { ssr: false }
);
const KelolaPayment = dynamic(
  () => import("../../../event-payment/kelola-payment"),
  {
    ssr: false,
  }
);

const KelolaInstansi = dynamic(
  () => import("../../../event-instansi/kelola-instansi"),
  {
    ssr: false,
  }
);

const TabsIndex = ({ id }: { id: string }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const tab = searchParams.get("tab") ?? "informasi-umum";

  return (
    <div className="w-full">
      <Tabs
        defaultValue={tab}
        className="w-full"
        onValueChange={(value) => {
          const params = new URLSearchParams(searchParams);
          params.set("tab", value);
          replace(`${pathName}?${params.toString()}`, {
            scroll: false,
          });
        }}
      >
        <TabsList>
          <TabsTrigger value="informasi-umum">Informasi Umum</TabsTrigger>
          <TabsTrigger value="kelola-region">Kelola Region</TabsTrigger>
          <TabsTrigger value="kelola-kategori">Kelola Kategori</TabsTrigger>
          <TabsTrigger value="kelola-voucher">Kelola Voucher</TabsTrigger>
          <TabsTrigger value="kelola-pembayaran">Kelola Pembayaran</TabsTrigger>
          <TabsTrigger value="kelola-instansi">Kelola Instansi</TabsTrigger>
        </TabsList>
        <TabsContent value="informasi-umum">
          <InformasiUmum id={id} />
        </TabsContent>
        <TabsContent value="kelola-region">
          <KelolaRegion id={id} />
        </TabsContent>
        <TabsContent value="kelola-kategori">
          <KelolaCategory id={id} />
        </TabsContent>
        <TabsContent value="kelola-voucher">
          <KelolaVoucher id={id} />
        </TabsContent>
        <TabsContent value="kelola-pembayaran">
          <KelolaPayment id={id} />
        </TabsContent>
        <TabsContent value="kelola-instansi">
          <KelolaInstansi id={id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsIndex;
