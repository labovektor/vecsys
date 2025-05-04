"use client";

import handleRequest from "@/axios/request";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMutation } from "@tanstack/react-query";
import React, { startTransition } from "react";
import { toast } from "sonner";

const ToggleEventStatus = ({
  eventId,
  isActive,
}: {
  eventId: string;
  isActive: boolean;
}) => {
  const [status, setStatus] = React.useState(isActive);
  const [optimisticStatus, setOptimisticStatus] = React.useOptimistic(
    status,
    (_, newStatus: boolean) => newStatus
  );
  const toggleEventStatus = useMutation({
    mutationFn: () =>
      handleRequest<unknown>("GET", `/admin/event/${eventId}/toggle`).then(
        (res) => {
          if (res.error) {
            setStatus(status);
            toast.error(res.error.message);
          } else {
            setStatus(optimisticStatus);
            toast.success("Event status updated");
          }
          return res.data;
        }
      ),
  });
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="event-status"
        checked={optimisticStatus}
        disabled={toggleEventStatus.isPending}
        onCheckedChange={() => {
          startTransition(async () => {
            setOptimisticStatus(!optimisticStatus);
            await toggleEventStatus.mutateAsync();
          });
        }}
      />
      <Label htmlFor="event-status">
        {optimisticStatus ? "Aktif" : "Tidak Aktif"}
      </Label>
    </div>
  );
};

export default ToggleEventStatus;
