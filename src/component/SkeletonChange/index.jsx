import React from 'react';
import { Skeleton } from 'antd-mobile';
import PropTypes from 'prop-types';

function SkeletonChange(props) {
  const { isShowTitle, count } = props;
  return (
    <div className="skeleton-wrapper">
      {
        isShowTitle ?
          <Skeleton.Title animated />
          :
          ''
      }
      <Skeleton.Paragraph lineCount={count} animated />
    </div>
  );
}
SkeletonChange.defalutProps = {
  isShowTitle: true,
  count: 5
};
SkeletonChange.propTypes = {
  isShowTitle: PropTypes.bool,
  count: PropTypes.number
};
export default SkeletonChange;
