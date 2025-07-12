import TabsIndex from '@/features/participant/components/tabs';
import ChooseEvent from '@/features/participant/components/choose-event';
import React, { Suspense } from 'react';

const ParticipantPage = () => {
  return (
    <div>
      <div className='flex items-center justify-between py-4'>
        <h1 className="text-xl font-bold">Kelola Peserta</h1>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ChooseEvent />
        <TabsIndex />
      </Suspense>
    </div>
  );
}

export default ParticipantPage;
