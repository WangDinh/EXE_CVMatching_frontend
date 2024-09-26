/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from 'antd'
import { useState } from 'react'

const CBButton: React.FC<{
  cb: () => Promise<any>
  type?: 'link' | 'text' | 'primary' | 'default' | 'dashed' | undefined
  text: string
  ghost?: boolean
  danger?: boolean
}> = ({ cb, text, type, ghost = false, danger }) => {
  const [loading, setLoading] = useState(false)
  const callBack = async () => {
    try {
      setLoading(true)
      await cb()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      danger={danger}
      ghost={ghost}
      loading={loading}
      type={type}
      onClick={(event) => {
        event.stopPropagation()
        callBack()
      }}
    >
      {text}
    </Button>
  )
}

export default CBButton
