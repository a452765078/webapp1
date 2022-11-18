import { createStore ,createLogger} from 'vuex'
import state from './state'
import mutations from './mutation'
import actions from './action'

const debug = process.env.NODE_ENV !== 'production'

console.log(process)

export default createStore({
  state,
  getters: {
  },
  mutations,
  actions,
  modules: {
  },
  strict:debug,
  plugins: debug ? [createLogger()] : []
})
