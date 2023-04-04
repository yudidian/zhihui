import React, {useEffect, useRef, useState} from 'react'
import {Image, NavBar, Space, SpinLoading, Toast} from 'antd-mobile'
import '../style/collect.scss'
import {getStoreList} from '@/api'

function CollectList(props) {
  const {news} = props
  return (
    <>
      <div className="list-wrapper">
        <div className="list-left">
          <p>{news.title}</p>
        </div>
        <div className="list-right">
          <Image
            src={news.image}
            fit={'cover'}
            style={{
              '--adm-image-width': '100%',
              '--adm-image-height': '100%'
            }}></Image>
        </div>
      </div>

    </>
  )
}

function MyCollect(props) {
  const {navigate} = props
  const [bottomLoading, setBottomLoading] = useState(true)
  const [newList, setNewList] = useState([])
  const footerWrapper = useRef(null)
  const back = () => {
    navigate(-1)
  }
  useEffect(() => {
    const ob = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        (async () => {
          const res = await getStoreList()
          if (res.code === 0) {
            const list = newList
            if (res.data.length > 0) {
              list.push(...res.data)
              setNewList(list)
            } else {
              observer.unobserve(footerWrapper.current)
              setBottomLoading(false)
            }
          } else {
            Toast.show({
              icon: 'fail',
              content: res.codeText
            })
          }
        })()
      }
    })

    ob.observe(footerWrapper.current)
  }, [])
  return (
    <>
      <div className="collect-wrapper">
        <NavBar onBack={back}>我的收藏</NavBar>
        {
          newList.map(item => {
            const {news} = item
            return (
              <CollectList key={item.id} news={news}></CollectList>
            )
          })
        }
        <div className="footer-wrapper" ref={footerWrapper}>
          {
            bottomLoading ?
              <Space justify="center" align="center" block>
                <span style={{marginRight: '10px', fontSize: '16px'}}>加载中</span>
                <SpinLoading color='default' style={{'--size': '18px'}}/>
              </Space>
              :
              <Space justify="center" align="center" block>
                <span style={{fontSize: '16px'}}>没有更多了</span>
              </Space>
          }
        </div>
      </div>
    </>
  )
}

export default MyCollect
