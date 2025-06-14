"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabsIndex = () => {

  return (
    <div className="w-full">
      <Tabs
        className="w-full"
      >
        <TabsList>
          <TabsTrigger value="sudah-bayar">Sudah Bayar</TabsTrigger>
          <TabsTrigger value="belum-bayar">Belum Bayar</TabsTrigger>
        </TabsList>
        <TabsContent value="sudah-bayar">
          Sudah bayar
        </TabsContent>
        <TabsContent value="belum-bayar">
          Belum bayar
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsIndex;
