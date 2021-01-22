export function debounce(func, delay = 50){
  let timer = null
  return function (...args){
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)     //args可以在const refresh = this.debounce()，然后refresh()括号中传入参数
    }, delay)
  }
}
