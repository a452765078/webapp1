
import request from '../utils/request'

export const getRecommend = () => {
  return request('/api/getRecommend')
} 