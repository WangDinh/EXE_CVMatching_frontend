import { Outlet } from 'react-router-dom'

import { Layout } from 'antd'
import React from 'react'
import CommonFooter from './footer'
import CommonHeader from './header'

const { Content } = Layout

const CommonLayout: React.FC = () => {
  return (
    <Layout className='min-h-full'>
      <CommonHeader />
      <Content className='h-fit'>
        <Outlet />
      </Content>
      <CommonFooter />
    </Layout>
  )
}

export default CommonLayout
