import { createBScroll } from './index'


export const createSlider = (ref) => {
  return createBScroll(ref,{
    scrollX: true,
    scrollY: false,
    slide: {
      threshold: 100
    },
    momentum: false,
    bounce: false,
    stopPropagation: true
  })
}