// 整数最多 integer 位，小数最多 decimal 位的非负数
export function numValidator(integer, decimal) {
  return function validator(rule, value) {
    if ([undefined, null].includes(value)) {
      return Promise.resolve()
    }

    const reg = new RegExp(`^[0-9]{0,${integer}}(\\.[0-9]{0,${decimal}})?$`)
    if (reg.test(String(value))) {
      return Promise.resolve()
    }

    return Promise.reject(
      `请输入整数最多${integer}位，小数最多${decimal}位的非负数`
    )
  }
}
