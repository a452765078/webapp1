import { createBScroll } from './index'


export const createScrollPos = (ref) => {
  return createBScroll(ref,{
    scrollY: true,
    scrollbar: true,
    observeDOM: true,
    probeType: 3
  })
}