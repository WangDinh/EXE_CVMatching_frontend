/* eslint-disable @typescript-eslint/no-explicit-any */
import { InboxOutlined } from '@ant-design/icons'
import type { TableProps, UploadProps } from 'antd'
import { App, Button, Form, Input, Modal, Progress, Skeleton, Space, Table, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { createJob, deleteJob, getAllJob } from '~/app/api/job'

import DeleteButton from '~/app/components/shared/DeleteButton'

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

const JobPage: React.FC = () => {
  const { notification } = App.useApp()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [selected, setSelected] = useState<JobDataType>()
  const [tableLoading, setTableLoading] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)
  const [addLoading, setAddLoading] = useState(false)
  const [jobs, setJobs] = useState<JobDataType[]>([])

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    beforeUpload: () => {
      return false
    },
    showUploadList: true
  }
  const columns: TableProps<JobDataType>['columns'] = [
    {
      title: 'Position Applied For',
      dataIndex: 'position_applied_for',
      key: 'position_applied_for'
    },
    {
      title: 'Have Question Tests',
      dataIndex: 'have_question_tests',
      key: 'have_question_tests',
      align: 'center',
      render: (text) =>
        text ? (
          <Progress type='circle' percent={100} size={30} />
        ) : (
          <Progress type='circle' percent={100} size={30} status='exception' />
        )
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      defaultSortOrder: 'descend',
      align: 'center'
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            type='primary'
            onClick={(event) => {
              event.stopPropagation()
              setSelected(record)
              setOpen(true)
            }}
          >
            Detail
          </Button>
          <DeleteButton
            description='This action will delete all CV of this Job'
            deletePromise={async () => {
              try {
                const res = (await deleteJob(record.id_jd)) as any
                notification.info({
                  message: res.message,
                  placement: 'topRight'
                })
                setJobs((prevData) => prevData.filter((item) => item.id_jd !== record.id_jd))
              } catch (e) {
                console.log(e)
              }
            }}
          />
        </Space>
      )
    }
  ]

  const handleOpenAddModal = async () => {
    try {
      setModalLoading(true)
      setOpenAddModal(true)
      const res = await getAllJob()
      setJobs(res)
    } catch (e) {
      console.log(e)
    } finally {
      setModalLoading(false)
    }

    setTimeout(() => {
      setModalLoading(false)
    }, 5000)
  }

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values)
    try {
      setAddLoading(true)
      const data = {
        position_applied_for: values.job,
        file_jd: values.files[0].originFileObj
      }

      const res = (await createJob(data)) as any

      const newArray = [...jobs]
      newArray.unshift(res.jd_data)

      setJobs(newArray)
      notification.info({
        message: res.message,
        // description: `sucessful: ${res.count_sucessful}\nfailed: ${res.count_failed}`,
        placement: 'topRight'
      })
      setOpenAddModal(false)
    } catch (e: any) {
      console.log(e)
    } finally {
      setAddLoading(false)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setTableLoading(true)
      const res = await getAllJob()
      setJobs(res)
      setTableLoading(false)
    }
    loadData()
  }, [])

  return (
    <div className='w-full h-full'>
      {/* <div style={{ marginBottom: 16 }}>
        <Button type='primary' onClick={handleOpenAddModal}>
          Add Job
        </Button>
      </div> */}
      <section className='bg-[#dbeef6] w-full'>
        <div className='grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28'>
          <div className='mr-auto place-self-center lg:col-span-7'>
            <h1 className='max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl '>
              Welcome to
              <br />
              Job description Page
            </h1>
            <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl'>
              Make sure the jobs you add are reputable and have data from major job search sites in the world in general
              or Vietnam in particular.
            </p>
            <h2 className='font-bold text-2xl md:text-4xl tracking-tight mb-4 text-black'>Click here to add new job</h2>
            <div className='w-full'>
              <button
                onClick={handleOpenAddModal}
                className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                type='button'
              >
                Add new Job
              </button>
            </div>
          </div>
          <div className='hidden lg:mt-0 lg:col-span-5 lg:flex'>
            <img src='/jobdescription.png' alt='hero image' />
          </div>
        </div>
      </section>
      <h1 className='w-full my-2 text-4xl font-bold leading-tight text-center text-gray-800 pt-8'>
        Information taken from
      </h1>
      <div className='w-full mb-9'>
        <div className='h-1 mx-auto bg-gradient w-64 opacity-25 my-0 py-0 rounded-t'></div>
      </div>
      <section className='bg-white p-5 w-full'>
        <div className='max-w-screen-xl px-4 mx-auto'>
          <div className='grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 sm:grid-cols-3 lg:grid-cols-6'>
            <a href='#' className='flex items-center lg:justify-center'>
              <img className='w-50 hover:text-gray-900' src='/FPT_software.png' />
            </a>
            <a href='#' className='flex items-center lg:justify-center'>
              <img className='w-50 hover:text-gray-900' src='/linkdin.png' />
            </a>
            <a href='#' className='flex items-center lg:justify-center'>
              <img className='w-50 hover:text-gray-900' src='/glint.png' />
            </a>

            <a href='#' className='flex items-center lg:justify-center'>
              <a href='#' className='flex items-center lg:justify-center'>
                <img className='w-50 hover:text-gray-900 ' src='/topdev.png' />
              </a>
            </a>
            <a href='#' className='flex items-center lg:justify-center'>
              <a href='#' className='flex items-center lg:justify-center'>
                <img className='w-50 hover:text-gray-900 ' src='/freelancer.png' />
              </a>
            </a>
            <a href='#' className='flex items-center lg:justify-center'>
              <a href='#' className='flex items-center lg:justify-center'>
                <img className='w-50 hover:text-gray-900 ' src='/indeed.png' />
              </a>
            </a>
          </div>
        </div>
      </section>
      <h1 className='w-full my-2 text-4xl font-bold leading-tight text-center text-gray-800 pt-8'>Job</h1>
      <div className='w-full mb-5'>
        <div className='h-1 mx-auto bg-gradient w-64 opacity-25 my-0 py-0 rounded-t'></div>
      </div>
      <Modal
        title='Create Job'
        style={{ top: 50 }}
        width={700}
        open={openAddModal}
        onOk={() => setOpenAddModal(false)}
        onCancel={() => setOpenAddModal(false)}
        footer={null}
      >
        <Skeleton loading={modalLoading} active paragraph={{ rows: 6 }}>
          <Form
            form={form}
            onFinish={onFinish}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            layout='horizontal'
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              label='Position Applied For'
              name='job'
              rules={[{ required: true, message: 'Please input job!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label='File Descrition'>
              <Form.Item name='files' valuePropName='fileList' getValueFromEvent={normFile} noStyle>
                <Upload.Dragger {...props}>
                  <p className='ant-upload-drag-icon'>
                    <InboxOutlined />
                  </p>
                  <p className='ant-upload-text'>Click or drag file to this area to upload</p>
                  <p className='ant-upload-hint'>Support for a single or bulk upload.</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 15 }}>
              <Space className='w-full justify-end' align='end'>
                <Button htmlType='button' onClick={() => setOpenAddModal(false)}>
                  Cancel
                </Button>
                <Button loading={addLoading} type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Skeleton>
      </Modal>
      <Modal
        style={{ top: 20 }}
        title={`${selected?.position_applied_for}`}
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={[
          <Button key='back' onClick={() => setOpen(false)}>
            Back
          </Button>
        ]}
      >
        <div className='whitespace-pre-line break-words'>{selected?.jd_text}</div>
      </Modal>
      <Table
        bordered
        style={{ padding: '50px' }}
        loading={tableLoading}
        rowKey={'id_jd'}
        // onRow={(record) => {
        //   return {
        //     onClick: () => {
        //       setSelected(record)
        //       setOpen(true)
        //     }
        //   }
        // }}
        columns={columns}
        dataSource={jobs}
        pagination={{ pageSize: 8 }}
      />
    </div>
  )
}

export default JobPage
