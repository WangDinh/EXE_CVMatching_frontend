import { CVPage, ExamPage, JobPage, LandingPage, MatchingCV, NotFoundPage, SettingPage } from 'pages'
import { createBrowserRouter, json } from 'react-router-dom'
import RootBoundary from '../RootBoundary'
import { FeatureLayout } from '../layouts'
import CommonLayout from '../layouts/Common'
const router = createBrowserRouter([
  {
    path: '/',
    element: <CommonLayout />,
    errorElement: <RootBoundary />,
    children: [
      {
        index: true,
        loader: async ({ params }) => {
          console.log('Call API here')
          console.log('params: ', params)
          const data = { message: 'Hello World' }
          // throw new Response('Not Found', { status: 404 })
          return json(data, { status: 200 })
        },
        element: <LandingPage />
      }
    ]
  },
  {
    path: '/feature',
    element: <FeatureLayout />,
    errorElement: <RootBoundary />,
    children: [
      {
        path: 'matchingcv',
        element: <MatchingCV />
      },
      {
        path: 'job',
        element: <JobPage />
      },
      {
        path: 'cv',
        element: <CVPage />
      },
      {
        path: 'exam',
        element: <ExamPage />
      },
      {
        path: 'setting',
        element: <SettingPage />
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])

export default router
