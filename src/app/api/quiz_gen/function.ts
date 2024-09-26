/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '~/utils/axiosClient'

const APIs_URL = {
  QUIZ_GEN: (id: string) => `/modules/quiz_gen/send_jd_to_gen_quiz?id_jd=${id}`,
  SAVE_QUIZ_GEN: `/modules/quiz_gen/add_gen_quiz_to_jd`,
  DELETE_QUIZ_GEN: (id: string) => `/modules/quiz_gen/delete_gen_quiz_in_jd?id_jd=${id}`
}

export const getGQuestions = async (data: { id_jd: string }) => {
  return await axiosClient.post(APIs_URL.QUIZ_GEN(data.id_jd))
}

export const saveGQuestion = async (data: { id_jd: string; json_quiz_gen: any }) => {
  return await axiosClient.put(APIs_URL.SAVE_QUIZ_GEN, data)
}
export const deleteGQuestion = async (data: { id_jd: string }) => {
  return await axiosClient.delete(APIs_URL.DELETE_QUIZ_GEN(data.id_jd))
}
