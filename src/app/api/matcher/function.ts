/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '~/utils/axiosClient'

const APIs_URL = {
  MATCH: '/modules/cvmatching/matching',
  REMATCH: '/modules/cvmatching/rematching'
}

export const matching = async (data: MatchDto) => {
  return await axiosClient.post(APIs_URL.MATCH, data)
}
export const rematching = async (data: MatchDto) => {
  return await axiosClient.post(APIs_URL.REMATCH, data)
}
