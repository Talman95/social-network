import React, { ComponentType } from 'react';

import { Preloader } from '../components/common/Preloader/Preloader';

export function withSuspense(
  Component: ComponentType,
  Fallback?: ComponentType,
): ComponentType {
  const PagePreloader = Fallback || Preloader;

  return () => (
    <React.Suspense fallback={<PagePreloader />}>
      <Component />
    </React.Suspense>
  );
}
