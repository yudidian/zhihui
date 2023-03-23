import React, {useEffect, useRef, useState} from 'react';
import {Image, Space, SpinLoading} from "antd-mobile";
import propTypes from "prop-types"

function ListInfo(props) {
  const [isShowLoading, setLoading] = useState(false)
  const [newList, setNewList] = useState([1,2,3,4])
  const homeList = useRef()
  useEffect(() => {
    homeList.current.addEventListener("scroll", (e) => {
      if (homeList.current.clientHeight + homeList.current.scrollTop === homeList.current.scrollHeight) {
        setLoading(true)
      }
    })
  }, [])
  useEffect(() => {
    if (isShowLoading) {
      newList.push(...[5,6,7,8,9])
      console.log(newList)
      setNewList(newList)
      setLoading(false)
    }
  }, [isShowLoading, newList])
  return (
      <>
        <div className="home-list-wrapper" ref={homeList}>
          {
            newList.map((item, index) => {
              const {imageUrl, title} = item
              return (
                  <div className="home-list-info" key={index}>
                    <div className="info-left">
                      <div className="title">
                        {title}
                      </div>
                      <div className="message">
                        用户阅读
                      </div>
                    </div>
                    <div className="info-right">
                      <Image src={imageUrl} fit='cover' width={60} height={60}></Image>
                    </div>
                  </div>
              )
            })
          }
          {
            isShowLoading ?
                <Space justify="center" align="center" block>
                  <span style={{marginRight: "10px", fontSize: "16px"}}>加载中</span>
                  <SpinLoading color='default' style={{'--size': '18px'}}/>
                </Space>
                :
                ""
          }
        </div>
      </>
  );
}

ListInfo.propTypes = {
  newList: propTypes.array.isRequired
}
export default ListInfo;
