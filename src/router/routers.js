import NotFund from "@/views/404";
import {lazy} from "react";

const routers = [
  {
    path: '/',
    name: "home",
    component: lazy(() => import("@/views/Home/index"))
  },
  {
    path: '/detail/:id',
    name: "Detail",
    component: lazy(() => import("@/views/Detail/index"))
  },
  {
    path: '/mine',
    name: "Mine",
    component: () => lazy(() => import("@/views/Mine/index")),
    children: [
      {
        path: '/mine/collect',
        name: "MyCollect",
        component: () => lazy(() => import("@/views/Mine/Children/MyCollect"))
      },
      {
        path: '/mine/update',
        name: "UpdateInfo",
        component: () => lazy(() => import("@/views/Mine/Children/UpdateInfo"))
      }
    ]
  },
  {
    path: '/login',
    name: "home",
    component: () => lazy(() => import("@/views/Login/index"))
  },
  {
    path: '*',
    name: "NotFund",
    component: () => NotFund
  }
]

export default routers
