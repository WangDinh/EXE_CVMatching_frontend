import { ConfigProvider, Menu, MenuProps } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import useScrollPosition from '~/app/hooks/useScrollPosition'

const CommonHeader: React.FC = () => {
  const { isTop } = useScrollPosition()
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to='/' className={`${!isTop ? '!text-black' : '!text-white'}`}>
          Home
        </Link>
      )
    },
    {
      key: '2',
      label: <p className={`${!isTop ? '!text-black' : '!text-white'}`}>Features</p>,
      children: [
        {
          key: '2a',
          label: (
            <Link to='/feature/job' className={`${!isTop && '!text-black'}`}>
              Job
            </Link>
          )
        },
        {
          key: '2b',
          label: (
            <Link to='/feature/cv' className={`${!isTop && '!text-black'}`}>
              CV
            </Link>
          )
        },
        {
          key: '2c',
          label: (
            <Link to='/feature/matchingcv' className={`${!isTop && '!text-black'}`}>
              Matching Resumes
            </Link>
          )
        },
        {
          key: '2d',
          label: (
            <Link to='/feature/exam' className={`${!isTop && '!text-black'}`}>
              Exam
            </Link>
          )
        }
      ]
    },
    {
      key: '3',
      label: <p className={`${!isTop ? '!text-black' : '!text-white'}`}>About Us</p>
    },
    {
      key: '4',
      label: <p className={`${!isTop ? '!text-black' : '!text-white'}`}>Contact</p>
    }
  ]
  return (
    <header>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 9999999,
          width: '100%'
        }}
      >
        <div className='hidden lg:block border-b-[1px] border-solid border-[#c96943]'>
          <div className='container mx-auto'>
            <div className='flex flex-wrap items-center'>
              <div className='flex-1'>
                <ul className='text-white h-fit'>
                  <li className='inline-block border-solid border-r-[1px] border-[#c96943]'>
                    <a
                      style={{ transition: 'all .3s ease-out 0s' }}
                      href='#'
                      className='flex items-center justify-center w-[50px] h-[40px]  text-center hover:bg-[hsla(0,0%,100%,.4)] hover:!text-white'
                    >
                      <svg
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth='0'
                        viewBox='0 0 320 512'
                        height='1em'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z'></path>
                      </svg>
                    </a>
                  </li>
                  <li className='inline-block border-solid border-r-[1px] border-[#c96943]'>
                    <a
                      style={{ transition: 'all .3s ease-out 0s' }}
                      href='#'
                      className='flex items-center justify-center w-[50px] h-[40px]  text-center hover:bg-[hsla(0,0%,100%,.4)] hover:!text-white'
                    >
                      <svg
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth='0'
                        viewBox='0 0 512 512'
                        height='1em'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z'></path>
                      </svg>
                    </a>
                  </li>
                  <li className='inline-block border-solid border-r-[1px] border-[#c96943]'>
                    <a
                      style={{ transition: 'all .3s ease-out 0s' }}
                      href='#'
                      className='flex items-center justify-center w-[50px] h-[40px]  text-center hover:bg-[hsla(0,0%,100%,.4)] hover:!text-white'
                    >
                      <svg
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth='0'
                        viewBox='0 0 448 512'
                        height='1em'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z'></path>
                      </svg>
                    </a>
                  </li>
                  <li className='inline-block border-solid border-r-[1px] border-[#c96943]'>
                    <a
                      style={{ transition: 'all .3s ease-out 0s' }}
                      href='#'
                      className='flex items-center justify-center w-[50px] h-[40px]  text-center hover:bg-[hsla(0,0%,100%,.4)] hover:!text-white'
                    >
                      <svg
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth='0'
                        viewBox='0 0 384 512'
                        height='1em'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z'></path>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
              <div className='flex-1'>
                <ul className='text-white h-fit float-right px-[16px]'>
                  <li className='inline-block ml-[30px] pl-[20px]'>
                    <a
                      style={{ transition: 'all .3s ease-out 0s' }}
                      href='#'
                      className='flex gap-2 items-center justify-center h-[40px]  text-center  hover:!text-white'
                    >
                      <svg
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth='0'
                        viewBox='0 0 512 512'
                        height='1em'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z'></path>
                      </svg>
                      (+84) 918 193 133
                    </a>
                  </li>
                  <li className='inline-block border-solid border-l-[1px] border-[#c96943] ml-[30px] pl-[20px]'>
                    <a
                      style={{ transition: 'all .3s ease-out 0s' }}
                      href='#'
                      className='flex gap-2 items-center justify-center h-[40px]  text-center  hover:!text-white'
                    >
                      <svg
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth='0'
                        viewBox='0 0 512 512'
                        height='1em'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z'></path>
                      </svg>
                      FA.DN@fpt.com
                    </a>
                  </li>
                  <li className='inline-block border-solid border-l-[1px]  border-[#c96943] ml-[30px] pl-[20px]'>
                    <a
                      style={{ transition: 'all .3s ease-out 0s' }}
                      href='#'
                      className='flex gap-2 items-center justify-center h-[40px]  text-center  hover:!text-white'
                    >
                      <svg
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth='0'
                        viewBox='0 0 512 512'
                        height='1em'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'></path>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          style={
            !isTop
              ? {
                  position: 'fixed',
                  top: 0,
                  zIndex: 1,
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  animation: 'fadeInDown .9s ease-in-out 0s 1 normal none running',
                  boxShadow: '0 0 60px 0 rgba(0,0,0,.07)'
                }
              : {}
          }
        >
          <div className='container mx-auto'>
            <div className='flex flex-wrap items-center'>
              <div className='flex-1'>
                <img src='FSA_logo.png' className='h-full w-[150px]' />
              </div>
              <div className='flex-1'>
                <ConfigProvider
                  theme={{
                    components: {
                      Menu: {
                        darkItemBg: 'transparent',
                        itemBg: 'transparent',
                        itemSelectedBg: '#616165',
                        itemHoverBg: '#616165',
                        itemColor: 'black',
                        darkItemSelectedColor: 'black',
                        itemHoverColor: 'black',
                        horizontalItemHoverColor: 'red'
                      }
                    }
                  }}
                >
                  <Menu
                    theme='light'
                    mode='horizontal'
                    items={items}
                    selectedKeys={[]}
                    className='w-full flex justify-end items-center  font-bold !text-[700] font-sizes-[30px] !border-none text-[15px] text-white'
                    style={{
                      color: isTop ? 'white' : 'black',
                      flex: 1,
                      minWidth: 0,
                      backgroundColor: isTop ? 'transparent' : 'white'
                    }}
                  />
                </ConfigProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default CommonHeader
