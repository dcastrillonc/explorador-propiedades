import React from 'react';
import Skeleton from './ui/Skeleton';

const SkeletonDetail: React.FC = () => {
  return (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 flex flex-col md:flex-row gap-8">
      <Skeleton className="w-full md:w-1/2 h-64 md:h-96 bg-gray-300 dark:bg-gray-700" /> 
      
      <div className="w-full md:w-1/2 space-y-6">
        <Skeleton className="h-10 w-3/4 mb-4 bg-gray-300 dark:bg-gray-700" /> 
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
          <div>
            <Skeleton className="h-6 w-full bg-gray-200 dark:bg-gray-600" />
            <Skeleton className="h-6 w-5/6 bg-gray-200 dark:bg-gray-600" />
            <Skeleton className="h-6 w-4/5 bg-gray-200 dark:bg-gray-600" />
            <Skeleton className="h-6 w-2/3 bg-gray-200 dark:bg-gray-600" />
          </div>
          <div>
            <Skeleton className="h-6 w-full bg-gray-200 dark:bg-gray-600" />
            <Skeleton className="h-6 w-5/6 bg-gray-200 dark:bg-gray-600" />
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:items-center gap-4">
          <Skeleton className="h-8 w-48 bg-gray-300 dark:bg-gray-700 shrink-0" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-8 w-24 bg-gray-200 dark:bg-gray-600" />
            <Skeleton className="h-8 w-20 bg-gray-200 dark:bg-gray-600" />
            <Skeleton className="h-8 w-28 bg-gray-200 dark:bg-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonDetail;