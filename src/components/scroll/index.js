import BScroll from "@better-scroll/core";
import Slide from '@better-scroll/slide'
import ScrollBar from '@better-scroll/scroll-bar'
import ObserveDOM from '@better-scroll/observe-dom'
BScroll.use(Slide)
BScroll.use(ScrollBar)
BScroll.use(ObserveDOM)
export const createBScroll = (dom,options) => {
  return new BScroll(dom,options)
}