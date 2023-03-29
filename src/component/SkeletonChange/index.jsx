import React from 'react';
import {Skeleton} from "antd-mobile"

function SkeletonChange(props) {
  return (
      <div className="skeleton-wrapper">
        <Skeleton.Title animated />
        <Skeleton.Paragraph lineCount={5} animated />
      </div>
  );
}

export default SkeletonChange;
