import {BASE_INFO, USER_INFO} from '@/store/action-types'
import {getUserinfo} from '@/api'
import {Toast} from 'antd-mobile'

const baseActions = {
  baseInfo: (token) => {
    return {
      type: BASE_INFO,
      token: token
    }
  },
  userInfo: async () => {
    let info = null
    try {
      const res = await getUserinfo()
      if (res.code !== 0) {
        Toast.show({
          icon: 'fail',
          content: res.codeText
        })
      } else {
        info = res.data
      }
    }catch (e) {
      Toast.show({
        icon: 'fail',
        content: '获取用户信息失败'
      })
    }

    return {
      type: USER_INFO,
      userInfo: info
    }
  }
}

export default baseActions
