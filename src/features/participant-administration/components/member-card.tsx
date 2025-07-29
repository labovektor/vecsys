"use client";

import React from "react";
import { ParticipantBiodata } from "../dto";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import handleRequest from "@/axios/request";
import { toast } from "sonner";

const MemberCard = ({
  biodata,
  index,
  callBack,
  canDelete,
}: {
  biodata: ParticipantBiodata;
  index: number;
  callBack?: VoidFunction;
  canDelete: boolean;
}) => {
  const [deleting, setDeleting] = React.useState(false);
  const deleteMember = async () => {
    setDeleting(true);
    const { error } = await handleRequest<unknown>(
      "DELETE",
      `/user/data/member/${biodata.id}`
    );

    setDeleting(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Anggota berhasil dihapus");
    if (callBack) {
      callBack();
    }
  };
  return (
    <Card className=" max-w-md mx-auto ">
      <CardHeader>
        <div className=" flex justify-between items-center">
          <div>
            <span className=" text-nowrap line-clamp-1">Anggota {index}</span>
          </div>
          {canDelete && (
            <Button
              variant="destructive"
              size="icon"
              disabled={deleting}
              onClick={deleteMember}
            >
              <Trash />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <table className=" border-separate border-spacing-3">
          <tbody>
            <tr>
              <td>Nama</td>
              <td className=" text-muted-foreground">{biodata.name}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td className=" text-muted-foreground">
                {biodata.gender === "male" ? "Laki-laki" : "Perempuan"}
              </td>
            </tr>
            <tr>
              <td>No Telepon</td>
              <td className=" text-muted-foreground">{biodata.phone}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td className=" text-muted-foreground">{biodata.email}</td>
            </tr>
            <tr>
              <td>Nomor Identitas</td>
              <td className=" text-muted-foreground">{biodata.id_number}</td>
            </tr>
            <tr>
              <td>Kartu Identitas</td>
              <td>
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}${biodata.id_card_picture}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline text-blue-600"
                >
                  Lihat Foto Kartu Identitas
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default MemberCard;
