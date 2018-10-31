const FileAttach = () => import('components/sub-module/file-attach/file-attach.vue')
const subFileAttach = () => import('components/sub-module/file-attach/subFile-attach.vue')
const Report = () => import('components/sub-module/Report/Report.vue')
const Comment = () => import('components/sub-module/comment/comment.vue')

const SearchBox = () => import('base/search-box/search-box.vue')
const FormList = () => import('base/form-list/form-list.vue')
const FooterBar = () => import('base/footer-bar/footer-bar.vue')
const NavList = () => import('base/nav-list/nav-list.vue')
const SwitchesBox = () => import('base/switches-box/switches-box.vue')
const PowerSelect = () => import('base/power-select/power-select.vue')
const FormRow = () => import('base/form-row/form-row.vue')
const FormAction = () => import('base/form-action/form-action.vue')
const Bananer = () => import('base/bananer/banner.vue')
const LineBreak = () => import('base/line/line.vue')
const BackTo = () => import('base/back-to/back-to.vue')

const SubCommonTable = () => import('win-form/subCommonTable.vue')
const commonChildTable = () => import('win-form/commonChildTable.vue')
const treeGridChildTable = () => import('win-form/treeGridChildTable.vue')
const treeGridChildTableCustomize = () => import('win-form/treeGridChildTableCustomize.vue')

export {
  FileAttach,
  Report,
  Comment,
  SearchBox,
  FormList,
  FooterBar,
  NavList,
  SwitchesBox,
  PowerSelect,
  subFileAttach,
  SubCommonTable,
  FormRow,
  FormAction,
  commonChildTable,
  treeGridChildTable,
  treeGridChildTableCustomize,
  Bananer,
  LineBreak,
  BackTo
}
