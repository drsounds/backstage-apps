import React from 'react';

import './index.module.css';

export function ProgressBar({
  value = 0,
  max = 100
}) {
  const percent = Math.round((value / max) * 100)
  return (
    <div className={"progressBar"}>
      <div
        className={"progressBarThumb"}
        style={{ width: `${percent}%`}}
      />
    </div>
  )
}