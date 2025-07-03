// components/SkeletonCard.tsx
import React from 'react';

import Skeleton from '@/components/ui/Skeleton';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <Skeleton className="w-full h-40 bg-gray-300" /> 
      
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-3 bg-gray-300" /> 
        
        <Skeleton className="h-4 w-5/6 mb-2 bg-gray-200" />
        <Skeleton className="h-4 w-4/5 mb-2 bg-gray-200" />
        <Skeleton className="h-4 w-2/3 bg-gray-200" />
      </div>
    </div>
  );
};

export default SkeletonCard;