"use client";

import { AlertCircle } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 h-[calc(100vh-250px)] ">
      <div className="flex flex-col items-center text-center space-y-4">
        <AlertCircle className="h-8 w-8 text-gray-500" />
        <p className="text-lg text-gray-600">
          Pilih Event di atas terlebih dahulu
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
