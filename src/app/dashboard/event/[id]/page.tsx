import React, { use } from 'react';
import TabsIndex from '@/features/event/components/tabs/tabs';

const EditPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return (
    <div>
      <div className='flex items-center justify-between py-4'>
        <h1 className="text-xl font-bold">Olimpiade Matematika Vektor Nasional (OMVN)</h1>
      </div>
      <TabsIndex id={id} />
    </div>
  );
}

export default EditPage;
