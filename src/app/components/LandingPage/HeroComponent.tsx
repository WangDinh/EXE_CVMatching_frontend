import { Button, Typography } from 'antd'
import React from 'react'
import { Trans } from 'react-i18next'
import useScrollTo from '~/app/hooks/useScrollTo'
import FadeIn from '../shared/FadeIn'

const HeroComponent: React.FC = () => {
  const { handleScrollTo } = useScrollTo()
  return (
    <section className='relative'>
      <div className='absolute top-0 left-0 w-full h-full opacity-[.6] z-10 bg-hero-gradient' />
      <div className='relative flex items-center justify-center overflow-hidden min-h-screen py-[100px] z-1 bg-hero-pattern bg-center bg-cover'>
        <div className='container mx-auto relative pt-20 z-20'>
          <FadeIn className='space-y-6' delay={100} transitionDuration={500}>
            <Typography.Title level={2} className='!text-[#fff] !text-6xl text-center !font-[700] z-30 text-shadow'>
              <Trans i18nKey='title'>
                Ranksume - Matching To Your Dream Job <br /> FSA Product
              </Trans>
            </Typography.Title>
            <p className='text-center !text-[20px] font-normal text-[#fff] z-30 text-shadow'>
              This is a tool that helps users filter thousands of CVs using AI for a job they offer, helping to reduce
              CV filtering time for employers.
            </p>
            <div className='w-full text-center'>
              <Button
                onClick={() => handleScrollTo('intro')}
                ghost
                size='large'
                className='min-w-40 px-10 h-14 hover:!bg-white hover:!border-white !text-white hover:!text-black !font-[700] z-20'
              >
                Explore Projects
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export default HeroComponent
