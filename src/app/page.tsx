import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" w-full h-svh flex flex-col gap-2 items-center justify-center">
      <Image src="img/logo_main.svg" width={180} height={48} alt="logo" />
      <h1>HIMATIKA Vektor Event Management Platform</h1>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </div>
  );
}
