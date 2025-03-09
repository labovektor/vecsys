import { NotFoundImg } from "@/lib/asset";
import Image from "next/image";
import React from "react";

const NotFoundScreen = () => {
  return (
    <div className=" w-full h-full flex flex-col justify-center items-center">
      <Image src={NotFoundImg} alt="not found" width={250} height={250} />
      <h2 className=" text-lg font-bold">Oops!</h2>
      Tidak Ada Apapun di Sini
    </div>
  );
};

export default NotFoundScreen;
