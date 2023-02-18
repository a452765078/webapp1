import { createBScroll } from './index'


export const createScrollbar = (ref) => {
  return createBScroll(ref,{
    scrollY: true,
    scrollbar: true,
    observeDOM: true,
  })
}