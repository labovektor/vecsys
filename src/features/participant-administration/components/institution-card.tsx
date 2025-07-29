import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Institution } from "@/features/event-instansi/dto";
import React from "react";

const InstitutionCard = ({ institution }: { institution: Institution }) => {
  return (
    <Card className=" max-w-md mx-auto border-primary bg-vblue-100">
      <CardHeader className=" text-center">
        <CardTitle>{institution.name}</CardTitle>
        <CardDescription>{institution.email}</CardDescription>
      </CardHeader>
      <CardContent className=" text-center">
        <span>Pendamping:</span>
        <CardDescription>
          {institution.pendamping_phone} ({institution.pendamping_name})
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default InstitutionCard;
