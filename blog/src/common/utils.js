export function debounce(func, delay = 50){
  let timer = null
  return function (...args){
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)     //args可以在const refresh = this.debounce()，然后refresh()括号中传入参数
    }, delay)
  }
}

export function toDate(time){
  let date = new Date(parseInt(time))
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  return y + "/" + (m < 10 ? "0" + m : m) + "/" + (d < 10 ? "0" + d : d) + " " + date.toTimeString().substr(0, 8);
}
