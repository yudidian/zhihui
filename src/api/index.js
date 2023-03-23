import http from "@/utils/fetch";

// 获取最新新闻
export const getNewsLatestInfo = () => {
  return http.get("/news_latest")
}

// 获取以往新闻  /news_before  GET
export const getNewsBeforeInfo = (params) => {
  return http.get("/news_before", {
    params: params
  })
}

// 获取新闻详细信息
export const getNewsDetailInfo = (params) => {
  return http.get("/news_info", {
    params: params
  })
}

// 获取新闻点赞信息  /story_extra
export const getNewsStoryExtra = (params) => {
  return http.get("/story_extra", {
    params: params
  })
}

// 用户登录  /login  POST
export const login = (data) => {
  return http.post("/login", {
    body: data
  })
}

// 获取手机验证码  /phone_code  POST
export const getPhoneCode = (data) => {
  return http.post("/phone_code", {
    body: data
  })
}

// 获取登录者信息  /user_info  GET
export const getUserinfo = (params) => {
  return http.get("/user_info", {
    params: params
  })
}

// 上传图片  /upload  POST
export const uploadImage = (data) => {
  return http.post("/upload", {
    body: data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}
// 修改用户信息  /user_update  POST
export const updateUserInfo = (data) => {
  return http.post("/user_update", {
    body: data
  })
}
// 收藏新闻  /store  POST
export const storeNews = (data) => {
  return http.post("/store", {
    body: data
  })
}
// 收藏新闻  /store  POST
export const removeStoreNews = (params) => {
  return http.get("/store_remove", {
    params: params
  })
}
// 获取登录者收藏列表  /store_list  GET
export const getStoreList = () => {
  return http.get("/store_list")
}
