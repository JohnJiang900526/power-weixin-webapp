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
  },
  [types.MANAGEPORTALRIGHT] (state, right) {
    state.managePortalRight = right
  },
  [types.PROJECTPORTALRIGHT] (state, right) {
    state.projectPortalRight = right
  },
  [types.TOKENFAILURE] (state, tokenFailure) {
    state.tokenFailure = tokenFailure
  },
  [types.SETMAINFORMdATA] (state, data) {
    state.mainFormData = Object.assign({}, data)
  }
}

export default mutations
