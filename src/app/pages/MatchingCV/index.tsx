/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { DownOutlined } from '@ant-design/icons'
import { App, Button, Collapse, Dropdown, Form, Input, Modal, Select, Space, Table, TableProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { getAllCV } from '~/app/api/cv'
import { getAllJob } from '~/app/api/job'
import { matching, rematching } from '~/app/api/matcher'
import CBButonn from '~/app/components/shared/CBButton'
import { renderTagsByScore } from '~/utils/getTag'

const MatchingCV: React.FC = () => {
  const { notification } = App.useApp()
  const [form] = Form.useForm()
  const [jobs, setJobs] = useState<JobDataType[]>([])
  const [cvs, setCVs] = useState<CVDataType[]>([])
  const [selectedJob, setSelectedJob] = useState<string>()
  const [selectedCV, setSelectedCV] = useState<CVDataType>()
  const [tableLoading, setTableLoading] = useState(false)
  const [modalDetailOpen, setModalDetailOpen] = useState(false)
  const [matchAllLoading, setMatchAllLoading] = useState(false)
  const [value, setValue] = useState<any>(0)
  const [rematchAllLoading, setRematchAllLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const edu = Number(Form.useWatch('edu', form))
  const skill = Number(Form.useWatch('skill', form))
  const language = Number(Form.useWatch('language', form))
  const experience = Number(Form.useWatch('experience', form))
  const difficulty = Number(Form.useWatch('difficulty', form))
  const relevance = Number(Form.useWatch('relevance', form))
  const duration = Number(Form.useWatch('duration', form))

  const matchingCV = async (data: MatchDto) => {
    try {
      return await matching(data)
    } catch (error) {
      console.log(error)
    }
  }

  const matchingAllCV = async () => {
    setMatchAllLoading(true)
    const unmatchedCVs = cvs.filter((cv) => !cv.matched_status && cv.apply_jd_id === selectedJob)

    // Thực hiện hàm matchingCV cho mỗi mục không khớp
    await Promise.all(
      unmatchedCVs.map(async (cv) => {
        try {
          const res = (await matchingCV({
            id_jd: cv.apply_jd_id,
            id_cv: cv.id_cv,
            config_score: {
              education_score_config: {
                W_education_score: edu
              },
              language_score_config: {
                W_language_score: language
              },
              technical_score_config: {
                W_technical_score: skill
              },
              experience_score_config: {
                W_experience_score: experience,
                relevance_score_w: relevance,
                difficulty_score_w: difficulty,
                duration_score_w: duration
              }
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          })) as any
          if (res.status_code && res.status_code === 400) {
            notification.info({
              message: res.detail,
              placement: 'topRight'
            })
          } else {
            setCVs((prevCVs) => {
              return prevCVs.map((prevCv) => {
                if (prevCv.id_cv === cv.id_cv) {
                  return {
                    ...prevCv,
                    ...res.cv_data
                  }
                } else {
                  return prevCv
                }
              })
            })
          }
        } catch (error) {
          console.log(error)
        }
      })
    )
    setMatchAllLoading(false)
  }

  const rematchingCV = async (data: MatchDto) => {
    try {
      return await rematching(data)
    } catch (error) {
      console.log(error)
    }
  }
  const onChange = (e: any) => {
    console.log(e)
    setValue(e)
    // Cập nhật giá trị mặc định dựa trên tùy chọn được chọn
    switch (e) {
      case 0:
        form.setFieldsValue({
          edu: 0.05,
          skill: 0.35,
          language: 0.05,
          experience: 0.55,
          difficulty: 0.15,
          relevance: 0.8,
          duration: 0.05
        })
        break
      case 1:
        form.setFieldsValue({
          edu: 0.05,
          skill: 0.5,
          language: 0.05,
          experience: 0.4,
          difficulty: 0.15,
          relevance: 0.8,
          duration: 0.05
        })
        break
      case 2:
        form.setFieldsValue({
          edu: 0.05,
          skill: 0.4,
          language: 0.15,
          experience: 0.4,
          difficulty: 0.15,
          relevance: 0.8,
          duration: 0.05
        })
        break
      case 3:
        form.setFieldsValue({
          edu: 0.05,
          skill: 0.25,
          language: 0.05,
          experience: 0.65,
          difficulty: 0.15,
          relevance: 0.8,
          duration: 0.05
        })
        break
      case 4:
        form.setFieldsValue({
          edu: 0.0,
          skill: 0.0,
          language: 0.0,
          experience: 0.0,
          difficulty: 0.0,
          relevance: 0.0,
          duration: 0.0
        })
        break
      default:
        break
    }
    setOpen(true)
  }
  const rematchingAllCV = async () => {
    setRematchAllLoading(true)
    const matchedCVs = cvs.filter((cv) => cv.matched_status && cv.apply_jd_id === selectedJob)

    // Thực hiện hàm matchingCV cho mỗi mục không khớp
    await Promise.all(
      matchedCVs.map(async (cv) => {
        try {
          const res = (await rematchingCV({
            id_jd: cv.apply_jd_id,
            id_cv: cv.id_cv,
            config_score: {
              education_score_config: {
                W_education_score: edu
              },
              language_score_config: {
                W_language_score: language
              },
              technical_score_config: {
                W_technical_score: skill
              },
              experience_score_config: {
                W_experience_score: experience,
                relevance_score_w: relevance,
                difficulty_score_w: difficulty,
                duration_score_w: duration
              }
            }
          })) as any
          if (res.status_code && res.status_code === 400) {
            notification.info({
              message: res.detail,
              placement: 'topRight'
            })
          } else {
            setCVs((prevCVs) => {
              return prevCVs.map((prevCv) => {
                if (prevCv.id_cv === cv.id_cv) {
                  return {
                    ...prevCv,
                    ...res.cv_data
                  }
                } else {
                  return prevCv
                }
              })
            })
          }
        } catch (error) {
          console.log(error)
        }
      })
    )
    setRematchAllLoading(false)
  }
  const columns: TableProps<CVDataType>['columns'] = [
    {
      title: 'CV',
      dataIndex: 'file_cv_name',
      key: 'file_cv_name',
      render: (text) => <p>{text.split('_').slice(5).join('_')}</p>,
      width: 350
    },
    {
      title: 'Position',
      dataIndex: 'apply_position',
      key: 'apply_position',
      width: 200
    },
    {
      title: 'Component Score',
      dataIndex: 'matching_score',
      key: 'matching_score',
      render: (_, record) => {
        const key = record?.matching_score ? Object.keys(record?.matching_score) : ([] as string[])
        const values = record?.matching_score ? Object.values(record?.matching_score) : ([] as number[])
        const filteredKeys = key.filter((value) => !value.includes('overall'))
        return filteredKeys.map((filteredKey, index) => (
          <p key={index}>
            {filteredKey.replace(/_/g, ' ').replace(/\b\w/g, function (char) {
              return char.toUpperCase()
            })}
            : {values[key.indexOf(filteredKey)]}
          </p>
        ))
      },
      align: 'center'
    },
    {
      title: 'Overall Score',
      dataIndex: 'matching_score',
      key: 'matching_score',
      render: (_, record) => (
        <p>{record?.matching_score && renderTagsByScore(record?.matching_score?.overall_score)}</p>
      ),
      sorter: (a, b) => {
        const overallScoreA = a.matching_score?.overall_score || 0 // Sử dụng giá trị mặc định 0 nếu không có overall_score
        const overallScoreB = b.matching_score?.overall_score || 0 // Sử dụng giá trị mặc định 0 nếu không có overall_score
        return overallScoreA - overallScoreB
      },
      defaultSortOrder: 'descend',
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
          {!record.matched_status && (
            <CBButonn
              text='Matching'
              type='primary'
              cb={async () => {
                const res = (await matchingCV({
                  id_jd: record.apply_jd_id,
                  id_cv: record.id_cv,
                  config_score: {
                    education_score_config: {
                      W_education_score: edu
                    },
                    language_score_config: {
                      W_language_score: language
                    },
                    technical_score_config: {
                      W_technical_score: skill
                    },
                    experience_score_config: {
                      W_experience_score: experience,
                      relevance_score_w: relevance,
                      difficulty_score_w: difficulty,
                      duration_score_w: duration
                    }
                  }
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                })) as any

                console.log(res)
                if (res.status_code && res.status_code === 400) {
                  notification.info({
                    message: res.detail,
                    placement: 'topRight'
                  })
                } else {
                  setCVs((prevCVs) => {
                    return prevCVs.map((cv) => {
                      if (cv.id_cv === record.id_cv) {
                        return {
                          ...cv,
                          ...res.cv_data
                        }
                      } else {
                        return cv
                      }
                    })
                  })
                }
              }}
            />
          )}
          {record.matched_status && (
            <>
              <Button
                type='primary'
                onClick={(event) => {
                  event.stopPropagation()
                  setSelectedCV(record)
                  setModalDetailOpen(true)
                }}
              >
                Detail
              </Button>

              <CBButonn
                ghost={true}
                text='Rematch'
                type='primary'
                cb={async () => {
                  const res = (await rematchingCV({
                    id_jd: record.apply_jd_id,
                    id_cv: record.id_cv,
                    config_score: {
                      education_score_config: {
                        W_education_score: edu
                      },
                      language_score_config: {
                        W_language_score: language
                      },
                      technical_score_config: {
                        W_technical_score: skill
                      },
                      experience_score_config: {
                        W_experience_score: experience,
                        relevance_score_w: relevance,
                        difficulty_score_w: difficulty,
                        duration_score_w: duration
                      }
                    }
                  })) as any
                  console.log(res)
                  if (res.status_code && res.status_code === 400) {
                    notification.info({
                      message: res.detail,
                      placement: 'topRight'
                    })
                  } else {
                    setCVs((prevCVs) => {
                      return prevCVs.map((cv) => {
                        if (cv.id_cv === record.id_cv) {
                          return {
                            ...cv,
                            ...res.cv_data
                          }
                        } else {
                          return cv
                        }
                      })
                    })
                  }
                }}
              />
            </>
          )}
        </Space>
      )
    }
  ]

  const handleSelectJob = (value: string) => {
    setSelectedJob(value)
  }

  useEffect(() => {
    form.setFieldsValue({
      edu: 0.05,
      skill: 0.35,
      language: 0.05,
      experience: 0.55,
      difficulty: 0.15,
      relevance: 0.8,
      duration: 0.05
    })
    setOpen(true)
    const loadData = async () => {
      setTableLoading(true)
      const job_res = await getAllJob()
      const cv_res = await getAllCV()
      setJobs(job_res)
      setCVs(cv_res)
      setTableLoading(false)
    }
    loadData()
  }, [])

  return (
    <div className='w-full h-full'>
      <div className='px-[50px]'>
        <div className='w-full flex flex-wrap items-center justify-between'>
          <Select
            onChange={handleSelectJob}
            loading={tableLoading}
            placeholder='Select Job'
            style={{ width: 400 }}
            options={jobs.map((job) => ({
              value: job.id_jd,
              label: job.position_applied_for
            }))}
          />
          {selectedJob && (
            <Space className=''>
              <Button type='primary' loading={matchAllLoading} onClick={matchingAllCV}>
                Match All
              </Button>
              <Button type='primary' loading={rematchAllLoading} onClick={rematchingAllCV} ghost>
                Rematch All
              </Button>
            </Space>
          )}
        </div>
      </div>

      <div className='px-[50px] space-y-6  py-10'>
        <div className='w-full mt-5'>
          <Select
            value={value}
            onChange={onChange}
            options={[
              { value: 0, label: 'Default Config' },
              { value: 1, label: 'Skill Config' },
              { value: 2, label: 'Language Config' },
              { value: 3, label: 'Experience Config' },
              { value: 4, label: 'Custom' }
            ]}
          />
          {/* <Radio.Group onChang
          e={onChange} value={value}>
            <Space direction='horizontal'>
              <Radio value={0}>Default Config</Radio>
              <Radio value={1}>Skill Config</Radio>
              <Radio value={2}>Language Config</Radio>
              <Radio value={3}>Experience Config</Radio>
              <Radio value={4}>Custom</Radio>
            </Space>
          </Radio.Group> */}
        </div>

        <p>Sum of weights is equal to 1</p>
        <div className='w-full'>
          <Form form={form}>
            <div className='w-full grid grid-cols-4'>
              <Form.Item label='Education' name={'edu'}>
                <Input type='number' step={0.01} style={{ width: 100 }} disabled={value !== 4} />
              </Form.Item>
              <Form.Item label='Skill' name='skill'>
                <Input disabled={value !== 4} type='number' step={0.01} style={{ width: 100 }} />
              </Form.Item>
              <Form.Item label='Language' name='language'>
                <Input disabled={value !== 4} type='number' step={0.01} style={{ width: 100 }} />
              </Form.Item>

              <Form.Item label='Experience' className='custom-item'>
                <Form.Item name='experience'>
                  <Input disabled={value !== 4} type='number' step={0.01} style={{ width: 100 }} />
                </Form.Item>

                <Dropdown
                  open={open}
                  placement='bottomRight'
                  menu={{
                    items: [
                      {
                        label: (
                          <Form.Item label='Difficulty' name='difficulty'>
                            <Input
                              disabled={value !== 4}
                              type='number'
                              step={0.01}
                              style={{ width: 100, marginLeft: 10 }}
                            />
                          </Form.Item>
                        ),
                        key: '0'
                      },
                      {
                        label: (
                          <Form.Item label='Relevance' name='relevance'>
                            <Input
                              disabled={value !== 4}
                              type='number'
                              step={0.01}
                              style={{ width: 100, marginLeft: 10 }}
                            />
                          </Form.Item>
                        ),
                        key: '1'
                      },
                      {
                        label: (
                          <Form.Item label='Duration' name='duration'>
                            <Input
                              disabled={value !== 4}
                              type='number'
                              step={0.01}
                              style={{ width: 100, marginLeft: 10 }}
                            />
                          </Form.Item>
                        ),
                        key: '2'
                      },
                      {
                        label: <p>Sum of weights is equal to 1</p>,
                        key: '3'
                      }
                    ],
                    onClick: (): void => {
                      setOpen(true)
                    },
                    onMouseLeave: (): void => setOpen(false)
                  }}
                  trigger={['click']}
                >
                  <Button
                    icon={<DownOutlined />}
                    onClick={() => {
                      setOpen(!open)
                    }}
                  ></Button>
                </Dropdown>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>

      <Modal
        width={1000}
        title={selectedCV?.file_cv_name.split('_').slice(5).join('_')}
        style={{ top: 20 }}
        open={modalDetailOpen}
        onOk={() => setModalDetailOpen(false)}
        onCancel={() => setModalDetailOpen(false)}
        footer={null}
      >
        <Collapse
          items={[
            {
              key: '1',
              label: 'Projects',
              children: (
                <p className='whitespace-pre-line'>
                  {selectedCV?.matched_result.projects.map((project: any) => {
                    return `Project Name: ${project.project_name}\nExplanation: ${project.explanation}\nDuration Score: ${project.duration_score}\nDifficulty Score: ${project.difficulty_score}\nRelevance Score: ${project.relevance_score}\n\n`
                  })}
                </p>
              )
            },
            {
              key: '2',
              label: 'Technical Skills',
              children: (
                <>
                  <p>
                    Explanation: {selectedCV?.matched_result.technical_skills.explanation}
                    <br />
                    Technical Score: {selectedCV?.matched_result.technical_skills.technical_score}
                  </p>
                </>
              )
            },
            {
              key: '3',
              label: 'Language Skills',
              children: (
                <>
                  {selectedCV?.matched_result.language_skills.map((languageSkill: any, index: any) => (
                    <div key={index} className='mb-2'>
                      <p>
                        Language: {languageSkill.language}
                        <br />
                        Explanation: {languageSkill.explanation}
                        <br />
                        Certification: {languageSkill.certification}
                        <br />
                        Required: {languageSkill.required}
                        <br />
                        Proficiency: {languageSkill.proficiency}
                      </p>
                    </div>
                  ))}
                </>
              )
            },
            {
              key: '4',
              label: 'Education',
              children: (
                <>
                  <p>
                    Explanation: {selectedCV?.matched_result.education.explanation}
                    <br />
                    Major: {selectedCV?.matched_result.education.major}
                    <br />
                    Major Relevance Score: {selectedCV?.matched_result.education.major_relevance_score}
                    <br />
                    Graduation Status:{' '}
                    {selectedCV?.matched_result.education.graduation_status === 0 ? 'Not graduated yet' : 'Graduated'}
                  </p>
                </>
              )
            }
          ]}
        />
      </Modal>
      <Table
        bordered
        style={{ paddingLeft: '50px', paddingRight: '50px' }}
        loading={tableLoading}
        rowKey={'id_cv'}
        columns={columns}
        dataSource={selectedJob ? cvs.filter((cv) => cv.apply_jd_id === selectedJob) : []}
        pagination={{ pageSize: 8 }}
      />
    </div>
  )
}
export default MatchingCV
