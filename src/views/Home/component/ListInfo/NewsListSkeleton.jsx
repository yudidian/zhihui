import { Skeleton } from 'antd-mobile';

const NewsListSkeleton = function () {
  return(
    <div className="news-list-skeleton">
      <Skeleton.Title animated />
      <Skeleton.Paragraph lineCount={5} animated />
    </div>
  );
};

export default NewsListSkeleton;
