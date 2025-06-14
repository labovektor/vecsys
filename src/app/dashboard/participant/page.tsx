import TabsIndex from '@/features/participant/components/tabs';
import ChooseEvent from '@/features/participant/components/choose-event';
import React from 'react';

const ParticipantPage = () => {
  return (
    <div>
      <div className='flex items-center justify-between py-4 px-1'>
        <h1 className="text-xl font-bold">Kelola Peserta</h1>
      </div>
      <ChooseEvent />
      <TabsIndex />
    </div>
  );
}

export default ParticipantPage;
