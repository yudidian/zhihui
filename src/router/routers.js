import NotFund from '@/views/404'
import {lazy} from 'react'
import {Navigate} from 'react-router-dom'

const routers = [
  {
    path: '/',
    name: '/',
    component: () => <Navigate to="/home"></Navigate>,
    meta: {}
  },
  {
    path: '/home',
    name: 'home',
    component: lazy(() => import('@/views/Home/index')),
    meta: {}
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: lazy(() => import('@/views/Detail/index')),
    meta: {}
  },
  {
    path: '/mine',
    name: 'Mine',
    component: lazy(() => import('@/views/Mine/index')),
    meta: {}
  },
  {
    path: '/collect',
    name: 'MyCollect',
    component: lazy(() => import('@/views/Mine/Children/MyCollect')),
    meta: {}
  },
  {
    path: '/update',
    name: 'UpdateInfo',
    component: lazy(() => import('@/views/Mine/Children/UpdateInfo')),
    meta: {}
  },
  {
    path: '/login',
    name: 'Login',
    component: lazy(() => import('@/views/Login/index')),
    meta: {}
  },
  {
    path: '*',
    name: 'NotFund',
    component: () => <NotFund />,
    meta: {}
  }
]

export default routers
