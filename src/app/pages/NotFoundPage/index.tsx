import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={
          <Button onClick={() => navigate('/')} type='primary'>
            Back Home
          </Button>
        }
      />
    </div>
  )
}
export default NotFoundPage
