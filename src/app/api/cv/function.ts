import axiosClient from '~/utils/axiosClient'
import { convertToFormData } from '~/utils/formData'

const APIs_URL = {
  CV: '/modules/crud_cvs_router/',
  CV_ID: (id: string) => `/modules/crud_cvs_router/${id}`
}

export const getAllCV = async (): Promise<CVDataType[]> => {
  return await axiosClient.get(APIs_URL.CV)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCV = async (data: { apply_jd_id: string; files_cv: any[] }) => {
  return await axiosClient.post(APIs_URL.CV, convertToFormData(data), {
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
}
export const deleteCV = async (id: string) => {
  return await axiosClient.delete(APIs_URL.CV_ID(id))
}
