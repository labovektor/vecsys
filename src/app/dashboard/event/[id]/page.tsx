"use client";

import React, { use } from 'react';
import TabsIndex from '@/features/event/components/tabs/tabs';
import { useSearchParams } from 'next/navigation';

const EditPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const searchParams = useSearchParams();
  const { id } = use(params);
  const eventName = searchParams.get('event_name') ?? '';
  return (
    <div>
      <div className='flex items-center justify-between py-4 px-1'>
        <h1 className="text-xl font-bold">{eventName}</h1>
      </div>
      <TabsIndex id={id} />
    </div>
  );
}

export default EditPage;
