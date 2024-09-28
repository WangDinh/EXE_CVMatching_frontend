import { Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import 'swiper/css/bundle'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import FadeIn from '../shared/FadeIn'

const { Title } = Typography

const IntroComponent: React.FC = () => {
  return (
    <section id='intro'>
      <div className='w-full py-10'>
        <div className='w-full py-10 snap-start bg-[#F9FAFF]'>
          <div className='container mx-auto'>
            <FadeIn className='space-y-6 text-center' delay={200} transitionDuration={500}>
              <Title level={2} className='!text-4xl text-center !font-[700]'>
                <span className='text-[rgb(21,105,178)]'>Information </span>
                <span className='text-[rgb(234,88,12)]'>Taken </span>
                <span className='text-[rgb(36,178,75)]'>From </span>
              </Title>
            </FadeIn>
          </div>
        </div>
        <Swiper
          autoplay={{
            delay: 0,
            disableOnInteraction: false
          }}
          modules={[Autoplay]}
          loop={true}
          centeredSlides={true}
          spaceBetween={64}
          speed={2000}
          noSwiping={true}
          noSwipingClass='swiper-slide'
          slidesPerView='auto'
          onAutoplay={(swiper) => {
            // swiper.autoplay.timeLeft = 0

            console.log(swiper)
          }}
        >
          <SwiperSlide className='!w-auto !h-auto'>
            <div className='flex w-full h-full items-center justify-center'>
              <img src='fptsopftware.png' alt='Client 01' width='110' height='21' />
            </div>
          </SwiperSlide>
          <SwiperSlide className='!w-auto !h-auto'>
            <div className='flex w-full h-full items-center justify-center'>
              <img src='linkedin.png' alt='Client 01' width='110' height='21' />
            </div>
          </SwiperSlide>
          <SwiperSlide className='!w-auto !h-auto'>
            <div className='flex w-full h-full items-center justify-center'>
              <img src='freelancer.png' alt='Client 01' width='110' height='21' />
            </div>
          </SwiperSlide>
          <SwiperSlide className='!w-auto !h-auto'>
            <div className='flex w-full h-full items-center justify-center'>
              <img src='glint.png' alt='Client 01' width='110' height='21' />
            </div>
          </SwiperSlide>
          <SwiperSlide className='!w-auto !h-auto'>
            <div className='flex w-full h-full items-center justify-center'>
              <img src='topdev.png' alt='Client 01' width='110' height='21' />
            </div>
          </SwiperSlide>
          <SwiperSlide className='!w-auto !h-auto'>
            <div className='flex w-full h-full items-center justify-center'>
              <img src='indeed.png' alt='Client 01' width='110' height='21' />
            </div>
          </SwiperSlide>
          <SwiperSlide className='!w-auto !h-auto'>
            <div className='flex w-full h-full items-center justify-center'>
              <img src='GitHub-Logo.png' alt='Client 01' width='110' height='21' />
            </div>
          </SwiperSlide>
          <SwiperSlide className='!w-auto !h-auto'>
            <div className='flex w-full h-full items-center justify-center'>
              <img src='glint.png' alt='Client 01' width='110' height='21' />
            </div>
          </SwiperSlide>
          <SwiperSlide className='!w-auto !h-auto'>
            <div className='flex w-full h-full items-center justify-center'>
              <img src='freelancer.png' alt='Client 01' width='110' height='21' />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className='w-full py-10 snap-start bg-[#F9FAFF]'>
        <div className='container mx-auto'>
          <FadeIn className='space-y-6 text-center' delay={200} transitionDuration={500}>
            <Title level={2} className='!text-4xl text-center !font-[700]'>
              <span className='text-[rgb(21,105,178)]'>Ranksume </span>
              <span className='text-[rgb(234,88,12)]'>of </span>
              <span className='text-[rgb(36,178,75)]'>EZ </span>
            </Title>
            <p>
              This is my team's product and we have some features about my project &amp; CVs, Job description and
              MatchingCV.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className='px-[100px] py-10'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-3 gap-5'>
            <div>
              <FadeIn className='group text-center' delay={200} transitionDuration={1000}>
                <div className='relative'>
                  <Link
                    preventScrollReset={false}
                    className='overflow-hidden relative block before:hover:rounded-lg before:w-full before:h-full  group-hover:before:bg-gradient-to-r before:z-[1] to-[#ffa724dc] from-[#fa903a] to-100% from-0% before:absolute before:top-0 before:left-0 duration-300 group-hover:before:opacity-80'
                    to='/feature/cv'
                  >
                    <img
                      className='rounded-lg max-w-full group-hover:scale-[1.05] duration-300 h-[300px]'
                      src='/cv_anhnen.png'
                      alt=''
                    />
                    <span className='hover:bg-[#1f1841] hover:text-[#fff] text-[#1f1841] group-hover:visible m-auto group-hover:top-[50%] invisible absolute w-[215px] bg-[#fff] translate-y-[-50%] duration-300 top-[60%] p-[20px_30px] font-[700] rounded-[30px] left-0 uppercase right-0 z-10'>
                      View Demo
                    </span>
                  </Link>
                </div>
                <div className='pt-[35px]'>
                  <h4 className='text-[22px] font-[700] capitalize'>
                    <Link preventScrollReset={false} to='/feature/cvs'>
                      Resume
                    </Link>
                  </h4>
                </div>
              </FadeIn>
            </div>
            <div>
              <FadeIn className='group text-center' delay={200} transitionDuration={1000}>
                <div className='relative'>
                  <Link
                    preventScrollReset={false}
                    className='before:hover:rounded-lg overflow-hidden relative block before:w-full before:h-full  group-hover:before:bg-gradient-to-r before:z-[1] to-[#ffa724dc] from-[#fa903a] to-100% from-0% before:absolute before:top-0 before:left-0 duration-300 group-hover:before:opacity-80'
                    to='/feature/job'
                  >
                    <img
                      className='max-w-full group-hover:scale-[1.05] duration-300 h-[300px]'
                      src='/jobdescription.png'
                      alt=''
                    />
                    <span className='hover:bg-[#1f1841] hover:text-[#fff] text-[#1f1841] group-hover:visible m-auto group-hover:top-[50%] invisible absolute w-[215px] bg-[#fff] translate-y-[-50%] duration-300 top-[60%] p-[20px_30px] font-[700] rounded-[30px] left-0 uppercase right-0 z-10'>
                      View Demo
                    </span>
                  </Link>
                </div>
                <div className='pt-[35px]'>
                  <h4 className='text-[22px] font-[700] capitalize'>
                    <Link preventScrollReset={false} to='/feature/job'>
                      Job
                    </Link>
                  </h4>
                </div>
              </FadeIn>
            </div>
            <div>
              <FadeIn className='group text-center' delay={200} transitionDuration={1000}>
                <div className='relative'>
                  <Link
                    preventScrollReset={false}
                    className='before:hover:rounded-lg overflow-hidden relative block before:w-full before:h-full  group-hover:before:bg-gradient-to-r before:z-[1] to-[#ffa724dc] from-[#fa903a] to-100% from-0% before:absolute before:top-0 before:left-0 duration-300 group-hover:before:opacity-80'
                    to='/feature/matchingcv'
                  >
                    <img
                      className='rounded-lg max-w-full group-hover:scale-[1.05] duration-300 h-[300px]'
                      src='/match.png'
                      alt=''
                    />
                    <span className='hover:bg-[#1f1841] hover:text-[#fff] text-[#1f1841] group-hover:visible m-auto group-hover:top-[50%] invisible absolute w-[215px] bg-[#fff] translate-y-[-50%] duration-300 top-[60%] p-[20px_30px] font-[700] rounded-[30px] left-0 uppercase right-0 z-10'>
                      View Demo
                    </span>
                  </Link>
                </div>
                <div className='pt-[35px]'>
                  <h4 className='text-[22px] font-[700] capitalize'>
                    <Link to='/feature/matchingcv' preventScrollReset={false}>
                      CVs matcher
                    </Link>
                  </h4>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default IntroComponent
