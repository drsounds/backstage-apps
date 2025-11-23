import React from 'react';

import { ProgressBar } from './ProgressBar'

export function LoadingScreen() {
  return (
    <div className={'loading-screen'}>
      <ProgressBar />
    </div>
  )
}