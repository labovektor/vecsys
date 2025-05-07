"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const InformasiUmum = dynamic(() => import("./informasi-umum"), { ssr: false });
const KelolaRegion = dynamic(() => import("./kelola-region"), { ssr: false });
const KelolaCategory = dynamic(() => import("./kelola-category"), {
  ssr: false,
});
const KelolaVoucher = dynamic(() => import("./kelola-voucher"), { ssr: false });
const KelolaPembayaran = dynamic(() => import("./kelola-pembayaran"), {
  ssr: false,
});

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
          <TabsTrigger value="kelola-jenjang">Kelola Jenjang</TabsTrigger>
          <TabsTrigger value="kelola-voucher">Kelola Voucher</TabsTrigger>
          <TabsTrigger value="kelola-pembayaran">Kelola Pembayaran</TabsTrigger>
        </TabsList>
        <TabsContent value="informasi-umum">
          <InformasiUmum id={id} />
        </TabsContent>
        <TabsContent value="kelola-region">
          <KelolaRegion />
        </TabsContent>
        <TabsContent value="kelola-jenjang">
          <KelolaCategory id={id} />
        </TabsContent>
        <TabsContent value="kelola-voucher">
          <KelolaVoucher />
        </TabsContent>
        <TabsContent value="kelola-pembayaran">
          <KelolaPembayaran />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsIndex;
