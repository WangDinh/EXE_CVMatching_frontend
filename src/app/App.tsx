import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App as AntApp, ConfigProvider } from 'antd'
import locale from 'antd/locale/en_US'
import { RouterProvider } from 'react-router-dom'
import '../locales/i18n'
import router from './router'

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              darkItemBg: 'transparent',
              itemBg: 'transparent',
              itemSelectedBg: '#616165',
              itemHoverBg: '#616165',
              itemColor: 'white',
              itemSelectedColor: 'white',
              itemHoverColor: 'white'
            },
            Layout: {
              siderBg: '#1f2937'
            }
          }
        }}
        locale={locale}
      >
        <AntApp>
          <RouterProvider router={router} />
        </AntApp>
      </ConfigProvider>
    </QueryClientProvider>
  )
}
export default App
