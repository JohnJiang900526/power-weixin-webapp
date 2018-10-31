import * as types from './mutation-types.js'

const mutations = {
  [types.SETPROJECTINFO] (state, projectInfo) {
    state.projectInfo = projectInfo
  },
  [types.SETCURRENTMESSAGE] (state, currentMessage) {
    state.currentMessage = currentMessage
  },
  [types.SETFORMSTATUS] (state, formStatus) {
    state.formStatus = formStatus
  },
  [types.SETROUTERPARAMS] (state, routerParams) {
    state.routerParams = Object.assign({}, routerParams)
  }
}

export default mutations
