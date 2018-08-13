const FileAttach = () => import('components/sub-module/file-attach/file-attach.vue')
const Report = () => import('components/sub-module/Report/Report.vue')
const Comment = () => import('components/sub-module/comment/comment.vue')

const SearchBox = () => import('base/search-box/search-box.vue')
const FormList = () => import('base/form-list/form-list.vue')
const FooterBar = () => import('base/footer-bar/footer-bar.vue')

const NavList = () => import('base/nav-list/nav-list.vue')
const SwitchesBox = () => import('base/switches-box/switches-box.vue')
const PowerSelect = () => import('base/power-select/power-select.vue')

export {
  FileAttach,
  Report,
  Comment,
  SearchBox,
  FormList,
  FooterBar,
  NavList,
  SwitchesBox,
  PowerSelect
}
