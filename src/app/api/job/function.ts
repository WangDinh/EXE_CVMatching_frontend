/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '~/utils/axiosClient'
import { convertToFormData } from '~/utils/formData'

const APIs_URL = {
  JOB: '/modules/crud_jds_router/',
  JOB_ID: (id: string) => `/modules/crud_jds_router/${id}`
}

export const getAllJob = async (): Promise<JobDataType[]> => {
  return await axiosClient.get(APIs_URL.JOB)
}
export const deleteJob = async (id: string) => {
  return await axiosClient.delete(APIs_URL.JOB_ID(id))
}
export const createJob = async (data: { position_applied_for: string; file_jd: any }) => {
  return await axiosClient.post(APIs_URL.JOB, convertToFormData(data), {
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
}
