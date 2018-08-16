import * as types from './mutation-types.js'

const mutations = {
  [types.SETWINDOWCONFIG] (state, windowConfig) {
    state.windowConfig = windowConfig
  },
  [types.SETFORMLISTS] (state, formLists) {
    state.formLists = formLists
  },
  [types.SETCURRENTFORMCONFIG] (state, currentFormConfig) {
    state.currentFormConfig = currentFormConfig
  },
  [types.SETCURRENTFORM] (state, currentForm) {
    state.currentForm = currentForm
  },
  [types.SETPROJECTINFO] (state, projectInfo) {
    state.projectInfo = projectInfo
  }
}

export default mutations
