import { makeAutoObservable } from 'mobx'

// 放一些全局数据，比如当前登录用户信息
class GlobalStore {
  userInfo = {}

  constructor() {
    makeAutoObservable(this)
  }

  updateUserInfo(detail) {
    this.userInfo = detail
  }

  reset() {
    this.userInfo = {}
  }
}

export default new GlobalStore()
