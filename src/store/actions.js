import * as types from './mutation-types.js'

export const setWindowConfigAction = function ({commit}, {windowConfig}) {
  commit(types.SETWINDOWCONFIG, windowConfig)
}

export const setFormLists = function ({commit}, {formLists}) {
  commit(types.SETFORMLISTS, formLists)
}

export const setCurrentFormConfig = function ({commit}, {currentFormConfig}) {
  commit(types.SETCURRENTFORMCONFIG, currentFormConfig)
}

export const currentForm = function ({commit}, {currentForm}) {
  commit(types.SETCURRENTFORM, currentForm)
}
