import Header from "@/views/Home/component/Header";
import "./style/index.scss"
import MySwiper from "@/component/Swiper/Swiper";
import ListInfo from "@/views/Home/component/ListInfo/ListInfo";
import {useEffect, useRef, useState} from "react";
import {getNewsBeforeInfo, getNewsLatestInfo} from "@/api";
import dayjs from "dayjs";
import _ from "lodash";

function Home(props) {
  const homeWrapper = useRef(null)
  const newListWrapper = useRef(null)
  const [bottomLoading, setBottomLoading] = useState(true)
  const [isShowSkeleton, setIsShowSkeleton] = useState(true)
  const [resDate, setResDate] = useState(dayjs(new Date()).format("YYYYMMDD"))
  const [newListInfo, setNewListInfo] = useState([{date: new Date(), newList: [{}, {}, {}]}])
  const [topStories, setTopStories] = useState([])

  useEffect(() => {
    (async () => {
      const res = await getNewsLatestInfo()
      const list = []
      const info = {
        date: res.date,
        newList: res.stories
      }
      list.push(info)
      setTopStories(res.top_stories)
      setNewListInfo(list)
      setIsShowSkeleton(false)
    })()
  }, [])
  useEffect(() => {
    const lastChild = newListWrapper.current.lastChild
    const ob = new IntersectionObserver(_.debounce((enters, observer) => {
      if (enters[0].isIntersecting) {
        setBottomLoading(true)
      }
    }, 500))
    ob.observe(lastChild)
    return () => {
      ob.unobserve(lastChild)
    }
  }, [newListInfo])
  useEffect(() => {
    if (bottomLoading) {
      const today = dayjs(resDate)
      const yesterday = today.subtract(1, 'day');
      (async () => {
        const res = await getNewsBeforeInfo({
          time: resDate
        })
        setResDate(yesterday.format("YYYYMMDD"))
        const list = [...newListInfo]
        list.push({
          date: res.date,
          newList: res.stories
        })
        setNewListInfo(list)
        setBottomLoading(false)
      })()
    }
  }, [bottomLoading, newListInfo, resDate])
  return (
      <>
        <div className="home_wrapper" ref={homeWrapper}>
          <Header></Header>
          <MySwiper urlList={topStories} height={300}></MySwiper>
          <ListInfo ref={newListWrapper} {...props} newListInfo={newListInfo} bottomLoading={bottomLoading}
                    isShowSkeleton={isShowSkeleton}></ListInfo>
        </div>
      </>
  );
}

export default Home;
