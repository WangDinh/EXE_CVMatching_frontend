/* eslint-disable react-hooks/exhaustive-deps */
import { FloatButton } from 'antd'
import React from 'react'
import BackgroundComponent from '~/app/components/LandingPage/BackgroundComponent'
import HeroComponent from '~/app/components/LandingPage/HeroComponent'
import IntroComponent from '~/app/components/LandingPage/IntroComponent'

const LandingPage: React.FC = () => {
  return (
    <>
      <HeroComponent />
      <IntroComponent />
      <BackgroundComponent />
      <FloatButton.BackTop duration={50} />
    </>
  )
}
export default LandingPage
