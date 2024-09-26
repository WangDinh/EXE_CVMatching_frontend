/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '~/utils/axiosClient'

const APIs_URL = {
  QTRETRIEVAl: (id: string) => `/modules/qtretrieval/send_jd_to_get_question_tests?id_jd=${id}`,
  SAVE_QTRETRIEVAl: (id_jd: string, id_question_tests: string) =>
    `/modules/qtretrieval/add_get_question_tests_to_jd?id_jd=${id_jd}&id_question_tests=${id_question_tests}`,
  DELETE_QTRETRIEVAl: (id: string) => `/modules/qtretrieval/delete_question_tests_in_jd?id_jd=${id}`,
  GET_DETAIL: (id: string) => `/modules/qtretrieval/get_exam_data_by_jd?id_jd=${id}`
}

export const getQuestions = async (data: { id_jd: string }) => {
  return await axiosClient.post(APIs_URL.QTRETRIEVAl(data.id_jd))
}
export const getDetail = async (data: { id_jd: string }) => {
  return await axiosClient.get(APIs_URL.GET_DETAIL(data.id_jd))
}

export const saveQuestion = async (id_jd: string, id_question_tests: string) => {
  return await axiosClient.put(APIs_URL.SAVE_QTRETRIEVAl(id_jd, id_question_tests))
}
export const deleteQuestion = async (data: { id_jd: string }) => {
  return await axiosClient.delete(APIs_URL.DELETE_QTRETRIEVAl(data.id_jd))
}
