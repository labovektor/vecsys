import handleRequest from '@/axios/request';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';
import ToggleEventStatus from '../toggle-event-status';
import { Event } from '../../dto';

const InformasiUmum = ({ id }: { id: string }) => {
  const { data: event, isLoading } = useQuery({
    queryKey: ["event"],
    queryFn: async () =>
      handleRequest<Event>("GET", `/event/${id}`).then((res) => {
        if (res.error) {
          toast.error(res.error.message);
        }
        return res.data;
      }),
  });
  const isActive = event?.active ?? false;

  console.log(event);
  return (
    <Card className="w-full h-full p-4 bg-white border border-gray-200 shadow-sm rounded-md">
      <div className='w-full flex justify-end'>
        <ToggleEventStatus eventId={id} isActive={isActive} />
      </div>
    </Card>
  );
}

export default InformasiUmum;
