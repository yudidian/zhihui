import React, {useEffect, useState} from 'react';
import {getNewsDetailInfo, getNewsStoryExtra} from "@/api";
import "./style/index.scss"
import {LeftOutline, LikeOutline, MessageOutline, SendOutline, StarOutline} from "antd-mobile-icons";
import {Badge, Image, Toast} from "antd-mobile";
import SkeletonChange from "@/component/SkeletonChange";

let link
function Detail(props) {
  const {params, navigate} = props
  const [startInfo, setStartInfo] = useState({
    comments: 0,
    popularity: 0
  })
  const [detailInfo, setDetail] = useState({})

  const handleStyle = (res) => {
    const css = res.css
    if (css && Array.isArray(css)) {
      link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = css[0]
      document.head.appendChild(link)
    }
  }
  const handleImage = (res) => {
    const imgPlaceHolder = document.querySelector(".img-place-holder")
    if (imgPlaceHolder) {
      const tempImage = document.createElement("img")
      tempImage.src = res.image
      tempImage.onload = () => {
        imgPlaceHolder.appendChild(tempImage)
      }
      tempImage.onerror = () => {
        imgPlaceHolder.parent.remove()
      }
    }
  }

  useEffect(() => {
    handleImage(detailInfo)
    handleStyle(detailInfo)
  }, [detailInfo])
  // 首次加载
  useEffect(() => {
    (async () => {
      try {
        const resList = await Promise.allSettled([
          getNewsDetailInfo({id: params.id}),
          getNewsStoryExtra({id: params.id})
        ])
        setDetail(resList[0].value)
        setStartInfo(resList[1].value)
      } catch (e) {
        Toast.show({
          icon: 'fail',
          content: '当前网络繁忙，请您稍后再试~',
        })
      }
    })()
    return () => {
      link?.remove()
    }
  }, [])
  const {image, title} = detailInfo
  return (
      <>
        <div className="detail-wrapper">
          <div className="detail-message">
            <div className="message-body">
              {
                detailInfo.body ?
                    <div className="body-content" dangerouslySetInnerHTML={{__html: detailInfo.body}}></div>
                    :
                    <SkeletonChange isShowTitle={false} count={20}></SkeletonChange>
              }
            </div>
          </div>
          <div className="detail-footer">
            <div className="footer-left" onClick={() => {
              navigate(-1)
            }}>
              <LeftOutline/>
            </div>
            <div className="footer-right">
              <div className="right-item">
                <Badge content={startInfo.popularity} color='#f3f3f3'>
                  <LikeOutline/>
                </Badge>
              </div>
              <div className="right-item">
                <Badge content={startInfo.comments} color='#f3f3f3'>
                  <MessageOutline/>
                </Badge>
              </div>
              <div className="right-item">
                <StarOutline/>
              </div>
              <div className="right-item">
                <SendOutline/>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default Detail;
