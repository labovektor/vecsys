"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";

const InformasiUmum = dynamic(() => import("./informasi-umum"), { ssr: false });
const KelolaRegion = dynamic(() => import("./kelola-region"), { ssr: false });
const KelolaKategori = dynamic(() => import("./kelola-kategori"), { ssr: false });
const KelolaVoucher = dynamic(() => import("./kelola-voucher"), { ssr: false });
const KelolaPembayaran = dynamic(() => import("./kelola-pembayaran"), {
  ssr: false,
});

const TabsIndex = ({ id }: { id: string }) => {
  return (
    <div className="w-full">
      <Tabs defaultValue="informasi-umum" className="w-full">
        <TabsList>
          <TabsTrigger value="informasi-umum">Informasi Umum</TabsTrigger>
          <TabsTrigger value="kelola-region">Kelola Region</TabsTrigger>
          <TabsTrigger value="kelola-kategori">Kelola Kategori</TabsTrigger>
          <TabsTrigger value="kelola-voucher">Kelola Voucher</TabsTrigger>
          <TabsTrigger value="kelola-pembayaran">Kelola Pembayaran</TabsTrigger>
        </TabsList>
        <TabsContent value="informasi-umum">
          <InformasiUmum id={id} />
        </TabsContent>
        <TabsContent value="kelola-region">
          <KelolaRegion />
        </TabsContent>
        <TabsContent value="kelola-kategori">
          <KelolaKategori id={id} />
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
