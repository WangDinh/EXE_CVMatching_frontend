/* eslint-disable @typescript-eslint/no-explicit-any */
import { InboxOutlined } from '@ant-design/icons'
import type { TableProps, UploadProps } from 'antd'
import { App, Button, Form, Modal, Select, Skeleton, Space, Table, Tabs, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { createCV, deleteCV, getAllCV } from '~/app/api/cv'
import { getAllJob } from '~/app/api/job'

import DeleteButton from '~/app/components/shared/DeleteButton'
import PDFComponent from '~/app/components/shared/PDFComponent'

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

const CVPage: React.FC = () => {
  const { notification } = App.useApp()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [selected, setSelected] = useState<CVDataType>()
  const [cvs, setCVs] = useState<CVDataType[]>([])
  const [tableLoading, setTableLoading] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)
  const [addLoading, setAddLoading] = useState(false)
  const [jobs, setJobs] = useState<JobDataType[]>([])

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: () => {
      return false
    },
    showUploadList: true
  }
  const columns: TableProps<CVDataType>['columns'] = [
    {
      title: 'CV',
      dataIndex: 'file_cv_name',
      key: 'file_cv_name',
      render: (text) => <p>{text.split('_').slice(5).join('_')}</p>
    },
    {
      title: 'Position',
      dataIndex: 'apply_position',
      key: 'apply_position',
      align: 'center'
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      sorter: (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      defaultSortOrder: 'descend'
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
            deletePromise={async () => {
              try {
                const res = (await deleteCV(record.id_cv)) as any
                notification.info({
                  message: res.message,
                  placement: 'topRight'
                })
                setCVs((prevData) => prevData.filter((item) => item.id_cv !== record.id_cv))
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
        apply_jd_id: values.job,
        files_cv: values.files.map((v: any) => v.originFileObj)
      }
      console.log(data)
      const res = (await createCV(data)) as any
      console.log(res)
      const newArray = [...res.cv_list, ...cvs]
      setCVs(newArray)
      notification.info({
        message: res.message,
        description: `sucessful: ${res.count_sucessful}\nfailed: ${res.count_failed}`,
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
      const res = await getAllCV()
      setCVs(res)
      setTableLoading(false)
    }
    loadData()
  }, [])

  return (
    <div className='w-full h-full'>
      {/* <div style={{ marginBottom: 16 }}>
        <Button type='primary' onClick={handleOpenAddModal}>
          Add CV
        </Button>
      </div> */}
      <section className='bg-[#dbeef6] w-full'>
        <div className='grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28'>
          <div className='mr-auto place-self-center lg:col-span-7'>
            <h1 className='max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl'>
              Welcome to CV Page
              <br />
            </h1>
            <p className='max-w-2xl mb-6 font-light text-gray-700 lg:mb-8 md:text-lg lg:text-xl'>
              Please add CVs for jobs
            </p>
            <h2 className='font-bold text-2xl md:text-4xl tracking-tight mb-4 text-black'>Click here to add some CV</h2>
            <div className='w-full'>
              <button
                onClick={handleOpenAddModal}
                className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                type='button'
              >
                Add new CV
              </button>
            </div>
          </div>
          <div className='hidden lg:mt-0 lg:col-span-5 lg:flex'>
            <img src='/cv_anhnen.png' alt='hero image' />
          </div>
        </div>
      </section>
      <h1 className='w-full my-2 text-4xl font-bold leading-tight text-center text-gray-800 pt-8'>
        Some Popular Techinal Skill
      </h1>
      <div className='w-full mb-9'>
        <div className='h-1 mx-auto bg-gradient w-64 opacity-25 my-0 py-0 rounded-t'></div>
      </div>
      <section className='bg-white  p-5 w-full'>
        <div className='max-w-screen-xl px-4 mx-auto'>
          <div className='grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 sm:grid-cols-3 lg:grid-cols-6'>
            <a href='#' className='flex items-center lg:justify-center'>
              <img className='w-50 hover:text-gray-900 ' src='/GitHub-Logo.png' />
            </a>
            <a href='#' className='flex items-center lg:justify-center'>
              <img className='w-50 hover:text-gray-900 ' src='/python_logo.png' />
            </a>
            <a href='#' className='flex items-center lg:justify-center'>
              <img className='w-50 hover:text-gray-900 ' src='/C++.png' />
            </a>

            <a href='#' className='flex items-center lg:justify-center'>
              <a href='#' className='flex items-center lg:justify-center'>
                <img className='w-50 hover:text-gray-900 ' src='/Node_js.png' />
              </a>
            </a>
            <a href='#' className='flex items-center lg:justify-center'>
              <a href='#' className='flex items-center lg:justify-center'>
                <img className='w-50 hover:text-gray-900 ' src='/docker.png' />
              </a>
            </a>
            <a href='#' className='flex items-center lg:justify-center'>
              <a href='#' className='flex items-center lg:justify-center'>
                <img className='w-50 hover:text-gray-900 ' src='/java.png' />
              </a>
            </a>
            <a href='#' className='flex items-center lg:justify-center'>
              <a href='#' className='flex items-center lg:justify-center'>
                <img className='w-50 hover:text-gray-900 ' src='/Pytorch.png' />
              </a>
            </a>
            <a href='#' className='flex items-center lg:justify-center'>
              <a href='#' className='flex items-center lg:justify-center'>
                <img className='w-50 hover:text-gray-900 ' src='/Tensorflow.png' />
              </a>
            </a>
            <a href='#' className='flex items-center lg:justify-center'>
              <a href='#' className='flex items-center lg:justify-center'>
                <img className='w-50 hover:text-gray-900 ' src='/react.png' />
              </a>
            </a>
            <a href='#' className='flex items-center lg:justify-center'>
              <a href='#' className='flex items-center lg:justify-center'>
                <img className='w-50 hover:text-gray-900 ' src='/html-css-js.png' />
              </a>
            </a>
            <a href='#' className='flex items-center lg:justify-center'>
              <a href='#' className='flex items-center lg:justify-center'>
                <img className='w-50 hover:text-gray-900 ' src='/PHP.png' />
              </a>
            </a>
            <a href='#' className='flex items-center lg:justify-center'>
              <a href='#' className='flex items-center lg:justify-center'>
                <img className='w-50 hover:text-gray-900 ' src='/Ruby.png' />
              </a>
            </a>
          </div>
        </div>
      </section>
      <h1 className='w-full my-2 text-4xl font-bold leading-tight text-center text-gray-800 pt-8'>CV</h1>
      <div className='w-full mb-5'>
        <div className='h-1 mx-auto bg-gradient w-64 opacity-25 my-0 py-0 rounded-t'></div>
      </div>
      <Modal
        title='Create CV'
        style={{ top: 50 }}
        open={openAddModal}
        onOk={() => setOpenAddModal(false)}
        onCancel={() => setOpenAddModal(false)}
        footer={null}
      >
        <Skeleton loading={modalLoading} active paragraph={{ rows: 6 }}>
          <Form
            form={form}
            onFinish={onFinish}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            layout='horizontal'
            style={{ maxWidth: 600 }}
          >
            <Form.Item label='Job' name='job'>
              <Select
                size='large'
                placeholder={'Select job'}
                options={jobs.map((job) => ({
                  value: job.id_jd,
                  label: job.position_applied_for
                }))}
              />
            </Form.Item>
            <Form.Item label='Your CV'>
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
        title={selected?.file_cv_name.split('_').slice(5).join('_')}
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={[
          <Button key='back' onClick={() => setOpen(false)}>
            Quay lại
          </Button>
        ]}
      >
        <Tabs
          defaultActiveKey='1'
          items={[
            {
              key: '1',
              label: 'PDF',
              children: <PDFComponent file={selected?.file_cv_url} />
            },
            {
              key: '2',
              label: 'Content',
              children: <div className='whitespace-pre-line break-words'>{selected?.cv_content}</div>
            }
          ]}
        />
      </Modal>
      <Table
        bordered
        style={{ padding: '50px' }}
        loading={tableLoading}
        rowKey={'id_cv'}
        // onRow={(record) => {
        //   return {
        //     onClick: () => {
        //       setSelected(record)
        //       setOpen(true)
        //     }
        //   }
        // }}
        columns={columns}
        dataSource={cvs}
        pagination={{ pageSize: 8 }}
      />
    </div>
  )
}

export default CVPage
