import React from 'react';

const Skeleton = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        <div className="flex flex-col items-center lg:w-[30%]">
          <div className="w-48 h-48 rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div className="lg:w-[70%] space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
