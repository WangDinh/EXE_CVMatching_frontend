/* eslint-disable @typescript-eslint/no-explicit-any */
import { SaveOutlined } from '@ant-design/icons'
import { App, Button, Collapse, Divider, Input, Modal, Radio, Skeleton, Space, Table, TableProps } from 'antd'
import Title from 'antd/es/typography/Title'
import { Fragment, useEffect, useState } from 'react'
import { getAllJob } from '~/app/api/job'
import { deleteQuestion, getDetail, getQuestions, saveQuestion } from '~/app/api/qtretrieval'
import { deleteGQuestion, getGQuestions, saveGQuestion } from '~/app/api/quiz_gen'
import CBButton from '~/app/components/shared/CBButton'
import PDFComponent from '~/app/components/shared/PDFComponent'

const ExamPage: React.FC = () => {
  const { notification } = App.useApp()
  const [getQuestionLoading, setGetQuestionLoading] = useState(false)
  const [getQuestionModal, setGetQuestionModal] = useState(false)
  const [getGQuestionLoading, setGetGQuestionLoading] = useState(false)
  const [getGQuestionModal, setGetGQuestionModal] = useState(false)
  const [tableLoading, setTableLoading] = useState(false)
  const [jobs, setJobs] = useState<JobDataType[]>([])
  const [selected, setSelected] = useState<JobDataType>()
  const [selectedGen, setSelectedGen] = useState<JobDataType>()
  const [questions, setQuestions] = useState<QuestionMatch[]>([])
  const [gQuestions, setGQuestions] = useState<{ count: number; data: Question[] }>({
    count: 0,
    data: []
  })
  const [saveLoading, setSaveLoading] = useState(false)

  const [selectedDetail, setSelectedDetail] = useState<JobDataType>()
  const [selectedDetailLoading, setSelectedDetailLoading] = useState<boolean>(false)
  const [detailModal, setDetailModal] = useState<boolean>(false)
  const [detailData, setDetailData] = useState<any>()

  const columns: TableProps<JobDataType>['columns'] = [
    {
      title: 'Position Applied For',
      dataIndex: 'position_applied_for',
      key: 'position_applied_for'
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
          {!record.have_question_tests ? (
            <>
              <Button
                type='primary'
                onClick={(event) => {
                  event.stopPropagation()
                  setSelected(record)
                  setGetQuestionModal(true)
                }}
              >
                Lấy đề
              </Button>
              <Button
                type='primary'
                onClick={(event) => {
                  event.stopPropagation()
                  setSelectedGen(record)
                  setGetGQuestionModal(true)
                }}
              >
                Tạo đề
              </Button>
            </>
          ) : (
            <>
              <Button
                type='primary'
                onClick={(event) => {
                  event.stopPropagation()
                  setSelectedDetail(record)
                  setDetailModal(true)
                }}
              >
                Xem đề
              </Button>
              <CBButton
                danger={true}
                text='Xóa đề'
                type='primary'
                cb={async () => {
                  if (record.is_generate_question_tests) {
                    console.log('đề gen')
                    const res = (await deleteGQuestion({ id_jd: record.id_jd })) as any
                    notification.info({
                      message: res.message,
                      placement: 'topRight'
                    })
                    setTableLoading(true)
                    const res_job = await getAllJob()
                    setJobs(res_job)
                    setTableLoading(false)
                  } else {
                    console.log('đề lấy')
                    const res = (await deleteQuestion({ id_jd: record.id_jd })) as any
                    notification.info({
                      message: res.message,
                      placement: 'topRight'
                    })
                    setTableLoading(true)
                    const res_job = await getAllJob()
                    setJobs(res_job)
                    setTableLoading(false)
                  }
                }}
              />
            </>
          )}
        </Space>
      )
    }
  ]
  const genExtra = (q: QuestionMatch) => (
    <SaveOutlined
      onClick={async (event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation()
        if (selected) {
          const res = (await saveQuestion(selected.id_jd, q.question_tests_data.id_question_tests)) as any
          notification.info({
            message: res.message,
            placement: 'topRight'
          })
          setGetQuestionModal(false)
          setTableLoading(true)
          const res_job = await getAllJob()
          setJobs(res_job)
          setTableLoading(false)
        }
      }}
    />
  )
  const handleEditQuestion = (index: number, editedQuestion: any) => {
    setGQuestions((prev) => {
      return {
        count: prev.count,
        data: prev.data.map((e, i) => {
          if (i === index) {
            e.question = editedQuestion
          }
          return e
        })
      }
    })
  }
  const handleEditAnswer = (index: number, editedAnswer: any) => {
    setGQuestions((prev) => {
      return {
        count: prev.count,
        data: prev.data.map((e, i) => {
          if (i === index) {
            e.answer = editedAnswer
          }
          return e
        })
      }
    })
  }
  const handleEditExplain = (index: number, editedExplain: any) => {
    setGQuestions((prev) => {
      return {
        count: prev.count,
        data: prev.data.map((e, i) => {
          if (i === index) {
            e.explanation = editedExplain
          }
          return e
        })
      }
    })
  }
  const handleEditDomain = (index: number, editedDomain: any) => {
    setGQuestions((prev) => {
      return {
        count: prev.count,
        data: prev.data.map((e, i) => {
          if (i === index) {
            e.domain = editedDomain
          }
          return e
        })
      }
    })
  }
  const handleEditLevel = (index: number, editedLevel: any) => {
    setGQuestions((prev) => {
      return {
        count: prev.count,
        data: prev.data.map((e, i) => {
          if (i === index) {
            e.level = editedLevel
          }
          return e
        })
      }
    })
  }
  const handleEditChoice = (index: number, choiceIndex: number, editedChoice: any) => {
    setGQuestions((prev) => {
      return {
        count: prev.count,
        data: prev.data.map((e, i) => {
          if (i === index) {
            e.choices = e.choices?.map((c, ci) => {
              if (ci === choiceIndex) {
                c = editedChoice
              }
              return c
            })
          }
          return e
        })
      }
    })
  }

  const save = async () => {
    try {
      setSaveLoading(true)
      const res = (await saveGQuestion({
        json_quiz_gen: gQuestions,
        id_jd: selectedGen!.id_jd
      })) as any
      console.log(res)
      setGetGQuestionModal(false)
      notification.info({
        message: res.message,
        placement: 'topRight'
      })
      setTableLoading(true)
      const res_job = await getAllJob()
      setJobs(res_job)
      setTableLoading(false)
    } catch (e) {
      console.log(e)
    } finally {
      setSaveLoading(false)
    }
  }

  useEffect(() => {
    const getQusetionData = async () => {
      try {
        setGetQuestionLoading(true)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res = (await getQuestions({ id_jd: selected!.id_jd })) as any
        console.log(res)
        setQuestions(res.data_question_tests)
      } catch (e) {
        console.log(e)
      } finally {
        setGetQuestionLoading(false)
      }
    }

    if (selected) {
      getQusetionData()
    }
  }, [selected])

  useEffect(() => {
    const getQusetionData = async () => {
      try {
        setGetGQuestionLoading(true)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res = (await getGQuestions({ id_jd: selectedGen!.id_jd })) as any
        console.log(res)
        if (res.status_code && res.status_code === 400) {
          setSelectedGen(undefined)
          setGetGQuestionModal(false)
        } else {
          setGQuestions(res.json_quiz_gen)
        }
      } catch (e) {
        console.log(e)
      } finally {
        setGetGQuestionLoading(false)
      }
    }

    if (selectedGen) {
      getQusetionData()
    }
  }, [selectedGen])

  useEffect(() => {
    const getQusetionData = async () => {
      try {
        setSelectedDetailLoading(true)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res = (await getDetail({ id_jd: selectedDetail!.id_jd })) as any
        console.log(res)
        if (res.status_code && res.status_code === 400) {
          setDetailData(undefined)
          setDetailModal(false)
        } else {
          setDetailData(res)
        }
      } catch (e) {
        console.log(e)
      } finally {
        setSelectedDetailLoading(false)
      }
    }

    if (selectedDetail) {
      getQusetionData()
    }
  }, [selectedDetail])

  useEffect(() => {
    const loadData = async () => {
      setTableLoading(true)
      const res = await getAllJob()
      console.log(res)
      setJobs(res)
      setTableLoading(false)
    }
    loadData()
  }, [])

  return (
    <div className='w-full h-full'>
      <Modal
        width={1000}
        title={selected?.position_applied_for}
        style={{ top: 20 }}
        open={getQuestionModal}
        onOk={() => setGetQuestionModal(false)}
        onCancel={() => setGetQuestionModal(false)}
        footer={null}
      >
        <Skeleton loading={getQuestionLoading}>
          <Collapse
            items={questions.map((q, index) => ({
              key: index,
              label: `Question ${index + 1}`,
              children: q.data_question_tests_json ? (
                <div className='w-full space-y-5'>
                  {q.data_question_tests_json.data.map((el, index) => (
                    <Fragment key={index}>
                      <Title level={4}>
                        Question {index + 1}: {el.question}
                      </Title>

                      <div className='w-full grid grid-cols-2 gap-5'>
                        {el?.choices?.map((e, i) => (
                          <div key={i} className={el.answer === String.fromCharCode(65 + i) ? 'text-green-500' : ''}>
                            {e}
                          </div>
                        ))}
                      </div>
                      <Divider />
                    </Fragment>
                  ))}
                </div>
              ) : (
                <PDFComponent file={q.question_tests_data.question_tests_url} />
              ),
              extra: genExtra(q)
            }))}
          />
        </Skeleton>
      </Modal>
      <Modal
        width={1000}
        title={selectedDetail?.position_applied_for}
        style={{ top: 20 }}
        open={detailModal}
        onOk={() => setDetailModal(false)}
        onCancel={() => setDetailModal(false)}
        footer={null}
      >
        <Skeleton loading={selectedDetailLoading}>
          {detailData &&
            (detailData.exam_data ? (
              <div className='w-full space-y-5'>
                {detailData.exam_data.data.map((el: any, index: number) => (
                  <Fragment key={index}>
                    <Title level={4}>
                      Question {index + 1}: {el.question}
                    </Title>

                    <div className='w-full grid grid-cols-2 gap-5'>
                      {el?.choices?.map((e: any, i: number) => (
                        <div key={i} className={el.answer === String.fromCharCode(65 + i) ? 'text-green-500' : ''}>
                          {e}
                        </div>
                      ))}
                    </div>
                    <Divider />
                  </Fragment>
                ))}
              </div>
            ) : (
              <PDFComponent file={detailData.question_tests_url} />
            ))}
        </Skeleton>
      </Modal>
      <Modal
        width={1000}
        title={selected?.position_applied_for}
        style={{ top: 20 }}
        open={getGQuestionModal}
        onOk={() => {
          console.log(gQuestions)
          setGetGQuestionModal(false)
        }}
        onCancel={() => setGetGQuestionModal(false)}
        footer={[
          <Button key='back' onClick={() => setGetGQuestionModal(false)}>
            Cancel
          </Button>,
          <Button key='button' type='primary' loading={saveLoading} onClick={save}>
            Save
          </Button>
        ]}
      >
        <Skeleton loading={getGQuestionLoading}>
          <div className='w-full space-y-5'>
            {gQuestions?.data.map((el, index) => (
              <Fragment key={index}>
                <div className='space-y-5'>
                  <div>
                    Question {index + 1}
                    <Input.TextArea value={el.question} onChange={(e) => handleEditQuestion(index, e.target.value)} />
                  </div>

                  {el?.choices && (
                    <>
                      <Radio.Group
                        value={el.answer[0]}
                        onChange={(e) => handleEditAnswer(index, e.target.value)}
                        className='grid grid-cols-2 gap-5 mt-2'
                      >
                        {el?.choices?.map((ec, i) => (
                          <div
                            key={i}
                            className={`${el.answer[0] === String.fromCharCode(65 + i) ? 'text-green-500' : ''} flex gap-2 items-center`}
                          >
                            <Radio value={ec[0]} />
                            <Input value={ec} onChange={(e) => handleEditChoice(index, i, e.target.value)} />
                          </div>
                        ))}
                      </Radio.Group>
                      <div>
                        Explanation
                        <Input.TextArea
                          value={el.explanation}
                          onChange={(e) => handleEditExplain(index, e.target.value)}
                        />
                      </div>
                      <div>
                        Domain
                        <Input value={el.domain} onChange={(e) => handleEditDomain(index, e.target.value)} />
                      </div>
                      <div>
                        Level
                        <Input value={el.level} onChange={(e) => handleEditLevel(index, e.target.value)} />
                      </div>
                    </>
                  )}
                </div>

                <Divider />
              </Fragment>
            ))}
          </div>
        </Skeleton>
      </Modal>

      <Table
        bordered
        style={{ paddingLeft: '50px', paddingRight: '50px' }}
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

export default ExamPage
