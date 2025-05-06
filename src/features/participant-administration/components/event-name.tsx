"use client";

import { useParticipant } from "@/hooks/use-participant";
import React from "react";

const EventName = () => {
  const { user } = useParticipant();
  return <span className=" line-clamp-1">{user?.event?.name}</span>;
};

export default EventName;
