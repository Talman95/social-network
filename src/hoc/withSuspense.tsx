import React from 'react';

import { Preloader } from '../components/common/Preloader/Preloader';

export function withSuspense(Component: React.ComponentType) {
  return () => (
    <React.Suspense fallback={<Preloader />}>
      <Component />
    </React.Suspense>
  );
}
