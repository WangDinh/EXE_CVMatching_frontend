/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Popconfirm } from 'antd'
import { useState } from 'react'

const DeleteButton: React.FC<{ deletePromise: () => Promise<any>; description?: string }> = ({
  deletePromise,
  description
}) => {
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showPopconfirm = () => {
    setOpen(true)
  }

  const handleOk = async () => {
    try {
      setConfirmLoading(true)
      await deletePromise()
      setOpen(false)
    } catch (e) {
      console.log(e)
    } finally {
      setConfirmLoading(false)
    }
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }
  return (
    <Popconfirm
      title='Are you sure ? '
      description={description}
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      <Button type='link' danger className='p-0' onClick={showPopconfirm}>
        Delete
      </Button>
    </Popconfirm>
  )
}

export default DeleteButton
